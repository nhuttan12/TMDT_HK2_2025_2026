using api.Repository.PaymentRepo;
using AutoMapper;
using System.Reflection.Emit;

namespace api.Services.Payment
{
    public interface IPaymentService
    {

    }
    public class PaymentService(
        IMapper mapper,
        ILGenerator iLGenerator,
        IPaymentRepository paymentRepository) : IPaymentService
    {

    }
}
