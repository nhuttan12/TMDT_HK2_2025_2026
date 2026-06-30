CREATE PROCEDURE [dbo].[usp_GetGoodsStockSummary]
	@ShopId UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;
	
	DECLARE @AvailableProductQuantity INT = 0;
	DECLARE @HiddenOrBlockedProductQuantity INT = 0;
	DECLARE @OutOfStockProductQuantity INT = 0;
	DECLARE @LowStockProductQuantity INT = 0;
	DECLARE @OrderedVariant INT = 0;

	-- 1. Sử dụng CTE để gom nhóm và tính tổng tồn kho cho TỪNG PHIÊN BẢN (Variant)
	;WITH VariantStockSummary AS (
		SELECT 
			v.id AS VariantId,
			p.[status] AS ProductStatus,
			ISNULL(SUM(ibs.remaining_quantity), 0) AS TotalStock
		FROM PRODUCTS p
		INNER JOIN VARIANTS v 
			ON p.id = v.product_id
		-- Dùng LEFT JOIN để lấy cả những Variant mới tạo, chưa có lô hàng nào (Stock = 0)
		LEFT JOIN INVENTORY_BATCH_STOCKS ibs 
			ON v.id = ibs.variant_id 
		WHERE p.shop_id = @ShopId
		GROUP BY 
			v.id, 
			p.[status]
	)
	-- 2. Đếm các chỉ số dựa trên bảng tổng hợp ở trên
	SELECT  
		-- Có hàng: Tồn kho > 0 và trạng thái sản phẩm đang hiển thị, được duyệt
		@AvailableProductQuantity = ISNULL(SUM(
			CASE WHEN TotalStock > 0 
				AND ProductStatus = 'Approved'
				THEN 1 ELSE 0 END), 0),
		
		-- Bị ẩn/Khóa: Do shop tự ẩn hoặc do hệ thống khóa
		@HiddenOrBlockedProductQuantity = ISNULL(SUM(
			CASE WHEN ProductStatus = 'Banned'
				THEN 1 ELSE 0 END), 0),
		
		-- Hết hàng: Tổng tồn kho <= 0
		@OutOfStockProductQuantity = ISNULL(SUM(
			CASE WHEN TotalStock <= 0 
			THEN 1 ELSE 0 END), 0),
		
		-- Sắp hết hàng: Tồn kho > 0 nhưng dưới mức quy định (Ví dụ: < 10)
		@LowStockProductQuantity = ISNULL(SUM(
			CASE WHEN TotalStock > 0 
				AND TotalStock < 10 
				THEN 1 ELSE 0 END), 0)
	FROM VariantStockSummary;

	-- 3. Số lượng phiên bản đang có đơn hàng chờ xử lý (Tính sau khi có bảng Đơn hàng)
	SET @OrderedVariant = 0;

	-- 4. Trả về kết quả (để C# / EF Core có thể đọc được bằng DTO)
	SELECT 
		@AvailableProductQuantity AS AvailableProductQuantity,
		@HiddenOrBlockedProductQuantity AS HiddenOrBlockedProductQuantity,
		@OutOfStockProductQuantity AS OutOfStockProductQuantity,
		@LowStockProductQuantity AS LowStockProductQuantity,
		@OrderedVariant AS OrderedVariant;
END
