using api.Models.Utilities;
using api.Controllers;
using api.Dtos.Users.Requests;
using api.Dtos.Users.Responses;
using api.Models;

namespace api.Services.Users
{
    public interface IUserService
    {
        public Task<UserInfoDTO> CreateAsync(UserCreateDto userCreateDto);
        public Task<UserInfoDTO> UpdateAsync(int id, UserUpdateDto userUpdateDto);
        public Task<UserInfoDTO?> GetByIdAsync(int id);
        public ValueTask<bool> IsExistByEmailAsync(string email);
        public Task<Pagination<UserInfoDTO>> GetAllAsync(UserParameters query);
        public Task GetUserByRefreshTokenAsync(string refreshToken);
        Task<User> GetByEmailAsync(string? email);
        Task<User?> CreateFromGoogleAsync(string? email, string? name);
    }
}
