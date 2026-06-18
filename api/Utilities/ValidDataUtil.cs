using System.Text.RegularExpressions;

namespace api.Utilities
{
    public class ValidDataUtil
    {
      public static bool IsValidEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return false;
            try
            {
                // Sử dụng System.Net.Mail để kiểm tra định dạng email
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        internal static bool IsValidPhone(string phoneNumber)
        {
            if (string.IsNullOrWhiteSpace(phoneNumber))
                return false;

            // Loại bỏ các khoảng trắng thừa nếu người dùng nhập (vd: "090 123 4567")
            phoneNumber = phoneNumber.Replace(" ", "");

            // Quy tắc Regex cho SĐT Việt Nam:
            // ^(0|\+84|84) : Phải bắt đầu bằng 0, hoặc +84, hoặc 84
            // (3|5|7|8|9)  : Số thứ 2 phải là 3, 5, 7, 8, hoặc 9 (các đầu số hợp lệ của VN)
            // [0-9]{8}$    : Kết thúc bằng đúng 8 chữ số bất kỳ
            string pattern = @"^(0|\+84|84)(3|5|7|8|9)[0-9]{8}$";

            return Regex.IsMatch(phoneNumber, pattern);
        }
        public static Result<Object> ValidId(Guid id)
        {
            if (id == Guid.Empty)
            {
                return Result<bool>.Failure(Error.Create("Id.Empty", "ID cannot be empty.", ErrorType.Validation));
            }
            return Result<bool>.Success(true);
        }
    }
}
