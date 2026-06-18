using api.Dtos.Common;
using api.Dtos.Coupons.Response;
using api.Dtos.Shops.Response;
using api.Repository.Shops;
using api.Utilities;
using Azure.Core;

namespace api.Services.Shops
{
    public class ShopAdminService(
        IShopAdminRepository shopAdminRepository
        ) : IShopAdminService
    {
        public async Task<Result<bool>> ApproveShop(Guid shopId, CancellationToken cancellationToken)
        {
            var result = await shopAdminRepository.ApproveShop(shopId, cancellationToken);

            return Result<bool>.Success(result);
        }

        public async Task<Result<PagedResult<ShopAdmin>>> GetShopApprovalList(PaginationRequestDto request, CancellationToken cancellationToken)
        {
            var result = await shopAdminRepository.GetShopApprovalList(request, cancellationToken);

            return Result<PagedResult<ShopAdmin>>.Success(result);
        }

        public async Task<Result<ShopDetailInfo>> GetShopDetailInfo(Guid shopId, CancellationToken cancellationToken)
        {
            var result = await shopAdminRepository.GetShopDetailInfo(shopId, cancellationToken);

            if (result == null)
            {
                return Result<ShopDetailInfo>.Failure(Error.Create("NotFound", "Không tìm thấy thông tin hoặc bạn không có quyền truy cập."));
            }

            return Result<ShopDetailInfo>.Success(result);
        }

        public async Task<Result<PagedResult<ShopAdmin>>> GetShopList(PaginationRequestDto request, CancellationToken cancellationToken)
        {
            var result = await shopAdminRepository.GetShopList(request, cancellationToken);

            return Result<PagedResult<ShopAdmin>>.Success(result);
        }

        public async Task<Result<ShopProfile>> GetShopProfile(Guid shopId, CancellationToken cancellationToken)
        {
            var result = await shopAdminRepository.GetShopProfile(shopId, cancellationToken);

            if (result == null)
            {
                return Result<ShopProfile>.Failure(Error.Create("NotFound", "Không tìm thấy thông tin hoặc bạn không có quyền truy cập."));
            }

            return Result<ShopProfile>.Success(result);
        }
    }
}
