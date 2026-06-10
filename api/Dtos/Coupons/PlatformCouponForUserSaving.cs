namespace api.Dtos.Coupons
{
    public record PlatformCouponForUserSaving(
        int Id,
        string Code,
        string Name,
        string Scope,
        string Category,
        int Status,
        string Type,
        decimal DiscountValue,
        decimal MaxDiscountAmount,
        decimal MinInvoiceValue,
        DateTimeOffset StartAt,
        DateTimeOffset EndAt);
}
