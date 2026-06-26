CREATE TYPE [dbo].[udt_GoodsReceiptBatchVariant] AS TABLE
(
    [batch_code] UNIQUEIDENTIFIER,
    [variant_id] UNIQUEIDENTIFIER,
    [cost_price] DECIMAL(18,2)
);
GO