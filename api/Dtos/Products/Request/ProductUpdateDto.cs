using api.model.Products;
using api.Utilities;

namespace api.Dtos.Products.Request
{
    /// <summary>
    /// DTO cho yêu cầu cập nhật sản phẩm. Không chứa trường Rating vì đây là Computed property.
    /// </summary>
    public record ProductUpdateDto(
        string Name,
        decimal BasePrice,
        string ImageUrl,
        ProductStatus Status
    )
    {
        // Cân nhắc: Chuyển logic này ra FluentValidation ở tầng Dependencies để đảm bảo SRP.
        // Nếu giữ lại, phải Fail Fast ngay lập tức.
        internal Result<bool> Validate()
        {

            if (string.IsNullOrWhiteSpace(Name))
            {
                return Result<bool>.Failure(Error.Create("Product.InvalidName", "Tên sản phẩm không được để trống.", ErrorType.Validation));
            }

            if (Name.Length > 200) // Ví dụ chặn độ dài chuỗi để tránh tràn bộ nhớ DB
            {
                return Result<bool>.Failure(Error.Create("Product.NameTooLong", "Tên sản phẩm vượt quá giới hạn 200 ký tự.", ErrorType.Validation));
            }

            if (BasePrice < 0)
            {
                return Result<bool>.Failure(Error.Create("Product.InvalidPrice", "Giá sản phẩm không được âm.", ErrorType.Validation));
            }

            // Tùy chọn: Validate định dạng URL bằng Uri.TryCreate nếu cần thiết
            if (!string.IsNullOrWhiteSpace(ImageUrl) && !Uri.IsWellFormedUriString(ImageUrl, UriKind.Absolute))
            {
                return Result<bool>.Failure(Error.Create("Product.InvalidImageUrl", "Định dạng hình ảnh không hợp lệ.", ErrorType.Validation));
            }

            return Result<bool>.Success(true);
        }
    }
}
