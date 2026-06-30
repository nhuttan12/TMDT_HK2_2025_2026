namespace api.Models.Enums
{
    public enum InvoiceStatus : byte
    {
        Unknown = 0,

        /// <summary> Đơn hàng mới tạo, hệ thống ghi nhận nhưng chưa bắt đầu xử lý đóng gói (Có thể đang chờ thanh toán hoặc chờ duyệt). </summary>
        Pending = 1,

        /// <summary> Người bán đã xác nhận và đang trong luồng vận hành (Đóng gói, giao cho ĐVVC, đang luân chuyển). </summary>
        Processing = 2,

        /// <summary> Khách đã nhận hàng thành công, hết thời gian khiếu nại, dòng tiền đóng lại (Tiền chuyển về ví người bán). </summary>
        Completed = 3,

        /// <summary> Đơn bị hủy (Do khách, do shop hết hàng, hoặc do hết hạn thanh toán). </summary>
        Cancelled = 4,

        /// <summary> Khách khiếu nại thành công, đơn hàng bị đóng lại để hoàn tiền/thu hồi hàng. </summary>
        Returned = 5
    }
}
