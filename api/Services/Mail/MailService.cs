using api.Dtos.Common;
using api.Extensions.EmailExtensions;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
namespace api.Services.Mail
{
    public class MailService : IMailService
    {
        private readonly EmailSettings _emailSettings;
        private readonly IWebHostEnvironment _env; // Cần thiết để lấy đường dẫn vật lý đến thư mục root của dự án
        private readonly ILogger<MailService> _logger;

        public MailService(
            IOptions<EmailSettings> emailSettings,
            IWebHostEnvironment env,
            ILogger<MailService> logger)
        {
            _emailSettings = emailSettings.Value;
            _env = env;
            _logger = logger;
        }

        public async Task<bool> SendHtmlEmailAsync(HtmlMailRequestDto request, CancellationToken cancellationToken = default)
        {
            // 1. Defensive Programming (Fail Fast)
            if (string.IsNullOrWhiteSpace(request.ToEmail)) return false;

            // 2. Tìm và đọc file HTML Template
            var templatePath = Path.Combine(_env.ContentRootPath, "Utilities", "EmailTemplates", request.TemplateName);

            if (!File.Exists(templatePath))
            {
                _logger.LogError("Email template not found at path: {Path}", templatePath);
                return false;
            }

            string htmlBody = await File.ReadAllTextAsync(templatePath, cancellationToken);

            // 3. Tiến hành map các dữ liệu động vào Template HTML
            if (request.TemplatePlaceholders != null)
            {
                foreach (var placeholder in request.TemplatePlaceholders)
                {
                    // Thay thế ví dụ: "{Username}" thành "Nguyễn Văn A"
                    htmlBody = htmlBody.Replace($"{{{placeholder.Key}}}", placeholder.Value);
                }
            }

            // 4. Khởi tạo đối tượng MimeMessage của MailKit
            var email = new MimeMessage();
            email.From.Add(new MailboxAddress(_emailSettings.SenderName, _emailSettings.SenderEmail));
            email.To.Add(MailboxAddress.Parse(request.ToEmail));
            email.Subject = request.Subject;

            var builder = new BodyBuilder
            {
                HtmlBody = htmlBody // Gán nội dung HTML đã được render hoàn chỉnh
            };
            email.Body = builder.ToMessageBody();

            // 5. Kết nối SMTP Server và gửi đi
            using var smtp = new SmtpClient();
            try
            {
                await smtp.ConnectAsync(_emailSettings.SmtpServer, _emailSettings.Port, SecureSocketOptions.StartTls, cancellationToken);
                await smtp.AuthenticateAsync(_emailSettings.Username, _emailSettings.Password, cancellationToken);
                await smtp.SendAsync(email, cancellationToken);

                _logger.LogInformation("HTML Email successfully sent to {To}", request.ToEmail);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send HTML Email to {To}", request.ToEmail);
                return false;
            }
            finally
            {
                await smtp.DisconnectAsync(true, cancellationToken);
            }
        }
    }
}
