using api.Database;
using api.Dtos.Carts.Request;
using api.Models.Cards;
using api.Utilities;
using Microsoft.EntityFrameworkCore;

namespace api.Repository.CartRepo
{
    public interface ICartRepository
    {
        Task CreateCart(Cart userId);
        Task<PagedResult<Cart>> GetAllPaging(int pageNumber,int pageSize, CartParams requests, CancellationToken cancellationToken);
        Task<Cart?> GetMyCart(Guid? userId,bool tracking = false, CancellationToken cancellationToken = default);
        void InsertCartItem(CartItem targetItem);
        Task<bool> IsContentVariantId(Guid variantId);
        void UpdateCartItem(CartItem targetItem);
    }
    public class CartRepository(MyAppDbContext context) : ICartRepository
    {
        public async Task CreateCart(Cart cart)
        {
            await context.Carts.AddAsync(cart);
        }

        public async Task<PagedResult<Cart>> GetAllPaging(int pageNumber, int pageSize, CartParams param, CancellationToken cancellationToken)
        {
            var list =  await context.Carts
                .Include(x => x.Items)
                .ToListAsync(cancellationToken);
            var total = list.Count;
            return new PagedResult<Cart>
                (list,pageNumber,pageSize,total);
        }

        public async Task<Cart?> GetMyCart(Guid? userId, bool tracking = false, CancellationToken cancellationToken = default)
        {
            var query = context.Carts
            .Include(c => c.Items)
                .ThenInclude(item => item.Variant)
                    .ThenInclude(Variant => Variant.Product)
            .AsQueryable();

            if (tracking)
            {
                query = query.AsTracking();
            }
            else
            {
                query = query.AsNoTracking();
            }
            return await query.FirstOrDefaultAsync(c => c.UserId == userId, cancellationToken);
        }

        public void InsertCartItem(CartItem item)
        {
            context.CartItems.Add(item);
        }

        public void UpdateCartItem(CartItem item)
        {
            context.CartItems.Update(item);
        }
        public async Task<bool> IsContentVariantId(Guid variantId)
        {
            return await context.Variants.AnyAsync(v => v.Id == variantId);
        }
    }
}
