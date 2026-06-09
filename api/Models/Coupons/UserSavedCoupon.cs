namespace api.Models.Coupons
{
    public class UserSavedCoupon
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }
        public User User { get; set; }

        public Guid CouponId { get; set; }
        public Coupon Coupon { get; set; }

        public bool IsUsed { get; set; }
        public DateTimeOffset SavedAt { get; set; }
        public DateTimeOffset LastUsedAt { get; set; }
    }
}
