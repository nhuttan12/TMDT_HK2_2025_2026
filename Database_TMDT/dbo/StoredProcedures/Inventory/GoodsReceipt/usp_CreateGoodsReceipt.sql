CREATE PROCEDURE [dbo].[usp_CreateGoodsReceipt]
    @code VARCHAR(50),
    @supplier_id UNIQUEIDENTIFIER,
    @shop_id UNIQUEIDENTIFIER,
    @import_date DATETIMEOFFSET,
    @import_status VARCHAR(50),
    @note NVARCHAR(MAX),
    @batches [dbo].[udt_GoodsReceiptBatch] READONLY,
    @variants [dbo].[udt_GoodsReceiptBatchVariant] READONLY,
    @inserted_id UNIQUEIDENTIFIER OUTPUT
AS
BEGIN
	BEGIN TRY
		BEGIN TRANSACTION;

        DECLARE @temp_receipt TABLE (id UNIQUEIDENTIFIER);

        DECLARE @BatchMapping TABLE (
            BatchCode VARCHAR(50),
            NewBatchId UNIQUEIDENTIFIER
        );

		-- 1. Insert Master: GOODS_RECEIPTS
        INSERT INTO [dbo].[GOODS_RECEIPTS] 
            ([code], [supplier_id], [shop_id], [created_at], [status], [note], [type])
        OUTPUT inserted.id INTO @temp_receipt
        VALUES 
            (@code, @supplier_id, @shop_id, @import_date, 'completed', @note, 'receipt');

        SELECT TOP 1 @inserted_id = id FROM @temp_receipt;

        -- 2. Insert Detail 1: GOODS_RECEIPT_BATCHES
        INSERT INTO [dbo].[GOODS_RECEIPT_BATCHES]
            ([goods_receipt_id], [batch_code], [quantity], [total_cost_price], [created_at], [updated_at])
        OUTPUT inserted.batch_code, inserted.id INTO @BatchMapping (BatchCode, NewBatchId)
        SELECT 
            @inserted_id, b.[batch_code], b.[quantity], b.[total_cost_price], GETUTCDATE(), GETUTCDATE()
        FROM @batches b;

        -- 3. Insert Detail 2: GOODS_RECEIPT_BATCH_VARIANTS
        INSERT INTO [dbo].[GOODS_RECEIPT_BATCH_VARIANTS]
            ([batch_id], [variant_id], [cost_price], [quantity], [created_at])
        SELECT 
            m.NewBatchId, v.[variant_id], v.[cost_price], 1, GETUTCDATE()
        FROM @variants v
        INNER JOIN @BatchMapping m ON v.[batch_code] = m.BatchCode;

        -- 4. Tự động sinh Tồn kho lô hàng: INVENTORY_BATCH_STOCKS
        -- Dựa theo cấu hình 1-1 giữa Batch và InventoryBatchStock
        INSERT INTO [dbo].[INVENTORY_BATCH_STOCKS]
            ([batch_id], [product_id], [variant_id], [remaining_quantity], [status], [created_at], [updated_at])
        SELECT 
            m.NewBatchId, b.[product_id], v.[variant_id], 1, 'active', GETUTCDATE(), GETUTCDATE()
        FROM @variants v
        INNER JOIN @batches b ON v.[batch_code] = b.[batch_code]
        INNER JOIN @BatchMapping m ON v.[batch_code] = m.BatchCode

		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION;
		THROW
	END CATCH
END
