using api.Dtos.Common;
using api.Dtos.Inventory.Response;
using api.Repository.Inventory;
using api.Utilities;

namespace api.Services.Inventory
{
    public class GoodsSupplierService (
        IGoodsSupplierRepository goodsSupplierRepository
        ) : IGoodsSupplierService
    {
        public async Task<Result<Guid>> CreateSupplierAsync(Guid shopId, CreateSupplierRequestDto request, CancellationToken cancellationToken = default)
        {
            var newSupplierId = await goodsSupplierRepository.CreateSupplierAsync(shopId, request, cancellationToken);

            // 3. Trả về Result thành công chứa ID vừa tạo
            return Result<Guid>.Success(newSupplierId);
        }

        public async Task<Result<PagedResult<GoodsSupplierResponseDto>>> GetSupplierListPagingAsync(Guid shopId, PaginationRequestDto pagination, CancellationToken cancellationToken = default)
        {
            if (shopId == Guid.Empty)
            {
                return Result<PagedResult<GoodsSupplierResponseDto>>.Failure(
                    new Error("Supplier.InvalidShop", "Mã định danh cửa hàng không hợp lệ.")
                );
            }

            // Unpack tham số từ DTO Phân trang truyền xuống Repo
            var pagedResult = await goodsSupplierRepository.GetSupplierListPagingAsync(
                shopId,
                pagination,
                cancellationToken
            );

            return Result<PagedResult<GoodsSupplierResponseDto>>.Success(pagedResult);
        }

        public async Task<Result<GoodsSupplierDetailResponseDto>> GetSupplierDetailAsync(Guid shopId, Guid supplierId, CancellationToken cancellationToken = default)
        {
            if (shopId == Guid.Empty || supplierId == Guid.Empty)
            {
                return Result<GoodsSupplierDetailResponseDto>.Failure(
                    new Error("Supplier.InvalidId", "Mã định danh không hợp lệ.")
                );
            }

            // 2. Gọi xuống Repo lấy dữ liệu
            var supplier = await goodsSupplierRepository.GetSupplierDetailAsync(
                shopId,
                supplierId,
                cancellationToken
            );

            // 3. Nếu DB trả về null -> Nghĩa là không tìm thấy hoặc người dùng đang cố hack ID của shop khác
            if (supplier is null)
            {
                return Result<GoodsSupplierDetailResponseDto>.Failure(
                    new Error("Supplier.NotFound", "Không tìm thấy thông tin nhà cung cấp.", ErrorType.NotFound)
                );
            }

            // 4. Thành công
            return Result<GoodsSupplierDetailResponseDto>.Success(supplier);
        }

        public async Task<Result<IEnumerable<SupplierOptionResponseDto>>> GetSupplierOptionsAsync(Guid shopId, CancellationToken cancellationToken = default)
        {
            if (shopId == Guid.Empty)
            {
                return Result<IEnumerable<SupplierOptionResponseDto>>.Failure(
                    new Error("Supplier.InvalidShop", "Mã cửa hàng không hợp lệ.")
                );
            }

            var suppliers = await goodsSupplierRepository.GetSupplierOptionsByShopIdAsync(
                shopId,
                cancellationToken
            );

            return Result<IEnumerable<SupplierOptionResponseDto>>.Success(suppliers);
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
            var pagedResult = await goodsSupplierRepository.GetProductPagingBySupplierId(
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
