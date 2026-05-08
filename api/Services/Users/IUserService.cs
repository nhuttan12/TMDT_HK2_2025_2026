using api.Models.Utilities;
using api.Controllers;
using api.Dtos.Users.Requests;
using api.Dtos.Users.Responses;
using api.Models;
using api.Utilities;

namespace api.Services.Users
{
    public interface IUserService
    {
        public Task<Result<UserInfoDTO>> CreateAsync(UserCreateDto userCreateDto, CancellationToken ct = default );
        public Task<Result<UserInfoDTO>> UpdateAsync(int id, UserUpdateDto userUpdateDto, CancellationToken ct = default);
        public Task<Result<UserInfoDTO?>> GetByIdAsync(int id, CancellationToken ct = default);
        public ValueTask<Result<bool>> IsExistByEmailAsync(string email, CancellationToken ct = default);
        public Task<Result<Pagination<UserInfoDTO>>> GetAllAsync(UserParameters query, CancellationToken ct = default);
        public Task<Result<UserInfoDTO>> GetUserByRefreshTokenAsync(string refreshToken, CancellationToken ct = default);
        Task<Result<User>> GetByEmailAsync(string? email, CancellationToken ct = default);
        Task<Result<User>> CreateFromGoogleAsync(string? email, string? name, CancellationToken ct = default);
    }
}
