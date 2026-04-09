using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;

namespace demo1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HelloController : Controller
    {
        [HttpGet]
        public IActionResult SayHello()
        {
            return Ok("xin chao");
        }
    }
}
