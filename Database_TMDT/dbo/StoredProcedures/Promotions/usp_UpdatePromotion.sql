CREATE PROCEDURE [dbo].[usp_UpdatePromotion]
    @PromotionId UNIQUEIDENTIFIER, 
    @Name NVARCHAR (255), 
    @Status BIT, 
    @StartAt DATETIMEOFFSET, 
    @EndAt DATETIMEOFFSET, 
    @Products ProductPromotionType READONLY
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @TotalRowsAffected INT = 0;

    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE PROMOTIONS
            SET name = @Name,
                status = @Status,
                start_at = @StartAt,
                end_at = @EndAt
        WHERE  id = @PromotionId
        AND (name <> @Name
            OR status <> @Status
            OR start_at <> @StartAt
            OR end_at <> @EndAt);

        SET @TotalRowsAffected = @TotalRowsAffected + @@ROWCOUNT;

        -- Những sản phẩm đang có trong bảng nhưng Client không gửi lên nữa
        UPDATE [PRODUCT_PROMOTIONS]
        SET [status] = 0
        WHERE promotion_id = @PromotionId
            AND [status] != 0
            AND product_id NOT IN (SELECT ProductId FROM @Products);

        SET @TotalRowsAffected = @TotalRowsAffected + @@ROWCOUNT;

        -- Cập nhật discount mới hoặc mở lại những sản phẩm từng bị xóa mềm
        UPDATE target
        SET target.discount_price = source.Discount,
            target.status = 1
        FROM [PRODUCT_PROMOTIONS] AS target
        INNER JOIN @Products AS source 
            ON target.promotion_id = source.PromotionId
            AND target.product_id = source.ProductId
        WHERE target.discount_price <> source.Discount
            OR target.status = 0;

        SET @TotalRowsAffected = @TotalRowsAffected + @@ROWCOUNT;

        -- Những sản phẩm hoàn toàn mới chưa từng có trong đợt khuyến mãi này
        INSERT INTO [PRODUCT_PROMOTIONS] (
            product_id, 
            promotion_id, 
            discount_price, 
            status
        )
        SELECT 
            source.ProductId, 
            source.PromotionId, 
            source.Discount, 
            1
        FROM @Products AS source
        WHERE NOT EXISTS (
            SELECT 1 
            FROM [PRODUCT_PROMOTIONS] AS target
            WHERE target.promotion_id = source.PromotionId
                AND target.product_id = source.ProductId
        );

        SET @TotalRowsAffected = @TotalRowsAffected + @@ROWCOUNT;

        COMMIT TRANSACTION;

        SELECT @TotalRowsAffected AS RowsAffected;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK;
        THROW;
    END CATCH
END