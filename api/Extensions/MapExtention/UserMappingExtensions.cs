using api.Dtos.Users.Responses;
using api.Models;

namespace api.Extensions.MapExtention
{
    public static class UserMappingExtensions
    {
        public static UserInfoDTO ToResponseDto(this User user)
        {
            return new UserInfoDTO
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                Phone = user.Phone,
                DateOfBirth = DateOnly.FromDayNumber(10),
                CreateAt = user.CreateAt,
                UpdateAt = user.UpdateAt,
                UserDetail = user.UserDetail != null ? new UserDetailDto
                {
                    LockTimeStart = user.UserDetail.LockTimeStart,
                    LockTimeEnd = user.UserDetail.LockTimeEnd,
                    AvatarUrl = user.UserDetail.AvatarUrl,
                    AddressId = user.UserDetail.AddressId
                } : null,
                // Map mượt mà sang cấu trúc Address DTO mới có chứa Id và IsUsed
                Addresses = user.Addresses.Select(a => new UserAddressResponseDto(
                    a.Id,
                    a.AddressUrl,
                    a.IsUsed
                )).ToList()
            };
        }
    }
}
