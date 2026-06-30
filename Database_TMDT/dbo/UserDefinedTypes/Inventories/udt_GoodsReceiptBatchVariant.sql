CREATE TYPE [dbo].[udt_GoodsReceiptBatchVariant] AS TABLE
(
    [batch_code] VARCHAR(50),
    [variant_id] UNIQUEIDENTIFIER,
    [cost_price] DECIMAL(18,2)
);
GO