using api.Exceptions;
using api.Models.Banners;
using api.Models.Common;
using api.Models.Coupons;
using api.Models.Inventory;
using api.Models.Orders;
using api.Models.Promotions;
using api.Models.Roles;
using api.Models.Shops;
using api.Models.Users;
using api.Utilities;
using Api.Models.Users;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Diagnostics.Contracts;

namespace api.Models
{
    public class User : IAuditableEntity
    {
        public const string ROLE_ADMIN = "Admin";
        public const string ROLE_USER = "User";
        public const string ROLE_SHOP = "Shop";
        public const  string LOCAL_KEY = "LOCAL";
        public const string GOOGLE_KEY = "GOOGLE";
        public const string FACEBOOK_KEY = "FACEBOOK";
        public const string LOCAL_PROVIDER = "local";
      
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
<<<<<<< HEAD
        public ICollection<Coupon> Coupons { get; set; } = new HashSet<Coupon>();
=======
       
        public User()
        {
        }
>>>>>>> d99159f8e07b36645b1e6cbf1abf708f8d96a5bf

        public User(Guid id, string email, string fullName, Role role, UserExternalLogin ux, UserDetail ud)
        {
            this.Id = id;
            this.Email = email.ToLower().Trim();
            this.FullName = fullName;
            this.Role = role;
            this.UserExternalLogin = ux;
            this.UserDetail = ud;
        }
        /// <summary>
        /// Tạo mới một user với thông tin cơ bản và liên kết đến đăng nhập bên ngoài (nếu có)
        /// </summary>
        /// <param name="id"></param>
        /// <param name="email"></param>
        /// <param name="role"></param>
        /// <param name="provider"></param>
        /// <param name="providerKey"></param>
        /// <returns></returns>
        public static Result<User> Create(Guid id, string email, string fullName, Role role, string provider, String providerKey)
        {
            if (!ValidDataUtil.IsValidEmail(email))
                return Result<User>.Failure(Error.Create("", "Invalid email format.", ErrorType.Validation));
           
            UserExternalLogin ux = UserExternalLogin.Create(id,provider, providerKey);
            UserDetail ud = UserDetail.Create();
            var user = new User(id, email, fullName, role, ux, ud) 
            {
                Email = email,
            };
            return Result<User>.Success(user);
        }
        public void SetPassword(string hash)
        {
            if (string.IsNullOrEmpty(hash)) throw new InternalServerErrorException("user: mật khẩu bị null");
            this.PasswordHash = hash;
        }

        internal Result<bool> Update(string fullname, string phoneNumber, string? avatarUrl, List<string>? addresses, Guid userId)
        {
            if (!string.IsNullOrEmpty(phoneNumber))
            {
                if(!ValidDataUtil.IsValidPhone(phoneNumber))
                    return Result<bool>.Failure(Error.Create("InvalidPhone", "Invalid phone number format.", ErrorType.Validation));
                this.Phone = phoneNumber;
            }

            if (!string.IsNullOrEmpty(fullname)) FullName = fullname;

            if (!string.IsNullOrEmpty(avatarUrl)) 
                UserDetail!.AvatarUrl = avatarUrl;
            if (addresses != null && addresses.Any()) Addresses = new HashSet<Address>(addresses.Select(a => Address.Create(userId, a)));

            return Result<bool>.Success(true);
        }

        internal Result<bool> UpdatePassword(string newHash)
        {
            if (string.IsNullOrWhiteSpace(newHash))
                return Result<bool>.Failure(Error.Create("InvalidPassword", "Password hash cannot be empty.", ErrorType.Validation));

            PasswordHash = newHash;
            return Result<bool>.Success(true);
        }

        internal Result<bool> AddShop(Shop shop)
        {
            this.Shop = shop;
            return Result<bool>.Success(true);
        }
    }
}
