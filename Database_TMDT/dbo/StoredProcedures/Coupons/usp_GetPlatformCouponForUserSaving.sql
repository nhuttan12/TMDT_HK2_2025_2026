CREATE PROCEDURE [dbo].[usp_GetPlatformCouponForUserSaving]
	@UserId UNIQUEIDENTIFIER
AS
BEGIN
	SELECT TOP 5 
		c.id AS Id,
		c.code AS Code,
		c.[name] AS [Name],
		c.scope AS Scope,
		c.category AS Category,
		c.[status] AS [Status],
		CAST(NULL AS UNIQUEIDENTIFIER) AS ShopId,
		c.[type] AS [Type],
		c.discount_value AS [DiscountValue],
		c.max_discount_amount AS [MaxDiscountAmount],
		c.min_invoice_value AS [MinInvoiceValue],
		c.start_at AS StartAt, 
		c.end_at AS EndAt,
		CAST(CASE WHEN usc.id IS NOT NULL 
					THEN 1 ELSE 0 
					END AS BIT) AS IsSaved
	FROM COUPONS c

	LEFT JOIN USER_SAVED_COUPONS usc 
		ON usc.coupon_id = c.id
		AND usc.user_id = @UserId 

	WHERE c.[status] = 1
		AND c.scope = 'platform'

	ORDER BY c.start_at DESC 
END
