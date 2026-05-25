namespace api.Models.Inventory
{
    public class Supplier
    {
        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public string TaxCode { get; private set; }
        public string PhoneNumber { get; private set; }
        public string Email { get; private set; }
        public string ContactName { get; private set; }
        public string Address { get; private set; }
        public DateTimeOffset CreatedAt { get; private set; }
        public DateTimeOffset UpdatedAt { get; private set; }

        public ICollection<GoodsReceipt> GoodsReceipts { get; private set; } = new HashSet<GoodsReceipt>();
    }
}
