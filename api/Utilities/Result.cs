namespace api.Utilities
{
    public class Result<TValue>
    {
        public bool IsSuccess { get; }
        public bool IsFailure => !IsSuccess;
        public TValue? Value { get; }
        public Error Error { get; }

        // Constructor private để ép buộc sử dụng Static Factory Methods (Success/Failure)
        protected Result(TValue? value, bool isSuccess, Error error)
        {
            if (isSuccess && error != Error.None)
                throw new InvalidOperationException("Thành công không thể chứa lỗi.");

            if (!isSuccess && error == Error.None)
                throw new InvalidOperationException("Thất bại phải đi kèm với lỗi.");

            Value = value;
            IsSuccess = isSuccess;
            Error = error;
        }

        public static Result<TValue> Success(TValue value) => new(value, true, Error.None);

        public static Result<TValue> Failure(Error error, ErrorType errorType = ErrorType.Failure) => new(default, false, error with { Type = errorType });

        // Implicit conversion: Giúp code gọn hơn khi return dữ liệu trực tiếp
        public static implicit operator Result<TValue>(TValue value) => Success(value);
        public ErrorType ErrorType { get; }
    }
}
