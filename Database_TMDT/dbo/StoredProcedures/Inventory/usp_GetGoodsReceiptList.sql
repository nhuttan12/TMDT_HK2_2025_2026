CREATE PROCEDURE [dbo].[usp_GetGoodsReceiptList]
	@param1 int = 0,
	@param2 int
AS
BEGIN 
	

	SELECT 
		gr.id AS Id,
		gr.code AS Code,
		s.[name] AS SupplierName,
		(SELECT COUNT(grb.id) FROM GOODS_RECEIPT_BATCHES grb WHERE grb.goods_receipt_id = ) AS TotalBatches
	FROM GOODS_RECEIPTS gr
	INNER JOIN SUPPLIERS s
		ON gr.supplier_id = s.id
END
