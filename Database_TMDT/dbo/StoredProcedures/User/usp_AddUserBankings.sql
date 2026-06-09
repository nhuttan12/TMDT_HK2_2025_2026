CREATE PROCEDURE [dbo].[usp_AddUserBanking]
	@UserId UNIQUEIDENTIFIER,
	@UserBankings dbo.[UserBankingInsertType] READONLY
AS
BEGIN
	BEGIN TRY
		SET NOCOUNT ON;

		DECLARE @TotalRowsAffected INT = 0;

		BEGIN TRANSACTION;

		INSERT INTO USER_BANKINGS (
			user_id, 
			bank_name, 
			account_number, 
			account_name, 
			status
		)
		SELECT 
			@UserId, 
			source.BankName, 
			source.AccountNumber, 
			source.AccountName, 
			1 
		FROM @UserBankings AS source
		WHERE NOT EXISTS (
			SELECT 1
			FROM USER_BANKINGS WITH (UPDLOCK, HOLDLOCK)
			WHERE user_id = @UserId
				AND bank_name = source.BankName
				AND account_number = source.AccountNumber
		);

		SET @TotalRowsAffected = @TotalRowsAffected + @@ROWCOUNT;

		COMMIT TRANSACTION;

		SELECT @TotalRowsAffected AS RowsAffected;

	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
			ROLLBACK;
		THROW;
	END CATCH
END