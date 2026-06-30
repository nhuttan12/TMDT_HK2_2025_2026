namespace api.Dtos.Invoice.Requests
{
    public record AddDeliveryRequestDto(
          Guid? AddressId,
          string? Address,
          string? ReceiverPhone,
          string? ReceiverName,
          decimal ShippingFee
      );
}
