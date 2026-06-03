CREATE PROCEDURE [dbo].[usp_GetShopApprovals]
    @PageNumber INT = 1,
    @PageSize INT = 10
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @TotalItems INT;

	SELECT @TotalItems = COUNT(1) 
	FROM SHOPS s 
	WHERE s.status = 'closed'
		AND s.system_status = 'pending-approval';

	SELECT 
		s.Id, 
		s.name AS Name, 
		u.Email AS Email, 
		u.Phone AS Phone, 
		s.rating AS Rating, 
		s.created_at AS CreatedAt,
		s.system_status AS [Status],
		@TotalItems AS TotalItems
	FROM SHOPS s
	INNER JOIN Users u 
		ON s.Id = u.Id
	WHERE s.status = 'closed'
		AND s.system_status = 'pending-approval'
	ORDER BY s.created_at DESC
	OFFSET (@PageNumber - 1) * @PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY;
END
