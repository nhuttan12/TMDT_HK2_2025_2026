CREATE PROCEDURE [dbo].[usp_GetShopList]
    @PageNumber INT = 1,
    @PageSize INT = 10
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @TotalItems INT;

	SELECT @TotalItems = COUNT(1) 
	FROM SHOPS s 
	WHERE s.system_status = 'approved';

	SELECT 
		s.Id, 
		s.name AS Name, 
		u.Email AS Email, 
		u.Phone AS Phone, 
		s.rating AS Rating, 
		s.created_at AS CreatedAt,
		s.status AS [Status],
		@TotalItems AS TotalItems
	FROM SHOPS s
	INNER JOIN Users u 
		ON s.Id = u.Id
	WHERE s.system_status = 'approved'
	ORDER BY s.created_at DESC
	OFFSET (@PageNumber - 1) * @PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY;
END