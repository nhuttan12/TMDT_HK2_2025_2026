namespace api.Models.Orders
{
    public enum DeliveryStatus
    {
        Unknown = 0,
        Pending = 1,         // Chờ shop chuẩn bị hàng và bàn giao cho ĐVVC
        Assigned = 2,        // Đã có tài xế/ĐVVC nhận đơn hàng
        InTransit = 3,       // Shipper đang lấy hàng hoặc đang trên đường giao
        Delivered = 4,       // Khách đã ký nhận (Tương đương Delivered cũ của bạn)
        Failed = 5,          // Giao thất bại (Bom hàng, không liên lạc được)
        ReturnedToSender = 6 // Hàng đang/đã hoàn về kho của người bán
    }
}
