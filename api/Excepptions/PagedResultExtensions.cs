using api.Utilities;

namespace api.Excepptions
{
    public static class PagedResultExtensions
    {
        public static PagedResult<TDestination> Map<TSource, TDestination>(
        this PagedResult<TSource> source,
        Func<TSource, TDestination> mapper)
        {
            return new PagedResult<TDestination>
            (
                // Duyệt qua Items, map sang kiểu mới, và ép về Array để tối ưu bộ nhớ (Zero capacity overhead)
                source.Items.Select(mapper).ToArray(),
                source.TotalCount,
                source.PageNumber,
                source.PageSize
            );
        }
    }
}
