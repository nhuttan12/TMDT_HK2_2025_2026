namespace api.Dtos.Inventory.Response
{
    public record CreateSupplierRequestDto(
        string SupplierName,
        string ContactName,
        string PhoneNumber,
        string? Email,
        string? Address,
        string? TaxCode
    );
}
