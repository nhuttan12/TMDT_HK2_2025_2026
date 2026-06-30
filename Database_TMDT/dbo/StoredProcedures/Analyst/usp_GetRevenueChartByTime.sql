CREATE PROCEDURE [dbo].[usp_GetRevenueChartByTime]
	@ShopId UNIQUEIDENTIFIER,
    @StartDate DATE,
    @EndDate DATE
AS
BEGIN
    SET NOCOUNT ON;

    -- Tính số ngày chênh lệch
    DECLARE @DiffDays INT = DATEDIFF(DAY, @StartDate, @EndDate);

    -- Kịch bản 1: Dưới 31 ngày (Gom nhóm theo ngày)
    IF @DiffDays <= 31
    BEGIN
        SELECT 
            FORMAT(created_at, 'dd/MM') AS Label,
            SUM(FinalAmount) AS Revenue
        FROM dbo.INVOICES
        WHERE shop_id = @ShopId 
          AND created_at >= @StartDate 
          AND created_at < DATEADD(DAY, 1, @EndDate) 
          AND status = 6 -- Completed
        GROUP BY 
            FORMAT(created_at, 'dd/MM'),
            CAST(created_at AS DATE) 
        ORDER BY 
            CAST(created_at AS DATE) ASC;
    END

    -- Kịch bản 2: Từ 32 đến 90 ngày (Gom nhóm theo tuần của tháng)
    ELSE IF @DiffDays <= 90
    BEGIN
        SELECT 
            CONCAT(N'Tuần ', (DATEPART(DAY, created_at) - 1) / 7 + 1, ' T', DATEPART(MONTH, created_at)) AS Label,
            SUM(FinalAmount) AS Revenue
        FROM dbo.INVOICES
        WHERE shop_id = @ShopId 
          AND created_at >= @StartDate 
          AND created_at < DATEADD(DAY, 1, @EndDate)
          AND status = 6 -- Completed
        GROUP BY 
            CONCAT(N'Tuần ', (DATEPART(DAY, created_at) - 1) / 7 + 1, ' T', DATEPART(MONTH, created_at)),
            DATEPART(YEAR, created_at), 
            DATEPART(MONTH, created_at),
            (DATEPART(DAY, created_at) - 1) / 7 + 1
        ORDER BY 
            DATEPART(YEAR, created_at) ASC, 
            DATEPART(MONTH, created_at) ASC,
            (DATEPART(DAY, created_at) - 1) / 7 + 1 ASC;
    END

    -- Kịch bản 3: Trên 90 ngày (Gom nhóm theo tháng)
    ELSE
    BEGIN
        SELECT 
            CONCAT(N'Tháng ', DATEPART(MONTH, created_at)) AS Label,
            SUM(FinalAmount) AS Revenue
        FROM dbo.INVOICES
        WHERE shop_id = @ShopId 
          AND created_at >= @StartDate 
          AND created_at < DATEADD(DAY, 1, @EndDate)
          AND status = 6 -- Completed
        GROUP BY 
            CONCAT(N'Tháng ', DATEPART(MONTH, created_at)),
            DATEPART(YEAR, created_at),
            DATEPART(MONTH, created_at)
        ORDER BY 
            DATEPART(YEAR, created_at) ASC, 
            DATEPART(MONTH, created_at) ASC;
    END
END
