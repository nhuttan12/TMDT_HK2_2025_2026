CREATE PROCEDURE [dbo].[usp_GetPlatformCouponForUserSaving]
AS
BEGIN
	SELECT TOP 5 
		c.id AS Id,
		c.code AS Code,
		c.[name] AS [Name],
		c.scope AS Scope,
		c.category AS Category,
		c.[status] AS [Status],
		c.[type] AS [Type],
		c.discount_value AS [DiscountValue],
		c.max_discount_amount AS [MaxDiscountAmount],
		c.min_invoice_value AS [MinInvoiceValue],
		c.start_at AS StartAt, 
		c.end_at AS EndAt
	FROM USER_SAVED_COUPONS usc

	INNER JOIN COUPONS c
		ON usc.coupon_id = c.id

	WHERE usc.is_used = 0
		AND c.[status] = 1
		AND c.scope = 'platform'

	ORDER BY usc.saved_at DESC 
END
