namespace api.Dtos.Shops.Response
{
    public record ShopProfile(
        Guid Id,
        string Name,
        string Email,
        string Phone,
        string Description,
        string Address,
        string Logo,
        string BankName,
        string AccountName,
        string AccountNumber
    );
}
