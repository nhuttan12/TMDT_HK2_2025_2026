CREATE PROCEDURE [dbo].[usp_GetUserSavedCouponListPaging]
	@UserId UNIQUEIDENTIFIER,
	@PageNumber INT,
	@PageSize INT
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @TotalItems INT;
	SELECT @TotalItems = COUNT(1)
	FROM USER_SAVED_COUPONS usc
	INNER JOIN COUPONS c 
		ON usc.coupon_id = c.id
	WHERE usc.user_id = @UserId 
		AND usc.is_used = 0 
		AND c.[status] = 1;

	SELECT 
		c.id AS Id,
		c.code AS Code,
		c.[name] AS [Name],
		c.scope AS Scope,
		c.category AS Category,
		c.[status] AS [Status],
		s.id AS ShopId,
		c.[type] AS [Type],
		c.discount_value AS DiscountValue,
		c.max_discount_amount AS MaxDiscountAmount,
		c.min_invoice_value AS MinInvoiceValue,
		c.start_at AS StartAt, 
		c.end_at AS EndAt,
		CAST(1 AS BIT) AS IsSaved,
		@TotalItems AS TotalItems
	FROM USER_SAVED_COUPONS usc

	INNER JOIN COUPONS c
		ON usc.coupon_id = c.id

	-- JOIN với bảng SHOPS để xác thực. 
	-- Điều kiện scope = 'shop' giúp tăng tốc query (bỏ qua mã platform)
	LEFT JOIN SHOPS s
		ON c.user_id = s.id
			AND c.scope = 'shop'

	WHERE usc.user_id = @UserId
		AND usc.is_used = 0
		AND c.[status] = 1

	ORDER BY usc.saved_at DESC 
	OFFSET (@PageNumber - 1) * @PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY;
END
