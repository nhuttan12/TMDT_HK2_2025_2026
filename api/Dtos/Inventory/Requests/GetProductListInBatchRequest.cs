using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;

namespace api.Dtos.Inventory.Requests
{
    public class GetProductListInBatchRequest
    {
        [FromQuery(Name = "batchId")]
        public Guid BatchId { get; set; }

        [FromQuery(Name = "receiptId")]
        public Guid ReceiptId { get; set; }
    }
}
