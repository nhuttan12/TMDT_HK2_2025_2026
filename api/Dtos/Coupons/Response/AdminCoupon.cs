namespace api.Dtos.Coupons.Response
{
    public record AdminCoupon(
        Guid Id,
        string Code,
        string Name,
        string Scope,
        string Category,
        int Status,
        Guid ShopId,
        string Type,
        decimal DiscountValue,
        decimal MaxDiscountAmount,
        decimal MinInvoiceValue,
        DateTimeOffset StartAt,
        DateTimeOffset EndAt,
        int TotalQuantity,
        int UsedQuantity);
}
