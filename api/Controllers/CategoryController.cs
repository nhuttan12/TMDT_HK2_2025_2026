using api.Dtos.Common;
using api.Dtos.Products.Request;
using api.Services.Categorys;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/categories")]
    public class CategoryController(ICategoryService _categoryService) : BaseController
    {
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCategoryRequest request, CancellationToken cancellationToken = default)
        {
            var result = await _categoryService.Create(request, cancellationToken);
            return HandleResult(result);
        }
        [HttpGet("by-name")]
        public async Task<IActionResult> GetByName([FromQuery] string name, CancellationToken cancellationToken = default)
        {
            var result = await _categoryService.GetByName(name, cancellationToken);
            return HandleResult(result);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] PaginationRequestDto pagination, CancellationToken cancellationToken = default)
        {
            var result = await _categoryService.GetAllAsync(pagination, cancellationToken);
            return HandleResult(result);
        }
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(
            [FromRoute] Guid id, 
            [FromBody] UpdateCategoryRequest request,
            CancellationToken cancellationToken = default)
        {
            var result = await _categoryService.UpdateAsync(id, request, cancellationToken);
            return HandleResult(result);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(
            [FromRoute] Guid id, // Chỉ cần ID từ URL để xóa
            CancellationToken cancellationToken = default)
        {
            var result = await _categoryService.DeleteAsync(id, cancellationToken);
            return HandleResult(result);
        }
    }
   

}
