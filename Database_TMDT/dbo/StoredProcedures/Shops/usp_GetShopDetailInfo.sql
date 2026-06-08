CREATE PROCEDURE [dbo].[usp_GetShopDetailInfo]
	@param1 int = 0,
	@param2 int
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRY
		SELECT 
			s.id, 
			s.name AS Name, 
			u.Email AS Email,
			u.Phone AS Phone,
			s.description AS [Description],
			a.AddressUrl AS [Address],
			sl.logo_url AS Logo,
			ub.bank_name AS BankName,
			ub.account_name AS AccountName,
			ub.account_number AS AccountNumber,
			s.status AS [Status],
			s.rating AS Rating
			--COUNT(p.Id) AS TotalProducts

		FROM SHOPS s
		INNER JOIN Users u 
			ON s.id = u.Id
		INNER JOIN Addresses a
			ON a.UserId = s.id
		INNER JOIN SHOP_LOGOS sl
			ON sl.shop_id = s.id
		INNER JOIN USER_BANKINGS ub
			ON ub.user_id = u.Id
		--INNER JOIN Products p
		--	ON p.shop_id = s.id

		WHERE s.system_status = 'approved'

	END TRY
	BEGIN CATCH
		DECLARE @ErrorMessage NVARCHAR(4000);
		DECLARE @ErrorSeverity INT;
		DECLARE @ErrorState INT;
		SELECT 
			@ErrorMessage = ERROR_MESSAGE(),
			@ErrorSeverity = ERROR_SEVERITY(),
			@ErrorState = ERROR_STATE();
		RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
	END CATCH
END