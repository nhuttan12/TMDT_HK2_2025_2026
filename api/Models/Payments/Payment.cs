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

        // Thêm trường lưu JSON gốc từ PayPal/VNPay để đối soát
        public string? RawResponse { get; private set; }

        public PaymentStatus PaymentStatus { get; private set; }
        public DateTimeOffset CreatedAt { get; private set; }

        // Thêm trường theo dõi thời gian cập nhật trạng thái
        public DateTimeOffset? UpdatedAt { get; private set; }

        private Payment() { }

        public static Payment Create(
            Guid id,
            Guid invoiceId,
            decimal amount,
            PaymentMethod paymentMethod,
            string? informationCard = null) // Bỏ TransactionId ở đây vì lúc tạo thường chưa có
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
                InformationCard = informationCard?.Trim(),
                PaymentStatus = PaymentStatus.Unpaid,
                CreatedAt = DateTimeOffset.UtcNow
            };
        }

        public void CompletePayment(string transactionId, string? rawResponse = null, string? cardInfo = null)
        {
            if (PaymentStatus == PaymentStatus.Completed) return; // Guard clause

            if (string.IsNullOrWhiteSpace(transactionId))
                throw new ArgumentException("Mã giao dịch thành công bắt buộc phải có.");

            TransactionId = transactionId.Trim();
            if (cardInfo != null) InformationCard = cardInfo.Trim();
            if (rawResponse != null) RawResponse = rawResponse;

            PaymentStatus = PaymentStatus.Completed;
            UpdatedAt = DateTimeOffset.UtcNow; // Ghi nhận thời điểm thanh toán thành công
        }

        public void FailPayment(string? rawResponse = null)
        {
            if (PaymentStatus != PaymentStatus.Unpaid) return; // Chỉ fail khi đang pending

            if (rawResponse != null) RawResponse = rawResponse;
            PaymentStatus = PaymentStatus.Failed;
            UpdatedAt = DateTimeOffset.UtcNow;
        }

        public void RefundPayment()
        {
            if (PaymentStatus != PaymentStatus.Completed)
                throw new InvalidOperationException("Chỉ có thể hoàn tiền cho các giao dịch đã thanh toán thành công.");

            PaymentStatus = PaymentStatus.Refunded;
            UpdatedAt = DateTimeOffset.UtcNow;
        }
    }
}
