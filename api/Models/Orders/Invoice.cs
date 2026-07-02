using api.Models.Coupons;
using api.Models.Enums;
using api.Models.Payments;
using api.Models.Shops;

namespace api.Models.Orders
{
    public class Invoice
    {
        public Guid Id { get; private set; }
        public Guid UserId { get; private set; }
        public User User { get; private set; }

        public Guid? ShopId { get; private set; }
        public Shop? Shop { get; private set; }

        public Guid? CouponId { get; private set; }
        public InvoiceAppliedCoupon? AppliedCoupon { get; private set; } = null;
        public Guid? DeliveryId { get; private set; }
        public Delivery? Delivery { get; private set; } = null;
        public Guid? PaymentId { get; private set; }
        public Payment Payment { get; private set; } = null;
        public ICollection<InvoiceAppliedCoupon> AppliedCoupons { get; private set; } = new HashSet<InvoiceAppliedCoupon>();
        public decimal TotalAmount { get; private set; }
        public decimal FinalAmount { get; private set; }
        public InvoiceStatus Status { get; private set; }
        private readonly List<InvoiceItem> _items = new();
        public IReadOnlyCollection<InvoiceItem> Items => _items.AsReadOnly();

        public DateTimeOffset CreatedAt { get; private set; }
        public DateTimeOffset UpdatedAt { get; private set; }

        private Invoice() { }

        public static Invoice Create(Guid id,Guid? userId,Coupon? coupon = null)
        {

            return new Invoice
            {
                Id = id,
                UserId = userId!.Value,
                Status = InvoiceStatus.Pending, // Trạng thái mặc định an toàn
                TotalAmount = 0, // Sẽ được cộng dồn khi thêm Item
                FinalAmount = 0
            };
        }

        // Logic nghiệp vụ nằm ngay trong Entity (Fail Fast)
        public void AddItem(Guid productId, Guid variantId, int quantity, decimal priceAtPurchase)
        {
            if (quantity <= 0) throw new ArgumentException("Số lượng phải lớn hơn 0");
            if (priceAtPurchase < 0) throw new ArgumentException("Giá không được âm");

            var item = new InvoiceItem(Id, productId, variantId, quantity, priceAtPurchase);
            _items.Add(item);

            // Tự động tính toán lại tổng tiền để đảm bảo tính toàn vẹn (Không ai được phép set tay TotalAmount)
            TotalAmount += quantity * priceAtPurchase;
            this.RecalculateFinalAmount();
        }

        // --- Các phương thức nghiệp vụ (Business Logic) ---

        public void ApplyCoupon(Guid couponId, InvoiceAppliedCoupon appliedCoupon)
        {
            if (couponId == Guid.Empty) throw new ArgumentException("CouponId không hợp lệ.");
            if (appliedCoupon == null) throw new ArgumentNullException(nameof(appliedCoupon), "Thông tin coupon áp dụng không được null.");
            if (appliedCoupon.DiscountAmount < 0) throw new ArgumentException("Số tiền giảm giá không được âm.");

            // Đóng gói dữ liệu vào Domain
            this.CouponId = couponId;
            this.AppliedCoupon = appliedCoupon;

            // Tính toán lại giá tiền cuối cùng
            this.RecalculateFinalAmount();
        }

        public void AddDelivery(Delivery delivery)
        {
            if (delivery == null) throw new ArgumentNullException(nameof(delivery), "Thông tin giao hàng không được null.");
            if (this.Status != InvoiceStatus.Pending)
                throw new InvalidOperationException("Không thể thêm thông tin giao hàng khi hóa đơn đã được xử lý.");

            // Gán thông tin định danh và đối tượng giao hàngz
            this.DeliveryId = delivery.Id;
            this.Delivery = delivery;

            // Tính toán lại giá tiền cuối cùng (nếu phí vận chuyển cộng dồn vào hóa đơn)
            this.RecalculateFinalAmount();
        }

        // Hàm private nội tại phục vụ việc tính toán, ngăn chặn việc phá vỡ tính toàn vẹn dữ liệu từ bên ngoài
        private void RecalculateFinalAmount()
        {
            // 1. Khởi tạo giá cuối bằng tổng tiền hàng ban đầu
            decimal calculatedAmount = this.TotalAmount;

            // 2. Trừ tiền giảm giá từ Coupon nếu có
            if (this.CouponId is not null && this.AppliedCoupon is not null)
            {
                calculatedAmount -= this.AppliedCoupon.DiscountAmount;
            }

            // 3. Cộng thêm phí vận chuyển từ Delivery nếu có
            if (this.Delivery is not null)
            {
                calculatedAmount += this.Delivery.ShippingFee;
            }

            // Đảm bảo số tiền cuối cùng không bị âm do giảm giá vượt giá trị đơn hàng
            this.FinalAmount = Math.Max(0, calculatedAmount);
        }

        internal void SetDeliveryId(Guid deliveryId, decimal shippingFee)
        {
            if (deliveryId == Guid.Empty) throw new ArgumentException("DeliveryId không hợp lệ.");
            if (this.Status != InvoiceStatus.Pending)
                throw new InvalidOperationException("Không thể gán đơn giao hàng khi hóa đơn đã được xử lý.");

            // 1. Chỉ cập nhật ID liên kết (Khóa ngoại)
            this.DeliveryId = deliveryId;

            // 2. Tự động tính toán lại tiền (Cộng thêm phí ship vào FinalAmount nếu logic của bạn cần)
            // Để hàm RecalculateFinalAmount chạy đúng khi không có navigation property 'Delivery' trên RAM,
            // Bạn có thể sửa nhẹ hàm tính tiền để check thêm trường 'DeliveryId' hoặc truyền phí ship trực tiếp vào.
            this.FinalAmount = (this.TotalAmount + shippingFee);

            // Nếu bạn có áp coupon, hãy giữ nguyên logic trừ coupon:
            if (this.CouponId is not null && this.AppliedCoupon is not null)
            {
                this.FinalAmount -= this.AppliedCoupon.DiscountAmount;
            }
            this.FinalAmount = Math.Max(0, this.FinalAmount);

        }

        // Thêm vào bên trong class Invoice (phía dưới các hàm RecalculateFinalAmount)
        public void MarkAsPaid(Guid paymentId)
        {
            if (this.Status != InvoiceStatus.Pending)
                throw new InvalidOperationException("Chỉ có thể thanh toán cho hóa đơn đang chờ xử lý.");

            if (paymentId == Guid.Empty)
                throw new ArgumentException("Mã thanh toán không hợp lệ.");

            this.PaymentId = paymentId;
            // 🛠️ CẦN ĐẢM BẢO: Trong Enum InvoiceStatus của bạn có trạng thái Paid (hoặc Completed)
            this.Status = InvoiceStatus.Completed;
            this.UpdatedAt = DateTimeOffset.UtcNow;
        }

        internal void setShopId(Guid shopId)
        {
            this.ShopId = shopId;
        }
    }

}
