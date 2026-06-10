CREATE PROCEDURE [dbo].[usp_GetPromotionDetail]
	@PromotionId UNIQUEIDENTIFIER
AS
BEGIN
	BEGIN TRY
		SELECT 
			p.id AS Id,
			pd.id AS [ProductId],
			v.id AS [ProductVariantId],
			v.[name] AS [Name],
			pp.created_at AS CreatedAt,
			pp.updated_at AS UpdatedAt,
			v.sell_price AS SellPrice,
			pp.discount_price AS DiscountPrice,
			p.[status] AS [Status]
		FROM PROMOTIONS p
		INNER JOIN PRODUCT_PROMOTIONS pp
			ON pp.product_id = p.id
		INNER JOIN PRODUCTS pd
			ON pd.id = pp.product_id
		INNER JOIN VARIANTS v
			ON v.product_id = p.id
		WHERE p.id = @PromotionId
	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
			ROLLBACK;
		THROW
	END CATCH
END
