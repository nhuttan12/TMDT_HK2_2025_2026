using api.Dtos.Products.Request;
using api.Models.Enums;
using api.Models.Payments;
using System.Diagnostics.Contracts;

namespace api.Dtos.Invoice.Response
{
    public class InvoiceDetailResponseDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid? CouponId { get; set; }
        public ICollection<InvoiceItemReponseDto> Items { get; init; } = [];
        public decimal TotalAmount { get; set; }
        public decimal FinalAmount { get; set; }
        public InvoiceStatus Status { get; set; }


        public string? RecipientName { get; set; } = string.Empty;
        public string? RecipientPhone { get; set; } = string.Empty;
        public string? Address { get; set; } = string.Empty;
        public decimal? ShippingFee { get; set; }
        public decimal? DiscountAmount { get; set; }

        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset UpdatedAt { get; set; }
    }
    public class InvoiceItemReponseDto()
    {
        public Guid ProductId { get; set; }
        public Guid VariantId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public int Quantity { get; set; }
        public decimal SubTotal { get; set; }
    }

    public class InvoiceResponseDto
    {
        public Guid Id { get; set; }
        public DateTimeOffset CreatedAt { get; set; }

        public string  Status { get; set; }
        public string  PaymentMethod { get; set; }

        public decimal TotalAmount { get; set; }
        public decimal TotalItems { get; set; }
    }

}
