using api.Models.Utilities;
using demo1.Dtos.Users.Requests;
using demo1.Dtos.Users.Responses;
using demo1.Exceptions;
using demo1.Services.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace demo1.Controllers
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
    public class UserController(IUserService UserService) : ControllerBase
    {
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<UserInfoDTO>> Create([FromBody] UserCreateDto userCreateDto)
        {
            var user = await UserService.CreateAsync(userCreateDto);
            return Ok(user);
        }


        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<UserInfoDTO>> GetById([FromRoute] int id)
        {
            var user = await UserService.GetByIdAsync(id);
            return Ok(user);
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Pagination<UserInfoDTO>>> GetAll([FromQuery] UserParameters query)
        {
            var users = await UserService.GetAllAsync(query);
            return Ok(users);
        }


        [HttpGet("me")]
        [Authorize(Roles = "User, Admin, Shop")]
        public async Task<ActionResult<UserInfoDTO>> GetCurrent()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                throw new UnauthorizedException("You are not authorized.");
            }
            var user = await UserService.GetByIdAsync(int.Parse(userId));
            return Ok(user);
        }
        // *********************************************************************
        [HttpPost("shop")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<UserInfoDTO>> CreateShop([FromBody] UserCreateShopDto userCreateDto)
        {
            //TODO implement method create shop
            return Ok();
        }

        [HttpPost("{id}/lock")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<UserInfoDTO>> LockUser([FromRoute] int id, [FromBody] LockInfoDto req)
        {
            //TODO: implement method lock user
            return Ok();
        }

        [HttpPost("me")]
        [Authorize(Roles = "User, Admin, Shop")]
        public async Task<ActionResult<UserInfoDTO>> ChangeInfo([FromBody] UserUpdateInfo req)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                throw new UnauthorizedException("You are not authorized.");
            }
            var user = await UserService.GetByIdAsync(int.Parse(userId));
            //TODO: implement method changeInfo 
            return Ok(user);
        }

        [Authorize(Roles = "User")]
        [HttpPost("me/change-password")]
        public async Task<IActionResult> ChangeMypassword([FromBody] ChangePasswordDto req)
        {
            //TODO: implement method change my password
            throw new NotImplementedException();
        }


    }
    public record UserParameters(
        [Required]
        [Range(0, 10)]
        int PageNumber,
        [Required]
        [Range(0, 10)]
        int PageSize
        );
    public record UserUpdateInfo();
    public record UserCreateShopDto(string Name);
    public record ChangePasswordDto(string OldPassword, string NewPassword);

    public record LockInfoDto(string OldPassword, string NewPassword);

}