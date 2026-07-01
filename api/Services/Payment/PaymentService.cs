using api.Models.Payments;
using api.Repository.PaymentRepo;
using AutoMapper;
using System.Reflection.Emit;
using System.Text.Json;

namespace api.Services.Payment
{
    public interface IPaymentService
    {
        Task<string> CreatePayPalOrderAsync(Guid invoiceId);
        Task<bool> CapturePayPalOrderAsync(string paypalOrderId);
    }

    public class PaymentService(
        IPaymentRepository paymentRepository,
        PayPalService payPalService) : IPaymentService // Inject thêm PayPalService vào đây
    {
        // 1. TẠO GIAO DỊCH
        public async Task<string> CreatePayPalOrderAsync(Guid invoiceId)
        {
            // Lấy hóa đơn
            var invoice = await paymentRepository.GetInvoiceByIdAsync(invoiceId);
            if (invoice is null)
                throw new Exception("Không tìm thấy hóa đơn.");

            if (invoice.Status != api.Models.Enums.InvoiceStatus.Pending)
                throw new Exception("Hóa đơn này không ở trạng thái chờ thanh toán.");

            // Gọi PayPal tạo Order (Truyền InvoiceId vào custom_id)
            var paypalOrderId = await payPalService.CreateOrderAsync(invoice.Id.ToString(), invoice.FinalAmount/50);

            // Tạo bản ghi Payment nội bộ lưu DB
            var payment = api.Models.Payments.Payment.Create(
                id: Guid.NewGuid(),
                invoiceId: invoice.Id,
                amount: invoice.FinalAmount,
                paymentMethod: PaymentMethod.PayPal
            );

            await paymentRepository.AddPaymentAsync(payment);
            await paymentRepository.SaveChangesAsync();

            return paypalOrderId;
        }

        // 2. CHỐT GIAO DỊCH VÀ CẬP NHẬT TRẠNG THÁI
        public async Task<bool> CapturePayPalOrderAsync(string paypalOrderId)
        {
            // Gọi PayPal chốt tiền
            var captureResult = await payPalService.CaptureOrderAsync(paypalOrderId);
            var resultJson = JsonSerializer.Deserialize<JsonElement>(captureResult);
            var status = resultJson.GetProperty("status").GetString();

            if (status != "COMPLETED")
                return false; // Thanh toán thất bại hoặc bị hủy

            // Bóc tách InvoiceId và TransactionId từ cục JSON PayPal trả về
            var captureNode = resultJson.GetProperty("purchase_units")[0].GetProperty("payments").GetProperty("captures")[0];
            var invoiceIdStr = captureNode.GetProperty("custom_id").GetString();
            var transactionId = captureNode.GetProperty("id").GetString();

            if (!Guid.TryParse(invoiceIdStr, out Guid invoiceId))
                throw new Exception("Dữ liệu đối soát custom_id từ PayPal không hợp lệ.");

            // Lấy thực thể từ Database
            var invoice = await paymentRepository.GetInvoiceByIdAsync(invoiceId);
            var payment = await paymentRepository.GetUnpaidPaymentByInvoiceIdAsync(invoiceId);

            if (invoice == null || payment == null)
                throw new Exception("Không tìm thấy dữ liệu thanh toán đang chờ xử lý.");

            // Thay đổi trạng thái thông qua Domain Models (Rich Domain)
            payment.CompletePayment(transactionId!, rawResponse: captureResult);
            invoice.MarkAsPaid(payment.Id);

            // Cập nhật và lưu lại Database
            await paymentRepository.UpdateInvoiceAsync(invoice);
            await paymentRepository.SaveChangesAsync();

            return true;
        }
    }
}
