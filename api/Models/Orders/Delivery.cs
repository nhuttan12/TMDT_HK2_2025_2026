using Api.Models.Users;

namespace api.Models.Orders
{
    public class Delivery
    {
        public Guid Id { get; private set; }          
        public Guid InvoiceId { get; private set; } 
        public Invoice Invoice { get; private set; }
        public Guid AddressId { get; private set; }   
        public Address Address { get; private set; }

        public string ReceiverPhone { get; private set; }  
        public string ReceiverName { get; private set; }  
        public decimal ShippingFee { get; private set; }  
        public DeliveryStatus ShippingStatus { get; private set; }

        private Delivery() { }

        public static Delivery Create(
            Guid id,
            Guid invoiceId,
            Guid addressId,
            string receiverPhone,
            string receiverName,
            decimal shippingFee)
        {
            if (id == Guid.Empty) throw new ArgumentException("Id không hợp lệ.", nameof(id));
            if (invoiceId == Guid.Empty) throw new ArgumentException("InvoiceId không hợp lệ.", nameof(invoiceId));
            if (addressId == Guid.Empty) throw new ArgumentException("AddressId không hợp lệ.", nameof(addressId));

            if (string.IsNullOrWhiteSpace(receiverPhone))
                throw new ArgumentException("Số điện thoại không được để trống.", nameof(receiverPhone));

            if (string.IsNullOrWhiteSpace(receiverName))
                throw new ArgumentException("Tên người nhận không được để trống.", nameof(receiverName));

            if (shippingFee < 0)
                throw new ArgumentException("Phí vận chuyển không được âm.", nameof(shippingFee));

            return new Delivery
            {
                Id = id,
                InvoiceId = invoiceId,
                AddressId = addressId,
                ReceiverPhone = receiverPhone.Trim(),
                ReceiverName = receiverName.Trim(),
                ShippingFee = shippingFee,
                ShippingStatus = DeliveryStatus.Pending
            };
        }

        // Các phương thức cập nhật dữ liệu (Nghiệp vụ nội tại)
        public void UpdateReceiver(string name, string phone)
        {
            if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(phone))
                throw new ArgumentException("Thông tin người nhận không hợp lệ.");

            ReceiverName = name.Trim();
            ReceiverPhone = phone.Trim();
        }

        public void UpdateShippingFee(decimal newFee)
        {
            if (newFee < 0) throw new ArgumentException("Phí vận chuyển không được âm.");
            ShippingFee = newFee;
        }

        public void UpdateStatus(DeliveryStatus newStatus)
        {
            ShippingStatus = newStatus;
        }
    }
}
