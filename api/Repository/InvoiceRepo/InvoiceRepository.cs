using api.Database;
using api.Models.Orders;
using api.Models.Products;
using Microsoft.EntityFrameworkCore;

namespace api.Repository.InvoiceRepo
{
    public interface IInvoiceRepository
    {
        Task AddInvoiceAsync(Invoice order, CancellationToken cancellationToken);
        Task<Invoice?> getByIdTracking(Guid invoiceId, CancellationToken cancellationToken);
        Task<Invoice?> GetDetailAsync(Guid? userId, Guid invoiceId, CancellationToken cancellationToken);
        Task<IReadOnlyCollection<Invoice>> GetListByUserIdAsync(Guid? userId, CancellationToken cancellationToken);
        void Update(Invoice order);
        Task<Dictionary<Guid, decimal>> GetVariantPricesAsync(IEnumerable<Guid> variantIds, CancellationToken cancellationToken);
    }
    public class InvoiceRepository(MyAppDbContext context) : IInvoiceRepository
    {
        public async Task AddInvoiceAsync(Invoice order, CancellationToken cancellationToken)
        {
            // Truyền CancellationToken vào mọi thao tác I/O
            // Chú ý: Ở file DbContext, property nên được viết hoa là 'Invoices' theo chuẩn PascalCase
            await context.invoices.AddAsync(order, cancellationToken);
        }

        public async Task<Invoice?> getByIdTracking(Guid invoiceId, CancellationToken cancellationToken)
        {
            return await context.invoices
                .Include(i => i.Delivery)
                .Include(i => i.Delivery)
                .Include(i => i.Items)
                    .ThenInclude(ii => ii.Variant)
                        .ThenInclude(iii => iii.Product)
                .FirstOrDefaultAsync(i => i.Id == invoiceId, cancellationToken);
        }

        public async Task<Invoice?> GetDetailAsync(Guid? userId, Guid invoiceId, CancellationToken cancellationToken)
        {
            return await context.invoices
                .AsNoTracking()
                .Include(i => i.Delivery)
                .Include(i => i.Items)
                    .ThenInclude(ii => ii.Variant)
                        .ThenInclude(iii => iii.Product)
                .FirstOrDefaultAsync(i => i.Id == invoiceId && i.UserId == userId, cancellationToken);
        }

        public async Task<IReadOnlyCollection<Invoice>> GetListByUserIdAsync(Guid? userId, CancellationToken cancellationToken)
        {
            // Fail Fast: Tránh gọi DB nếu userId không hợp lệ
            if (userId == null || userId == Guid.Empty)
            {
                return [];
            }

            var invoices = await context.invoices
                .Include(i => i.Delivery)
                .AsNoTracking()
                .Include(i => i.Items)
                    .ThenInclude(ii => ii.Variant)
                        .ThenInclude(iii => iii.Product)
                .Where(i => i.UserId == userId)
                .ToListAsync(cancellationToken);

            return invoices.AsReadOnly();
        }

        public async Task<Dictionary<Guid, decimal>> GetVariantPricesAsync(IEnumerable<Guid> variantIds, CancellationToken cancellationToken)
        {
            // Tối ưu: Thay vì query 100 lần cho 100 sản phẩm, chỉ query 1 lần duy nhất bằng mệnh đề IN (Contains)
            return await context.Variants
                .AsNoTracking()
                .Where(v => variantIds.Contains(v.Id))
                .ToDictionaryAsync(v => v.Id, v => v.SellPrice, cancellationToken);
        }
        public void Update(Invoice order)
        {
            // Khi dùng AsNoTracking ở tầng Service, hàm này sẽ attach thực thể lại 
            // và đánh dấu trạng thái là Modified để EF Core sinh lệnh UPDATE khi Commit
            context.invoices.Update(order);
        }
    }
}
