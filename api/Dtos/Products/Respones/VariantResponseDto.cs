namespace api.Dtos.Products.Respones
{
    public record VariantResponseDto
    (
        string Sku,
        string Name,
        decimal CostPrice,
        decimal SellPrice,
        string ImageUrl,
        string Status
        //int QuantityInStock
    );
}
