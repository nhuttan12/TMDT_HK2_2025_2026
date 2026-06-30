namespace api.Dtos.Common
{
    public record HtmlMailRequestDto(
     string ToEmail,
     string Subject,
     string TemplateName, // Ví dụ: "WelcomeTemplate.html"
     Dictionary<string, string> TemplatePlaceholders // Chứa các cặp token như: ["Username"] = "Nguyễn Văn A"
 );
}
