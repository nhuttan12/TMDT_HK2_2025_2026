using api.Database;
using api.Models.Orders;
using api.Models.Payments;
using Microsoft.EntityFrameworkCore;

namespace api.Repository.PaymentRepo
{
    public interface IPaymentRepository
    {
        Task<Invoice?> GetInvoiceByIdAsync(Guid invoiceId);
        Task<Payment?> GetPendingPaymentByInvoiceIdAsync(Guid invoiceId);
        Task AddPaymentAsync(Payment payment);
        Task UpdateInvoiceAsync(Invoice invoice);
        Task SaveChangesAsync();
    }

    public class PaymentRepository(MyAppDbContext context) : IPaymentRepository
    {
        public async Task<Invoice?> GetInvoiceByIdAsync(Guid invoiceId)
        {
            return await context.Invoices.FirstOrDefaultAsync(i => i.Id == invoiceId);
        }

        public async Task<Payment?> GetPendingPaymentByInvoiceIdAsync(Guid invoiceId)
        {
            return await context.Payments.FirstOrDefaultAsync(p =>
                p.InvoiceId == invoiceId &&
                p.PaymentStatus == PaymentStatus.Pending);
        }

        public async Task AddPaymentAsync(Payment payment)
        {
            await context.Payments.AddAsync(payment);
        }

        public Task UpdateInvoiceAsync(Invoice invoice)
        {
            context.Invoices.Update(invoice);
            return Task.CompletedTask;
        }

        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
