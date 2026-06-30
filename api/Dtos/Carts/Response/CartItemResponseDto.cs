namespace api.Dtos.Carts.Response
{
    public class CartItemResponseDto
    {
        public Guid ProductId { get; init; }
        public Guid VariantId { get; init; }
        public string Sku { get; private set; } = string.Empty;
        public string ProductName { get; init; } = string.Empty;
        public string ImageUrl { get; init; } = string.Empty;
        public decimal UnitPrice { get; init; }
        public int Quantity { get; init; }
    }
}
