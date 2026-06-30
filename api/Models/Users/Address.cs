using api.Models;

namespace Api.Models.Users;

public class Address
{
    // Sử dụng private set để đảm bảo tính đóng gói (Encapsulation)
    public Guid Id { get; private set; }
    public Guid UserId { get; private set; }
    public string AddressUrl { get; private set; } = string.Empty;
    public DateTimeOffset CreatedAt { get; private set; }
    public bool IsUsed { get; private set; }

    // Navigation Propertydotnet ef database drop -f
    public virtual User User { get; private set; } = null!;

    // Constructor ẩn để ép buộc sử dụng Factory Method
    private Address() { }
    private Address(Guid userId, string addressUrl, bool isUsed)
    {
        Id = Guid.CreateVersion7(); // Tối ưu hóa phân tán với UUIDv7 trong .NET 9
        UserId = userId;
        AddressUrl = addressUrl;
        IsUsed = isUsed;
    }

    /// <summary>
    /// Static Factory Method - Tuân thủ tư duy Defensive Programming
    /// </summary>
    public static Address Create(Guid userId, Guid id, string addressUrl)
    {
        // Fail Fast: Kiểm tra dữ liệu đầu vào ngay lập tức
        if (userId == Guid.Empty)
            throw new ArgumentException("UserId không hợp lệ.", nameof(userId));

        if (string.IsNullOrWhiteSpace(addressUrl))
            throw new ArgumentException("Địa chỉ không được để trống.", nameof(addressUrl));

        return new Address
        {
            Id = id,
            UserId = userId,
            AddressUrl = addressUrl.Trim(),
            IsUsed = false
        };
    }
    public static Address CreateForUser(Guid userId, string addressUrl, bool isUsed = false)
    {
        // Fail Fast: Kiểm tra dữ liệu đầu vào ngay lập tức
        if (userId == Guid.Empty)
            throw new ArgumentException("UserId không hợp lệ.", nameof(userId));

        if (string.IsNullOrWhiteSpace(addressUrl))
            throw new ArgumentException("Địa chỉ không được để trống.", nameof(addressUrl));

        return new Address
        {
            Id = Guid.Empty,
            UserId = userId,
            AddressUrl = addressUrl.Trim(),
            IsUsed = isUsed
        };
    }
    public void UpdateUrl(string newUrl)
    {
        if (!string.IsNullOrWhiteSpace(newUrl) && AddressUrl != newUrl)
        {
            AddressUrl = newUrl;
        }
    }

    public void SetAsUsed(bool isUsed)
    {
        this.IsUsed = isUsed;
    }
   
}