using api.Controllers;
using api.Dtos.Users.Requests;
using api.Utilities;

namespace api.Services.Users
{
    public interface IBankingService
    {
        Task<Result<int>> AddBankAsync(Guid userId, CancellationToken cancellationToken, List<UserBankingCreateDTO> dtos);
        Task<Result<bool>> UpdateBankAsync(Guid userId, List<UserBankingCreateDTO> request, CancellationToken cancellationToken);
    }
}
