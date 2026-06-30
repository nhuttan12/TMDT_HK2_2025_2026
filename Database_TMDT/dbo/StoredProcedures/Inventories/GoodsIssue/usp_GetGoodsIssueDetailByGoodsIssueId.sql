CREATE PROCEDURE [dbo].[usp_GetGoodsIssueDetailByGoodsIssueId]
	@ShopId UNIQUEIDENTIFIER,
	@GoodsIssueId UNIQUEIDENTIFIER
AS
BEGIN
	SELECT
		gi.id AS Id,
		gi.code AS Code,
		gi.[type] AS [Type],
		gi.note AS Note,
		ISNULL(GoodsIssueStats.TotalQuantity, 0) AS TotalQuantity,
		ISNULL(GoodsIssueStats.TotalAmount, 0) AS TotalAmount,
		gi.created_at AS CreatedAt
	FROM GOODS_ISSUES gi

	OUTER APPLY (
		SELECT 
			SUM(gid.quantity) AS TotalQuantity,
			SUM(gid.selling_price) AS TotalAmount
		FROM GOODS_ISSUE_DETAILS gid 
		WHERE gid.issue_id = gi.id
	) AS GoodsIssueStats

	WHERE gi.shop_id = @ShopId
		AND gi.id = @GoodsIssueId;

	SELECT
		gid.id AS Id,
		v.product_id AS ProductId,
		v.[name] AS ProductName,
		v.sku AS Sku, 
		gid.quantity AS Quantity,
		gid.selling_price AS UnitPrice,
		(gid.quantity * gid.selling_price) AS TotalPrice
	FROM GOODS_ISSUE_DETAILS gid
	LEFT JOIN VARIANTS v ON v.id = gid.variant_id
	WHERE gid.issue_id = @GoodsIssueId;
END
