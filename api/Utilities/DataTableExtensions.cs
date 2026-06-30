using System.Data;

namespace api.Utilities
{
    public static class DataTableExtensions
    {
        public static DataTable ToDataTable<T>(this IEnumerable<T> items)
        {
            var dataTable = new DataTable();
            var properties = typeof(T).GetProperties();

            foreach (var prop in properties)
            {
                // Lấy tên cột: ưu tiên thuộc tính [Column] nếu có, nếu không lấy tên property
                var colName = prop.Name;
                // Bạn có thể thêm logic để map sang tên cột SQL nếu cần
                dataTable.Columns.Add(colName.ToLower(), Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType);
            }

            foreach (var item in items)
            {
                var values = new object[properties.Length];
                for (int i = 0; i < properties.Length; i++)
                {
                    values[i] = properties[i].GetValue(item, null) ?? DBNull.Value;
                }
                dataTable.Rows.Add(values);
            }

            return dataTable;
        }
    }
}
