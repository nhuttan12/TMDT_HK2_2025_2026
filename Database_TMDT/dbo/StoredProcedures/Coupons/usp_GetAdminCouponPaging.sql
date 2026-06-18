CREATE PROCEDURE [dbo].[usp_GetAdminCouponPaging]
	@UserId UNIQUEIDENTIFIER,
	@PageNumber INT,
	@PageSize INT
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @TotalItems INT;
	SELECT @TotalItems = COUNT(1)
	FROM COUPONS c
	WHERE c.user_id = @UserId;

	SELECT 
		c.id AS Id,
		c.code AS Code,
		c.[name] AS [Name],
		c.scope AS Scope,
		c.category AS Category,
		c.[status] AS [Status],
		c.user_id AS ShopId,
		c.[type] AS [Type],
		c.discount_value AS [DiscountValue],
		c.max_discount_amount AS [MaxDiscountAmount],
		c.min_invoice_value AS [MinInvoiceValue],
		c.start_at AS StartAt, 
		c.end_at AS EndAt,
		c.total_quantity AS TotalQuantity,
		c.used_quantity AS UsedQuantity,
		@TotalItems AS TotalItems
	FROM COUPONS c

	WHERE c.user_id = @UserId

	ORDER BY c.created_at DESC 
	OFFSET (@PageNumber - 1) * @PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY;
END
