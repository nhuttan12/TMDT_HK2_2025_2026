using api.Utilities;

namespace api.Dtos.Common
{
    public record PaginationRequestDto
    {
        private const int MaxPageSize = 50; // Giới hạn cứng, không cho phép lấy quá 50 record/lần
        private readonly int _pageSize = 10;

        public int PageNumber { get; init; } = 1;

        public int PageSize
        {
            get => _pageSize;
            init => _pageSize = (value > MaxPageSize) ? MaxPageSize : (value < 1 ? 10 : value);
        }

        internal Result<PaginationRequestDto> ValidData()
        {
            // 1. Kiểm tra PageNumber hợp lệ
            if (PageNumber < 1)
            {
                return Result<PaginationRequestDto>.Failure(
                    new Error(
                        "Pagination.PageNumber.Invalid",
                        "Page number must be greater than or equal to 1.",
                        ErrorType.Validation)
                );
            }

            // 2. Kiểm tra PageSize hợp lệ (Fail Fast thay vì âm thầm ép kiểu)
            if (PageSize < 1 || PageSize > MaxPageSize)
            {
                return Result<PaginationRequestDto>.Failure(
                    new Error(
                        "Pagination.PageSize.Invalid",
                        $"Page size must be between 1 and {MaxPageSize}.",
                        ErrorType.Validation)
                );
            }

            return Result<PaginationRequestDto>.Success(this);
        }
    }
}
