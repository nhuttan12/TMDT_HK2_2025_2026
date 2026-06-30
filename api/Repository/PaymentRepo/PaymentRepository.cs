using api.Database;

namespace api.Repository.PaymentRepo
{
    public interface IPaymentRepository
    {
    }
    public class PaymentRepository(MyAppDbContext context) : IPaymentRepository
    {

    }
}
