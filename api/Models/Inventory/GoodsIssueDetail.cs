using api.Models.Products;

namespace api.Models.Inventory
{
    public class GoodsIssueDetail
    {
        public Guid Id { get; set; }
        public Guid IssueId { get; set; }

        public GoodsIssue GoodsIssue { get; set; }

        public Guid VariantId { get; set; }
        
        public Variant Variant { get; set; }

        public int Quantity { get; set; }
        public decimal SellingPrice { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
    }
}
