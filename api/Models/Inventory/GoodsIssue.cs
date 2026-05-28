using api.Models.Inventory.Enums;

namespace api.Models.Inventory
{
    public class GoodsIssue
    {
        public Guid Id { get; private set; }
        public Guid CustomerId { get; private set; }

        public User Customer { get; private set; }

        public string Code { get; private set; }
        public string Note { get; private set; }
        public GoodsIssueType GoodsIssueType { get; private set; }
        public DateTimeOffset CreatedAt { get; private set; }

        public ICollection<GoodsIssueDetail> GoodsIssueDetails { get; private set; } = new HashSet<GoodsIssueDetail>();

        public GoodsIssue(Guid id, Guid customerId, string code, string note, GoodsIssueType goodsIssueType, DateTimeOffset createdAt)
        {
            Id = id;
            CustomerId = customerId;
            Code = code;
            Note = note;
            GoodsIssueType = goodsIssueType;
            CreatedAt = createdAt;
        }
    }
}
