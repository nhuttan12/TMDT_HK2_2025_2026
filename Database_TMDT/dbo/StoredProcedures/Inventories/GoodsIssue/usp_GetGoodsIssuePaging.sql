CREATE PROCEDURE [dbo].[usp_GetGoodsIssuePaging]
	@ShopId UNIQUEIDENTIFIER,
	@PageNumber INT,
	@PageSize INT
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @TotalItems INT;

	SELECT @TotalItems = COUNT(1)
		FROM GOODS_ISSUES gi
		WHERE gi.shop_id = @ShopId;

	SELECT 
		gi.id AS Id,
		gi.code AS Code,
		gi.[type] AS [Type],
		GoodsIssueStats.TotalQuantity AS TotalQuantity,
		GoodsIssueStats.TotalAmount AS TotalAmount,
		gi.created_at AS CreatedAt,
		@TotalItems AS TotalItems
	FROM GOODS_ISSUES gi

	OUTER APPLY (
		SELECT 
			SUM(gid.quantity) AS TotalQuantity,
			SUM(gid.selling_price) AS TotalAmount
		FROM GOODS_ISSUE_DETAILS gid
		WHERE gid.issue_id = gi.id
	) AS GoodsIssueStats

	WHERE gi.shop_id = @ShopId
		
	ORDER BY gi.created_at DESC

	OFFSET (@PageNumber - 1) * @PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY;
END
