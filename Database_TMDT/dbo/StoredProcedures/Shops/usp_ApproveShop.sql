CREATE PROCEDURE [dbo].[usp_ApproveShop]
	@ShopId UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @TotalRowsAffected INT = 0;

	BEGIN TRY
		BEGIN TRANSACTION;

		UPDATE SHOPS
		SET system_status = 'approved', 
			updated_at = GETUTCDATE()
		WHERE id = @ShopId

		SET @TotalRowsAffected = @TotalRowsAffected + @@ROWCOUNT;
		
		COMMIT TRANSACTION;

		SELECT @TotalRowsAffected AS RowsAffected;
	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION;
		THROW;
	END CATCH
END
