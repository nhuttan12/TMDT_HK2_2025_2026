using api.Utilities;

namespace api.Dtos.Products.Request;

public record ProductCreateDto(
    string Name,
    decimal BasePrice,
    string ImageUrl,
    string Summary,
    string DescriptionHTML,
    Guid ShopID,
    Guid CategoryID)
{
    internal Result<ProductCreateDto> ValidData()
    {
        // 1. Tối ưu: Kiểm tra null, rỗng và khoảng trắng bằng string.IsNullOrWhiteSpace.
        // 2. Defensive Programming: Giới hạn độ dài tối đa (MaxLength) để tránh Memory LOH (Large Object Heap) fragmentation.

        if (string.IsNullOrWhiteSpace(Name) || Name.Length > 200)
        {
            return Result<ProductCreateDto>.Failure(
                Error.Create("Product.Name.Invalid", "Product name is required and cannot exceed 200 characters.", ErrorType.Validation));
        }

        // Cân nhắc thêm chặn max price nếu hệ thống có giới hạn nghiệp vụ (ví dụ: < 1,000,000,000)
        if (BasePrice <= 0)
        {
            return Result<ProductCreateDto>.Failure(
                Error.Create("Product.BasePrice.Invalid", "Base price must be strictly greater than zero.", ErrorType.Validation));
        }

        if (ShopID == Guid.Empty)
        {
            return Result<ProductCreateDto>.Failure(
                Error.Create("Product.ShopID.Invalid", "Shop ID is required.", ErrorType.Validation));
        }

        if (string.IsNullOrWhiteSpace(Summary) || Summary.Length > 500)
        {
            return Result<ProductCreateDto>.Failure(
                Error.Create("Product.Summary.Invalid", "Product summary is required and cannot exceed 500 characters.", ErrorType.Validation));
        }

        // DescriptionHTML có thể dài, nhưng vẫn cần một giới hạn an toàn nhất định (vd: 10,000 ký tự)
        if (string.IsNullOrWhiteSpace(DescriptionHTML) || DescriptionHTML.Length > 10000)
        {
            return Result<ProductCreateDto>.Failure(
                Error.Create("Product.DescriptionHTML.Invalid", "Product description is required and exceeds allowed length.", ErrorType.Validation));
        }

        if (CategoryID == Guid.Empty)
        {
            return Result<ProductCreateDto>.Failure(
                Error.Create("Product.CategoryID.Invalid", "Product category ID is required.", ErrorType.Validation));
        }

        // Nếu tất cả hợp lệ, trả về Success chứa chính object này
        return Result<ProductCreateDto>.Success(this);
    }
}