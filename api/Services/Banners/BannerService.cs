using api.Dtos.Banners.Request;
using api.Dtos.Common;
using api.Repository;
using api.Utilities;
using Microsoft.Data.SqlClient;
using System.Data;

namespace api.Services.Banners
{
    public class BannerService : IBannerService
    {
        private readonly IStoredProcedureRepository _spRepository;

        public BannerService(IStoredProcedureRepository spRepository)
        {
            _spRepository = spRepository;
        }

        public async Task<Result<int>> BulkUpdateBannersAsync(Guid userId, List<UpdateBannerDto> banners)
        {
            if (banners == null || !banners.Any()) return 0;

            var bannerTable = new DataTable();
            bannerTable.Columns.Add("ImageUrl", typeof(string));
            bannerTable.Columns.Add("Invoice", typeof(int));
            bannerTable.Columns.Add("IsPrimary", typeof(bool));

            foreach (var banner in banners)
            {
                bannerTable.Rows.Add(banner.Url, banner.Order, banner.IsPrimary);
            }

            var userIdParam = new SqlParameter("@UserId", SqlDbType.UniqueIdentifier)
            {
                Value = userId
            };

            var bannersParam = new SqlParameter("@Banners", SqlDbType.Structured)
            {
                TypeName = "dbo.BannerInsertType",
                Value = bannerTable
            };

            var result = await _spRepository.QueryAsync<RowsAffectedResponse>(
                "[dbo].[usp_BulkUpdateBanners]", userIdParam, bannersParam
                );

            var rowsAffected = result.Sum(row => row.RowsAffected);

            return Result<int>.Success(rowsAffected);
        }
    }
}
