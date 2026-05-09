using api.Dtos;
using api.Dtos.Common;
using api.Dtos.Users.Requests;
using api.Dtos.Users.Responses;
using api.Exceptions;
using api.Models.Utilities;
using api.Services.Users;
using api.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

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
        public async Task<IActionResult> GetById([FromRoute] int id)
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
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                throw new UnauthorizedException("You are not authorized.");
            }
            var user = await UserService.GetByIdAsync(int.Parse(userId));
            if (user == null)
            {
                throw new NotFoundException("User not found.");
            }
            return HandleResult(user);
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
        public async Task<IActionResult> LockUser([FromRoute] int id, [FromBody] LockInfoDto req)
        {
            //TODO: implement method lock user
            return Ok();
        }

        [HttpPost("me")]
        [Authorize(Roles = "User, Admin, Shop")]
        public async Task<IActionResult> ChangeInfo([FromBody] UserUpdateInfo req)
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