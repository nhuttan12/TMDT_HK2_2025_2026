namespace api.Dtos.Analyst.Response
{
    public class RevenueByCategoryResponse
    {
        public string CategoryName { get; set; } = string.Empty;
        public decimal Revenue { get; set; }
        public double Percentage { get; set; }
    }
}
