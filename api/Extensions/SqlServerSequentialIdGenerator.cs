using api.Utilities;
using Microsoft.EntityFrameworkCore.ValueGeneration;

namespace api.Extensions
{
    public sealed class SqlServerSequentialIdGenerator : IIdGenerator
    {

        public Guid NewId()
        {
            // .NET 9 Native: Cực kỳ nhanh, không allocate thêm bộ nhớ thừa,
            // và tạo ra chuỗi GUID tuần tự hoàn hảo cho Indexing.
            return Guid.CreateVersion7();
        }
    }
}
