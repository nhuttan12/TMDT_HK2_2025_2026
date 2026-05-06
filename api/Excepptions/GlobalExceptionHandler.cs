using api.Dtos.Common;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace api.Exceptions
{
    public class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
    {
        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext,
                                              Exception exception,
                                              CancellationToken cancellationToken)
        {
            // 1. Logging lỗi với đầy đủ ngữ cảnh (Structured Logging)
            logger.LogError(exception, "An unhandled exception occurred: {Message}", exception.Message);

            // 2. Xác định StatusCode và Error Code
            var (statusCode, errorCode, message) = exception switch
            {
                NotFoundException => (StatusCodes.Status404NotFound, "NOT_FOUND", exception.Message),
                BadRequestException => (StatusCodes.Status400BadRequest, "BAD_REQUEST", exception.Message),
                UnauthorizedAccessException => (StatusCodes.Status401Unauthorized, "UNAUTHORIZED", exception.Message),
                ForbiddenException => (StatusCodes.Status403Forbidden, "FORBIDDEN", exception.Message),
                ConflictException => (StatusCodes.Status409Conflict, "CONFLICT", exception.Message),
                _ => (StatusCodes.Status500InternalServerError, "INTERNAL_SERVER_ERROR", exception.Message)
            };

            // 3. Chuẩn bị Response theo định dạng ApiResponse thống nhất
            var response = ApiResponse<object>.Failure(errorCode, message);

            httpContext.Response.StatusCode = statusCode;

            // Tối ưu: Sử dụng WriteAsJsonAsync của .NET để tận dụng System.Text.Json hiệu năng cao
            await httpContext.Response.WriteAsJsonAsync(response, cancellationToken);

            return true; // Trả về true để dừng pipeline xử lý lỗi tại đây

        }
    }
}
