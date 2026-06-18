CREATE PROCEDURE [dbo].[usp_GetAdminBannersPaging]
	@UserId UNIQUEIDENTIFIER,
    @PageNumber INT = 1,
    @PageSize INT = 10
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @TotalItems INT;

    SELECT @TotalItems = COUNT(1)
    FROM BANNERS b
    WHERE b.user_id = @UserId
        AND b.status = 1

	SELECT 
        b.id AS Id, 
        b.image_url AS ImageUrl, 
        b.[order] AS [Order], 
        b.is_primary AS IsPrimary, 
        b.created_at AS CreatedAt,
        b.updated_at AS UpdatedAt,
        @TotalItems AS [TotalItems]
    FROM BANNERS b 
    WHERE b.user_id = @UserId
        AND b.[status] = 1

    ORDER BY b.[order] ASC, 
            b.created_at DESC

    OFFSET (@PageNumber - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY;
END