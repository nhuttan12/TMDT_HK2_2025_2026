CREATE PROCEDURE [dbo].[usp_GetRevenueChartByTime]
	@ShopId UNIQUEIDENTIFIER,
    @StartDate DATE,
    @EndDate DATE
AS
BEGIN
    -- Sử dụng TODATETIMEOFFSET để tạo mốc thời gian an toàn cho SSDT (múi giờ +07:00)
    DECLARE @StartOffset DATETIMEOFFSET = TODATETIMEOFFSET(CAST(@StartDate AS DATETIME), '+07:00');
    DECLARE @EndOffset DATETIMEOFFSET = TODATETIMEOFFSET(DATEADD(DAY, 1, CAST(@EndDate AS DATETIME)), '+07:00');

    -- Tính số ngày chênh lệch
    DECLARE @DiffDays INT = DATEDIFF(DAY, @StartDate, @EndDate);

    -- Kịch bản 1: Dưới 31 ngày (Gom nhóm theo ngày)
    IF @DiffDays <= 31
    BEGIN
        SELECT 
            -- Dùng SWITCHOFFSET để đổi giờ về +07:00, SSDT parser sẽ đọc cực kỳ mượt
            FORMAT(SWITCHOFFSET(created_at, '+07:00'), 'dd/MM') AS Label,
            SUM(FinalAmount) AS Revenue
        FROM dbo.INVOICES
        WHERE shop_id = @ShopId 
          AND created_at >= @StartOffset 
          AND created_at < @EndOffset 
          AND [status] = 3 -- Completed
        GROUP BY 
            FORMAT(SWITCHOFFSET(created_at, '+07:00'), 'dd/MM'),
            CAST(SWITCHOFFSET(created_at, '+07:00') AS DATE) 
        ORDER BY 
            CAST(SWITCHOFFSET(created_at, '+07:00') AS DATE) ASC;
    END

    -- Kịch bản 2: Từ 32 đến 90 ngày (Gom nhóm theo tuần của tháng)
    ELSE IF @DiffDays <= 90
    BEGIN
        SELECT 
            CONCAT(N'Tuần ', (DATEPART(DAY, SWITCHOFFSET(created_at, '+07:00')) - 1) / 7 + 1, ' T', DATEPART(MONTH, SWITCHOFFSET(created_at, '+07:00'))) AS Label,
            SUM(FinalAmount) AS Revenue
        FROM dbo.INVOICES
        WHERE shop_id = @ShopId 
          AND created_at >= @StartOffset 
          AND created_at < @EndOffset
          AND [status] = 3 -- Completed
        GROUP BY 
            CONCAT(N'Tuần ', (DATEPART(DAY, SWITCHOFFSET(created_at, '+07:00')) - 1) / 7 + 1, ' T', DATEPART(MONTH, SWITCHOFFSET(created_at, '+07:00'))),
            DATEPART(YEAR, SWITCHOFFSET(created_at, '+07:00')), 
            DATEPART(MONTH, SWITCHOFFSET(created_at, '+07:00')),
            (DATEPART(DAY, SWITCHOFFSET(created_at, '+07:00')) - 1) / 7 + 1
        ORDER BY 
            DATEPART(YEAR, SWITCHOFFSET(created_at, '+07:00')) ASC, 
            DATEPART(MONTH, SWITCHOFFSET(created_at, '+07:00')) ASC,
            (DATEPART(DAY, SWITCHOFFSET(created_at, '+07:00')) - 1) / 7 + 1 ASC;
    END

    -- Kịch bản 3: Trên 90 ngày (Gom nhóm theo tháng)
    ELSE
    BEGIN
        SELECT 
            CONCAT(N'Tháng ', DATEPART(MONTH, SWITCHOFFSET(created_at, '+07:00'))) AS Label,
            SUM(FinalAmount) AS Revenue
        FROM dbo.INVOICES
        WHERE shop_id = @ShopId 
          AND created_at >= @StartOffset 
          AND created_at < @EndOffset
          AND [status] = 3 -- Completed
        GROUP BY 
            CONCAT(N'Tháng ', DATEPART(MONTH, SWITCHOFFSET(created_at, '+07:00'))),
            DATEPART(YEAR, SWITCHOFFSET(created_at, '+07:00')),
            DATEPART(MONTH, SWITCHOFFSET(created_at, '+07:00'))
        ORDER BY 
            DATEPART(YEAR, SWITCHOFFSET(created_at, '+07:00')) ASC, 
            DATEPART(MONTH, SWITCHOFFSET(created_at, '+07:00')) ASC;
    END
END
