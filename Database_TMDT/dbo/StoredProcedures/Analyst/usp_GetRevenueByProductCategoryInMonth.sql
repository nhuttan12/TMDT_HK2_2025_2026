CREATE PROCEDURE [dbo].[usp_GetRevenueByProductCategoryInMonth]
	@ShopId UNIQUEIDENTIFIER,
    @TargetMonth INT
AS
BEGIN
    SET NOCOUNT ON;

    IF @TargetMonth < 1 OR @TargetMonth > 12
    BEGIN
        SET @TargetMonth = MONTH(SYSDATETIMEOFFSET());
    END

    -- 1. Tự động lấy năm hiện tại từ thời gian hệ thống
    DECLARE @CurrentYear INT = YEAR(SYSDATETIMEOFFSET());

    -- 2. Tính toán khoảng thời gian an toàn cho Index (SARGable)
    DECLARE @StartDate DATE = DATEFROMPARTS(@CurrentYear, @TargetMonth, 1);
    DECLARE @EndDate DATE = DATEADD(DAY, 1, EOMONTH(@StartDate));

    -- 3. Gom nhóm dữ liệu vào một bảng tạm (CTE) để chuẩn bị cho việc tính phần trăm
    WITH CategoryTotals AS (
        SELECT 
            c.[name] AS CategoryName,
            SUM(ii.quantity * ii.price_at_purchase) AS Revenue 
        FROM dbo.INVOICES i
        INNER JOIN dbo.INVOICE_ITEMS ii ON i.id = ii.invoice_id
        INNER JOIN dbo.PRODUCTS p ON ii.product_id = p.id
        INNER JOIN dbo.CATEGORIES c ON p.category_id = c.id
        WHERE 
            i.shop_id = @ShopId 
            AND i.[status] = 3 -- Trạng thái hóa đơn đã hoàn thành (Completed)
            AND i.created_at >= @StartDate
            AND i.created_at < @EndDate
        GROUP BY 
            c.id,
            c.[name]
    )
    -- 4. Tính toán phần trăm và xuất kết quả
    SELECT 
        CategoryName,
        Revenue,
        -- Dùng NULLIF để tránh lỗi chia cho 0 (Divide by zero error) trong trường hợp bảng không có dữ liệu
        -- SUM(Revenue) OVER() sẽ tính tổng toàn bộ cột Revenue của truy vấn này
        CAST((Revenue / NULLIF(SUM(Revenue) OVER(), 0)) * 100 AS FLOAT) AS Percentage
    FROM CategoryTotals
    ORDER BY 
        Revenue DESC; -- Đẩy danh mục có doanh thu cao nhất lên đầu
END