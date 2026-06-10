using api.Dtos.Banners.Request;
using api.Dtos.Common;
using api.Utilities;
using Microsoft.Data.SqlClient;
using System.Data;

namespace api.Repository.BannerRepo
{
    public class BannerRepository : IBannerRepository
    {
        private readonly IStoredProcedureRepository _spRepo;

        public BannerRepository(IStoredProcedureRepository spRepo)
        {
            _spRepo = spRepo;
        }

        public async Task<Result<int>> BulkUpdateBannersAsync(
            Guid UserId, 
            CancellationToken CancellationToken,
            List<UpdateBannerDto> Banners)
        {
            var bannerTable = new DataTable();

            bannerTable.Columns.Add("ImageUrl", typeof(string));
            bannerTable.Columns.Add("Order", typeof(int));
            bannerTable.Columns.Add("IsPrimary", typeof(bool));

            foreach (var banner in Banners)
            {
                bannerTable.Rows.Add(banner.Url, banner.Order, banner.IsPrimary);
            }

            var parameters = new[]
            {
                new SqlParameter("@UserId", UserId),
                new SqlParameter
                {
                    ParameterName = "@Banners",
                    SqlDbType = SqlDbType.Structured,
                    TypeName = "dbo.BannerInsertType",
                    Value = bannerTable
                }
            };

            var rowsAffected = await _spRepo.ExecuteAsync(
                "[dbo].[usp_BulkUpdateBanners]",
                CancellationToken,
                parameters
            );

            return Result<int>.Success(rowsAffected);
        }
    }
}
