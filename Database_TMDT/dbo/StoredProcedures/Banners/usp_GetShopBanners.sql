CREATE PROCEDURE [dbo].[usp_GetShopBanners]
	@ShopId UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	SELECT 
        b.id AS Id, 
        b.image_url AS ImageUrl, 
        b.[order] AS [Order], 
        b.is_primary AS IsPrimary
    FROM BANNERS b 
    INNER JOIN SHOPS s
        ON s.id = b.user_id
    WHERE s.id = @ShopId
        AND b.[status] = 1
END
