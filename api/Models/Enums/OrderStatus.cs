namespace api.Models.Enums
{
    public enum OrderStatus : byte
    {
        /// <summary>
        /// Chờ thanh toán (Unpaid). 
        /// Khách hàng đã tạo đơn nhưng chưa thanh toán qua cổng thanh toán (VNPay, Momo...).
        /// Nếu hết thời gian quy định (VD: 30 phút), hệ thống sẽ tự động chuyển sang Cancelled.
        /// </summary>
        AwaitingPayment = 1, // Luôn bắt đầu từ 1. Số 0 nên dành cho trạng thái Unknown/Lỗi.

        /// <summary>
        /// Chờ xác nhận (Pending). 
        /// Đã thanh toán thành công hoặc khách chọn thanh toán khi nhận hàng (COD).
        /// Chờ hệ thống hoặc người bán xác nhận có đủ hàng để xử lý hay không.
        /// </summary>
        Pending = 2,

        /// <summary>
        /// Chờ lấy hàng / Đang chuẩn bị hàng (Processing / To Ship). 
        /// Người bán đã xác nhận đơn, đang đóng gói và chờ Đơn vị vận chuyển (ĐVVC) đến lấy.
        /// </summary>
        Processing = 3,

        /// <summary>
        /// Đang giao hàng (Shipped / Shipping). 
        /// ĐVVC đã lấy hàng từ người bán và đang trên đường giao cho người mua.
        /// </summary>
        Shipped = 4,

        /// <summary>
        /// Giao hàng thành công (Delivered). 
        /// Shipper đã giao tới tay khách hàng. 
        /// LƯU Ý: Ở Shopee, trạng thái này CHƯA KẾT THÚC. Tiền vẫn đang bị giam (Escrow), khách có 3-7 ngày để khiếu nại.
        /// </summary>
        Delivered = 5,

        /// <summary>
        /// Hoàn thành (Completed). 
        /// Khách hàng bấm "Đã nhận được hàng" hoặc hết thời hạn khiếu nại.
        /// Lúc này, hệ thống mới kích hoạt luồng đối soát và cộng tiền vào ví người bán.
        /// </summary>
        Completed = 6,

        /// <summary>
        /// Đã hủy (Cancelled). 
        /// Bị hủy bởi người mua, người bán (hết hàng), hoặc hệ thống (hết hạn thanh toán).
        /// </summary>
        Cancelled = 7,

        /// <summary>
        /// Trả hàng / Hoàn tiền (Returned / Refunded). 
        /// Xảy ra sau khi Delivered, khách hàng khiếu nại (hàng lỗi, sai mẫu) và được chấp nhận hoàn tiền.
        /// </summary>
        Returned = 8,

        /// <summary>
        /// Giao hàng thất bại (Delivery Failed). 
        /// Shipper gọi khách 3 lần không được, hoặc khách từ chối nhận hàng (Bom hàng).
        /// Hàng sẽ được hoàn quy trình trả về lại cho người bán.
        /// </summary>
        DeliveryFailed = 9
    }
}
