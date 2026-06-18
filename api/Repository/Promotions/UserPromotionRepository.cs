namespace api.Repository.Promotions
{
    public class UserPromotionRepository(
        IStoredProcedureRepository storedProcedureRepository
        ) : IUserPromotionRepository
    {
    }
}
