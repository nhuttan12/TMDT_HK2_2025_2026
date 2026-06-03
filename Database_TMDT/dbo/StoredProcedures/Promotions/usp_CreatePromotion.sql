CREATE PROCEDURE [dbo].[usp_CreatePromotion]
	@Name NVARCHAR(255),
	@Status BIT,
	@StartAt DATETIMEOFFSET,
	@EndAt DATETIMEOFFSET,
	@Products dbo.[ProductPromotionType] READONLY
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @InsertedIds TABLE (Id UNIQUEIDENTIFIER);
	DECLARE @NewPromotionId UNIQUEIDENTIFIER;

	DECLARE @TotalRowsAffected INT = 0;

	BEGIN TRY
		BEGIN TRANSACTION

		INSERT INTO PROMOTIONS(name, start_at, end_at, status)
		OUTPUT inserted.Id INTO @InsertedIds
		VALUES (@Name, @StartAt, @EndAt, @Status);

		SET @TotalRowsAffected = @TotalRowsAffected + @@ROWCOUNT;

		SELECT TOP 1 @NewPromotionId = Id FROM @InsertedIds

		INSERT INTO PRODUCT_PROMOTIONS(product_id, promotion_id, discount)
		SELECT ProductId, @NewPromotionId, Discount 
		FROM @Products
		
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
