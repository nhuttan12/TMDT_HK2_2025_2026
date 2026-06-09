using api.Utilities;

namespace api.Dtos.Products.Request;

public record ProductCreateDto(
    string Name,
    decimal BasePrice,
    string ImageUrl,
    string Summary,
    string DescriptionHTML,
    decimal CostPrice,
    string Sku,
    Guid ShopID,
    Guid CategoryID);