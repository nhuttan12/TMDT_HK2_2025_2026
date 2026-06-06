using api.Utilities;
using Microsoft.EntityFrameworkCore.ValueGeneration;

namespace api.Extensions
{
    public sealed class SqlServerSequentialIdGenerator : IIdGenerator
    {
        // Sử dụng instance duy nhất vì SequentialGuidValueGenerator là Thread-Safe.
        // Việc này giúp tránh cấp phát bộ nhớ (GC allocation) liên tục khi có request tải cao.
        private readonly SequentialGuidValueGenerator _generator = new();

        public Guid NewId()
        {
            // EF Core generator cần một EntityEntry, nhưng trong logic nội bộ sinh GUID, 
            // nó thực chất không sử dụng tham số này. Truyền null (hoặc null!) là hoàn toàn an toàn.
            return _generator.Next(null!);
        }
    }
}
