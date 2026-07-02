using Microsoft.AspNetCore.Mvc;

namespace api.Dtos.Analyst.Request
{
    public class GetRevenueByDayRequest
    {
        public DateTimeOffset StartDate { get; set; }

        public DateTimeOffset EndDate { get; set; }
    }
}
