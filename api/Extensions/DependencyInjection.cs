using api.Repository;
using api.Exceptions;
using api.Models;
using api.Models.Jwts;
using api.Services.Auths;
using api.Services.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using api.Repository.UserRepo;
using api.Repository.RoleRepo;
using api.Repository.Categories;
using api.Services.Categorys;
using api.Repository.ProductRepo;
using api.Services.Products;
using api.Database;
using api.Utilities.Seeders;

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


            // Đăng ký các service
            services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<ICategoryService, CategoryService>();

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
