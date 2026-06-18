CREATE PROCEDURE [dbo].[usp_UpdateUserBanking]
	@UserId UNIQUEIDENTIFIER,
	@UserBankings dbo.[UserBankingInsertType] READONLY
AS
BEGIN
	BEGIN TRY
		SET NOCOUNT ON;

		DECLARE @TotalRowsAffected INT = 0;

		BEGIN TRANSACTION;
			
		IF (SELECT COUNT(*) FROM @UserBankings) > 3
		BEGIN
			;THROW 50001, N'Một người dùng chỉ được phép có tối đa 3 tài khoản ngân hàng.', 1;
		END

		-- Hủy bỏ những tài khoản cũ đang có trong DB nhưng Client không gửi lên nữa (User đã bấm xóa trên UI)
		UPDATE USER_BANKINGS
		SET status = 0, updated_at = GETDATE()
		WHERE user_id = @UserId
			AND status = 1
			AND account_number NOT IN (
				SELECT AccountNumber FROM @UserBankings
			);

		SET @TotalRowsAffected = @TotalRowsAffected + @@ROWCOUNT;

		-- User giữ nguyên Số tài khoản nhưng có thể sửa lại "Tên chủ tài khoản", 
        -- hoặc User nhập lại một số tài khoản trước đó từng bị xóa mềm.
		UPDATE target
		SET target.account_name = source.AccountName,
			target.status = 1,
			target.updated_at = GETDATE() 
		FROM USER_BANKINGS AS target
		INNER JOIN @UserBankings as source
			ON target.account_number = source.AccountNumber
			AND target.bank_name = source.BankName
			AND target.user_id = @UserId
		WHERE target.account_name <> source.AccountName
			OR target.status = 0;

		SET @TotalRowsAffected = @TotalRowsAffected + @@ROWCOUNT;

		-- Thêm những tài khoản hoàn toàn mới chưa từng tồn tại của User này
		INSERT INTO USER_BANKINGS (
			user_id, 
			bank_name, 
			account_number, 
			account_name, 
			status
		)
		SELECT @UserId, source.BankName, source.AccountNumber, source.AccountName, 1
		FROM @UserBankings as source
		WHERE NOT EXISTS (
			SELECT 1 FROM USER_BANKINGS AS target
			WHERE target.user_id = @UserId
				AND target.bank_name = source.BankName
				AND target.account_number = source.AccountNumber
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