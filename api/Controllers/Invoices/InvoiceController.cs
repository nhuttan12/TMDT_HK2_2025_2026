using api.Dtos.Common;
using api.Dtos.Invoice.Requests;
using api.Services.Invoices;
using api.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers.Invoices
{
    [ApiController]
    [Route("api/invoices")]
    public class InvoiceController(IInvoiceService service) : BaseController
    {
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] InvoiceCreateRequestDto requset, CancellationToken cancellationToken)
        {
            var userId = AuthenticatedUserId;
            if (userId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Unauthorized()));
            }
            var res = await service.CreateInvoice(userId, requset, cancellationToken);
            return HandleResult(res);
        }
        [HttpGet("me")]
        public async Task<IActionResult> GetMe(CancellationToken cancellationToken)
        {
            var userId = AuthenticatedUserId;
            if (userId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Unauthorized()));
            }
            var res = await service.GetListById(userId, cancellationToken);
            return HandleResult(res);
        }
        [HttpGet("{invoiceId}/detail")]
        public async Task<IActionResult> GetDetail([FromRoute] Guid invoiceId, CancellationToken cancellationToken)
        {
            var userId = AuthenticatedUserId;
            if (userId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Unauthorized()));
            }
            var res = await service.GetDetail(userId, invoiceId, cancellationToken);
            return HandleResult(res);
        }

        [HttpGet("/api/admin/invoices/{invoiceId}/detail")]
        public async Task<IActionResult> GetShopDetail([FromRoute] Guid invoiceId, CancellationToken cancellationToken)
        {
            var userId = AuthenticatedUserId;
            if (userId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Unauthorized()));
            }
            var res = await service.GetShopDetail(userId, invoiceId, cancellationToken);
            return HandleResult(res);
        }


        [HttpPost("{invoiceId}/delivery")]
        public async Task<IActionResult> AddDelivery(
         [FromRoute] Guid invoiceId,
         [FromBody] AddDeliveryRequestDto request,
         CancellationToken cancellationToken)
        {
            var userId = AuthenticatedUserId;
            if (userId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Unauthorized()));
            }

            // Gọi service xử lý logic: Khởi tạo Entity Delivery và gắn vào Invoice
            var res = await service.AddDeliveryToInvoice(userId, invoiceId, request, cancellationToken);
            return HandleResult(res);
        }

        [HttpGet("/api/admin/invoices")]
        [Authorize(Roles = "Shop")]
        public async Task<IActionResult> GetListForAdmin([FromQuery] PaginationRequestDto requset, CancellationToken cancellationToken)
        {
          
            var res = await service.GetListForAdmin(requset, cancellationToken);
            return HandleResult(res);
        }

        [HttpPatch("/api/admin/invoice")]
        [Authorize(Roles = "Shop")]
        public async Task<IActionResult> ApproveInvoice([FromBody] Guid invoiceId, CancellationToken cancellationToken)
        {
            var userId = AuthenticatedUserId;
            if (userId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Unauthorized()));
            }
            var res = await service.ApproveInvoice(userId.Value, invoiceId, cancellationToken);
            return HandleResult(res);
        }

        //[HttpPost("{invoiceId}/coupon")]
        //public async Task<IActionResult> ApplyCoupon(
        //    [FromRoute] Guid invoiceId,
        //    [FromBody] ApplyCouponRequestDto request,
        //    CancellationToken cancellationToken)
        //{
        //    var userId = AuthenticatedUserId;
        //    if (userId == null)
        //    {
        //        return HandleResult(Result<bool>.Failure(Error.Unauthorized()));
        //    }

        //    // Gọi service xử lý logic: Kiểm tra coupon hợp lệ, khởi tạo InvoiceAppliedCoupon và áp dụng vào Invoice
        //    var res = await service.ApplyCouponToInvoice(userId, invoiceId, request, cancellationToken);
        //    return HandleResult(res);
        //}
    }
}
