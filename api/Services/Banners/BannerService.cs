using api.Dtos.Banners.Request;
using api.Dtos.Common;
using api.Models;
using api.Repository.BannerRepo;
using api.Utilities;
using Microsoft.Data.SqlClient;
using System.Data;

namespace api.Services.Banners
{
    public class BannerService : IBannerService
    {
        private readonly IBannerRepository _bannerRepository;

        public BannerService(IBannerRepository bannerRepository)
        {
            _bannerRepository = bannerRepository;
        }

        public async Task<Result<int>> BulkUpdateBannersAsync(Guid UserId, CancellationToken CancellationToken, List<UpdateBannerDto> Banners)
        {
            try
            {
                var result = await _bannerRepository.BulkUpdateBannersAsync(UserId, CancellationToken, Banners);

                return result;
            }
            catch (SqlException ex)
            {
                var sysError = new Error("System.DatabaseError", "Đã có lỗi xảy ra khi kết nối cơ sở dữ liệu.");
                return Result<int>.Failure(sysError);
            }
        }
    }
}
