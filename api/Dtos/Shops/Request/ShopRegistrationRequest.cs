namespace api.Dtos.Shops.Request
{
    public record ShopRegistrationRequest(
        string Email,
        string Phone,
        string PasswordHash,
        string ShopName,
        string Description,
        string AddressUrl,
        string BankName,
        string AccountName,
        string AccountNumber);
}
