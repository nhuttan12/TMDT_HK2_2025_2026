using api.Services.Payment;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers.Payment
{
    
    [ApiController]
    [Route("api/payment")]
    public class PaymentController(IPaymentService paymentService) : BaseController
    {
        //TODO: crate paymetn

        //TODO: get payment

    }
}
