namespace api.Dtos.Products.Respones
{
    public record CategoryResponseDto(
        Guid Id,
        string Name,
        string Sku,
        string ImageUrl
    );

}
