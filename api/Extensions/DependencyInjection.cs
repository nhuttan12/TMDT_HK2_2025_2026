using api.Database;
using api.Database.Interceptors;
using api.Exceptions;
using api.Models;
using api.Models.Jwts;
using api.Repository;
using api.Repository.Categories;
using api.Repository.ProductRepo;
using api.Repository.RoleRepo;
using api.Repository.UserRepo;
using api.Services.Auths;
using api.Services.Banners;
using api.Services.Categorys;
using api.Services.Products;
using api.Services.Users;
using api.Utilities.Seeders;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace api.Extensions
{
    /// <summary>
    /// Đăng ký Database, Repositories, và Services.
    /// </summary>
    public static class DependencyInjection
    {
        private const string Variable = "MSSQL_PORT";

        public static IServiceCollection AddBusinessServices(this IServiceCollection services, IConfiguration configuration)
        {
            // đăng ký các interceptor của EF Core
            services.AddSingleton<AuditableEntityInterceptor>();
            // Đăng ký các dịch vụ bảo mật tại đây 
            // Đăng ký DbContext với SQL Server
            services.AddDbContext<MyAppDbContext>((sp, options) =>
            {
                // Nếu connection string chứa biến, chúng ta thay thế nó bằng giá trị thực tế từ Environment
                var connectionString = configuration.GetConnectionString("DefaultConnection");
                connectionString = connectionString!
                    .Replace("${MSSQL_PORT}", Environment.GetEnvironmentVariable(Variable) ?? "1433")
                    .Replace("${MSSQL_SA_PASSWORD}", Environment.GetEnvironmentVariable("MSSQL_SA_PASSWORD") ?? "YourStrongPassword123!");

                options.UseSqlServer(connectionString,
                sqlOptions =>
                {
                    sqlOptions.EnableRetryOnFailure(
                    maxRetryCount: 5,
                    maxRetryDelay: TimeSpan.FromSeconds(30),
                    errorNumbersToAdd: null);
                });
                var interceptor = sp.GetRequiredService<AuditableEntityInterceptor>();
                options.AddInterceptors(interceptor);
            });
            services.Configure<JwtSettings>(configuration.GetSection("JwtSettings"));

            // dang ký global exception handler
            services.AddExceptionHandler<GlobalExceptionHandler>();
            services.AddProblemDetails();

            return services;
        }
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IRoleRepo, RoleRepo>();
            services.AddScoped<IAuthRepo, AuthRepo>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<ICategoryRepo, CategoryRepo>();
            services.AddScoped<IStoredProcedureRepository, StoredProcedureRepository>();

            return services;
        }

        public static IServiceCollection AddBusinessServices(this IServiceCollection services)
        {
            services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IBannerService, BannerService>();

            // Đăng ký Data Seeders
            services.AddScoped<IDataSeeder, CategorySeeder>();
            services.AddScoped<IDataSeeder, ShopSeeder>();
            services.AddScoped<IDataSeeder, ProductSeeder>();

            return services;
        }
    }
}
