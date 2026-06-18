CREATE PROCEDURE [dbo].[usp_CreateSupplier]
	@ShopId UNIQUEIDENTIFIER, 
	@SupplierName NVARCHAR(255),
	@ContactName NVARCHAR(255),
	@PhoneNumber NVARCHAR(10),
	@Email NVARCHAR(255),
	@Address NVARCHAR(MAX),
	@TaxCode NVARCHAR(50),
	@OutputSupplierId UNIQUEIDENTIFIER OUTPUT
AS
BEGIN
	BEGIN TRY
		BEGIN TRANSACTION;

		DECLARE @CurrentTime DATETIMEOFFSET = SYSDATETIMEOFFSET();

        DECLARE @InsertedTable TABLE (id UNIQUEIDENTIFIER);

		INSERT INTO SUPPLIERS (
			[name],
			contact_name,
			phone_number,
			email,
			[address],
			tax_code,
			shop_id
		)
		OUTPUT inserted.id INTO @InsertedTable
		VALUES (
			@SupplierName,
			@ContactName,
			@PhoneNumber,
			@Email,
			@Address,
			@TaxCode,
			@ShopId
		)

		SELECT TOP 1 @OutputSupplierId = id FROM @InsertedTable

		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION;
		THROW
	END CATCH
END
