CREATE PROCEDURE [dbo].[usp_GetRevenueChartByTime]
	@ShopId UNIQUEIDENTIFIER,
    @StartDate DATE,
    @EndDate DATE
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @DiffDays INT = DATEDIFF(DAY, @StartDate, @EndDate);

END
