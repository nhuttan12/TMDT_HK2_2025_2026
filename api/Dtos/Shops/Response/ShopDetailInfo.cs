namespace api.Dtos.Shops.Response
{
    public record ShopDetailInfo(
        Guid Id,
        string Name,
        string Email,
        string Phone,
        string Description,
        string Address,
        string Logo,
        string BankName,
        string AccountName,
        string AccountNumber,
        string Status,
        double Rating,
        int TotalProducts,
        int TotalInvoices
    );
}
