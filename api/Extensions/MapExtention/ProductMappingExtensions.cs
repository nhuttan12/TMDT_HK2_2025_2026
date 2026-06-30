using api.Dtos.Products.Respones;
using api.model.Products;


namespace api.Extensions.EmailExtensions
{
    public static class ProductMappingExtensions
    {
        public static ProductResponseDto ToResponseDto(this Product product)
        {
            return new ProductResponseDto
            {
                Id = product.Id,
                Name = product.Name,
                Rating = product.Rating,
                BasePrice = product.BasePrice,
                ImageUrls = product.ImageUrls,
                Status = product.Status.ToString(),
                Variants = product.Variants.Select(v => new VariantResponseDto
                (
                    Id: v.Id,
                    Sku: v.Sku,
                    Name: v.Name,
                    CostPrice: v.CostPrice,
                    SellPrice: v.SellPrice,
                    ImageUrl: v.ImageUrl,
                    Status: v.Status.ToString(),
                    QuantityInStock: 100 
                )).ToArray()
            };
        }
    }
}
