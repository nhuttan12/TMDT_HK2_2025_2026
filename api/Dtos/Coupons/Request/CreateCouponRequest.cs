namespace api.Dtos.Coupons.Request
{
    public record CreateCouponRequest(
        string Code,
        string Name,
        string Scope,
        string Category,
        string Type,
        decimal DiscountValue,
        decimal? MaxDiscountAmount,
        decimal? MinInvoiceValue,
        int TotalQuantity,
        DateTimeOffset StartAt,
        DateTimeOffset? EndAt,
        bool Status
    );
}
