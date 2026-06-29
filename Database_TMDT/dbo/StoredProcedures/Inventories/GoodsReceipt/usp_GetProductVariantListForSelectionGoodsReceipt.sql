CREATE PROCEDURE [dbo].[usp_GetProductVariantListForSelectionGoodsReceipt]
	@ShopId UNIQUEIDENTIFIER,
	@ProductId UNIQUEIDENTIFIER
AS
BEGIN
	SELECT 
		v.[id] AS Id, 
		v.[name] AS [Name], 
		v.sku AS Sku
	FROM VARIANTS v
	INNER JOIN PRODUCTS p ON p.id = v.product_id
	WHERE p.shop_id = @ShopId
		AND p.id = @ProductId
		AND p.[status] = 1
END
