using api.Database;
using api.Exceptions;
using api.Models;
using api.Models.Jwts;
using api.Repository;
using api.Repository.Categories;
using api.Repository.ProductRepo;
using api.Repository.RoleRepo;
using api.Repository.UserRepo;
using api.Services.Auths;
using api.Services.Categorys;
using api.Services.Products;
using api.Services.Users;
using api.Utilities.Seeders;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using api.Services.Banners;
using api.Repository.BannerRepo;
using api.Services.Coupons;
using api.Repository.Coupons;
using api.Repository.Promotions;
using api.Services.Promotions;

namespace api.Extensions
{
    /// <summary>
    /// Đăng ký Database, Repositories, và Services.
    /// </summary>
    public static class DependencyInjection
    {
        public static IServiceCollection AddBusinessServices(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DefaultConnection");

            // Nếu connection string chứa biến, chúng ta thay thế nó bằng giá trị thực tế từ Environment
            connectionString = connectionString
                .Replace("${MSSQL_PORT}", Environment.GetEnvironmentVariable("MSSQL_PORT") ?? "1433")
                .Replace("${MSSQL_SA_PASSWORD}", Environment.GetEnvironmentVariable("MSSQL_SA_PASSWORD") ?? "YourStrongPassword123!");
            // Đăng ký các dịch vụ bảo mật tại đây
            // Đăng ký DbContext với SQL Server
            services.AddDbContext<MyAppDbContext>(options =>
                options.UseSqlServer(connectionString,
                sqlOptions =>
                {
                    sqlOptions.EnableRetryOnFailure(
                    maxRetryCount: 5,
                    maxRetryDelay: TimeSpan.FromSeconds(30),
                    errorNumbersToAdd: null);
                }));

            services.Configure<JwtSettings>(configuration.GetSection("JwtSettings"));

            // dang ky ropository
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IRoleRepo, RoleRepo>();
            services.AddScoped<IAuthRepo, AuthRepo>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<ICategoryRepo, CategoryRepo>();
            services.AddScoped<IBankingRepository, BankingRepository>();
            services.AddScoped<IUserBannerRepository, UserBannerRepository>();
            services.AddScoped<IAdminBannerRepository, AdminBannerRepository>();
            services.AddScoped<IAdminCouponRepository, AdminCouponRepository>();
            services.AddScoped<IUserCouponRepository, UserCouponRepository>();
            services.AddScoped<IUserPromotionRepository, UserPromotionRepository>();
            services.AddScoped<IAdminPromotionRepository, AdminPromotionRepository>();

            // Đăng ký các service
            services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IAdminBannerService, AdminBannerService>();
            services.AddScoped<IUserBannerService, UserBannerService>();
            services.AddScoped<IBankingService, BankingService>();
            services.AddScoped<IAdminCouponService, AdminCouponService>();
            services.AddScoped<IUserCouponService, UserCouponService>();
            services.AddScoped<IUserPromotionService, UserPromotionService>();
            services.AddScoped<IAdminPromotionService, AdminPromotionService>();

            // dang ký global exception handler
            services.AddExceptionHandler<GlobalExceptionHandler>();
            services.AddProblemDetails();

            // Đăng ký các seed data
            services.AddScoped<IDataSeeder, CategorySeeder>();
            services.AddScoped<IDataSeeder, ProductSeeder>();
            // Đăng ký global exception handler
            return services;
        }
    }
}
