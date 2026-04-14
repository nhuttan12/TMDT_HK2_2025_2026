using api.Extensions;
using demo1.Data;
using demo1.Services.Auths;
using demo1.Utilities;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddAppSecurity(builder.Configuration);
builder.Services.AddBusinessServices(builder.Configuration);
builder.Services.AddConfiguredOpenApi(builder.Configuration);


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
