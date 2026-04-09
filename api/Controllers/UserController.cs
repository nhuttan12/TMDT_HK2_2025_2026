using demo1.Dtos.Users.Requests;
using demo1.Dtos.Users.Responses;
using demo1.Services.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace demo1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Yêu cầu xác thực cho tất cả các endpoint trong controller này
    public class UserController(IUserService UserService) : ControllerBase
    {
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<UserInfoDTO>> GetById(int id)
        {
            var user = await UserService.GetByIdAsync(id);
            return Ok(user);
        }

        [HttpPost]
        [AllowAnonymous] // Cho phép truy cập mà không cần xác thực
        public async Task<ActionResult<UserInfoDTO>> Create(UserCreateDto userCreateDto)
        {
            var user = await UserService.CreateAsync(userCreateDto);
            return Ok(user);
        }
    }

}