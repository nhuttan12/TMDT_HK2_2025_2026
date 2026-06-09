namespace api.Dtos.Shops
{
    public class RegisterShopDto
    {
        public string Email { get; set; } = null!;
        public string? Phone { get; set; }
        public string Password { get; set; } = null!;
        public string ShopName { get; set; } = null!;
        public string? Description { get; set; }
        public string AddressUrl { get; set; } = null!;
        public string BankName { get; set; } = null!;
        public string AccountName { get; set; } = null!;
        public string AccountNumber { get; set; } = null!;
    }
}