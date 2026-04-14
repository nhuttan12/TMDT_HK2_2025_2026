namespace api.Models.Users
{
    public class Address
    {
        public int id { get; set; }
        public string user_id { get; set; } = string.Empty;
        public string address_url { get; set; } = string.Empty;
        public DateTime create_at { get; set; } = DateTime.UtcNow;
        public bool is_used { get; set; } = false; 
    }
}
