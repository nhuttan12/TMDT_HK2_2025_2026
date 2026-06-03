CREATE PROCEDURE [dbo].[usp_UpdatePromotion]
    @PromotionId UNIQUEIDENTIFIER, 
    @Name NVARCHAR (255), 
    @Status BIT, 
    @StartAt DATETIMEOFFSET, 
    @EndAt DATETIMEOFFSET, 
    @Products dbo.[ProductPromotionType] READONLY
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
        WHERE  Id = @PromotionId
        AND (name <> @Name
            OR STATUS <> @Status
            OR start_at <> @StartAt
            OR end_at <> @EndAt);

        SET @TotalRowsAffected = @TotalRowsAffected + @@ROWCOUNT;

        MERGE INTO PRODUCT_PROMOTIONS AS target
        USING @Products AS source 
        ON (target.promotion_id = source.PromotionId
            AND target.product_id = source.ProductId)
        WHEN MATCHED 
            AND (target.discount <> source.Discount
            OR target.STATUS = 0) THEN UPDATE 
        SET target.discount = source.Discount,
            target.STATUS = 1
        WHEN NOT MATCHED BY TARGET 
            THEN INSERT (product_id, promotion_id, discount, STATUS) 
            VALUES (source.ProductId, source.PromotionId, source.Discount, 1)
        WHEN NOT MATCHED BY SOURCE 
            AND target.promotion_id = @PromotionId THEN 
                UPDATE SET target.STATUS = 0;

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