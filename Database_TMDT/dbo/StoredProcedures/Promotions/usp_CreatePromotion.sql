CREATE PROCEDURE [dbo].[usp_CreatePromotion]
	@Name NVARCHAR(255),
	@Status BIT,
	@StartAt DATETIMEOFFSET,
	@EndAt DATETIMEOFFSET,
	@Products dbo.[udt_ProductPromotionType] READONLY
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @InsertedIds TABLE (id UNIQUEIDENTIFIER);
	DECLARE @NewPromotionId UNIQUEIDENTIFIER;

	BEGIN TRY
		BEGIN TRANSACTION

		INSERT INTO PROMOTIONS(
			name, 
			start_at, 
			end_at, 
			status
		)
		OUTPUT inserted.id INTO @InsertedIds
		VALUES (
			@Name, 
			@StartAt, 
			@EndAt, 
			@Status
		);

		SELECT TOP 1 @NewPromotionId = id 
		FROM @InsertedIds

		INSERT INTO PRODUCT_PROMOTIONS(
			product_id, 
			promotion_id, 
			discount_price
		)
		SELECT 
			ProductId, 
			@NewPromotionId, 
			Discount 
		FROM @Products;
		
		COMMIT TRANSACTION;

	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION;
		THROW;
	END CATCH
END
