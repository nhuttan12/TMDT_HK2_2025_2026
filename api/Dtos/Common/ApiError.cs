namespace api.Dtos.Common
{
    public record ApiError(string Code, string Message, string? Details = null);
}
