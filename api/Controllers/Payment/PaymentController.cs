using api.Services.Payment;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers.Payment
{

    [ApiController]
    [Route("api/payment")]
    public class PaymentController(IPaymentService paymentService) : BaseController // Kế thừa BaseController của bạn
    {
        [HttpPost("create")]
        public async Task<IActionResult> CreatePayment([FromBody] CheckoutRequest request)
        {
            try
            {
                var paypalOrderId = await paymentService.CreatePayPalOrderAsync(request.InvoiceId);
                return Ok(new { orderId = paypalOrderId });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }

        [HttpPost("capture/{paypalOrderId}")]
        public async Task<IActionResult> CapturePayment(string paypalOrderId)
        {
            try
            {
                var isSuccess = await paymentService.CapturePayPalOrderAsync(paypalOrderId);

                if (isSuccess)
                {
                    return Ok(new { message = "Thanh toán thành công và hóa đơn đã được cập nhật." });
                }

                return BadRequest(new { message = "Giao dịch chưa hoàn tất phía PayPal." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }

    // DTO nhận dữ liệu
    public class CheckoutRequest
    {
        public Guid InvoiceId { get; set; }
    }
}
