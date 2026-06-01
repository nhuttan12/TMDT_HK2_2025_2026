CREATE PROCEDURE [dbo].[usp_BulkUpdateBanners]
	@UserId UNIQUEIDENTIFIER,
	@Banners dbo.[BannerInsertType] READONLY
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRY
		BEGIN TRANSACTION;
		
		-- Sử dụng lệnh MERGE để xử lý đồng thời Insert, Update và Bỏ qua
		MERGE INTO [dbo].[BANNERS] AS target
		USING @Banners AS source
		-- Tiêu chí ghép nối (Matching): Cùng của 1 User và có chung đường dẫn hình ảnh
		ON target.[user_id] = @UserId AND target.[image_url] = source.[ImageUrl]
		-- Lưu ý: Nếu dữ liệu giống nhau y hệt, điều kiện này sai -> Lệnh MERGE sẽ bỏ qua (Không làm gì cả)
		WHEN MATCHED AND (target.[order] <> source.[Order] OR target.[is_primary] <> source.[IsPrimary]) THEN 
			UPDATE SET
				target.[order] = source.[Order],
				target.[is_primary] = source.[IsPrimary],
				target.[updated_at] = GETUTCDATE()

		WHEN NOT MATCHED BY TARGET THEN
			INSERT (
				[image_url],
				[order],
				[is_primary],
				[status],
				[user_id]
			)  
			VALUES (
				source.[ImageUrl],
				source.[Order],
				source.[IsPrimary],
				1, -- Mặc định status là 1 (active)
				@UserId
			);

		DECLARE @RowsAffected INT = @@ROWCOUNT;

		COMMIT TRANSACTION;

		SELECT @RowsAffected AS RowsAffected;

	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION;
		THROW;
	END CATCH
END