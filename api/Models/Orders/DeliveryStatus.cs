namespace api.Models.Orders
{
    public enum DeliveryStatus
    {
        Pending = 1,     // Chờ xử lý
        InTransit = 2,   // Đang giao hàng
        Delivered = 3,   // Đã giao thành công
        Cancelled = 4    // Đã hủy giao
    }
}
