using api.Dtos.Products.Request;
using api.Repository;
using api.Repository.ProductRepo;
using api.Services.Products;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductController(IProductService productService) : BaseController
    {
        [HttpPost]
        public async Task<IActionResult> Create(ProductCreateDto productDto)
        {
            var result = await productService.CreateProduct(productDto);
            return HandleResult(result);
        }

        [HttpPut]
        public IActionResult Update(int id)
        {
            return Ok("");
        }
        [HttpPatch]
        public IActionResult Delete(int id)
        {
            return Ok("");
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok("Hello world");
        }
        [HttpGet("/{id}")]
        public IActionResult GetById(int id)
        {

            return Ok($"Product with id {id}");
        }
        [HttpGet("/category")]
        public IActionResult GetByCategory(string category)
        {
            return Ok("");
        }
    }
   
}
