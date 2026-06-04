CREATE PROCEDURE [dbo].[usp_GetShopProfile]
AS
BEGIN
	SELECT 
		s.id, 
		s.name AS Name,
		u.Email,
		u.Phone,
		s.description AS [Description],
		a.AddressUrl AS [Address],
		sl.logo_url AS Logo,
		ub.bank_name AS BankName,
		ub.account_name AS AccountName,
		ub.account_number AS AccountNumber
	FROM SHOPS s
	INNER JOIN Users u 
		ON s.id = u.Id
	INNER JOIN Addresses a
		ON a.UserId = s.id
	INNER JOIN USER_BANKINGS ub
		ON ub.user_id = u.Id
	INNER JOIN SHOP_LOGOS sl
		ON sl.shop_id = s.id
	WHERE s.system_status = 'approved'
END
