using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Users.Requests
{
    public record UserUpdateDto(
    string Fullname,
    string PhoneNumber,

    string? AvatarUrl,

    // Chuyển sang List để dễ dàng thao tác LINQ ở tầng Service
    List<string>? Addresses
    );

}
