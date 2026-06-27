CREATE PROCEDURE [dbo].[usp_GetSupplierByShopId]
	@ShopId UNIQUEIDENTIFIER
AS
BEGIN
	SELECT 
		s.id AS Id,
		s.[name] AS [Name]
	FROM SUPPLIERS s
	WHERE s.shop_id = @ShopId
END
