namespace api.Utilities
{
    public record Error(string Code, string Message, ErrorType Type = ErrorType.Failure)
    {
        public static readonly Error None = new(string.Empty, string.Empty, ErrorType.None);
        public static readonly Error NullValue = new("Error.NullValue", "Giá trị cung cấp là null.", ErrorType.Validation);
        public static Error Create(string code, string message, ErrorType type = ErrorType.Failure) => new(code, message, type);
        public static Error Unauthorized() => Error.Create("Unauthorized", "You are not authorized.", ErrorType.BadRequest);
        public static Error MapperError() => Error.Create( "Mapper.ExecutionFailed", "An error occurred while attempting to map the objects.", ErrorType.BadRequest);

    }
    public enum ErrorType
    {
        None = 0,
        Failure = 1,        // Lỗi logic chung (400)
        Validation = 2,     // Lỗi dữ liệu đầu vào (400)
        Unauthorized = 3,   // Lỗi xác thực (401)
        Forbidden = 4,      // Lỗi phân quyền (403)
        NotFound = 5,       // Không tìm thấy tài nguyên (404)
        Conflict = 6,        // Xung đột dữ liệu (409)
        BadRequest = 7,
    }
}
