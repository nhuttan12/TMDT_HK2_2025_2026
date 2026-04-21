namespace api.Models.Products
{
    public class Product
    {
        public Guid Id { get; set; } // Postgres sẽ tự hiểu là UUID
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
