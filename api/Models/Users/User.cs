using api.Dtos.Users.Requests;
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
        public ICollection<Coupon> Coupons { get; set; } = new HashSet<Coupon>();
       
        public User()
        {
        }

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
                return Result<User>.Failure(Error.Create("Auth.Email", "Invalid email format.", ErrorType.Validation));
           
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

        internal Result<bool> Update(
         string fullname,
         string phoneNumber,
         string? avatarUrl,
         List<AddressUpdateDto>? addressInputs,
         Guid userId)
        {
            // 1. Validate SĐT (Fail Fast)
            if (!string.IsNullOrEmpty(phoneNumber))
            {
                if (!ValidDataUtil.IsValidPhone(phoneNumber))
                    return Result<bool>.Failure(Error.Create("InvalidPhone", "Invalid phone number format.", ErrorType.Validation));
                Phone = phoneNumber;
            }

            if (!string.IsNullOrEmpty(fullname))
                FullName = fullname;

            // 2. Xử lý Avatar / UserDetail
            if (!string.IsNullOrEmpty(avatarUrl))
            {
                if (UserDetail == null)
                {
                    UserDetail = new UserDetail { UserId = userId, AvatarUrl = avatarUrl };
                }
                else
                {
                    UserDetail.AvatarUrl = avatarUrl;
                }
            }

            // 3. Xử lý logic cập nhật ĐỊA CHỈ (Đã tích hợp cơ chế chống trùng lặp)
            if (addressInputs != null && addressInputs.Any())
            {
                Addresses ??= new HashSet<Address>();

                // TỐI ƯU HIỆU NĂNG: Thu thập tất cả AddressUrl hiện tại vào HashSet để tìm kiếm với độ phức tạp O(1)
                // Chuẩn hóa Trim và ToLower để tránh lệch pha chữ hoa/chữ thường hoặc khoảng trắng thừa
                var existingUrls = Addresses
                    .Select(a => a.AddressUrl.Trim().ToLower())
                    .ToHashSet();

                // Cờ xác định xem User đã từng có địa chỉ hoạt động (IsUsed) nào chưa
                bool hasAnyUsedAddress = Addresses.Any(a => a.IsUsed);

                for (int i = 0; i < addressInputs.Count; i++)
                {
                    var input = addressInputs[i];
                    if (string.IsNullOrWhiteSpace(input.AddressUrl)) continue;

                    var normalizedInputUrl = input.AddressUrl.Trim().ToLower();

                    // TRƯỜNG HỢP 1: Nếu có Id truyền lên => Logic CẬP NHẬT địa chỉ cũ
                    if (input.Id.HasValue && input.Id.Value != Guid.Empty)
                    {
                        var existingAddress = Addresses.FirstOrDefault(a => a.Id == input.Id.Value);
                        if (existingAddress != null)
                        {
                            // Trước khi cập nhật địa chỉ cũ sang chuỗi mới, cần kiểm tra xem chuỗi mới này có bị trùng với một địa chỉ ĐANG CÓ KHÁC không
                            if (existingAddress.AddressUrl.Trim().ToLower() != normalizedInputUrl &&
                                existingUrls.Contains(normalizedInputUrl))
                            {
                                // Bỏ qua hoặc trả lỗi tùy bạn, ở đây chọn bỏ qua để an toàn hệ thống (Idempotent)
                                continue;
                            }

                            // Cập nhật HashSet quản lý chuỗi cũ thành chuỗi mới
                            existingUrls.Remove(existingAddress.AddressUrl.Trim().ToLower());
                            existingUrls.Add(normalizedInputUrl);

                            // Gọi internal method của Address để đổi dữ liệu chuỗi (Bảo toàn tính bao đóng)
                            existingAddress.UpdateUrl(input.AddressUrl);
                        }
                    }
                    // TRƯỜNG HỢP 2: Không có Id => Logic THÊM MỚI địa chỉ
                    else
                    {
                        // PHÒNG VỆ CHỐNG TRÙNG: Nếu chuỗi nhập vào đã tồn tại trong DB/Danh sách hiện tại -> BỎ QUA KHÔNG THÊM
                        if (existingUrls.Contains(normalizedInputUrl))
                        {
                            continue;
                        }

                        // Luật nghiệp vụ: Nếu là địa chỉ đầu tiên của tài khoản (cũ chưa có, và là phần tử hợp lệ đầu tiên)
                        bool shouldBeUsed = !hasAnyUsedAddress;

                        // Sử dụng Factory Method của thực thể Address
                        var newAddress = Address.CreateForUser(userId, input.AddressUrl, shouldBeUsed);
                        Addresses.Add(newAddress);

                        // Thêm chuỗi vừa tạo mới vào HashSet phòng vệ để các vòng lặp sau của list input nếu trùng cũng sẽ bị chặn
                        existingUrls.Add(normalizedInputUrl);

                        // Nếu đã kích hoạt dùng địa chỉ đầu tiên này, bật cờ lên để các bản ghi sau không chiếm quyền IsUsed
                        if (shouldBeUsed)
                        {
                            hasAnyUsedAddress = true;
                        }
                    }
                }
            }

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
