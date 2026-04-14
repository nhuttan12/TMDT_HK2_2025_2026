using demo1.Exceptions;
using demo1.Models;
using demo1.Models.Jwts;
using demo1.Services.Auths;
using demo1.Services.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace api.Extensions
{
    /// <summary>
    /// Đăng ký Database, Repositories, và Services.
    /// </summary>
    public static class DependencyInjection
    {
        public static IServiceCollection AddBusinessServices(this IServiceCollection services, IConfiguration configuration)
        {
            // Đăng ký các dịch vụ bảo mật tại đây
            // Đăng ký DbContext với PostgreSQL
            services.AddDbContext<demo1.Data.MyAppDbContext>(options =>
                options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"))
                .UseSnakeCaseNamingConvention());

            // Đăng ký các service
            services.Configure<JwtSettings>(configuration.GetSection("JwtSettings"));
            services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ITokenService, TokenService>();


            services.AddExceptionHandler<GlobalExceptionHandler>();
            services.AddProblemDetails();
            // Đăng ký global exception handler
            return services;
        }
    }
}
