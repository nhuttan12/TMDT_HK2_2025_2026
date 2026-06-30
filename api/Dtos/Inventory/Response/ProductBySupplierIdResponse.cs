namespace api.Dtos.Inventory.Response
{
    public record ProductBySupplierIdResponse(
        Guid Id,
        string Name,
        string? ImageUrls,
        string Status,
        DateTimeOffset CreatedAt,
        DateTimeOffset UpdatedAt
    );
}
