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
            // Câu lệnh 1: Lấy Invoice gốc cùng với mối quan hệ Delivery -> Address
            var invoice = await context.invoices
                .Include(i => i.Delivery)
                    .ThenInclude(d => d.Address) // Chú ý chữ 'address' viết thường theo Entity class của bạn
                .FirstOrDefaultAsync(i => i.Id == invoiceId, cancellationToken);

            if (invoice is null) return null;

            // Câu lệnh 2: Nạp danh sách Items và Variant vào Context (EF Core tự ráp vào biến 'invoice' ở trên)
            await context.InvoiceItems
                .Include(ii => ii.Variant)
                .Where(ii => ii.InvoiceId == invoiceId)
                .ToListAsync(cancellationToken);

            // Câu lệnh 3: Nạp tiếp Product của các Variant đó (Nếu bạn cần dùng Product sâu bên trong)
            // Lấy danh sách VariantId hiện tại đang có trên RAM của Invoice này
            var variantIds = invoice.Items.Select(ii => ii.VariantId).Distinct().ToList();

            await context.Variants
                .Include(v => v.Product)
                .Where(v => variantIds.Contains(v.Id))
                .ToListAsync(cancellationToken);

            return invoice; // Lúc này đối tượng 'invoice' đã được lấp đầy đủ dữ liệu một cách kỳ diệu!
        }

        public async Task<Invoice?> GetDetailAsync(Guid? userId, Guid invoiceId, CancellationToken cancellationToken)
        {
            return await context.invoices
                .AsNoTracking()
                .Include(i => i.Delivery)
                    .ThenInclude(i => i.Address)
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
                    .ThenInclude(i => i.Address)
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
