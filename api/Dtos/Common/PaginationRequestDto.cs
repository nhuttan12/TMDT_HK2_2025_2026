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
    }
}
