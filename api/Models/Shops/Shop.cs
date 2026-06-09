using api.Dtos.Shops;
using api.model.Products;
using api.Models.Orders;
using api.Models.Shops.Enums;
using Microsoft.Data.SqlClient;
using System.Data;

namespace api.Models.Shops
{
    public class Shop
    {
        public Guid Id { get; private set; }

        public User User { get; private set; }

        public EShopStatus Status { get; private set; }
        public EShopSystemStatus SystemStatus { get; private set; }

        public int Rating { get; private set; }
        public string Name { get; private set; }
        public string TaxCode { get; private set; }
        public string Description { get; private set; }
        public DateTimeOffset CreatedAt { get; private set; }
        public DateTimeOffset UpdatedAt { get; private set; }

        public ICollection<ShopLogo> ShopLogos { get; private set; } = new HashSet<ShopLogo>();
        public ICollection<Product> Products { get; private set; } = new HashSet<Product>();
        public ICollection<Invoice> Invoices { get; private set; } = new HashSet<Invoice>();

        public Shop()
        {
        }

        
    }
}
