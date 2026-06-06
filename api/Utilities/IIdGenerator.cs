namespace api.Utilities
{
    public interface IIdGenerator
    {
        /// <summary>
        /// Sinh mã GUID tuần tự, tối ưu cho Database Clustered Index.
        /// </summary>
        Guid NewId();
    }
}
