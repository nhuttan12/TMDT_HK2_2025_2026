using api.Controllers;
using api.Dtos.Users.Requests;
using api.Utilities;

namespace api.Repository.UserRepo
{
    public interface IBankingRepository
    {
        Task<Result<int>> AddBankAsync(Guid userId, CancellationToken cancellationToken, List<UserBankingCreateDTO> Dtos);
    }
}
