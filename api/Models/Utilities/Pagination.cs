namespace api.Models.Utilities
{
    /// <summary>
    /// Lớp bọc kết quả phân trang chuẩn hóa
    /// </summary>
    public class Pagination<T>
    {
        public IReadOnlyList<T> Items { get; init; }
        public int TotalItems { get; init; }
        public int PageNumber { get; init; }
        public int PageSize { get; init; }
        public int TotalPages => (int)Math.Ceiling((double)TotalItems / PageSize);

        public bool HasNext => PageNumber < TotalPages;
        public bool HasPrevious => PageNumber > 1;

        public Pagination(IEnumerable<T> items, int totalItems, int pageNumber, int pageSize)
        {
            // Chuyển sang List để tránh lazy evaluation (tránh duyệt lại nhiều lần)
            Items = items.ToList().AsReadOnly();
            TotalItems = totalItems;
            PageNumber = pageNumber;
            PageSize = pageSize;
        }
    }
}