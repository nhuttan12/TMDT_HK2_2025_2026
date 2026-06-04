CREATE TABLE [dbo].[GOODS_RECEIPT_BATCHES] (
    [id]               UNIQUEIDENTIFIER   DEFAULT (newsequentialid()) NOT NULL,
    [goods_receipt_id] UNIQUEIDENTIFIER   NOT NULL,
    [BatchCode]        VARCHAR (50)       NOT NULL,
    [Quantity]         INT                NOT NULL,
    [TotalCostPrice]   DECIMAL (18, 2)    NOT NULL,
    [created_at]       DATETIMEOFFSET (7) DEFAULT (getutcdate()) NOT NULL,
    [updated_at]       DATETIMEOFFSET (7) DEFAULT (getutcdate()) NOT NULL,
    CONSTRAINT [PK_GOODS_RECEIPT_BATCHES] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [CK_GoodsReceiptBatch_Quantity] CHECK ([Quantity]>(0)),
    CONSTRAINT [FK_GOODS_RECEIPT_BATCHES_GOODS_RECEIPTS_goods_receipt_id] FOREIGN KEY ([goods_receipt_id]) REFERENCES [dbo].[GOODS_RECEIPTS] ([id])
);


GO
CREATE NONCLUSTERED INDEX [IX_GOODS_RECEIPT_BATCHES_goods_receipt_id]
    ON [dbo].[GOODS_RECEIPT_BATCHES]([goods_receipt_id] ASC);

