using api.Exceptions;
using api.Models.Roles;
using api.Models.Users;
using Api.Models.Users;
using System.ComponentModel.DataAnnotations;
using api.Models.Inventory;
using api.Models.Banners;
using api.Models.Shops;
using api.Models.Orders;
using api.Models.Coupons;
using api.Models.Promotions;
using api.Utilities;

namespace api.Models
{
    public class User
    {
        /// <summary>
        /// Tạo mới một user với thông tin cơ bản và liên kết đến đăng nhập bên ngoài (nếu có)
        /// </summary>
        /// <param name="id"></param>
        /// <param name="email"></param>
        /// <param name="role"></param>
        /// <param name="provider"></param>
        /// <param name="providerKey"></param>
        /// <returns></returns>
        public static User Create(Guid id,string email, Role role, string provider, String providerKey)
        {
            UserExternalLogin ux = UserExternalLogin.Create(provider, providerKey);
            UserDetail ud = UserDetail.Create();
            return new User
            {
                Id = id, 
                Email = email.ToLower().Trim(),
                Role = role,
                UserExternalLogin = ux,
                UserDetail = ud
            };
        }
        public Guid Id { get; set; }

        [Required]
        public required string Email { get; set; }
        public string PasswordHash { get; set; } = string.Empty;

        public string? Phone { get; set; }

        public string FullName { get; set; } = string.Empty;

        //public bool isShop { get; set; }
        //public bool isActive { get; set; }

        public DateTimeOffset CreateAt { get; set; }

        public DateTimeOffset? UpdateAt { get; set; }

        public DateTimeOffset? DeleteAt { get; set; }

        public int RoleId { get; set; }
        public virtual Role Role { get; set; } = default!;
        public virtual UserDetail? UserDetail { get; set; }
        public virtual Shop? Shop { get; set; }
        public virtual UserExternalLogin?  UserExternalLogin{ get;  set; }
        public virtual ICollection<Address> Addresses { get; set; } = new HashSet<Address>();
        public ICollection<GoodsIssue> GoodsIssues { get; set; } = new HashSet<GoodsIssue>();
        public ICollection<UserBanking> UserBankings { get; set; } = new HashSet<UserBanking>();
        public ICollection<Banner> Banners { get; set; } = new HashSet<Banner>();
        public ICollection<Invoice> Invoices { get; set; } = new HashSet<Invoice>();
        public ICollection<UserSavedCoupon> UserSavedCoupons { get; set; } = new HashSet<UserSavedCoupon>();
        public ICollection<Promotion> Promotions { get; set; } = new HashSet<Promotion>();

        public void SetPassword(string hash)
        {
            if (string.IsNullOrEmpty(hash)) throw new InternalServerErrorException("user: mật khẩu bị null");
            this.PasswordHash = hash;
        }

        internal void Update(string fullname, string phoneNumber, string? avatarUrl, List<string>? addresses, Guid userId)
        {
            if (!string.IsNullOrEmpty(fullname)) FullName = fullname;
            if (!string.IsNullOrEmpty(phoneNumber)) Phone = phoneNumber;
            if (!string.IsNullOrEmpty(avatarUrl)) UserDetail!.AvatarUrl = avatarUrl;
            if (addresses != null && addresses.Any()) Addresses = new HashSet<Address>(addresses.Select(a => Address.Create(userId, a)));
        }

        internal void UpdatePassword(string newHash)
        {
            if (string.IsNullOrWhiteSpace(newHash))
                throw new ArgumentException("Password hash cannot be empty.");

            PasswordHash = newHash;
        }

        internal Result<bool> AddShop(Shop shop)
        {
            this.Shop = shop;
            return Result<bool>.Success(true);
        }
    }
}
