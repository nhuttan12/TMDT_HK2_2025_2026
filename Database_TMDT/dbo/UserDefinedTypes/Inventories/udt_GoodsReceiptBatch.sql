CREATE TYPE [dbo].[udt_GoodsReceiptBatch] AS TABLE
(
    [product_id] UNIQUEIDENTIFIER,
    [batch_code] VARCHAR(50),
    [quantity] INT,
    [total_cost_price] DECIMAL(18,2)
);
GO