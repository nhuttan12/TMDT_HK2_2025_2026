CREATE PROCEDURE [dbo].[usp_GetBannersPaging]
	@ShopId UNIQUEIDENTIFIER,
    @PageNumber INT = 1,
    @PageSize INT = 10
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @TotalItems INT;

    SELECT @TotalItems = COUNT(1)
    FROM BANNERS b
    WHERE b.user_id = @ShopId
    AND b.status = 1

	SELECT 
        b.id, 
        b.[image_url], 
        b.[order], 
        b.[is_primary], 
        @TotalItems AS [TotalItems]
    FROM [BANNERS] b 
    WHERE b.[user_id] = @ShopId
    AND b.[status] = 1
    ORDER BY b.[order] ASC, b.created_at DESC
    OFFSET (@PageNumber - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY;
END