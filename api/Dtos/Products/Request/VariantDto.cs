namespace api.Dtos.Products.Request
{
    public record VariantDto(
         string SKU,
         string Name,
         decimal CostPrice,
         decimal SellPrice,
         string ImageUrl
     );
}
