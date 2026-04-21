### Primary Constructor trong C# 10 (.NET 8+)
- Primary Constructor cho phép bạn khai báo tham số ngay tại tên Class.
- Những tham số này sẽ có phạm vi sử dụng trong toàn bộ thân Class.
---
Cách cũ (Traditional):
C#
~~~
public class TokenService : ITokenService
{
    private readonly IConfiguration _config;

    public TokenService(IConfiguration config)
    {
        _config = config;
    }
}
~~~
---
Cách mới với Primary Constructor (.NET 8+):
C#
~~~

public class TokenService(IConfiguration config) : ITokenService
{
    // Bạn có thể dùng 'config' trực tiếp ở bất kỳ đâu trong class này
    public void DoSomething() 
    {
        var key = config["JwtSettings:Key"];
    }
}
~~~

### tại sao lại có biến _attribute 
Dấu gạch dưới (_) đứng trước tên biến thường dùng để chỉ định một Private Readonly Field (Trường dữ liệu riêng tư, chỉ đọc) thuộc về một Class.
~~~
public class TokenService(IConfiguration config) 
{
    // Không cần dùng 'this'
    private readonly IConfiguration _config = config; 
}
~~~

---
Quy chuẩn của Microsoft (Coding Guidelines)
Microsoft và hầu hết các thư viện mã nguồn mở lớn (như .NET Core, Entity Framework) đều sử dụng quy ước này:

+ _camelCase: Cho private fields (ví dụ: _tokenService).

+ PascalCase: Cho Public Properties hoặc Methods (ví dụ: TokenService, CreateToken).

---
### thư viện :
~~~
#thư viên swagger 
dotnet add package Microsoft.AspNetCore.OpenApi
dotnet add package Swashbuckle.AspNetCore.SwaggerUI
# cho phép chạy https redir để chuyển hướng mở swager
dotnet dev-certs https --trust
# autoMapper
dotnet add package AutoMapper
dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection
~~~