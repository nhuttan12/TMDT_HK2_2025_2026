namespace api.Dtos.Inventory.Response
{
    public record GoodsSupplierDetailResponseDto(
        Guid Id,
        string Name,
        string? ContactName,
        string? PhoneNumber,
        string? Email,
        string? Address,
        string? TaxCode
    );
}
