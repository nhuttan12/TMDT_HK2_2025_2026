namespace api.Models.Payments
{
    public enum PaymentStatus
    {
        Pending = 1,     // Đang chờ thanh toán
        Completed = 2,   // Thanh toán thành công
        Failed = 3,      // Thanh toán thất bại
        Refunded = 4     // Đã hoàn tiền (nếu hủy đơn)
    }
}
