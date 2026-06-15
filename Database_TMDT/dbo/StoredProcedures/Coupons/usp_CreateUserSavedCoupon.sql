CREATE PROCEDURE [dbo].[usp_CreateUserSavedCoupon]
	@UserId UNIQUEIDENTIFIER,
	@CouponId UNIQUEIDENTIFIER,
	@NewId UNIQUEIDENTIFIER OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRY
		BEGIN TRANSACTION

		DECLARE @CurrentTime DATETIMEOFFSET = SYSDATETIMEOFFSET();

		IF EXISTS (
			SELECT 1 
			FROM USER_SAVED_COUPONS usc 
			WHERE usc.user_id = @UserId 
				AND usc.coupon_id = @CouponId)
		BEGIN 
			;THROW 50000, 'Bạn đã lưu mã giảm giá này rồi.', 1;
		END

		DECLARE @InsertedIds TABLE (Id UNIQUEIDENTIFIER);

		INSERT INTO USER_SAVED_COUPONS (
			user_id, 
			coupon_id, 
			is_used, 
			saved_at, 
			last_used_at
		)
		OUTPUT inserted.id INTO @InsertedIds
		VALUES (
			@UserId, 
			@CouponId, 
			0,
			@CurrentTime,
			NULL
		);

		SELECT TOP 1 @NewId = Id FROM @InsertedIds

		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION;	
		THROW
	END CATCH
END
