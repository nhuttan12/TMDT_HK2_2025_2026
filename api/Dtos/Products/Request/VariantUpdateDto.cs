namespace api.Dtos.Products.Request
{
    public record VariantUpdateDto(
         string? Name,
         decimal? CostPrice,
         decimal? SellPrice,
         string? ImageUrl
     );
}
