CREATE PROCEDURE [dbo].[usp_BulkUpdateBanners]
	@UserId UNIQUEIDENTIFIER,
	@Banners dbo.[BannerInsertType] READONLY
AS
BEGIN
	SET NOCOUNT ON;

    DECLARE @TotalRowsAffected INT = 0;

	BEGIN TRY
		BEGIN TRANSACTION;

        -- BƯỚC 1: DELETE (Xóa những banner cũ dưới DB không có trong mảng mới gửi lên)
        UPDATE BANNERS
        SET status = 0,
            updated_at = GETUTCDATE() 
        WHERE [user_id] = @UserId
            AND status != 0
            AND [image_url] NOT IN (SELECT [ImageUrl] FROM @Banners);

        SET @TotalRowsAffected = @TotalRowsAffected + @@ROWCOUNT;


        -- BƯỚC 2: UPDATE (Cập nhật những banner có ở cả 2 nơi nhưng bị thay đổi dữ liệu)
        UPDATE target
        SET target.[order] = source.[Order],
            target.[is_primary] = source.[IsPrimary],
            target.[status] = 1, 
            target.[updated_at] = GETUTCDATE()
        FROM [dbo].[BANNERS] AS target
        INNER JOIN @Banners AS source 
            ON target.[user_id] = @UserId 
           AND target.[image_url] = source.[ImageUrl]
        WHERE target.[order] <> source.[Order] 
           OR target.[is_primary] <> source.[IsPrimary]
           OR target.[status] <> 1;

        SET @TotalRowsAffected = @TotalRowsAffected + @@ROWCOUNT;


        -- BƯỚC 3: INSERT (Thêm những banner mới tinh, chưa có dưới DB)
        INSERT INTO [dbo].[BANNERS] ([image_url], [order], [is_primary], [status], [user_id])
        SELECT source.[ImageUrl], source.[Order], source.[IsPrimary], 1, @UserId
        FROM @Banners AS source
        WHERE NOT EXISTS (
            SELECT 1 FROM [dbo].[BANNERS] AS target
            WHERE target.[user_id] = @UserId 
              AND target.[image_url] = source.[ImageUrl]
        );

        SET @TotalRowsAffected = @TotalRowsAffected + @@ROWCOUNT;


        COMMIT TRANSACTION;

        -- Trả về tổng số dòng bị tác động (Xóa + Sửa + Thêm) để map vào C# DTO
        SELECT @TotalRowsAffected AS RowsAffected;

	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION;
		THROW;
	END CATCH
END