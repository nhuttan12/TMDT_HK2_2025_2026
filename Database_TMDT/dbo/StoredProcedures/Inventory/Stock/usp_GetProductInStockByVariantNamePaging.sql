CREATE PROCEDURE [dbo].[usp_GetProductInStockByVariantNamePaging]
	@ShopId UNIQUEIDENTIFIER,
	@ProductName NVARCHAR(255),
	@PageNumber INT,
	@PageSize INT
AS
BEGIN 
	SET NOCOUNT ON;

	-- Nếu bị NULL thì chuyển thành chuỗi rỗng (''). Nếu có khoảng trắng thừa thì cắt bỏ.
	SET @ProductName = LTRIM(RTRIM(ISNULL(@ProductName, '')));

	DECLARE @TotalItems INT;

	SELECT @TotalItems = COUNT(DISTINCT v.id)
	FROM VARIANTS v
	INNER JOIN PRODUCTS p ON v.product_id = p.id
	WHERE p.shop_id = @ShopId
		AND (@ProductName = '' OR p.[name] LIKE '%' + @ProductName + '%');

	SELECT 
		ibs.id AS Id, 
		ibs.product_id AS ProductId, 
		ibs.variant_id AS VariantId, 
		v.image_url AS ImageUrl, 
		v.[name] AS [Name], 
		v.sku AS Sku, 
		CASE 
			WHEN ibs.remaining_quantity < 10 THEN 'immediate'
			WHEN ibs.remaining_quantity < 50 THEN 'early'
			ELSE 'normal'
		END AS ReplenishmentLevel,
		SUM(ibs.remaining_quantity) AS Stock,
		0 AS Sales7d, 
		0 AS Sales30d, 
		@TotalItems AS TotalItems

	FROM VARIANTS v
	INNER JOIN PRODUCTS p ON v.product_id = p.id
	-- Dùng LEFT JOIN để phòng trường hợp Variant mới tạo chưa có lô hàng nào thì tổng tồn kho bằng 0
	LEFT JOIN INVENTORY_BATCH_STOCKS ibs ON v.id = ibs.variant_id

	WHERE p.shop_id = @ShopId
		AND (@ProductName = '' OR p.[name] LIKE '%' + @ProductName + '%')
		
	GROUP BY 
		v.product_id,
		v.id,
		v.image_url,
		v.[name],
		v.sku,
		p.created_at

	ORDER BY p.created_at DESC

	OFFSET (@PageNumber - 1) * @PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY;
END
