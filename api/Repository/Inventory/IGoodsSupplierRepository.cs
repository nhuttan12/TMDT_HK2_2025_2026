using api.Dtos.Common;
using api.Dtos.Inventory.Response;
using api.Utilities;

namespace api.Repository.Inventory
{
    public interface IGoodsSupplierRepository
    {
        Task<Guid> CreateSupplierAsync(Guid shopId, CreateSupplierRequestDto request, CancellationToken cancellationToken);
        Task<GoodsSupplierDetailResponseDto?> GetSupplierDetailAsync(
            Guid shopId,
            Guid supplierId,
            CancellationToken cancellationToken);
        Task<PagedResult<GoodsSupplierResponseDto>> GetSupplierListPagingAsync(
            Guid shopId,
            PaginationRequestDto pagination,
            CancellationToken cancellationToken);
        Task<IEnumerable<SupplierOptionResponseDto>> GetSupplierOptionsByShopIdAsync(
            Guid shopId,
            CancellationToken cancellationToken);
        Task<PagedResult<ProductBySupplierIdResponse>> GetProductPagingBySupplierId(
            Guid supplierId,
            Guid shopId,
            int pageNumber,
            int pageSize,
            CancellationToken cancellationToken);
    }
}
