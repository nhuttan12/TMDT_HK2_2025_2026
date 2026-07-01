CREATE PROCEDURE [dbo].[usp_GetRevenueByProductCategoryInMonth]
	@ShopId UNIQUEIDENTIFIER,
    @TargetMonth INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Dùng trực tiếp chuỗi literal 'SE Asia Standard Time' thay vì biến để SSDT không báo lỗi

    IF @TargetMonth < 1 OR @TargetMonth > 12
    BEGIN
        SET @TargetMonth = MONTH(SYSDATETIMEOFFSET() AT TIME ZONE 'SE Asia Standard Time');
    END

    -- 1. Tự động lấy năm hiện tại từ thời gian hệ thống theo múi giờ địa phương
    DECLARE @CurrentYear INT = YEAR(SYSDATETIMEOFFSET() AT TIME ZONE 'SE Asia Standard Time');

    -- 2. Tính toán ngày bắt đầu và kết thúc của tháng (Kiểu DATE thuần)
    DECLARE @StartMonth DATE = DATEFROMPARTS(@CurrentYear, @TargetMonth, 1);
    DECLARE @EndMonth DATE = DATEADD(DAY, 1, EOMONTH(@StartMonth));

    -- 3. Đóng gói thành DATETIMEOFFSET (Local Time) 
    DECLARE @StartOffset DATETIMEOFFSET = CAST(@StartMonth AS DATETIME) AT TIME ZONE 'SE Asia Standard Time';
    DECLARE @EndOffset DATETIMEOFFSET = CAST(@EndMonth AS DATETIME) AT TIME ZONE 'SE Asia Standard Time';

    -- 4. Gom nhóm dữ liệu vào một bảng tạm (CTE) để chuẩn bị cho việc tính phần trăm
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
            AND i.created_at >= @StartOffset
            AND i.created_at < @EndOffset
        GROUP BY 
            c.id,
            c.[name]
    )
    -- 5. Tính toán phần trăm và xuất kết quả
    SELECT 
        CategoryName,
        Revenue,
        CAST((Revenue / NULLIF(SUM(Revenue) OVER(), 0)) * 100 AS FLOAT) AS Percentage
    FROM 
        CategoryTotals
    ORDER BY 
        Revenue DESC;
END