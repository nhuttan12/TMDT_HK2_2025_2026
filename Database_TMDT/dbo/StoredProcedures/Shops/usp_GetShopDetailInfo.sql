CREATE PROCEDURE [dbo].[usp_GetShopDetailInfo]
	@ShopId UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRY
		SELECT 
			s.id, 
			s.[name] AS [Name], 
			u.email AS Email,
			u.phone AS Phone,
			s.[description] AS [Description],
			a.address_url AS [Address],
			sl.logo_url AS Logo,
			ub.bank_name AS BankName,
			ub.account_name AS AccountName,
			ub.account_number AS AccountNumber,
			s.[status] AS [Status],
			s.rating AS Rating,
			(SELECT COUNT(1) 
				FROM PRODUCTS p 
				WHERE p.shop_id = s.id) AS TotalProducts,
			(SELECT COUNT(1) 
				FROM INVOICES i 
				WHERE i.shop_id = s.id) AS TotalInvoices
		FROM SHOPS s

		INNER JOIN USERS u 
			ON s.id = u.Id
		INNER JOIN ADDRESSES a
			ON a.user_id = s.id
		INNER JOIN SHOP_LOGOS sl
			ON sl.shop_id = s.id
		INNER JOIN USER_BANKINGS ub
			ON ub.user_id = u.Id 
		INNER JOIN INVOICES i
			ON i.shop_id = s.id

		WHERE s.system_status = 'approved'
			AND s.id = @ShopId

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