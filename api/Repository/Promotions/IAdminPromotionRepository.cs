using api.Dtos.Common;
using api.Dtos.Promotiions.Request;
using api.Dtos.Promotiions.Response;
using api.Utilities;

namespace api.Repository.Promotions
{
    public interface IAdminPromotionRepository
    {
        Task<Guid> CreatePromotion(UpdatePromotion request, CancellationToken cancellationToken);
        Task<PromotionDetail?> GetPromotionDetail(Guid promotionId, CancellationToken cancellationToken);
        Task<PagedResult<ShopPromotion>> GetPromotionPaging(Guid userId, PaginationRequestDto pagination, CancellationToken cancellationToken);
        Task<bool> UpdatePromotionAsync(UpdatePromotion request, CancellationToken cancellationToken);
    }
}
