CREATE TABLE [dbo].[INVENTORY_BATCH_STOCKS] (
    [id]                 UNIQUEIDENTIFIER   DEFAULT (newsequentialid()) NOT NULL,
    [variant_id]         UNIQUEIDENTIFIER   NOT NULL,
    [product_id]         UNIQUEIDENTIFIER   NOT NULL,
    [batch_id]           UNIQUEIDENTIFIER   NOT NULL,
    [remaining_quantity] INT                NOT NULL,
    [status]             VARCHAR (20)       NOT NULL,
    [created_at]         DATETIMEOFFSET (7) DEFAULT (getutcdate()) NOT NULL,
    [updated_at]         DATETIMEOFFSET (7) DEFAULT (getutcdate()) NOT NULL,
    CONSTRAINT [PK_INVENTORY_BATCH_STOCKS] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_INVENTORY_BATCH_STOCKS_GOODS_RECEIPT_BATCHES_batch_id] FOREIGN KEY ([batch_id]) REFERENCES [dbo].[GOODS_RECEIPT_BATCHES] ([id]),
    CONSTRAINT [FK_INVENTORY_BATCH_STOCKS_Products_product_id] FOREIGN KEY ([product_id]) REFERENCES [dbo].[PRODUCTS] ([id]),
    CONSTRAINT [FK_INVENTORY_BATCH_STOCKS_Variants_variant_id] FOREIGN KEY ([variant_id]) REFERENCES [dbo].[VARIANTS] ([id])
);


GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_INVENTORY_BATCH_STOCKS_batch_id]
    ON [dbo].[INVENTORY_BATCH_STOCKS]([batch_id] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_INVENTORY_BATCH_STOCKS_product_id]
    ON [dbo].[INVENTORY_BATCH_STOCKS]([product_id] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_INVENTORY_BATCH_STOCKS_variant_id]
    ON [dbo].[INVENTORY_BATCH_STOCKS]([variant_id] ASC);

