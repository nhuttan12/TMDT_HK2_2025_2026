using api.Dtos.Common;

namespace api.Services.Mail
{
    public interface IMailService
    {
        Task<bool> SendHtmlEmailAsync(HtmlMailRequestDto request, CancellationToken cancellationToken = default);
    }
}
