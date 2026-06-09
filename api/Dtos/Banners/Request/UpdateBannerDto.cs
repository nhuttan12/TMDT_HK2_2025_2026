namespace api.Dtos.Banners.Request
{
    public class UpdateBannerDto
    {
        public required string Url { get; set; }
        public int Order { get; set; }
        public bool IsPrimary { get; set; }
    }
}
