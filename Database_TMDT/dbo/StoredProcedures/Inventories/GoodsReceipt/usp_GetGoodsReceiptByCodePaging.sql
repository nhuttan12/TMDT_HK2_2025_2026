CREATE PROCEDURE [dbo].[usp_GetGoodsReceiptByCodePaging]
	@ShopId UNIQUEIDENTIFIER,
	@Code NVARCHAR(255),
	@PageNumber INT,
	@PageSize INT
AS
BEGIN 
	SET NOCOUNT ON;

	DECLARE @TotalItems INT;

	SET @Code = LTRIM(RTRIM(ISNULL(@Code, '')));

	SELECT @TotalItems = COUNT(1)
	FROM GOODS_RECEIPTS gr
	INNER JOIN SHOPS shops
		ON gr.shop_id = shops.id
	WHERE shops.id = @ShopId
		AND (@Code = '' OR gr.code LIKE '%' + @Code + '%');

	SELECT 
		gr.id AS Id,
		gr.code AS Code,
		s.[name] AS SupplierName,
		ISNULL(BatchStats.TotalBatches, 0) AS TotalBatches,
		ISNULL(BatchStats.TotalQuantity, 0) AS TotalQuantity,		
		ISNULL(BatchStats.TotalAmount, 0) AS TotalAmount,
		gr.[status] AS [Status],
		gr.created_at AS CreatedAt,
		@TotalItems AS TotalItems
	FROM GOODS_RECEIPTS gr

	INNER JOIN SUPPLIERS s
		ON gr.supplier_id = s.id
	INNER JOIN SHOPS shops
		ON gr.shop_id = shops.id

	OUTER APPLY (
		SELECT 
			COUNT(grb.id) AS TotalBatches,
			SUM(grb.quantity) AS TotalQuantity,
			SUM(grb.total_cost_price) AS TotalAmount
			FROM GOODS_RECEIPT_BATCHES grb 
			WHERE grb.goods_receipt_id = gr.id
	) AS BatchStats

	WHERE shops.id = @ShopId
		AND (@Code = '' OR gr.code LIKE '%' + @Code + '%')
		
	ORDER BY gr.created_at DESC

	OFFSET (@PageNumber - 1) * @PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY;
END
