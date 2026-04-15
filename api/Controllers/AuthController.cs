using demo1.Dtos.Users.Responses;
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
            SetTokenCookie(token);
            return Ok();
        }
        [HttpDelete("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("refreshToken");
            return NoContent();
        }
        /// <summary>
        /// thực hiện refresh token bằng cách lấy refresh token từ cookie, 
        /// nếu hợp lệ sẽ trả về access token mới và refresh token mới, 
        /// đồng thời cập nhật cookie
        /// </summary>
        /// <returns></returns>
        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken()
        {
            var refreshToken = Request.Cookies["X-Access-Token"];
            if (string.IsNullOrEmpty(refreshToken))
                return BadRequest("No refresh token provided");

            var token = await _authService.RefreshTokenAsync(refreshToken);
            if (token == null)
                return BadRequest("Invalid refresh token");
            SetTokenCookie(token);
            return Ok();

        }
        private void SetTokenCookie(TokenResponse token)
        {
            if (token == null || string.IsNullOrEmpty(token.RefreshToken) || string.IsNullOrEmpty(token.AccessToken))
                throw new ArgumentException("TokenResponse must contain both AccessToken and RefreshToken");
            Response.Cookies.Append("X-Access-Token", token.AccessToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Lax,
                Path = "/", //Mặc định gửi cho tất cả request
                Expires = DateTime.UtcNow.AddHours(1)
            });

            // 2. Thiết lập Cookie cho Refresh Token (Chỉ gửi đến endpoint refresh)
            Response.Cookies.Append("X-Refresh-Token", token.RefreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict, // Thắt chặt hơn để chống CSRF
                Path = "/api/auth/refresh-token", // CHỈ gửi khi gọi URL này
                Expires = DateTime.UtcNow.AddDays(7)
            });
        }

        [HttpGet("Login-google")]
        public IActionResult LoginGoogle()
        {
            var properties = new AuthenticationProperties { RedirectUri = Url.Action("GoogleResponse") };
            return Challenge(properties, GoogleDefaults.AuthenticationScheme);
        }
        /// <summary>
        /// google sẽ redirect về endpoint này sau khi người dùng hoàn tất xác thực trên Google,  
        /// </summary>
        /// <returns></returns>
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
            SetTokenCookie(token);

            // Xóa Cookie ngay lập tức để duy trì tính Stateless cho API
            await HttpContext.SignOutAsync(Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme);

            // Redirect về Frontend kèm Token
            // TODO: cần thay đổi cách redirect
            var frontendUrl = _config["AllowedOrigins:0"] ?? "http://localhost:3000";
            return Redirect($"{frontendUrl}/login_success");
        }
    }

    public record LoginRequest(string Username, string Password);
    public record googleInfoResponse(string name, string email, string sub, string avatar_url);
}
