using api.Database;
using api.Models.Orders;
using Api.Models.Users;
using Microsoft.EntityFrameworkCore;

namespace api.Repository.InvoiceRepo
{
    public interface IDeliveryRepository
    {
        void AddAddress(Address adNew);
        void AddDelivery(Delivery d);
        Task<Address> GetAddressById(Guid? userId, Guid? addressId, CancellationToken cancellationToken);
    }
    public class DeliveryRepository(MyAppDbContext context) : IDeliveryRepository
    {
        public void AddAddress(Address adNew)
        {
            context.Set<Address>().Add(adNew);
        }

        public void AddDelivery(Delivery d)
        {
            context.Set<Delivery>().Add(d);
        }

        public async Task<Address?> GetAddressById(Guid? userId, Guid? addressId, CancellationToken cancellationToken)
        {
            if (userId == null || addressId == null) return null;

            return await context.Set<Address>()
                .AsNoTracking() // Tối ưu hiệu năng vì hàm này chỉ đọc dữ liệu (Read-Only)
                .FirstOrDefaultAsync(a => a.Id == addressId && a.UserId == userId, cancellationToken);
        }
    }
}
