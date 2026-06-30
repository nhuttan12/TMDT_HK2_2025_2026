namespace api.Dtos.Products.Respones
{
    public record CategoryNameResponse(IEnumerable<CategoryNameDto> ListNames);
    public record CategoryNameDto(Guid Id, string Name);

}
