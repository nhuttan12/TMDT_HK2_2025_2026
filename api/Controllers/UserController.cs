using api.Models.Utilities;
using demo1.Dtos.Users.Requests;
using demo1.Dtos.Users.Responses;
using demo1.Exceptions;
using demo1.Services.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace demo1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Yêu cầu xác thực cho tất cả các endpoint trong controller này
    public class UserController(IUserService UserService) : ControllerBase
    {
        [HttpPost]
        [AllowAnonymous] // Cho phép truy cập mà không cần xác thực
        public async Task<ActionResult<UserInfoDTO>> Create(UserCreateDto userCreateDto)
        {
            var user = await UserService.CreateAsync(userCreateDto);
            return Ok(user);
        }
        [HttpGet]
        [Authorize(Roles = "Admin")] // Chỉ cho phép người dùng có vai trò "Admin" truy cập endpoint này
        public async Task<ActionResult<Pagination<UserInfoDTO>>> GetAll(UserParameters query)
        {
            var users = await UserService.GetAllAsync(query);
            return Ok(users);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<UserInfoDTO>> GetById(int id)
        {
            var user = await UserService.GetByIdAsync(id);
            return Ok(user);
        }
        [HttpGet("current")]
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

    }
    public record UserParameters(int PageNumber, int PageSize);

}