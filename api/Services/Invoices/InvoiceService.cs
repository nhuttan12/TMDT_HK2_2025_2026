using api.Dtos.Invoice.Requests;
using api.Dtos.Invoice.Response;
using api.Models;
using api.Models.Orders;
using api.Models.Payments;
using api.Repository;
using api.Repository.InvoiceRepo;
using api.Repository.UserRepo;
using api.Utilities;
using Api.Models.Users;

namespace api.Services.Invoices
{
    public interface IInvoiceService
    {
        Task<Result<InvoiceDetailResponseDto>> AddDeliveryToInvoice(Guid? userId, Guid invoiceId, AddDeliveryRequestDto request, CancellationToken cancellationToken);
        Task<Result<InvoiceDetailResponseDto>> CreateInvoice(Guid? userId, InvoiceCreateRequestDto requset, CancellationToken cancellationToken);
        Task<Result<InvoiceDetailResponseDto>> GetDetail(Guid? userId, Guid invoiceId, CancellationToken cancellationToken);
        Task<Result<PagedResult<InvoiceResponseDto>>> GetListById(Guid? userId, CancellationToken cancellationToken);
    }
    public class InvoiceService(
        ILogger<Invoice> logger,
        IUnitOfWork unitOfWork,
        IIdGenerator idGenerator,
        IUserRepository userRepository,
        IDeliveryRepository deliveryRepository,
        IInvoiceRepository repo) : IInvoiceService
    {
        public async Task<Result<InvoiceDetailResponseDto>> AddDeliveryToInvoice(
          Guid? userId,
          Guid invoiceId,
          AddDeliveryRequestDto request,
          CancellationToken cancellationToken)
        {
            // 1. Kiểm tra UserId hợp lệ
            if (userId == null || userId == Guid.Empty)
            {
                return Result<InvoiceDetailResponseDto>.Failure(Error.Create("Invoice.Add.Delivery", "Người dùng không hợp lệ.", ErrorType.Unauthorized));
            }

            // 2. Lấy Invoice bằng hàm Tracking (Hoặc No-Tracking tùy bạn, vì ta sẽ gọi Update ở dưới nếu cần)
            Invoice iv = await repo.getByIdTracking(invoiceId, cancellationToken);
            if (iv is null)
            {
                return Result<InvoiceDetailResponseDto>.Failure(Error.Create("Invoice.Add.Delivery", "Hóa đơn không tồn tại.", ErrorType.NotFound));
            }

            // 3. Xử lý logic thông tin người nhận
            string receiverName = request.ReceiverName;
            string receiverPhone = request.ReceiverPhone;

            if (string.IsNullOrWhiteSpace(receiverName) || string.IsNullOrWhiteSpace(receiverPhone))
            {
                User user = await userRepository.GetUserByIdAsync(userId.Value);
                if (user is null)
                {
                    return Result<InvoiceDetailResponseDto>.Failure(Error.Create("Invoice.Add.Delivery", "Không tìm thấy thông tin tài khoản người dùng.", ErrorType.NotFound));
                }

                if (string.IsNullOrWhiteSpace(receiverName)) receiverName = user.FullName;
                if (string.IsNullOrWhiteSpace(receiverPhone)) receiverPhone = user.Phone;
            }

            // 4. Xử lý logic Địa chỉ (Address)
            Guid targetAddressId;
            Address ad = await deliveryRepository.GetAddressById(userId, request.AddressId, cancellationToken);

            if (ad is not null)
            {
                targetAddressId = ad.Id;
            }
            else
            {
                if (string.IsNullOrWhiteSpace(request.Address))
                {
                    return Result<InvoiceDetailResponseDto>.Failure(Error.Create("Invoice.Add.Address", "Thông tin địa chỉ cụ thể không được để trống.", ErrorType.BadRequest));
                }

                Guid newAddressId = idGenerator.NewId();
                Address adNew = Address.Create(userId.Value, newAddressId, request.Address);

                deliveryRepository.AddAddress(adNew);
                targetAddressId = newAddressId;
            }

            decimal shippingFee = request.ShippingFee;
            Guid deliveryId = idGenerator.NewId();

            // 5. Khởi tạo đối tượng Delivery độc lập
            Delivery d = Delivery.Create(
                deliveryId,
                invoiceId,
                targetAddressId,
                receiverPhone,
                receiverName,
                shippingFee
            );

            // 6. THAY ĐỔI CHÍNH: Thêm trực tiếp dòng dữ liệu vào bảng DELIVERY thông qua Repo vừa viết
            deliveryRepository.AddDelivery(d);

            // 7. THAY ĐỔI CHÍNH: Chỉ cập nhật ID của delivery sang Invoice (Tránh truyền nguyên cây Object gây lỗi State)
            iv.SetDeliveryId(deliveryId, shippingFee);

            // Nếu bạn đang tắt hoàn toàn Tracking ở bước trước, hãy un-comment dòng dưới đây:
            // repo.Update(iv);

            // 8. Lưu vào Cơ sở dữ liệu (EF Core sẽ sinh lệnh INSERT cho Delivery trước rồi UPDATE cho Invoice sau)
            await unitOfWork.CommitAsync(cancellationToken);

            // Giữ nguyên cách return nguyên bản của bạn
            return MapInvoiceToInvoiceDetailDto(iv);
        }
        public async Task<Result<InvoiceDetailResponseDto>> CreateInvoice(Guid? userId, InvoiceCreateRequestDto request, CancellationToken cancellationToken)
        {
            Guid id = idGenerator.NewId();
            Invoice order = Invoice.Create(id, userId: userId);

            if (request == null || request.Items == null)
            {
                return Result<InvoiceDetailResponseDto>.Failure(Error.Create("invoice.request", "request data is null", ErrorType.BadRequest));
            }

            var variantIds = request.Items.Select(x => x.VariantId).Distinct().ToList();
            var pricesDict = await repo.GetVariantPricesAsync(variantIds, cancellationToken);

            foreach (var item in request.Items)
            {
                // Bắt lỗi nếu VariantId truyền lên không có thật trong DB
                if (!pricesDict.TryGetValue(item.VariantId, out var cost))
                {
                    return Result<InvoiceDetailResponseDto>.Failure(Error.Create("invoice.request", "variant not found", ErrorType.BadRequest));
                }

                order.AddItem(item.ProductId, item.VariantId, item.Quantity, cost);
            }

            // Gọi các hàm chuẩn đã có hậu tố Async và nhận CancellationToken bên Repo
            await repo.AddInvoiceAsync(order, cancellationToken);
            await unitOfWork.CommitAsync(cancellationToken);

            // Lấy lại order từ DB để map vào DTO (bao gồm Tên và Hình ảnh)
            var savedOrder = await repo.GetDetailAsync(userId, id, cancellationToken);
            var res = MapInvoiceToInvoiceDetailDto(savedOrder!);
            return res;
        }

        public async Task<Result<InvoiceDetailResponseDto>> GetDetail(Guid? userId, Guid invoiceId, CancellationToken cancellationToken)
        {
            if (invoiceId == Guid.Empty)
            {
                return Result<InvoiceDetailResponseDto>.Failure(Error.Create("invoice.request", "request data is null", ErrorType.BadRequest));
            }
            var res = await repo.GetDetailAsync(userId, invoiceId, cancellationToken);
            return MapInvoiceToInvoiceDetailDto(res);
        }

        public async Task<Result<PagedResult<InvoiceResponseDto>>> GetListById(Guid? userId, CancellationToken cancellationToken)
        {
            var invoices = await repo.GetListByUserIdAsync(userId, cancellationToken);

            if (invoices == null || !invoices.Any())
            {
                return Result<PagedResult<InvoiceResponseDto>>.Success(new PagedResult<InvoiceResponseDto>([], 0, 1, 12));
            }
            logger.LogInformation("detail data: {res}", invoices.First().Items.ToString());

            var mappedDtos = invoices
                .Select(MapInvoiceToInvoiceDto)
                .Where(result => result.IsSuccess)
                .Select(result => result.Value!)
                .ToList();

            return Result<PagedResult<InvoiceResponseDto>>.Success(new PagedResult<InvoiceResponseDto>
            (
                mappedDtos,
                mappedDtos.Count,
                1,
                12
            ));
        }

        private Result<InvoiceDetailResponseDto> MapInvoiceToInvoiceDetailDto(Invoice invoice)
        {
            if (invoice == null)
            {
                return Result<InvoiceDetailResponseDto>.Failure(Error.Create("invoice.request", "request data is null", ErrorType.BadRequest));
            }
            ICollection<InvoiceItemReponseDto> list = [];
            if (invoice.Items.Any())
            {
                foreach (var item in invoice.Items)
                {
                    list.Add(new InvoiceItemReponseDto
                    {
                        ProductId = item.ProductId,
                        VariantId = item.VariantId,
                        Price = item.PriceAtPurchase,
                        Quantity = item.Quantity,
                        SubTotal = item.Quantity * item.PriceAtPurchase,
                        ProductName = item.Variant?.Product?.Name ?? "",
                        ImageUrl = item.Variant?.ImageUrl ?? "",
                    });
                }
            }
            string recipientName = null;
            string recipientPhone = null;
            string address = null;
            decimal shippingFee = 0;
            if (invoice.Delivery is not null)
            {
                recipientName = invoice.Delivery.ReceiverName;
                recipientPhone = invoice.Delivery.ReceiverPhone;
                address = invoice.Delivery.Address.AddressUrl;
                shippingFee = invoice.Delivery.ShippingFee;
            }
            decimal discountAmount = 0;
            if (invoice.AppliedCoupon is not null)
            {
                discountAmount = invoice.AppliedCoupon.DiscountAmount;
            }
            var responseDto = new InvoiceDetailResponseDto
            {
                Id = invoice.Id,
                UserId = invoice.UserId,
                CouponId = invoice.CouponId,
                TotalAmount = invoice.TotalAmount,
                FinalAmount = invoice.FinalAmount,
                Status = invoice.Status,
                CreatedAt = invoice.CreatedAt,
                UpdatedAt = invoice.UpdatedAt,

                RecipientName = recipientName,
                RecipientPhone = recipientPhone,
                Address = address,
                ShippingFee = shippingFee,
                DiscountAmount = discountAmount,

                Items = list.Any() ? list : []
            };

            return Result<InvoiceDetailResponseDto>.Success(responseDto);
        }

        private Result<InvoiceResponseDto> MapInvoiceToInvoiceDto(Invoice invoice)
        {
            return new InvoiceResponseDto
            {
                Id = invoice.Id,
                CreatedAt = invoice.CreatedAt,
                Status = invoice.Status.ToString(),
                PaymentMethod = PaymentMethod.CreditCard.ToString(),
                TotalAmount = invoice.TotalAmount,
                TotalItems = invoice.Items.Count,
            };
        }
    }
}
