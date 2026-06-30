CREATE PROCEDURE [dbo].[usp_GetProductInStockPaging]
	@ShopId UNIQUEIDENTIFIER,
	@PageNumber INT,
	@PageSize INT
AS
BEGIN 
	SET NOCOUNT ON;

	DECLARE @TotalItems INT;

	SELECT @TotalItems = COUNT(DISTINCT v.id)
	FROM VARIANTS v
	INNER JOIN PRODUCTS p ON v.product_id = p.id
	WHERE p.shop_id = @ShopId;

	SELECT 
		v.id AS Id, 
		v.product_id AS ProductId, 
		v.id AS VariantId, 
		v.image_url AS ImageUrl, 
		v.[name] AS [Name], 
		v.sku AS Sku, 

		CASE 
			WHEN ISNULL(SUM(ibs.remaining_quantity), 0) < 10 THEN 'immediate'
			WHEN ISNULL(SUM(ibs.remaining_quantity), 0) < 50 THEN 'early'
			ELSE 'normal'
		END AS ReplenishmentLevel,

		ISNULL(SUM(ibs.remaining_quantity), 0) AS Stock,

		0 AS Sales7d, 
		0 AS Sales30d, 
		@TotalItems AS TotalItems

	FROM VARIANTS v
	INNER JOIN PRODUCTS p ON v.product_id = p.id
	-- Dùng LEFT JOIN để phòng trường hợp Variant mới tạo chưa có lô hàng nào thì tổng tồn kho bằng 0
	LEFT JOIN INVENTORY_BATCH_STOCKS ibs ON v.id = ibs.variant_id

	WHERE p.shop_id = @ShopId
		
	GROUP BY 
		v.id,
		v.product_id,
		v.image_url,
		v.[name],
		v.sku,
		p.created_at

	ORDER BY p.created_at DESC

	OFFSET (@PageNumber - 1) * @PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY;
END