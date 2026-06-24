CREATE PROCEDURE [dbo].[usp_GetProductInStockPaging]
	@ProductId UNIQUEIDENTIFIER,
	@PageNumber INT,
	@PageSize INT
AS
BEGIN 
	SET NOCOUNT ON;

	DECLARE @TotalItems INT;

	SELECT @TotalItems = COUNT(1)
	FROM INVENTORY_BATCH_STOCKS ibs
	INNER JOIN VARIANTS v
		ON v.id = ibs.variant_id;

	SELECT 
		ibs.id,
		ibs.product_id,
		ibs.variant_id,
		v.image_url,
		v.[name],
		v.sku,
		CASE 
			WHEN ibs.remaining_quantity < 10 THEN 'immediate'
			WHEN ibs.remaining_quantity < 50 THEN 'early'
			ELSE 'normal'
		END AS ReplenishmentLevel,
		SUM(ibs.remaining_quantity) AS Stock,
		0 AS Sales7d,
		0 AS Sales30d,
		@TotalItems AS TotalItems

	FROM INVENTORY_BATCH_STOCKS ibs
	INNER JOIN VARIANTS v
		ON v.id = ibs.variant_id
	INNER JOIN PRODUCTS p
		ON v.product_id = p.id
		
	ORDER BY p.created_at DESC

	OFFSET (@PageNumber - 1) * @PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY;
END