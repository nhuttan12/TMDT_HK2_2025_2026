CREATE PROCEDURE [dbo].[usp_GetBannersPaging]
	@ShopId UNIQUEIDENTIFIER
AS
BEGIN
	SELECT b.Id, b.[image_url], b.[order], b.[is_primary] 
    FROM [dbo].[BANNERS] b 
    WHERE @ShopId = b.[user_id]
    AND b.[status] = 1
END