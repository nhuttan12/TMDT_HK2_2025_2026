using api.Repository.Promotions;

namespace api.Services.Promotions
{
    public class UserPromotionService (
        IUserPromotionRepository userPromotionRepository
        ) : IUserPromotionService
    {
    }
}
