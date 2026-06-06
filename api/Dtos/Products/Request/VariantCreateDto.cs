namespace api.Dtos.Products.Request
{
    public record VariantCreateDto(
         string Sku,
         string Name,
         decimal CostPrice,
         decimal SellPrice,
         string ImageUrl
     );
}
