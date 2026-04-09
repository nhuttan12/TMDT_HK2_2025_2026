using demo1.Dtos.Users.Requests;
using demo1.Dtos.Users.Responses;

namespace demo1.Services.Users
{
    public interface IUserService
    {
        public Task<UserInfoDTO> CreateAsync(UserCreateDto userCreateDto);
        public Task<UserInfoDTO> UpdateAsync(int id, UserUpdateDto userUpdateDto);
        public Task<UserInfoDTO?> GetByIdAsync(int id);
        public ValueTask<bool> IsExistByUserNameAsync(string username);
        public Task<List<UserInfoDTO>> GetAllAsync();
        public Task GetUserByRefreshTokenAsync(string refreshToken);
    }
}
