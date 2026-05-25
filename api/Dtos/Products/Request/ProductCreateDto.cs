namespace api.Dtos.Products.Request
{
    public record ProductCreateDto
    (
        string Name,
        decimal BasePrice,
        string ShopID,
        string Summary,
        string DescriptionHTML,
        string CategoryID
    );

}


