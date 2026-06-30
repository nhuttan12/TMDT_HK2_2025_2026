using Microsoft.AspNetCore.Mvc;

namespace api.Dtos.Invoice.Requests
{
    public class InvoiceCreateRequestDto
    {
        public ICollection<InvoiceItemCreateDto> Items { get; set; }
        public DeliveryRequestDto? DeliveryRequest { get; set; } = null;
    }
    public class InvoiceItemCreateDto
    {
        public Guid ProductId { get;  set; }
        public Guid VariantId { get;  set; }
        public int Quantity { get; set; }
    }
    public class DeliveryRequestDto
    {
        public string? Address { get; set; }
        public string? ReceiverName { get; set; }
        public decimal? ShippingFee { get; set; }

    }
}
