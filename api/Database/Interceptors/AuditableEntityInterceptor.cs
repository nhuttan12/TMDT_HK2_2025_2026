using api.Models.Common;
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

            // Lọc thẳng các entity có triển khai IAuditableEntity
            var entries = context.ChangeTracker.Entries<IAuditableEntity>()
                .Where(e => e.State is EntityState.Added or EntityState.Modified);

            var utcNow = DateTimeOffset.UtcNow;

            foreach (var entry in entries)
            {
                entry.Entity.UpdateAt = utcNow; // Gán trực tiếp qua thuộc tính, an toàn 100%

                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreateAt = utcNow;
                }
            }
        }
    }

}