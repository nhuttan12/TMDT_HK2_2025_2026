using demo1.Data;
using demo1.Exceptions;
using demo1.Models;
using demo1.Models.Jwts;
using demo1.Services.Auths;
using demo1.Services.Users;
using demo1.Utilities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System.Text;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi(options =>
{
    options.AddDocumentTransformer((document, context, cancellationToken) =>
    {
        // Thêm định nghĩa Security cho JWT
        var requirements = new Dictionary<string, OpenApiSecurityScheme>
        {
            ["Bearer"] = new OpenApiSecurityScheme
            {
                Type = SecuritySchemeType.Http,
                Scheme = "bearer",
                BearerFormat = "JWT",
                Description = "Nhập JWT Token của bạn tại đây"
            }
        };
        document.Components = new OpenApiComponents { SecuritySchemes = requirements };

        // Áp dụng Security cho tất cả Endpoint
        document.SecurityRequirements.Add(new OpenApiSecurityRequirement
        {
            [new OpenApiSecurityScheme { Reference = new OpenApiReference { Id = "Bearer", Type = ReferenceType.SecurityScheme } }] = Array.Empty<string>()
        });
        document.Info.Title = "E-Commerce API System";
        document.Info.Version = "v1";
        document.Info.Description = "Hệ thống API quản lý cửa hàng trực tuyến";
        document.Info.Contact = new OpenApiContact
        {
            Name = "Đội ngũ kỹ thuật",
            Email = "dev@yourdomain.com"
        };
        return Task.CompletedTask;
    });
});
// Cấu hình JWT Authentication
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var ket = Encoding.ASCII.GetBytes(jwtSettings["Key"]!);
// Cấu hình Authentication với JWT Bearer
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    // Cấu hình các tham số xác thực token
    // token sẽ được kiểm tra dựa trên các thông tin như: issuer, audience, lifetime, và signing key
    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(ket),
        ClockSkew = TimeSpan.Zero
    };
});
// Cấu hình Authorization
builder.Services.AddAuthorization();

// Đăng ký DbContext với PostgreSQL
builder.Services.AddDbContext<demo1.Data.MyAppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
    .UseSnakeCaseNamingConvention());


// Đăng ký các service
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));
builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ITokenService, TokenService>();
// Đăng ký global exception handler
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();
// Đăng ký AutoMapper
builder.Services.AddAutoMapper(cfg =>
{
    cfg.AddMaps(typeof(Program).Assembly);
});
// Đăng ký CORS nếu cần thiết (ví dụ: cho phép frontend truy cập API)
var allowedOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
         builder => builder
             .WithOrigins(allowedOrigins ?? ["http://localhost:3000"]) //TODO: Thay đổi thành URL frontend của bạn
             .AllowAnyMethod()
             .AllowAnyHeader()
             .AllowCredentials()); // BẮT BUỘC: Cho phép nhận Cookie/Credentials

});
// Build the app
var app = builder.Build();

// Configure the HTTP request pipeline.|
// create user admin
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var config = services.GetRequiredService<IConfiguration>();
    var context = scope.ServiceProvider.GetRequiredService<MyAppDbContext>();
    var authService = scope.ServiceProvider.GetRequiredService<IAuthService>();
    // Truyền trực tiếp context vào để xử lý
    await DbInitializer.SeedEverything(context, config, authService);
}

// 2. Cấu hình Middleware
if (app.Environment.IsDevelopment())
{
    // Sinh file JSON đặc tả tại /openapi/v1.json
    app.MapOpenApi();

    // Thiết lập Swagger UI để hiển thị giao diện
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "E-Commerce API v1");
        options.RoutePrefix = "swagger"; // Truy cập qua: http://localhost:5161/swagger
        options.DocumentTitle = " Documentation";
    });
}
// Chuyển hướng HTTP sang HTTPS
app.UseHttpsRedirection();
// CORS middleware
app.UseCors("AllowSpecificOrigin");
// Authentication & Authorization middleware 
// tự động kiểm tra token trong header của các request đến và xác thực người dùng dựa trên token đó
app.UseAuthentication();
app.UseAuthorization();
// Global exception handling middleware
app.UseExceptionHandler();
// Map controller routes
app.MapControllers();
app.Run();
