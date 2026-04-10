using demo1.Services.Auths;
using Microsoft.AspNetCore.Mvc;

namespace demo1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController(IConfiguration _config, IAuthService _authService) : ControllerBase
    {
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var token = await _authService.loginAsync(request.Username, request.Password);
            SetRefreshTokenCookie(token.RefreshToken);
            return Ok(token.AccessToken);
        }
        [HttpDelete("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("refreshToken");
            return NoContent();
        }


        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshToken))
                return BadRequest("No refresh token provided");
            var user = await _authService.RefreshTokenAsync(refreshToken);
            if (user == null)
                return BadRequest("Invalid refresh token");

            var newAccessToken = await _authService.loginAsync(user.Username, user.PasswordHash);
            SetRefreshTokenCookie(newAccessToken.RefreshToken);
            return Ok(newAccessToken.AccessToken);

        }
        private void SetRefreshTokenCookie(string refreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,        // Quan trọng: JavaScript không thể truy cập
                Secure = true,          // Chỉ gửi qua HTTPS
                SameSite = SameSiteMode.Strict, // Chống tấn công CSRF
                Expires = DateTime.UtcNow.AddDays(_config.GetValue<int>("RefreshTokenExpirationDays"))
            };

            // "refreshToken" là tên của Cookie
            Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
        }

    }

    public record LoginRequest(string Username, string Password);
}
