using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Users.Requests
{
    /// <summary>
    /// UserCreateDto: nhận nhiệm vụ chứa thông tin cần thiết để tạo một user mới 
    /// email: bắt buộc, định dạng email hợp lệ
    /// password: bắt buộc, có thể thêm các ràng buộc về độ mạnh mật khẩu nếu cần
    /// phoneNumber: không bắt buộc, nếu có thì phải là định dạng số điện thoại hợp lệ
    /// dateOfBirth: không bắt buộc
    /// </summary>
    public record UserCreateDto
    (
          string Email ,
          string Password,
          string FullName,
         string? PhoneNumber, 
         DateOnly? DateOfBirth 
    );
}
