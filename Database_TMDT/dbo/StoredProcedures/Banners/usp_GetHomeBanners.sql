CREATE PROCEDURE [dbo].[usp_GetHomeBanners]
AS
BEGIN
    SET NOCOUNT ON;

	SELECT 
        b.id AS Id, 
        b.image_url AS ImageUrl, 
        b.[order] AS [Order], 
        b.is_primary AS IsPrimary
    FROM BANNERS b 
    INNER JOIN USERS u
        ON u.id = b.user_id
    INNER JOIN ROLES r
        ON u.role_id = r.id

    WHERE r.name = 'Admin' 
        AND b.[status] = 1

    ORDER BY b.[order] ASC
END