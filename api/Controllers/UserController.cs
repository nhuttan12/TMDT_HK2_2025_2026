using api.Dtos.Users.Requests;
using api.Services.Users;
using api.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    /// <summary>
    /// UserController: nhận nhiệm vụ xử lý có thông tin của user 
    /// api list : 
    /// + create
    /// + getAll
    /// + getByid
    /// + getCurrent
    /// + 
    /// </summary>
    /// <param name="UserService"></param>
    [ApiController]
    [Route("api/users")]
    [Authorize]
    public class UserController(IUserService UserService) : BaseController
    {
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromBody] UserCreateDto userCreateDto)
        {
            var user = await UserService.CreateAsync(userCreateDto);
            return HandleResult(user);
        }


        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var user = await UserService.GetByIdAsync(id);
            return HandleResult(user);
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll([FromQuery] UserParameters query)
        {
            var users = await UserService.GetAllAsync(query);
            return HandleResult(users);
        }


        [HttpGet("me")]
        [Authorize(Roles = "User, Admin, Shop")]
        public async Task<IActionResult> GetCurrent()
        {
            var userId = AuthenticatedUserId;
            if (userId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Create("Unauthorized", "You are not authorized.", ErrorType.BadRequest)));
            }
            var user = await UserService.GetByIdAsync(userId.Value);
            return HandleResult(user);
        }


        [HttpPut("me")]
        [Authorize(Roles = "User, Admin, Shop")]
        public async Task<IActionResult> UpdateCurrent(
            [FromBody] UserUpdateDto req,
            CancellationToken cancellationToken)
        {
            var userId = AuthenticatedUserId;
            if (userId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Create("Unauthorized", "You are not authorized.", ErrorType.BadRequest)));
            }
            var newUser = await UserService.UpdateAsync(userId.Value, req, cancellationToken);
            return HandleResult(newUser);
        }

        [Authorize(Roles = "User")]
        [HttpPatch("me/change-password")]
        public async Task<IActionResult> ChangeMyPassword([FromBody] ChangePasswordDto req, CancellationToken cancellationToken)
        {
            var userId = AuthenticatedUserId;
            if (userId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Create("Unauthorized", "You are not authorized.", ErrorType.BadRequest)));
            }
            var result = await UserService.ChangePasswordAsync(userId.Value, req, cancellationToken);
            return HandleResult(result);
        }
        // *********************************************************************

        [HttpPost("shop")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateShop([FromBody] UserCreateShopDto userCreateDto)
        {
            //TODO implement method create shop
            return HandleResult(Result<string>.Success("Shop created successfully."));
        }

        [HttpPost("{id}/lock")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> LockUser([FromRoute] Guid id, [FromBody] LockInfoDto req)
        {
            //TODO: implement method lock user
            return Ok();
        }

    }
    public record UserParameters(
        int PageNumber,
        int PageSize
        );


    public record UserCreateShopDto(string Name);
    public record ChangePasswordDto(string OldPassword, string NewPassword);
    public record LockInfoDto(string OldPassword, string NewPassword);


}