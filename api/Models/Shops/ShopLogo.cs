namespace api.Models.Shops
{
    public class ShopLogo
    {
        public Guid Id { get; set; }

        public Guid ShopId { get; set; }
        public Shop Shop { get; set; }

        public string LogoUrl { get; set; }
        public DateTimeOffset CreatedAt { get; private set; }

        public ShopLogo()
        {
        }
    }
}
