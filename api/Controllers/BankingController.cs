using api.Dtos.Users.Requests;
using api.Services.Users;
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
        [HttpPost("{Id}")]
        [Authorize(Roles = "User, Shop")]
        public async Task<IActionResult> AddBank(
            [FromRoute] Guid Id, 
            [FromBody] List<UserBankingCreateDTO> Dtos, 
            CancellationToken CancellationToken)
        {
            var result = await bankingService.AddBankAsync(Id, CancellationToken, Dtos);

            return HandleResult(result);
        }
    }
}
