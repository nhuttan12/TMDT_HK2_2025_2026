using api.Dtos.Common;
using api.Dtos.Promotiions.Request;
using api.Dtos.Promotiions.Response;
using api.Utilities;

namespace api.Services.Promotions
{
    public interface IAdminPromotionService
    {
        Task<Result<Guid>> CreatePromotion(UpdatePromotion request, CancellationToken cancellationToken);
        Task<Result<PromotionDetail>> GetPromotionDetail(Guid promotionId, CancellationToken cancellationToken);
        Task<Result<PagedResult<ShopPromotion>>> GetPromotionPaging(Guid userId, PaginationRequestDto pagination, CancellationToken cancellationToken);
        Task<Result<bool>> UpdatePromotionAsync(UpdatePromotion request, CancellationToken cancellationToken);
    }
}
