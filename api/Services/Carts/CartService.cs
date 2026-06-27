using api.Controllers.Carts;
using api.Dtos.Carts.Request;
using api.Dtos.Carts.Response;
using api.Dtos.Common;
using api.Models.Cards;
using api.Repository;
using api.Repository.CartRepo;
using api.Utilities;
using AutoMapper;

namespace api.Services.Carts
{
    public interface ICartService
    {
        Task<Result<PagedResult<CartResponseDto>>> GetAll(PaginationRequestDto pageRquest, CartParams requets, CancellationToken cancellationToken);
        Task<Result<CartResponseDto>> GetMe(Guid? userId, CancellationToken cancellationToken);
        Task<Result<CartResponseDto>> AddItem(Guid userId, Guid variantId, int quantity, CancellationToken cancellationToken = default);
        Task<Result<CartResponseDto>> RemoveItem(Guid userId, Guid variantId, CancellationToken cancellationToken = default);
        Task<Result<CartResponseDto>> UpdateItem(Guid userId, Guid variantId, UpdateQuantityRequest quantity, CancellationToken cancellationToken = default);
        Task<Result<CartResponseDto>> CleanCart(Guid userId, CancellationToken cancellationToken = default);
        Task<Result<bool>> CheckVariantId(Guid variantId);
    }
    public class CartService(
        IMapper mapper,
        ILogger<CartService> logger,
        IUnitOfWork unitOfWork,
        IIdGenerator idGenerator,
        ICartRepository repo) : ICartService
    {
      
       public async Task<Result<CartResponseDto>> GetMe(Guid? userId, CancellationToken cancellationToken = default)
        {
            Cart? cart = await repo.GetMyCart(userId, cancellationToken: cancellationToken);
            if (cart is null)
            {
                cart = Cart.Create(idGenerator.NewId(), userId!.Value);
                await repo.CreateCart(cart);
                await unitOfWork.CommitAsync();
            }

            var res = mapper.Map<CartResponseDto>(cart);
            return res is null ? Result<CartResponseDto>.Failure(Error.MapperError()) : res;
        }

        public async Task<Result<CartResponseDto>> AddItem(Guid userId, Guid variantId, int quantity, CancellationToken cancellationToken = default)
        {
            // 1. Luôn lấy dữ liệu KHÔNG TRACKING để đọc cực nhanh
            var cart = await repo.GetMyCart(userId, tracking: false, cancellationToken: cancellationToken);

            // Nếu chưa có giỏ hàng, tạo mới toàn bộ
            if (cart is null)
            {
                Guid cartId = idGenerator.NewId();
                cart = Cart.Create(cartId, userId);
                CartItem ci = CartItem.Create(idGenerator.NewId(), cartId, variantId, quantity);
                cart.AddItem(ci);

                await repo.CreateCart(cart); 
                await unitOfWork.CommitAsync();

                var res1 = mapper.Map<CartResponseDto>(cart);
                return res1 is null ? Result<CartResponseDto>.Failure(Error.MapperError()) : res1;
            }



            // 4. Lấy đúng phần tử vừa được can thiệp ra
            var targetItem = cart.Items.FirstOrDefault(i => i.VariantId == variantId);

            // 5. Cầm tay chỉ việc cho EF Core
            if (targetItem is not null)
            {
                cart.UpdateItem(variantId, quantity);
                repo.UpdateCartItem(targetItem);
            }
            else
            {
                CartItem ci = CartItem.Create(idGenerator.NewId(), cart.Id, variantId, quantity);
                cart.AddItem(ci);
                repo.InsertCartItem(ci);
            }

            // 6. Lưu xuống DB
            await unitOfWork.CommitAsync();

            var res = mapper.Map<CartResponseDto>(cart);
            return res is null ? Result<CartResponseDto>.Failure(Error.MapperError()) : res;
        }

        public async Task<Result<CartResponseDto>> UpdateItem(Guid userId, Guid variantId, UpdateQuantityRequest quantity, CancellationToken cancellationToken = default)
        {
            var cart = await repo.GetMyCart(userId, tracking:  true, cancellationToken: cancellationToken);
            if (cart is null)
                return Result<CartResponseDto>.Failure(Error.Create("Cart.NotFound", "Không tìm thấy giỏ hàng của người dùng.", ErrorType.NotFound));

            var c=  cart.UpdateItem(variantId, quantity.Quantity);
            if(!c.IsSuccess)
            {
                return Result<CartResponseDto>.Failure(c.Error);
            }

            await unitOfWork.CommitAsync();

            var res = mapper.Map<CartResponseDto>(cart);
            return res is null ? Result<CartResponseDto>.Failure(Error.MapperError()) : res;
        }

        public async Task<Result<CartResponseDto>> RemoveItem(Guid userId, Guid variantId, CancellationToken cancellationToken = default)
        {
            var cart = await repo.GetMyCart(userId,tracking: true, cancellationToken: cancellationToken);
            if (cart is null)
                return Result<CartResponseDto>.Failure(Error.Create("Cart.NotFound", "Không tìm thấy giỏ hàng của người dùng.", ErrorType.NotFound));

            cart.RemoveItem(variantId);

            await unitOfWork.CommitAsync();

            var res = mapper.Map<CartResponseDto>(cart);
            return res is null ? Result<CartResponseDto>.Failure(Error.MapperError()) : res;
        }

        public async Task<Result<CartResponseDto>> CleanCart(Guid userId, CancellationToken cancellationToken = default)
        {
            var cart = await repo.GetMyCart(userId,tracking: true, cancellationToken: cancellationToken);
            if (cart is null)
                return Result<CartResponseDto>.Failure(Error.Create("Cart.NotFound", "Không tìm thấy giỏ hàng của người dùng.", ErrorType.NotFound));

            cart.ClearItems();

            await unitOfWork.CommitAsync();

            var res = mapper.Map<CartResponseDto>(cart);
            return res is null ? Result<CartResponseDto>.Failure(Error.MapperError()) : res;
        }

        public async Task<Result<PagedResult<CartResponseDto>>> GetAll(PaginationRequestDto pageRequest, CartParams param, CancellationToken cancellationToken = default)
        {
            // Hàm này thường dành cho Admin quản lý tất cả giỏ hàng
            // Giả định Repo của bạn có hàm GetAllPaging
            var pagedCarts = await repo.GetAllPaging(pageRequest.PageNumber, pageRequest.PageSize, param, cancellationToken);

            var res = mapper.Map<PagedResult<CartResponseDto>>(pagedCarts);
            if (res is null)
            {
                return Result<PagedResult<CartResponseDto>>.Failure(Error.MapperError());
            }

            return res;
        }
        public async Task<Result<bool>> CheckVariantId(Guid variantId)
        {
            var res = await repo.IsContentVariantId(variantId);
            if (res)
            {
                return Result<bool>.Success(true);
            }
            return Result<bool>.Failure(Error.Create("Cart.VariantId.NotFound","variant id not found", ErrorType.BadRequest));
        } 
    }

}
