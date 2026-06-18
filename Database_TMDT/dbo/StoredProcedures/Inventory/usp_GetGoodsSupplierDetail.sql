CREATE PROCEDURE [dbo].[usp_GetGoodsSupplierDetail]
	@ShopId UNIQUEIDENTIFIER,
	@SupplierId UNIQUEIDENTIFIER
AS
BEGIN
	SELECT
		s.id AS Id,
		s.[name] AS Name,
		s.contact_name AS ContactName,
		s.phone_number AS PhoneNumber,
		s.email AS Email,
		s.[address] AS [Address],
		s.tax_code AS TaxCode
	FROM SUPPLIERS s
	INNER JOIN SHOPS shop
		ON shop.id = s.shop_id
	WHERE s.id = @SupplierId
		AND shop.id = @ShopId
END
