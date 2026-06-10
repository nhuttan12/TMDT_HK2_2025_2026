using api.Controllers;
using api.Dtos.Users.Requests;
using api.Utilities;

namespace api.Services.Users
{
    public interface IBankingService
    {
        Task<Result<int>> AddBankAsync(Guid userId, CancellationToken cancellationToken, List<UserBankingCreateDTO> dtos);
    }
}
