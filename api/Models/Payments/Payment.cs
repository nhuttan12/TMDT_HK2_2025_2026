using api.Models.Orders;

namespace api.Models.Payments
{
    public class Payment
    {
        public Guid Id { get; private set; }
        public Guid InvoiceId { get; private set; }
        public Invoice Invoice { get; private set; }

        public string? TransactionId { get; private set; }
        public decimal Amount { get; private set; }
        public PaymentMethod PaymentMethod { get; private set; }
        public string? InformationCard { get; private set; }

        public PaymentStatus PaymentStatus { get; private set; }
        public DateTimeOffset CreatedAt { get; private set; }

        private Payment() { }

        public static Payment Create(
            Guid id,
            Guid invoiceId,
            decimal amount,
            PaymentMethod paymentMethod,
            string? transactionId = null,
            string? informationCard = null)
        {
            if (id == Guid.Empty) throw new ArgumentException("Id không hợp lệ.", nameof(id));
            if (invoiceId == Guid.Empty) throw new ArgumentException("InvoiceId không hợp lệ.", nameof(invoiceId));
            if (amount <= 0) throw new ArgumentException("Số tiền thanh toán phải lớn hơn 0.", nameof(amount));

            return new Payment
            {
                Id = id,
                InvoiceId = invoiceId,
                Amount = amount,
                PaymentMethod = paymentMethod,
                TransactionId = transactionId?.Trim(),
                InformationCard = informationCard?.Trim(),
                PaymentStatus = PaymentStatus.Pending, // Mặc định là Chờ thanh toán
                CreatedAt = DateTimeOffset.UtcNow
            };
        }

        public void CompletePayment(string transactionId, string? cardInfo = null)
        {
            if (string.IsNullOrWhiteSpace(transactionId))
                throw new ArgumentException("Mã giao dịch thành công bắt buộc phải có.");

            TransactionId = transactionId.Trim();
            if (cardInfo != null) InformationCard = cardInfo.Trim();

            PaymentStatus = PaymentStatus.Completed; // Chuyển trạng thái sang Thành công
        }

        public void FailPayment()
        {
            PaymentStatus = PaymentStatus.Failed; // Chuyển trạng thái sang Thất bại
        }

        public void RefundPayment()
        {
            if (PaymentStatus != PaymentStatus.Completed)
                throw new InvalidOperationException("Chỉ có thể hoàn tiền cho các giao dịch đã thanh toán thành công.");

            PaymentStatus = PaymentStatus.Refunded; // Chuyển trạng thái sang Đã hoàn tiền
        }
    }
}
