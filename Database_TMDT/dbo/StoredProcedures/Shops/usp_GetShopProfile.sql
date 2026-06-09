CREATE PROCEDURE [dbo].[usp_GetShopProfile]
AS
BEGIN
	SELECT 
		s.id, 
		s.name AS Name,
		u.email AS Email,
		u.phone AS Phone,
		s.description AS [Description],
		a.address_url AS [Address],
		sl.logo_url AS Logo,
		ub.bank_name AS BankName,
		ub.account_name AS AccountName,
		ub.account_number AS AccountNumber
	FROM SHOPS s
	INNER JOIN USERS u 
		ON s.id = u.id
	INNER JOIN ADDRESSES a
		ON a.user_id = s.id
	INNER JOIN USER_BANKINGS ub
		ON ub.user_id = u.id
	INNER JOIN SHOP_LOGOS sl
		ON sl.shop_id = s.id
	WHERE s.system_status = 'approved'
END
