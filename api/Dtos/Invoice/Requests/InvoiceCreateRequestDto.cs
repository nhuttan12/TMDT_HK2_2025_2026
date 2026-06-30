using Microsoft.AspNetCore.Mvc;

namespace api.Dtos.Invoice.Requests
{
    public class InvoiceCreateRequestDto
    {
        public ICollection<InvoiceItemCreateDto> Items { get; set; }
        public DeliveryRequestDto? DeliveryRequest { get; set; } 
    }
    public class InvoiceItemCreateDto
    {
        public Guid VariantId { get;  set; }
        public int Quantity { get; set; }
    }
    public class DeliveryRequestDto
    {
        public string Address { get; set; } = string.Empty;
        public string ReceiverName { get; set; } = string.Empty;
        public decimal ShippingFee { get; set; }

    }
}
