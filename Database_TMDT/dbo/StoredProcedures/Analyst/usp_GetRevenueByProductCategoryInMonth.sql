CREATE PROCEDURE [dbo].[usp_GetRevenueByProductCategoryInMonth]
	@ShopId UNIQUEIDENTIFIER,
    @TargetMonth INT
AS
BEGIN
    SET NOCOUNT ON;

    -- 1. Tự động lấy năm hiện tại từ thời gian hệ thống
    DECLARE @CurrentYear INT = YEAR(SYSDATETIMEOFFSET());

    -- 2. Tính toán khoảng thời gian an toàn cho Index (SARGable)
    -- Dựng ngày đầu tiên của tháng dựa trên năm hiện tại và tháng được truyền vào
    DECLARE @StartDate DATE = DATEFROMPARTS(@CurrentYear, @TargetMonth, 1);
    -- Lấy ngày cuối cùng của tháng và cộng thêm 1 ngày để tối ưu toán tử so sánh <
    DECLARE @EndDate DATE = DATEADD(DAY, 1, EOMONTH(@StartDate));

    -- 3. Truy vấn gom nhóm doanh thu theo danh mục hàng hóa
    SELECT 
        c.[name] AS Label,
        SUM(ii.quantity * ii.price_at_purchase) AS Value 
    FROM dbo.INVOICES i
    INNER JOIN dbo.INVOICE_ITEMS ii ON i.id = ii.invoice_id
    INNER JOIN dbo.PRODUCTS p ON ii.product_id = p.id
    INNER JOIN dbo.CATEGORIES c ON p.category_id = c.id
    WHERE 
        i.shop_id = @ShopId 
        AND i.status = 6 -- Trạng thái hóa đơn đã hoàn thành (Completed)
        AND i.created_at >= @StartDate 
        AND i.created_at < @EndDate
    GROUP BY 
        c.id, 
        c.[name]
    ORDER BY 
        Value DESC; -- Đẩy danh mục có doanh thu cao nhất lên đầu
END