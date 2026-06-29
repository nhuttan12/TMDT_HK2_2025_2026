CREATE TABLE [dbo].[GOODS_RECEIPTS] (
    [id]          UNIQUEIDENTIFIER   DEFAULT (newsequentialid()) NOT NULL,
    [supplier_id] UNIQUEIDENTIFIER   NOT NULL,
    [shop_id]     UNIQUEIDENTIFIER   NOT NULL,
    [code]        VARCHAR (50)       NOT NULL,
    [note]        NVARCHAR (MAX)     NOT NULL,
    [type]        VARCHAR (50)       NOT NULL,
    [status]      VARCHAR (50)       NOT NULL,
    [created_at]  DATETIMEOFFSET (7) DEFAULT (getutcdate()) NOT NULL,
    CONSTRAINT [PK_GOODS_RECEIPTS] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_GOODS_RECEIPTS_SHOPS_shop_id] FOREIGN KEY ([shop_id]) REFERENCES [dbo].[SHOPS] ([id]),
    CONSTRAINT [FK_GOODS_RECEIPTS_SUPPLIERS_supplier_id] FOREIGN KEY ([supplier_id]) REFERENCES [dbo].[SUPPLIERS] ([id])
);






GO
CREATE NONCLUSTERED INDEX [IX_GOODS_RECEIPTS_supplier_id]
    ON [dbo].[GOODS_RECEIPTS]([supplier_id] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_GOODS_RECEIPTS_shop_id]
    ON [dbo].[GOODS_RECEIPTS]([shop_id] ASC);

