using api.Dtos.Users.Responses;
using api.Services.Auths;
using api.Utilities;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace api.Controllers
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
    public class AuthController(IConfiguration _config, IAuthService _authService) : BaseController
    {
        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginRequest request, CancellationToken ct)
        {
            var result = await _authService.LoginAsync(request, ct);
            var token = result.Value;
            if (token == null || string.IsNullOrEmpty(token.AccessToken) || string.IsNullOrEmpty(token.RefreshToken))
            {
                return HandleResult(Result<string>.Failure(Error.Create("InvalidCredentials", "Email hoặc mật khẩu không đúng", ErrorType.Unauthorized)));
            }
            SetTokenCookie(token);
            return HandleResult(result);
        }
        [HttpDelete("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("refresh-token");
            Response.Cookies.Delete("X-Access-Token");
            Result<Boolean> res = Result<Boolean>.Success(true);
            return HandleResult(res);
        }
        /// <summary>
        /// thực hiện refresh token bằng cách lấy refresh token từ cookie, 
        /// nếu hợp lệ sẽ trả về access token mới và refresh token mới, 
        /// đồng thời cập nhật cookie
        /// </summary>
        /// <returns></returns>
        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshTokenAsync(CancellationToken ct = default)
        {
            var refreshToken = Request.Cookies["X-Access-Token"];
            if (string.IsNullOrEmpty(refreshToken))
                return HandleResult(Result<bool>.Failure(Error.Create("NoRefreshToken", "No refresh token provided", ErrorType.BadRequest)));
            var refreshToken2 = Request.Cookies["X-Refresh-Token"];
            if (string.IsNullOrEmpty(refreshToken2))
                return HandleResult(Result<bool>.Failure(Error.Create("NoRefreshToken", "No refresh token provided", ErrorType.BadRequest)));

            var token = await _authService.RefreshTokenAsync(refreshToken);
            if (token == null || token.Value == null || string.IsNullOrEmpty(token.Value.RefreshToken) || string.IsNullOrEmpty(token.Value.AccessToken))
                return HandleResult(Result<bool>.Failure(Error.Create("InvalidRefreshToken", "Invalid refresh token", ErrorType.BadRequest)));
            SetTokenCookie(token.Value);
            return HandleResult(Result<TokenResponse>.Success(token.Value));

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
        [HttpGet("/api/auth/google-token")]
        public async Task<IActionResult> GoogleResponse()
        {
            var result = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            if (!result.Succeeded) return BadRequest("Xác thực thất bại");

            var email = result.Principal.FindFirstValue(ClaimTypes.Email);
            var name = result.Principal.FindFirstValue(ClaimTypes.Name);
            var sub = result.Principal.FindFirstValue(ClaimTypes.NameIdentifier);
            var avatarUrl = result.Principal.FindFirstValue("picture") ?? result.Principal.FindFirstValue("image");

            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(name) || string.IsNullOrEmpty(sub) || string.IsNullOrEmpty(avatarUrl))
                return BadRequest("Thông tin Google không đầy đủ");

            var googleInfo = new GoogleInfoResponse(name, email, sub, avatarUrl);

            // BE đã gen token ở đây rồi
            var token = await _authService.HandleGoogleLogin(googleInfo);
            if (token == null || token.Value == null || string.IsNullOrEmpty(token.Value.AccessToken))
                return BadRequest("Failed to generate tokens from Google info");

            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            var frontendUrl = _config["AllowedOrigins:0"] ?? "http://localhost:3000";

            // Truyền trực tiếp token về Next.js thay vì chỉ truyền email
            // Thêm email vào chuỗi redirect
            return Redirect($"{frontendUrl}/api/auth/googleSuccess?accessToken={token.Value.AccessToken}&refreshToken={token.Value.RefreshToken}&email={email}");
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterRequest req, CancellationToken ct = default)
        {
            var res = await _authService.RegisterAsync(req, ct); 
            return HandleResult(res);
        }

        //[HttpPost("google-token")]
        //public async Task<IActionResult> GoogleToken([FromBody] GoogleTokenRequestDto request, CancellationToken ct = default)
        //{
        //    var result = await _authService.LoginWithEmailAsync(request.Email, ct);
        //    var token = result.Value;
        //    if (token == null || string.IsNullOrEmpty(token.AccessToken) || string.IsNullOrEmpty(token.RefreshToken))
        //    {
        //        return HandleResult(Result<string>.Failure(Error.Create("InvalidCredentials", "Email hoặc mật khẩu không đúng", ErrorType.Unauthorized)));
        //    }
        //    SetTokenCookie(token);
        //    return HandleResult(result);
        //}

        private void SetTokenCookie(TokenResponse token)
        {
            if (token == null || string.IsNullOrEmpty(token.AccessToken) || string.IsNullOrEmpty(token.RefreshToken) || string.IsNullOrEmpty(token.RefreshToken))
                return;
            Response.Cookies.Append("X-Access-Token", token.AccessToken!, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Path = "/", //Mặc định gửi cho tất cả request
                Expires = DateTime.UtcNow.AddHours(1)
            });

            // 2. Thiết lập Cookie cho Refresh Token (Chỉ gửi đến endpoint refresh)
            Response.Cookies.Append("X-Refresh-Token", token.RefreshToken!, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None, // Thắt chặt hơn để chống CSRF
                Path = "/api/auth/refresh-token", // CHỈ gửi khi gọi URL này
                Expires = DateTime.UtcNow.AddDays(7)
            });
        }


    }

    public record LoginRequest(
        string Email,
        string Password);
    public record RegisterRequest(
        string FullName,
        string? Phone,
        string Email,
        string Password
        );
    public record GoogleInfoResponse(string Name, string Email, string Sub, string Avatar_url);
    public record GoogleTokenRequestDto(string Email);
}
