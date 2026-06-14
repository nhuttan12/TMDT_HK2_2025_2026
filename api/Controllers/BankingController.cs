using api.Dtos.Users.Requests;
using api.Services.Users;
using api.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/user/bank")]
    [ApiController]
    public class BankingController (
            IBankingService bankingService
        ) : BaseController
    {
        [HttpPost]
        [Authorize(Roles = "User, Shop")]
        public async Task<IActionResult> AddBank(
            [FromBody] List<UserBankingCreateDTO> Dtos, 
            CancellationToken CancellationToken)
        {
            var userId = AuthenticatedUserId;

            if (userId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Create("Unauthorized", "You are not authorized.", ErrorType.BadRequest)));
            }

            var result = await bankingService.AddBankAsync(userId.Value, CancellationToken, Dtos);

            return HandleResult(result);
        }
    }
}
