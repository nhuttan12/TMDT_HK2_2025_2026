CREATE PROCEDURE [dbo].[usp_GetCouponDetail]
	@UserId UNIQUEIDENTIFIER,
	@CouponId UNIQUEIDENTIFIER
AS
BEGIN
	SELECT 
		c.id AS Id,
		c.code AS Code,
		c.[name] AS [Name],
		c.scope AS Scope,
		c.category AS Category,
		c.[type] AS [Type],
		c.discount_value AS [DiscountValue],
		c.max_discount_amount AS [MaxDiscountAmount],
		c.min_invoice_value AS [MinInvoiceValue],
		c.total_quantity AS [TotalQuantity],
		c.used_quantity AS [UsedQuantity],
		c.start_at AS [StartAt],
		c.end_at AS [EndAt],
		c.[status] AS [Status]
	FROM COUPONS c
	WHERE c.id = @CouponId
		AND c.user_id = @UserId
END
