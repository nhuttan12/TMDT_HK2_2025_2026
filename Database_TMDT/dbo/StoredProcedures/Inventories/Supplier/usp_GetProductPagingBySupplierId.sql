CREATE PROCEDURE [dbo].[usp_GetProductPagingBySupplierId]
	@SupplierId UNIQUEIDENTIFIER,
	@ShopId UNIQUEIDENTIFIER,
	@PageNumber INT,
	@PageSize INT
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @TotalItems INT;

	SELECT @TotalItems = COUNT(1)
	FROM PRODUCTS p

	INNER JOIN SHOPS shop
		ON p.shop_id = shop.id
	INNER JOIN SUPPLIERS supplier
		ON supplier.shop_id = shop.id
	WHERE shop.id = @ShopId
		AND supplier.id = @SupplierId;

	SELECT 
		p.id AS Id,
		p.[name] AS [Name],
		p.image_urls AS [ImageUrls],
		p.[status] AS [Status],
		p.system_status AS SystemStatus,
		p.created_at AS CreatedAt,
		p.updated_at AS UpdatedAt,
		@TotalItems AS TotalItems
	FROM PRODUCTS p

	INNER JOIN SHOPS shop
		ON p.shop_id = shop.id
	INNER JOIN SUPPLIERS supplier
		ON supplier.shop_id = shop.id
	WHERE shop.id = @ShopId
		AND supplier.id = @SupplierId
		
	ORDER BY p.created_at DESC

	OFFSET (@PageNumber - 1) * @PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY;
END