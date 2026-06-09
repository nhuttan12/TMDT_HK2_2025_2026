using api.Models.Coupons.Enums;

namespace api.Models.Coupons
{
    public class Coupon
    {
        public Guid Id { get; set; }

        public string Code { get; set; }
        public string Name { get; set; }

        public ECouponScope Scope { get; set; }
        public ECouponCategory Category { get; set; }
        public ECouponType Type { get; set; }

        public decimal DiscountValue { get; set; }
        public decimal MaxDiscountAmount { get; set; }
        public decimal MinOrderValue { get; set; }

        public int TotalQuantity { get; set; }
        public int UsedQuantity { get; set; }
        
        public DateTimeOffset StartAt { get; set; }
        public DateTimeOffset EndAt { get; set; }
        public bool Status { get; set; }

        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset UpdatedAt { get; set; }

        public ICollection<UserSavedCoupon> UserSavedCoupons { get; set; } = new HashSet<UserSavedCoupon>();
        public ICollection<InvoiceAppliedCoupon> AppliedInvoices { get; set; } = new HashSet<InvoiceAppliedCoupon>();
    }
}
