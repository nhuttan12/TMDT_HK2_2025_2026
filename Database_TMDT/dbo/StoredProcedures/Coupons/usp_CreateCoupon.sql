CREATE PROCEDURE [dbo].[usp_CreateCoupon]
	@Code VARCHAR(50),
	@Name NVARCHAR(255),
	@Scope VARCHAR(20),
	@Category VARCHAR(20),
	@Type VARCHAR(20),
	@DiscountValue DECIMAL(18,2),
	@MaxDiscountAmount DECIMAL(18,2),
	@MinInvoiceValue DECIMAL(18,2),
	@TotalQuantity INT,
	@StartAt DATETIMEOFFSET,
	@EndAt DATETIMEOFFSET,
	@Status BIT,
	@UserId UNIQUEIDENTIFIER,
	@OutCouponId UNIQUEIDENTIFIER OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

    -- 1. Kiểm tra xem mã Code (VD: FREESHIP50K) đã tồn tại trong hệ thống chưa
    IF EXISTS (SELECT 1 FROM [dbo].[COUPONS] WHERE [code] = @Code)
    BEGIN
        ;THROW 50003, 'Mã Coupon này đã tồn tại. Vui lòng nhập một mã khác.', 1;
    END

    BEGIN TRY
        BEGIN TRANSACTION;

        DECLARE @CurrentTime DATETIMEOFFSET = SYSDATETIMEOFFSET();

        DECLARE @InsertedTable TABLE (id UNIQUEIDENTIFIER);

        INSERT INTO [dbo].[COUPONS] (
            [id],
            [code],
            [name],
            [scope],
            [category],
            [type],
            [discount_value],
            [max_discount_amount],
            [min_invoice_value],
            [total_quantity],
            [used_quantity],
            [start_at],
            [end_at],
            [status],
            [user_id],
            [created_at],
            [updated_at]
        )
        OUTPUT inserted.id INTO @InsertedTable
        VALUES (
            @OutCouponId,
            @Code,
            @Name,
            @Scope,
            @Category,
            @Type,
            @DiscountValue,
            @MaxDiscountAmount,
            @MinInvoiceValue,
            @TotalQuantity,
            0,
            @StartAt,
            @EndAt,
            @Status,
            @UserId,
            @CurrentTime,
            @CurrentTime
        );

        SELECT TOP 1 @OutCouponId = id FROM @InsertedTable;

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