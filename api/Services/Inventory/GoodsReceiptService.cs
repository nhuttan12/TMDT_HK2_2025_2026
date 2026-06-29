using api.Dtos.Common;
using api.Dtos.Inventory.Requests;
using api.Dtos.Inventory.Response;
using api.Repository.Inventory;
using api.Utilities;

namespace api.Services.Inventory
{
    public class GoodsReceiptService (
        IGoodsReceiptRepository goodsReceiptRepository
        ) : IGoodsReceiptService
    {
        public async Task<Result<Guid>> CreateGoodsReceiptAsync(Guid shopId, CreateGoodsReceiptRequest request, CancellationToken cancellationToken)
        {
            var result = await goodsReceiptRepository.CreateGoodsReceiptAsync(shopId, request, cancellationToken);

            return Result<Guid>.Success(result);
        }

        public async Task<Result<PagedResult<GoodsReceiptPagingDtoResponse>>> GetGoodsReceiptsByCodePagingAsync(Guid shopId, string code, PaginationRequestDto request, CancellationToken cancellationToken)
        {
            var result = await goodsReceiptRepository.GetGoodsReceiptsByCodePagingAsync(shopId, code, request, cancellationToken);

            return Result<PagedResult<GoodsReceiptPagingDtoResponse>>.Success(result);
        }

        public async Task<Result<PagedResult<GoodsReceiptPagingDtoResponse>>> GetGoodsReceiptsPagingAsync(Guid shopId, PaginationRequestDto request, CancellationToken cancellationToken)
        {
            var result = await goodsReceiptRepository.GetGoodsReceiptsPagingAsync(shopId, request, cancellationToken);

            return Result<PagedResult<GoodsReceiptPagingDtoResponse>>.Success(result);
        }

        public async Task<Result<PagedResult<ProductBatchPagingDtoResponse>>> GetProductListInBatchPagingAsync(GetProductListInBatchRequest request, PaginationRequestDto pagination, CancellationToken cancellationToken)
        {
            var result = await goodsReceiptRepository.GetProductListInBatchPagingAsync(request, pagination, cancellationToken);

            return Result<PagedResult<ProductBatchPagingDtoResponse>>.Success(result);
        }

        public async Task<Result<IEnumerable<ProductSelectionResponse>>> GetProductSelectionForGoodsReceiptAsync(Guid shopId, CancellationToken cancellationToken = default)
        {
            var result = await goodsReceiptRepository.GetProductSelectionForGoodsReceiptAsync(shopId, cancellationToken);

            return Result<IEnumerable<ProductSelectionResponse>>.Success(result);
        }

        public async Task<Result<IEnumerable<ProductVariantSelectionResponse>>> GetProductVariantSelectionAsync(Guid shopId, Guid productId, CancellationToken cancellationToken)
        {
            var result = await goodsReceiptRepository.GetProductVariantSelectionAsync(shopId, productId, cancellationToken);

            return Result<IEnumerable<ProductVariantSelectionResponse>>.Success(result);
        }

        public async Task<Result<GoodsReceiptDetailResponse>> GetReceiptDetailAsync(
            Guid userId, Guid receiptId, CancellationToken cancellationToken)
        {
            var result = await goodsReceiptRepository.GetReceiptDetailAsync(
                userId,
                receiptId,
                cancellationToken);

            if (result == null)
            {
                return Result<GoodsReceiptDetailResponse>.Failure(Error.Create("NotFound", "Không tìm thấy phiếu nhập kho hoặc bạn không có quyền truy cập."));
            }

            return Result<GoodsReceiptDetailResponse>.Success(result);
        }
    }
}
