namespace api.Models.Utilities
{
    public class Pagination<T>(IEnumerable<T> items, int totalItems, int pageNumber, int pageSize)
    {
        public IEnumerable<T> Items { get; set; } = items;
        // tổng số phần tử trong toàn bộ tập dữ liệu (không phải chỉ trên trang hiện tại)
        public required int TotalItems { get; set; } = totalItems;
        // vị trí trang hiện tại, bắt đầu từ 1
        public required int PageNumber { get; set; } = pageNumber;
        // số lượng phần tử trên mỗi trang
        public required int PageSize { get; set; } = pageSize;
        // tổng số trang, được tính dựa trên TotalItems và PageSize
        public int TotalPages => (int)Math.Ceiling((double)TotalItems / PageSize);

        //public bool hasNext => PageNumber < TotalPages;
        //public bool hasPrevious => PageNumber > 1;

    }
}
