using api.Dtos.Common;

namespace api.Dtos.Products.Request
{
    public record ProductSearchRequestDto : PaginationRequestDto
    {
        public string? SearchTerm { get; init; }
    }
}
