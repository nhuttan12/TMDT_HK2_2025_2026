namespace api.Dtos.Shops.Response
{
    public record ShopAdmin(
        Guid Id,
        string Name,
        string Email,
        string Phone,
        double Rating,
        DateTime CreatedAt,
        string Status
    );
}
