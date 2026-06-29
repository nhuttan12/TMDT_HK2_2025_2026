using api.Dtos.Common;
using api.Dtos.Inventory.Response;
using api.Utilities;

namespace api.Services.Inventory
{
    public interface IGoodsSupplierService
    {
        Task<Result<Guid>> CreateSupplierAsync(Guid shopId, CreateSupplierRequestDto request, CancellationToken cancellationToken = default);
        Task<Result<GoodsSupplierDetailResponseDto>> GetSupplierDetailAsync(
            Guid shopId,
            Guid supplierId,
            CancellationToken cancellationToken = default);
        Task<Result<PagedResult<GoodsSupplierResponseDto>>> GetSupplierListPagingAsync(
            Guid shopId,
            PaginationRequestDto pagination,
            CancellationToken cancellationToken = default);
        Task<Result<IEnumerable<SupplierOptionResponseDto>>> GetSupplierOptionsAsync(
            Guid shopId,
            CancellationToken cancellationToken = default);
        Task<Result<PagedResult<ProductBySupplierIdResponse>>> GetProductPagingBySupplierId(
            Guid supplierId,
            Guid shopId,
            PaginationRequestDto pagination,
            CancellationToken cancellationToken = default);
    }
}
