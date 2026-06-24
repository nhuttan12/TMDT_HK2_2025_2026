CREATE PROCEDURE [dbo].[usp_GetShopProfile]
	@ShopId UNIQUEIDENTIFIER
AS
BEGIN
	SELECT 
		s.id, 
		s.[name] AS [Name],
		u.email AS Email,
		u.phone AS Phone,
		s.[description] AS [Description],
		a.address_url AS [Address],
		s.shop_logo AS Logo,
		ub.bank_name AS BankName,
		ub.account_name AS AccountName,
		ub.account_number AS AccountNumber
	FROM SHOPS s

	INNER JOIN USERS u 
		ON s.id = u.id

	LEFT JOIN ADDRESSES a
		ON a.user_id = s.id
	LEFT JOIN USER_BANKINGS ub
		ON ub.user_id = u.id

	WHERE s.system_status = 'approved'
		AND s.id = @ShopId
END
