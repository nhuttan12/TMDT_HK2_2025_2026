using api.model.Products;
using api.Utilities;

namespace api.Dtos.Products.Request
{
    public record FilterProductQueryDto(
        string? Name,
        Guid? CategoryId,
        decimal? MinPrice,
        decimal? MaxPrice,
        decimal? MinRating,
        decimal? MaxRating,
        ProductStatus? Status
    )
    {
        internal Result<FilterProductQueryDto> ValidData()
        {
            // Fail Fast: Kiểm tra tính hợp lý của khoảng giá
            if (MinPrice.HasValue && MaxPrice.HasValue && MinPrice > MaxPrice)
            {
                return Result<FilterProductQueryDto>.Failure(
                    new Error("Filter.Price.Invalid", "MinPrice cannot be greater than MaxPrice.", ErrorType.Validation));
            }

            if (MinPrice.HasValue && MinPrice < 0)
            {
                return Result<FilterProductQueryDto>.Failure(
                    new Error("Filter.MinPrice.Invalid", "MinPrice cannot be negative.", ErrorType.Validation));
            }

            // Fail Fast: Kiểm tra tính hợp lý của khoảng Rating (Giả sử scale từ 1.0 đến 5.0)
            if (MinRating.HasValue && MaxRating.HasValue && MinRating > MaxRating)
            {
                return Result<FilterProductQueryDto>.Failure(
                   new Error("Filter.Rating.Invalid", "MinRating cannot be greater than MaxRating.", ErrorType.Validation));
            }

            return Result<FilterProductQueryDto>.Success(this);
        }
    }
}
