using demo1.Dtos.Users.Responses;
using demo1.Services.Auths;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace demo1.Controllers
{

    /// <summary>
    ///AuthController thực hiện nhiệm vụ bảo mật
    ///api list:
    ///+ login(username,password) 
    ///+ LoginGoogle()
    ///+ googleResponse() 
    ///+ logout() 
    ///+ refreshTocken() 
    ///+ LoginFaceBook()
    /// </summary>
    /// <param name="_config"></param>
    /// <param name="_authService"></param>
    [ApiController]
    [Route("api/auth")]
    public class AuthController(IConfiguration _config, IAuthService _authService) : ControllerBase
    {
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var token = await _authService.loginAsync(request);
            if (token == null || string.IsNullOrEmpty(token.AccessToken) || string.IsNullOrEmpty(token.RefreshToken))
            {
                return Unauthorized("Invalid username or password");
            }
            SetTokenCookie(token);
            return Ok("success");
        }
        [HttpDelete("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("refresh-token");
            Response.Cookies.Delete("X-Access-Token");
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

        [HttpGet("login-google")]
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

            var googleInfo = new GoogleInfoResponse(name, email, sub, avatarUrl);
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

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest req)
        {
            // TODO: implement register logic
            await _authService.Register(req);
            return Ok("success");
        }
        // TODO: forgot-password

        // TODO: change-password



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

    }

    public record LoginRequest(
        [Required]
        [EmailAddress]
        string Email,
        [Required]
        [PasswordPropertyText]
        string Password);
    public record RegisterRequest(
        [EmailAddress]
        string Email,
        [PasswordPropertyText]
        string Password
        );
    public record GoogleInfoResponse(string Name, string Email, string Sub, string Avatar_url);
}
