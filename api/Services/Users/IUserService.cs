using api.Models.Utilities;
using demo1.Controllers;
using demo1.Dtos.Users.Requests;
using demo1.Dtos.Users.Responses;
using demo1.Models;

namespace demo1.Services.Users
{
    public interface IUserService
    {
        public Task<UserInfoDTO> CreateAsync(UserCreateDto userCreateDto);
        public Task<UserInfoDTO> UpdateAsync(int id, UserUpdateDto userUpdateDto);
        public Task<UserInfoDTO?> GetByIdAsync(int id);
        public ValueTask<bool> IsExistByUserNameAsync(string username);
        public Task<Pagination<UserInfoDTO>> GetAllAsync(UserParameters query);
        public Task GetUserByRefreshTokenAsync(string refreshToken);
        Task<User> GetByEmailAsync(string? email);
        Task<User?> CreateFromGoogleAsync(string? email, string? name);
    }
}
