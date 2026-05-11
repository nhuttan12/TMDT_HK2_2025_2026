using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Users.Requests
{
    public record UserUpdateDto(
         [Required(ErrorMessage = "Họ tên không được để trống")]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "Họ tên từ 2-100 ký tự")]
    string Fullname,

    [Phone(ErrorMessage = "Định dạng số điện thoại không hợp lệ")]
    [RegularExpression(@"^(03|05|07|08|09)\d{8}$", ErrorMessage = "Số điện thoại Việt Nam không đúng")]
    string PhoneNumber,

    [Url(ErrorMessage = "Định dạng liên kết ảnh không hợp lệ")]
    string? AvatarUrl,

    // Chuyển sang List để dễ dàng thao tác LINQ ở tầng Service
    List<string>? Addresses
    );
   
}
