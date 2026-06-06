using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace api.Database.Interceptors
{
    public class AuditableEntityInterceptor : SaveChangesInterceptor
    {
        // 1. Luồng ĐỒNG BỘ (Bắt buộc giữ lại phòng hờ có ai đó gọi _context.SaveChanges())
        public override InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
        {
            UpdateAuditableEntities(eventData.Context);
            return base.SavingChanges(eventData, result);
        }

        // 2. Luồng BẤT ĐỒNG BỘ (Thực thi khi bạn gọi CommitAsync của UnitOfWork)
        public override ValueTask<InterceptionResult<int>> SavingChangesAsync(
            DbContextEventData eventData,
            InterceptionResult<int> result,
            CancellationToken cancellationToken = default)
        {
            UpdateAuditableEntities(eventData.Context);
            return base.SavingChangesAsync(eventData, result, cancellationToken);
        }

        // 3. Logic nghiệp vụ cốt lõi
        private void UpdateAuditableEntities(DbContext? context)
        {
            if (context == null) return;

            var entries = context.ChangeTracker.Entries()
                .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

            foreach (var entry in entries)
            {
                // Tối ưu hóa: Thay vì truyền string "UpdatedAt" dễ gây Exception nếu Entity không có cột này,
                // chúng ta kiểm tra xem property có tồn tại trong Metadata hay không (Fail-Safe).
                if (entry.Metadata.FindProperty("UpdatedAt") != null)
                {
                    entry.Property("UpdatedAt").CurrentValue = DateTimeOffset.UtcNow;
                }

                if (entry.State == EntityState.Added && entry.Metadata.FindProperty("CreatedAt") != null)
                {
                    entry.Property("CreatedAt").CurrentValue = DateTimeOffset.UtcNow;
                }
            }
        }
    }

}