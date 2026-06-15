using api.Dtos.Common;
using api.Dtos.Promotiions.Request;
using api.Dtos.Promotiions.Response;
using api.Models;
using api.Models.Promotions;
using api.Models.Utilities;
using api.Repository.Promotions;
using api.Utilities;
using Azure.Core;

namespace api.Services.Promotions
{
    public class AdminPromotionService(
        IAdminPromotionRepository adminPromotionRepository
        ) : IAdminPromotionService
    {
        public async Task<Result<Guid>> CreatePromotion(UpdatePromotion request, CancellationToken cancellationToken)
        {
            var result = await adminPromotionRepository.CreatePromotion(
                request,
                cancellationToken);

            return Result<Guid>.Success(result);
        }

        public async Task<Result<PromotionDetail>> GetPromotionDetail(Guid promotionId, CancellationToken cancellationToken)
        {
            var result = await adminPromotionRepository.GetPromotionDetail(
                promotionId,
                cancellationToken);

            if (result == null)
            {
                return Result<PromotionDetail>.Failure(
                    Error.Create(
                        "PromotionNotFound",
                        "Chương trình khuyến mãi không tồn tại",
                        ErrorType.NotFound)
                    );
            }

            return Result<PromotionDetail>.Success(result);
        }

        public async Task<Result<PagedResult<ShopPromotion>>> GetPromotionPaging(Guid userId, PaginationRequestDto pagination, CancellationToken cancellationToken)
        {
            var result = await adminPromotionRepository.GetPromotionPaging(
                userId,
                pagination,
                cancellationToken);

            return Result<PagedResult<ShopPromotion>>.Success(result);
        }

        public async Task<Result<bool>> UpdatePromotionAsync(UpdatePromotion request, CancellationToken cancellationToken)
        {
            var result = await adminPromotionRepository.UpdatePromotionAsync(
                request,
                cancellationToken);

            return Result<bool>.Success(result);
        }
    }
}
