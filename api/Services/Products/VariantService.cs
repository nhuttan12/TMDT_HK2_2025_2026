using api.Controllers;
using api.Dtos.Products.Request;
using api.Dtos.Products.Respones;
using api.Models.Products;
using api.Repository;
using api.Repository.ProductRepo;
using api.Utilities;
using AutoMapper;

namespace api.Services.Products
{
    public interface IVariantService
    {
        Task<Result<VariantResponseDto>> GetVariantByIdAsync(Guid id, CancellationToken cancellationToken = default);
        Task<Result<IReadOnlyCollection<VariantResponseDto>>> GetVariantsByProductIdAsync(Guid productId, CancellationToken cancellationToken = default);
        Task<Result<VariantResponseDto>> CreateVariantAsync(Guid productId, VariantCreateDto createDto, CancellationToken cancellationToken = default);
        Task<Result<VariantResponseDto>> UpdateVariantAsync(Guid id, VariantUpdateDto updateDto, CancellationToken cancellationToken = default);
        Task<Result<bool>> DeleteVariantAsync(Guid id, CancellationToken cancellationToken = default);
    }

    // Dùng 'sealed' để JIT Compiler tối ưu Devirtualization
    public sealed class VariantService(
        IUnitOfWork unitOfWork,
        ILogger<VariantService> logger, // ĐÃ SỬA: Dùng đúng Logger của Service
        IMapper mapper,
        IIdGenerator idGenerator,
        IVariantRepository variantRepo,
        IProductRepository productRepo) : IVariantService // BỔ SUNG: IProductRepository để check Product
    {
        public async Task<Result<VariantResponseDto>> GetVariantByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            // TỐI ƯU: Truy vấn Read-Only luôn phải dùng AsNoTracking để giảm áp lực RAM
            var variant = await variantRepo.GetByIdAsync(id, false, cancellationToken);
            if (variant is null)
                return Result<VariantResponseDto>.Failure(Error.Create("Variant.NotFound", "Không tìm thấy biến thể.", ErrorType.NotFound));

            return Result<VariantResponseDto>.Success(mapper.Map<VariantResponseDto>(variant));
        }

        public async Task<Result<IReadOnlyCollection<VariantResponseDto>>> GetVariantsByProductIdAsync(Guid productId, CancellationToken cancellationToken = default)
        {
            // Fail Fast: Đảm bảo Product tồn tại trước khi get Variants
            var product = await productRepo.GetByIdAsync(productId, cancellationToken);
            if (product is null)
                return Result<IReadOnlyCollection<VariantResponseDto>>.Failure(Error.Create("Product.NotFound", "Sản phẩm không tồn tại.", ErrorType.NotFound));

            var variants = await variantRepo.GetByProductIdAsNoTrackingAsync(productId, cancellationToken);

            // AutoMapper hỗ trợ map trực tiếp Collection
            var response = mapper.Map<IReadOnlyCollection<VariantResponseDto>>(variants);
            return Result<IReadOnlyCollection<VariantResponseDto>>.Success(response);
        }

        public async Task<Result<VariantResponseDto>> CreateVariantAsync(Guid productId, VariantCreateDto createDto, CancellationToken cancellationToken = default)
        {
            // 1. Kiểm tra khóa ngoại (Product tồn tại không?)
            var product = await productRepo.GetByIdAsync(productId, cancellationToken);
            if (product is null)
                return Result<VariantResponseDto>.Failure(Error.Create("Product.NotFound", "Sản phẩm không tồn tại.", ErrorType.NotFound));

            // 2. Domain Logic: Khởi tạo Entity bằng Factory Method đã viết
            var variantId = idGenerator.NewId();
            var variantResult = Variant.InternalCreate(
                variantId,
                productId,
                createDto.Sku,
                createDto.Name,
                createDto.CostPrice,
                createDto.SellPrice,
                createDto.ImageUrl);

            if (variantResult.IsFailure)
                return Result<VariantResponseDto>.Failure(variantResult.Error);

            var variant = variantResult.Value!;

            // 3. Database I/O
            await variantRepo.AddAsync(variant, cancellationToken);
            await unitOfWork.CommitAsync(cancellationToken);

            logger.LogInformation("Created Variant {VariantId} for Product {ProductId}", variant.Id, productId);

            return Result<VariantResponseDto>.Success(mapper.Map<VariantResponseDto>(variant));
        }

        public async Task<Result<VariantResponseDto>> UpdateVariantAsync(Guid id, VariantUpdateDto updateDto, CancellationToken cancellationToken = default)
        {
            // Load Entity và để EF Core tự động Tracking state
            var variant = await variantRepo.GetByIdAsync(id, true, cancellationToken);
            if (variant is null)
                return Result<VariantResponseDto>.Failure(Error.Create("Variant.NotFound", "Không tìm thấy biến thể.", ErrorType.NotFound));

            // Gọi hàm Update bên trong Model (Bạn cần tự bổ sung hàm Update(name, price...) vào class Variant)
            variant.Update(variant, updateDto);

            // Không cần gọi Repo.Update() vì Entity đã được Tracking
            await unitOfWork.CommitAsync(cancellationToken);

            logger.LogInformation("Updated Variant {VariantId}", variant.Id);

            return Result<VariantResponseDto>.Success(mapper.Map<VariantResponseDto>(variant));
        }

        public async Task<Result<bool>> DeleteVariantAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var variant = await variantRepo.GetByIdAsync(id, true, cancellationToken);
            if (variant is null)
                return Result<bool>.Failure(Error.Create("Variant.NotFound", "Không tìm thấy biến thể.", ErrorType.NotFound));

            variant.Delete();

            await unitOfWork.CommitAsync(cancellationToken);
            logger.LogInformation("Deleted Variant {VariantId}", variant.Id);

            return Result<bool>.Success(true);
        }
    }
}