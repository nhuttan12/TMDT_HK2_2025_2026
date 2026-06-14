namespace api.Dtos.Coupons.Response
{
    public record CouponDetailResponse(
        int Id,
        string Code,
        string Name,
        string Scope,
        string Category,
        string Type,
        decimal DiscountValue,
        decimal MaxDiscountAmount,
        decimal MinInvoiceValue,
        int TotalQuantity,
        int UsedQuantity,
        DateTimeOffset StartAt,
        DateTimeOffset EndAt,
        bool Status
    );
}
