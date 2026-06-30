namespace api.Models.Payments
{
    public enum PaymentStatus
    {
        Unknown = 0,
        Unpaid = 1,       // Chưa thanh toán (Dùng thay cho AwaitingPayment)
        Processing = 2,   // Đang xử lý (Dành cho các cổng thanh toán cần thời gian callback/đối soát)
        Completed = 3,    // Đã thanh toán thành công
        Failed = 4,       // Thanh toán thất bại
        Refunded = 5      // Đã hoàn tiền thành công
    }
}
