CREATE PROCEDURE [dbo].[usp_RegisterShop]
	-- Thông tin User
    @Email NVARCHAR(255),
    @Phone VARCHAR(20),
    @PasswordHash NVARCHAR(MAX),
    @RoleId INT,

    -- Thông tin Shop (Bảng SHOPS)
    @ShopName NVARCHAR(255),
    @Description NVARCHAR(MAX),
    @ShopStatus NVARCHAR(50),

    -- Thông tin Address (Bảng Addresses)
    @AddressUrl NVARCHAR(MAX),

    -- Thông tin Ngân hàng (Bảng USER_BANKINGS)
    @BankName NVARCHAR(255),
    @AccountName NVARCHAR(255),
    @AccountNumber VARCHAR(20),

    @OutUserId UNIQUEIDENTIFIER OUTPUT
AS
BEGIN
	IF EXISTS (SELECT 1 FROM Users WHERE Email = @Email)
    BEGIN
        ;THROW 50001, 'Email này đã được đăng ký. Vui lòng sử dụng email khác.', 1;
    END

    IF @Phone IS NOT NULL AND EXISTS (SELECT 1 FROM Users WHERE Phone = @Phone)
    BEGIN
        ;THROW 50002, 'Số điện thoại này đã được đăng ký. Vui lòng sử dụng số điện thoại khác.', 1;
    END

    BEGIN TRY
        BEGIN TRANSACTION;

        SET @OutUserId = NEWID();
        DECLARE @CurrentTime DATETIMEOFFSET = SYSDATETIMEOFFSET();
        DECLARE @CurrentTimeUtc DATETIME = GETUTCDATE();

        -- A. TẠO USER
        INSERT INTO Users (Id, Email, Phone, PasswordHash, RoleId, CreateAt, UpdateAt)
        VALUES (
            @OutUserId, 
            LOWER(LTRIM(RTRIM(@Email))), 
            @Phone, 
            @PasswordHash, 
            @RoleId, 
            @CurrentTimeUtc, 
            @CurrentTimeUtc);

        -- B. TẠO SHOP
        INSERT INTO SHOPS (Id, name, description, status, created_at, updated_at)
        VALUES (@OutUserId, @ShopName, @Description, @ShopStatus, @CurrentTime, @CurrentTime);

        -- C. TẠO ADDRESS
        INSERT INTO Addresses (UserId, AddressUrl, CreatedAt, IsUsed)
        VALUES (@OutUserId, @AddressUrl, @CurrentTimeUtc, 0);

        -- D. TẠO THÔNG TIN NGÂN HÀNG
        DECLARE @NewBankingId UNIQUEIDENTIFIER = NEWID();
        INSERT INTO USER_BANKINGS(Id, user_id, bank_name, account_name, account_number, created_at, updated_at)
        VALUES (@NewBankingId, @OutUserId, @BankName, @AccountName, @AccountNumber, @CurrentTime, @CurrentTime);

        COMMIT TRANSACTION;

    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
        BEGIN 
            ROLLBACK TRANSACTION;
        END

        ;THROW
    END CATCH
END
