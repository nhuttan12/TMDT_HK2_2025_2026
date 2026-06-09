namespace api.Utilities
{
    public static class StringExtensions
    {
        /// <summary>
        /// Lấy các chữ cái đầu tiên của từng từ trong chuỗi và viết hoa.
        /// Áp dụng ReadOnlySpan và stackalloc để đạt hiệu năng Zero-Allocation.
        /// Ví dụ: "le thanh tâm" -> "LTT"
        /// </summary>
        public static string GetInitials(this string? input)
        {
            // 1. Fail Fast: Xử lý ngay chuỗi rỗng hoặc null
            if (string.IsNullOrWhiteSpace(input))
                return string.Empty;

            // 2. Cấp phát bộ nhớ trực tiếp trên Stack (cực nhanh, tự hủy khi xong hàm, không cần GC dọn).
            // Giả định một cái tên hiếm khi vượt quá 32 từ. Nếu dài hơn, hàm vẫn an toàn nhờ kiểm tra biên.
            Span<char> initials = stackalloc char[32];
            int currentIndex = 0;
            bool isNewWord = true;

            // 3. Sử dụng ReadOnlySpan để lướt qua chuỗi gốc mà không tạo ra bản sao
            ReadOnlySpan<char> span = input.AsSpan();

            for (int i = 0; i < span.Length; i++)
            {
                char c = span[i];

                // Kiểm tra xem ký tự hiện tại có phải là khoảng trắng không
                if (char.IsWhiteSpace(c))
                {
                    isNewWord = true;
                }
                else if (isNewWord)
                {
                    // Lấy chữ cái đầu, ép kiểu lên in hoa (ToUpperInvariant để tránh lỗi văn hóa/ngôn ngữ)
                    initials[currentIndex++] = char.ToUpperInvariant(c);
                    isNewWord = false;

                    // Defensive Programming: Chặn lỗi tràn bộ nhớ (StackOverflow) nếu chuỗi đầu vào có quá nhiều từ
                    if (currentIndex >= initials.Length)
                        break;
                }
            }

            // 4. Khởi tạo string đúng duy nhất 1 lần từ độ dài thực tế của Span
            return new string(initials[..currentIndex]);
        }
    }
}
