using api.Dtos.Carts.Response;
using api.Models.Products;
using api.Utilities;

namespace api.Models.Cards
{
    public class Cart
    {
        public Guid Id { get; private set; }
        public Guid UserId { get; private set; }
        public User User { get; private set; } = default!;

        // 1. Tối ưu Đóng gói: Dùng Backing Field cho Collection
        private readonly HashSet<CartItem> _items = new();

        // Chỉ phơi bày IReadOnlyCollection ra ngoài để chống sửa đổi tùy tiện
        public IReadOnlyCollection<CartItem> Items => _items;

        public DateTimeOffset CreatedAt { get; private set; }
        public DateTimeOffset? UpdatedAt { get; private set; }

        // Constructor rỗng bắt buộc cho EF Core (dùng protected để cấm khởi tạo bừa bãi)
        protected Cart() { }

        private Cart(Guid id, Guid userId)
        {
            Id = id;
            UserId = userId;
        }

        public static Cart Create(Guid id, Guid userId)
        {
            return new Cart(id, userId);
        }

        // 2. Logic nghiệp vụ (Behavior) phải nằm trong Entity
        public void AddItem(Guid id, Guid variantId, int quantity)
        {
          
            var existingItem = _items.FirstOrDefault(i => i.VariantId == variantId);
            if (existingItem != null)
            {
                // Nếu đã có trong giỏ, tăng số lượng
                existingItem.UpdateQuantity(quantity);
            }
            else
            {
                // Nếu chưa có, thêm mới (EF Core sẽ tự phát sinh ID cho CartItem)
                _items.Add(new CartItem(id, this.Id, variantId, quantity));
            }

           
        }
        public void AddItem(CartItem item)
        {
            var existingItem = _items.FirstOrDefault(i => i.VariantId == item.VariantId);
            if (existingItem != null)
            {
                existingItem.UpdateQuantity(item.Quantity);
            }
            else
            {
                // Nếu chưa có, thêm mới (EF Core sẽ tự phát sinh ID cho CartItem)
                _items.Add(item);
            }

        }
         public Result<CartResponseDto> ValidData(int quantity)
            {
                if (quantity <= 0)
                {
                    return Result<CartResponseDto>.Failure(Error.Create("Cart.Qanlity.notValid", "", ErrorType.BadRequest));
                }

                return Result<CartResponseDto>.Success(new CartResponseDto());
            }

        internal Result<CartResponseDto> UpdateItem(Guid variantId, int quantity)
        {
            if(quantity <= 0)
            {
                return Result<CartResponseDto>.Failure(Error.Create("Cart.Qanlity.notValid", "", ErrorType.BadRequest));
            }
            if(variantId == Guid.Empty) { 
               return Result<CartResponseDto>.Failure(Error.Create("Cart.VarianId.NotValid","",ErrorType.BadRequest));
            }
            var ci = this._items
                .First(c => c.VariantId == variantId);
            ci.UpdateQuantity(quantity);
            return Result<CartResponseDto>.Success(null);
        }

        internal void RemoveItem(Guid variantId)
        {

            var cartitem = this._items.FirstOrDefault(c => c.VariantId == variantId);
            if(cartitem != null)
                this._items.Remove(cartitem);

        }

        internal void ClearItems()
        {
            this._items.Clear();
        }
    }
}

