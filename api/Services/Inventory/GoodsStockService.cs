using api.Dtos.Common;
using api.Dtos.Inventory.Response;
using api.Repository.Inventory;
using api.Utilities;

namespace api.Services.Inventory
{
    public class GoodsStockService (
        IGoodsStockRepository goodsStockRepository
        ) : IGoodsStockService
    {
        public async Task<Result<PagedResult<ProductInStockDtoResponse>>> GetProductInStockPagingAsync(Guid shopId, PaginationRequestDto pagination, CancellationToken cancellationToken = default)
        {
            var pagedResult = await goodsStockRepository.GetPagedRawProductInStockAsync(
            shopId,
            pagination,
            cancellationToken);

            // 3. Gói lại vào Result.Success và trả lên Controller
            return Result<PagedResult<ProductInStockDtoResponse>>.Success(pagedResult);
        }

        public async Task<Result<PagedResult<ProductInStockDtoResponse>>> GetPagedProductsInStockByVariantNameAsync(Guid shopId, string? productName, PaginationRequestDto request, CancellationToken cancellationToken)
        {
            var result = await goodsStockRepository.GetPagedProductsInStockByVariantNameAsync(shopId, productName, request, cancellationToken);

            return Result<PagedResult<ProductInStockDtoResponse>>.Success(result);
        }

        public async Task<Result<GoodsStockSummaryDto>> GetStockSummaryAsync(Guid shopId, CancellationToken cancellationToken)
        {
            var result = await goodsStockRepository.GetStockSummaryAsync(shopId, cancellationToken);

            return Result<GoodsStockSummaryDto>.Success(result);
        }

        public async Task<Result<PagedResult<ProductBySupplierIdResponse>>> GetProductPagingBySupplierId(Guid supplierId, Guid shopId, PaginationRequestDto pagination, CancellationToken cancellationToken = default)
        {
            if (shopId == Guid.Empty || supplierId == Guid.Empty)
            {
                return Result<PagedResult<ProductBySupplierIdResponse>>.Failure(
                    new Error("Product.InvalidId", "Mã cửa hàng hoặc mã nhà cung cấp không hợp lệ.")
                );
            }

            // Bóc tách DTO phân trang lấy tham số nguyên thủy truyền cho tầng dữ liệu
            var pagedResult = await goodsStockRepository.GetProductPagingBySupplierId(
                supplierId,
                shopId,
                pagination.PageNumber,
                pagination.PageSize,
                cancellationToken
            );

            return Result<PagedResult<ProductBySupplierIdResponse>>.Success(pagedResult);
        }
    }
}
