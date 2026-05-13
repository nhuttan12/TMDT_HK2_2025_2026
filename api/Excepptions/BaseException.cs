namespace api.Excepptions
{
    public abstract class BaseException : Exception
    {
        public string Code { get; }
        public int StatusCode { get; }

        protected BaseException(string message, string code, int statusCode) : base(message)
        {
            Code = code;
            StatusCode = statusCode;
        }
    }

    // Exceptions/NotFoundException.cs
    public class NotFoundException(string message, string code = "NOT_FOUND")
        : BaseException(message, code, StatusCodes.Status404NotFound);
}
