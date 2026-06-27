using api.Utilities;
using AutoMapper;

namespace api.Extensions
{
    public class PagedResultConverter<TSource, TDestination> : ITypeConverter<PagedResult<TSource>, PagedResult<TDestination>>
    {
        public PagedResult<TDestination> Convert(PagedResult<TSource> source, PagedResult<TDestination> destination, ResolutionContext context)
        {
            // Fail Fast
            ArgumentNullException.ThrowIfNull(source);

            // Sử dụng context để map danh sách Items bên trong một cách tự động
            var mappedItems = context.Mapper.Map<List<TDestination>>(source.Items);

            return new PagedResult<TDestination>(
                mappedItems,
                source.TotalCount,
                source.PageNumber,
                source.PageSize
            );
        }
    }
}
