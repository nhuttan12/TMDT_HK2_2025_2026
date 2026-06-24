CREATE PROCEDURE [dbo].[usp_GetGoodsReceiptDetail]
	@ReceiptId UNIQUEIDENTIFIER,
	@ShopId UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	-- THÔNG TIN CHUNG CỦA PHIẾU NHẬP
	SELECT 
		gr.id AS Id,
		gr.code AS Code,
		gr.supplier_id AS SupplierID,
		s.[name] AS SupplierName,
		gr.created_at AS ImportDate,
		gr.[status] AS ImportStatus,
		gr.note AS Note
	FROM GOODS_RECEIPTS gr
	LEFT JOIN SUPPLIERS s ON s.id = gr.supplier_id
	WHERE gr.id = @ReceiptId
		AND gr.shop_id = @ShopId;

	SELECT 
		grb.id AS Id,
		ibs.product_id AS ProductId,
		p.[name] AS ProductName,
		grb.batch_code AS BatchNumber,
		grb.quantity AS Quantity,
		grb.total_cost_price AS TotalPrice
	FROM GOODS_RECEIPT_BATCHES grb

	-- Join để lấy Product Id
	INNER JOIN INVENTORY_BATCH_STOCKS ibs 
		ON ibs.batch_id = grb.id
		
	-- Join để lấy Tên sản phẩm
	INNER JOIN PRODUCTS p 
		ON p.id = ibs.product_id
	INNER JOIN GOODS_RECEIPTS gr
		ON grb.goods_receipt_id = gr.id

	WHERE grb.goods_receipt_id = @ReceiptId
		AND gr.shop_id = @ShopId;

END
