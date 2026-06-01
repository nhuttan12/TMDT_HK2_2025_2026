using api.Dtos.Common;
using Microsoft.AspNetCore.Diagnostics;

namespace api.Exceptions
{
    public class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
    {
        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext,
                                              Exception exception,
                                              CancellationToken cancellationToken)
        {
            //  Logging lỗi với đầy đủ ngữ cảnh (Structured Logging)
            logger.LogError(exception, "An unhandled exception occurred: {Message}", exception.Message);
            //  Xử lý các trường hợp đặc biệt như OperationCanceledException (hủy bỏ yêu cầu)
            if (exception is OperationCanceledException or TaskCanceledException)
            {
                logger.LogInformation("Yêu cầu đã bị hủy bởi người dùng hoặc hệ thống quá tải.");
                httpContext.Response.StatusCode = 499; // Client Closed Request
                return true;
            }
            //  Xác định StatusCode và Error Code
            var (statusCode, errorCode, message) = exception switch
            {
                NotFoundException => (StatusCodes.Status404NotFound, "NOT_FOUND", exception.Message),
                BadRequestException => (StatusCodes.Status400BadRequest, "BAD_REQUEST", exception.Message),
                UnauthorizedAccessException => (StatusCodes.Status401Unauthorized, "UNAUTHORIZED", exception.Message),
                ForbiddenException => (StatusCodes.Status403Forbidden, "FORBIDDEN", exception.Message),
                ConflictException => (StatusCodes.Status409Conflict, "CONFLICT", exception.Message),
                _ => (StatusCodes.Status500InternalServerError, "INTERNAL_SERVER_ERROR", exception.Message)
            };

            //  Chuẩn bị Response theo định dạng ApiResponse thống nhất
            var response = ApiResponse<object>.Failure(errorCode, message);

            httpContext.Response.StatusCode = statusCode;

            // Tối ưu: Sử dụng WriteAsJsonAsync của .NET để tận dụng System.Text.Json hiệu năng cao
            await httpContext.Response.WriteAsJsonAsync(response, cancellationToken);

            return true; // Trả về true để dừng pipeline xử lý lỗi tại đây

        }
    }
}
