using api.Dtos.Common;
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
        Task<Result<InvoiceDetailResponseDto>> GetShopDetail(Guid? userId, Guid invoiceId, CancellationToken cancellationToken);
        Task<Result<PagedResult<InvoiceResponseDto>>> GetListById(Guid? userId, CancellationToken cancellationToken);
        Task<Result<PagedResult<InvoiceResponseDto>>> GetListForAdmin(PaginationRequestDto requset, CancellationToken cancellationToken);
        Task<Result<Guid>> ApproveInvoice(Guid userId, Guid invoiceId, CancellationToken cancellationToken);
    }
    public class InvoiceService(
        ILogger<Invoice> logger,
        IUnitOfWork unitOfWork,
        IIdGenerator idGenerator,
        IUserRepository userRepository,
        IDeliveryRepository deliveryRepository,
        IInvoiceRepository repo) : IInvoiceService
    {
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
            var listVaiantId = request.Items.Select(v => v.VariantId).ToList();
            var listProductId = await repo.GetProductIdsMapByVariantIdsAsync(listVaiantId, cancellationToken);

            foreach (var item in request.Items)
            {
                // Bắt lỗi nếu VariantId truyền lên không có thật trong DB
                if (!pricesDict.TryGetValue(item.VariantId, out var cost))
                {
                    return Result<InvoiceDetailResponseDto>.Failure(Error.Create("invoice.request", "variant not found", ErrorType.BadRequest));
                }

                order.AddItem(listProductId[item.VariantId], item.VariantId, item.Quantity, cost);
            }

            // --- GỌI HÀM TÁCH XỬ LÝ DELIVERY TẠI ĐÂY ---
            var deliveryResult = await ProcessDeliveryAsync(id, userId, request, cancellationToken);
            if (deliveryResult.IsFailure)
            {
                return Result<InvoiceDetailResponseDto>.Failure(deliveryResult.Error);
            }

            // Gán thông tin Delivery vào Order gộp chung 1 mối quan hệ
            order.AddDelivery(deliveryResult.Value);

            // Gọi các hàm chuẩn đã có hậu tố Async và nhận CancellationToken bên Repo
            await repo.AddInvoiceAsync(order, cancellationToken);
            await unitOfWork.CommitAsync(cancellationToken);

            // Lấy lại order từ DB để map vào DTO (bao gồm Tên và Hình ảnh)
            var savedOrder = await repo.GetDetailAsync(userId, id, cancellationToken);
            var res = MapInvoiceToInvoiceDetailDto(savedOrder!);
            return res;
        }

        public async Task<Result<InvoiceDetailResponseDto>> AddDeliveryToInvoice(
            Guid? userId,
            Guid invoiceId,
            AddDeliveryRequestDto request,
            CancellationToken cancellationToken)
        {
            // 1. Kiểm tra UserId hợp lệ (Fail Fast)
            if (userId == null || userId == Guid.Empty)
            {
                return Result<InvoiceDetailResponseDto>.Failure(
                    Error.Create("Invoice.Add.Delivery", "Người dùng không hợp lệ.", ErrorType.Unauthorized));
            }

            Invoice iv = await repo.getByIdTracking(invoiceId, cancellationToken);
            if (iv is null)
            {
                return Result<InvoiceDetailResponseDto>.Failure(
                    Error.Create("Invoice.Add.Delivery", "Hóa đơn không tồn tại.", ErrorType.NotFound));
            }

            string receiverName = request.ReceiverName?.Trim() ?? string.Empty;
            string receiverPhone = request.ReceiverPhone?.Trim() ?? string.Empty;

            if (string.IsNullOrWhiteSpace(receiverName) || string.IsNullOrWhiteSpace(receiverPhone))
            {
                User user = await userRepository.GetUserByIdAsync(userId.Value);
                if (user is null)
                {
                    return Result<InvoiceDetailResponseDto>.Failure(
                        Error.Create("Invoice.Add.Delivery", "Không tìm thấy thông tin tài khoản người dùng.", ErrorType.NotFound));
                }

                if (string.IsNullOrWhiteSpace(receiverName)) receiverName = user.FullName;
                if (string.IsNullOrWhiteSpace(receiverPhone)) receiverPhone = user.Phone;
            }

            // 4. Xử lý logic Địa chỉ (Address) - GIỮ NGUYÊN các hàm Repo của bạn
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
                    return Result<InvoiceDetailResponseDto>.Failure(
                        Error.Create("Invoice.Add.Address", "Thông tin địa chỉ cụ thể không được để trống.", ErrorType.BadRequest));
                }

                Guid newAddressId = idGenerator.NewId();
                Address adNew = Address.Create(userId.Value, newAddressId, request.Address.Trim());

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

            deliveryRepository.AddDelivery(d);

            iv.SetDeliveryId(deliveryId, shippingFee);

            // Nếu repo.getByIdTracking trả về một đối tượng bị ngắt tracking, ta chủ động update
            // repo.Update(iv);

            await unitOfWork.CommitAsync(cancellationToken);

            return MapInvoiceToInvoiceDetailDto(iv);
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

        public async Task<Result<InvoiceDetailResponseDto>> GetShopDetail(Guid? userId, Guid invoiceId, CancellationToken cancellationToken)
        {
            if (invoiceId == Guid.Empty)
            {
                return Result<InvoiceDetailResponseDto>.Failure(Error.Create("invoice.request", "request data is null", ErrorType.BadRequest));
            }
            var res = await repo.GetDetailShopAsync(userId, invoiceId, cancellationToken);
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

        public async Task<Result<PagedResult<InvoiceResponseDto>>> GetListForAdmin(PaginationRequestDto request, CancellationToken cancellationToken)
        {
            // 1. Lấy dữ liệu từ repo
            var pagedData = await repo.GetListForAdmin(request, cancellationToken);

            // 2. Map dữ liệu
            var dtos = pagedData.Items.Select(p => new InvoiceResponseDto
            {
                Id = p.Id,
                CreatedAt = p.CreatedAt,
                Status = p.Status.ToString(), // Chuyển Enum sang string
                PaymentMethod = p.Payment.PaymentMethod.ToString() , // Giả định có thuộc tính Method trong Payment

                // Tính tổng tiền từ danh sách items
                TotalAmount = p.Items.Sum(x => x.PriceAtPurchase * x.Quantity),

                // Tính tổng số lượng sản phẩm (Tổng quantity của tất cả items)
                TotalItems = p.Items.Sum(x => x.Quantity)
            }).ToList();

            // 3. Tạo PagedResult mới
            var result = new PagedResult<InvoiceResponseDto>(
                dtos,
                pagedData.TotalCount,
                request.PageNumber,
                request.PageSize
            );

            return Result<PagedResult<InvoiceResponseDto>>.Success(result);
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
                Status = invoice.Status.ToString(),
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

        public async Task<Result<Guid>> ApproveInvoice(Guid shopId, Guid invoiceId, CancellationToken cancellationToken)
        {
            var result = await repo.ApproveInvoice(shopId, invoiceId, cancellationToken);

            return Result<Guid>.Success(result);
        }
        private async Task<Result<Delivery>> ProcessDeliveryAsync(
            Guid orderId,
            Guid? userId,
            InvoiceCreateRequestDto request,
            CancellationToken cancellationToken)
        {
            User u = await userRepository.GetUserByIdAsync(userId.Value);
            if (u is null)
            {
                return Result<Delivery>.Failure(Error.Unauthorized());
            }
            // TRƯỜNG HỢP 1: Có thông tin DeliveryRequest từ Client gửi lên
            if (request.DeliveryRequest != null)
            {
                var newAddressId = idGenerator.NewId();
                // 1. Tạo mới một Address dựa trên thông tin client nhập
                var newAddress = Address.Create(
                    userId!.Value,
                    newAddressId,
                    request.DeliveryRequest.Address
                );
                newAddress.SetAsUsed(true);
                await repo.AddAddressAsync(newAddress, cancellationToken); // Chỉ Add vào change tracker, chưa commit
                bool isUpdated = await repo.UpdateAddressInUserDetailAsync(userId.Value, newAddressId, cancellationToken);

                if (!isUpdated)
                {
                    return Result<Delivery>.Failure(Error.Create("User.Detail", "Không thể cập nhật thông tin địa chỉ cho người dùng", ErrorType.BadRequest));
                }
                // 2. Tạo Delivery liên kết với Address vừa tạo
                var delivery = Delivery.CreateNoId(
                    orderId,
                    newAddress.Id,
                    request.DeliveryRequest.ReceiverName,
                    u.Phone,
                    request.DeliveryRequest.ShippingFee
                );

                return Result<Delivery>.Success(delivery);
            }

            // TRƯỜNG HỢP 2: Không truyền (Mặc định lấy thông tin cá nhân của User)
            if (!userId.HasValue)
            {
                return Result<Delivery>.Failure(Error.Unauthorized());
            }

          

            Address address = await repo.GetAddressUsed(); // Giả sử lấy địa chỉ mặc định
            if (address is null)
            {
                return Result<Delivery>.Failure(Error.Create("Invoice.address", "Không tìm thấy địa chỉ của người dùng", ErrorType.BadRequest));
            }

            decimal shippingFee = 50000; // Phí ship mặc định cố định 
            var defaultDelivery = Delivery.CreateNoId(orderId, address.Id, u.FullName, u.Phone, shippingFee);

            return Result<Delivery>.Success(defaultDelivery);
        }
    }
}
