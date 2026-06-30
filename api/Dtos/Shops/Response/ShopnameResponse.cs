namespace api.Dtos.Shops.Response
{
    public record ShopNameResponse(IEnumerable<ShopNameDto> ListNames);
    public record ShopNameDto(Guid Id,string Name);
}
