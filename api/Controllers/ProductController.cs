using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductController : BaseController
    {
        private readonly ILogger<ProductController> _logger;
        //private readonly IProductService _productService;
        private readonly IConfiguration _configuration;
        public ProductController(ILogger<ProductController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }
        public IActionResult GetAll()
        {
            return Ok("Hello world");
        }
        public IActionResult GetById(int id)
        {

            return Ok($"Product with id {id}");
        }
        public IActionResult GetByName(string name) {
            return Ok("");
        }

        public IActionResult GetByCategory(string category)
        {
            return Ok("");
        }

        public IActionResult Create()
        {
            return Ok("");
        }

        public IActionResult Update(int id)
        {
            return Ok("");
        }
        public IActionResult Delete(int id)
        {
            return Ok("");
        }
    }
}
