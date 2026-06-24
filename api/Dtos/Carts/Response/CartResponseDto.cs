namespace api.Dtos.Carts.Response
{
    public class CartResponseDto
    {
        public Guid Userid { get; set; }
        public CartItemResponseDto[] CartItems { get; set; } = new CartItemResponseDto[0];
    }
  
}
