using api.Models.Orders;

namespace api.Models.Coupons
{
    public class InvoiceAppliedCoupon
    {
        public Guid Id { get; set; }

        public Guid InvoiceId { get; set; }
        public Invoice Invoice { get; set; }

        public Guid CouponId { get; set; } = Guid.Empty;
        public Coupon Coupon { get; set; } 

        public decimal DiscountAmount { get; set; }
        public DateTimeOffset AppliedAt { get; set; }
    }
}
