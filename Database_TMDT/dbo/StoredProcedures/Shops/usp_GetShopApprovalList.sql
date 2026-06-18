CREATE PROCEDURE [dbo].[usp_GetShopApprovalList]
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
		s.id, 
		s.[name] AS [Name], 
		u.email AS Email, 
		u.phone AS Phone, 
		s.rating AS Rating, 
		s.created_at AS CreatedAt,
		s.system_status AS [Status],
		@TotalItems AS TotalItems
	FROM SHOPS s

	INNER JOIN USERS u 
		ON s.id = u.id

	WHERE s.status = 'closed'
		AND s.system_status = 'pending-approval'

	ORDER BY s.created_at DESC

	OFFSET (@PageNumber - 1) * @PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY;
END
