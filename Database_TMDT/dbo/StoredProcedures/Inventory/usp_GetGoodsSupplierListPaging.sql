CREATE PROCEDURE [dbo].[usp_GetGoodsSupplierListPaging]
	@UserId UNIQUEIDENTIFIER,
	@PageNumber INT,
	@PageSize INT
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @TotalItems INT;

	SELECT @TotalItems = COUNT(1)
	FROM SUPPLIERS s
	WHERE s.id = @UserId
	ORDER BY s.created_at DESC

	SELECT 
		s.id AS Id,
		s.[name] AS [Name],
		s.contact_name AS ContactName,
		s.phone_number AS PhoneNumber,
		s.email AS Email,
		s.address AS Address,
		s.tax_code AS TaxCode,
		@TotalItems AS TotalItems
	FROM SUPPLIERS s
	WHERE s.id = @UserId
		
	ORDER BY s.created_at DESC

	OFFSET (@PageNumber - 1) * @PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY;
END
