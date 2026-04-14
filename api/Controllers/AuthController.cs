using demo1.Services.Auths;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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
            if (token == null || string.IsNullOrEmpty(token.AccessToken) || string.IsNullOrEmpty(token.RefreshToken))
            {
                return Unauthorized("Invalid username or password");
            }
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
            if (newAccessToken == null || string.IsNullOrEmpty(newAccessToken.AccessToken) || string.IsNullOrEmpty(newAccessToken.RefreshToken))
                return BadRequest("Failed to generate new access token");
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

        [HttpGet("Login-google")]
        public IActionResult LoginGoogle()
        {
            var properties = new AuthenticationProperties { RedirectUri = Url.Action("GoogleResponse") };
            return Challenge(properties, GoogleDefaults.AuthenticationScheme);
        }
        [HttpGet("google-response")]
        public async Task<IActionResult> GoogleResponse()
        {
            var result = await HttpContext.AuthenticateAsync(Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme);

            if (!result.Succeeded) return BadRequest("Xác thực thất bại");

            var email = result.Principal.FindFirstValue(ClaimTypes.Email);
            var name = result.Principal.FindFirstValue(ClaimTypes.Name);
            var sub = result.Principal.FindFirstValue(ClaimTypes.NameIdentifier);

            var avatarUrl = result.Principal.FindFirstValue("picture") ?? result.Principal.FindFirstValue("image");
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(name) || string.IsNullOrEmpty(sub) || string.IsNullOrEmpty(avatarUrl))
                return BadRequest("Thông tin Google không đầy đủ");

            var googleInfo = new googleInfoResponse(name, email, sub, avatarUrl);
            var token = await _authService.HandleGoogleLogin(googleInfo);
            if (token == null || string.IsNullOrEmpty(token.AccessToken) || string.IsNullOrEmpty(token.RefreshToken))
                return BadRequest("Failed to generate tokens from Google info");
            SetRefreshTokenCookie(token.RefreshToken);

            // Xóa Cookie ngay lập tức để duy trì tính Stateless cho API
            await HttpContext.SignOutAsync(Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme);

            // Redirect về Frontend kèm Token
            // TODO: cần thay đổi cách redirect
            var frontendUrl = _config["AllowedOrigins:0"] ?? "http://localhost:3000";
            return Redirect($"{frontendUrl}/login-success?token={token.AccessToken}");
        }
    }

    public record LoginRequest(string Username, string Password);
    public record googleInfoResponse(string name, string email, string sub, string avatar_url);
}
