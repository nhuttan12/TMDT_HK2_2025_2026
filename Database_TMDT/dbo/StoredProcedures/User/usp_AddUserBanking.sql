CREATE PROCEDURE [dbo].[usp_AddUserBanking]
	@UserId UNIQUEIDENTIFIER,
	@BankName NVARCHAR(255),
	@AccountNumber NVARCHAR(255),
	@AccountName NVARCHAR(255)
AS
BEGIN
	BEGIN TRY
		SET NOCOUNT ON;

		DECLARE @TotalRowsAffected INT = 0;

		BEGIN TRANSACTION;

		INSERT INTO USER_BANKINGS (user_id, bank_name, account_number, account_name, status)
		SELECT @UserId, @BankName, @AccountNumber, @AccountName, 1 
		WHERE NOT EXISTS (
			SELECT 1
			FROM USER_BANKINGS WITH (UPDLOCK, HOLDLOCK)
			WHERE user_id = @UserId
				AND bank_name = @BankName
				AND account_number = @AccountNumber
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