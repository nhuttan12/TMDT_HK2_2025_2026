CREATE PROCEDURE [dbo].[usp_GetProductListInBatchPaging]
	@BatchId UNIQUEIDENTIFIER,
	@ReceiptId UNIQUEIDENTIFIER,
	@PageNumber INT,
	@PageSize INT
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @TotalItems INT;
	
	SELECT @TotalItems = COUNT(1)
	FROM GOODS_RECEIPT_BATCH_VARIANTS grbv
	INNER JOIN VARIANTS v
		ON v.id = grbv.variant_id 
	INNER JOIN GOODS_RECEIPT_BATCHES grb
		ON grbv.batch_id = grb.id
	WHERE grbv.batch_id = @BatchId
		AND grb.goods_receipt_id = @ReceiptId;

	SELECT 
		grbv.id AS Id,
		v.product_id AS ProductId,
		grbv.batch_id AS BatchId,
		v.id AS ProductVariantId,
		v.[name] AS ProductVariantName,
		v.cost_price AS CostPrice,
		@TotalItems AS TotalItems

	FROM GOODS_RECEIPT_BATCH_VARIANTS grbv
	INNER JOIN VARIANTS v
		ON v.id = grbv.variant_id 
	INNER JOIN GOODS_RECEIPT_BATCHES grb
		ON grbv.batch_id = grb.id

	WHERE grbv.batch_id = @BatchId
		AND grb.goods_receipt_id = @ReceiptId

	ORDER BY v.[name] ASC 
	OFFSET (@PageNumber - 1) * @PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY;
END