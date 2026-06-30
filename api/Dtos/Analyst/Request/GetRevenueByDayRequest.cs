using Microsoft.AspNetCore.Mvc;

namespace api.Dtos.Analyst.Request
{
    public class GetRevenueByDayRequest
    {
        [FromQuery(Name = "startDate")]
        public DateTime StartDate { get; set; }

        [FromQuery(Name = "endDate")]
        public DateTime EndDate { get; set; }
    }
}
