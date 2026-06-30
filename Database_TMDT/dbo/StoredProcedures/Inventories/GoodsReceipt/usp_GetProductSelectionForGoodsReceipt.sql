CREATE PROCEDURE [dbo].[usp_GetProductSelectionForGoodsReceipt]
	@ShopId UNIQUEIDENTIFIER
AS
BEGIN
	SELECT 
		p.id AS Id, 
		p.[name] AS [Name]
	FROM PRODUCTS p
	WHERE p.shop_id = @ShopId
		AND p.[status] = 'Approved';
END
