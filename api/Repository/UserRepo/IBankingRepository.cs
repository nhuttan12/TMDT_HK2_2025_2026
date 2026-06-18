using api.Controllers;
using api.Dtos.Users.Requests;
using api.Utilities;

namespace api.Repository.UserRepo
{
    public interface IBankingRepository
    {
        Task<int> AddBankAsync(Guid userId, CancellationToken cancellationToken, List<UserBankingCreateDTO> Dtos);
        Task<bool> UpdateBankAsync(Guid userId, List<UserBankingCreateDTO> request, CancellationToken cancellationToken);
    }
}
