namespace api.Dtos.Invoice.Requests
{
    public class InvoiceCreateRequestDto
    {
        public ICollection<InvoiceItemCreateDto> Items { get; set; }
    }
    public class InvoiceItemCreateDto
    {
        public Guid ProductId { get;  set; }
        public Guid VariantId { get;  set; }
        public int Quantity { get; set; }
    }
}
