namespace api.Dtos.Users.Requests
{
    public record UserBankingCreateDTO(
        string BankName,
        string AccountNumber,
        string AccountName
    );
}
