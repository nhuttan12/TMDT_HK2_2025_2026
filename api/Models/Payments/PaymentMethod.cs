namespace api.Models.Payments
{
    public enum PaymentMethod
    {
        COD = 1,
        VNPAY = 2,
        MoMo = 3,
        CreditCard = 4,      // Map với 'credit_card'
        BankTransfer = 5     // Map với 'bank_transfer'
    }
}
