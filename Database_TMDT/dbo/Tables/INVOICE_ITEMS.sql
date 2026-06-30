CREATE TABLE [dbo].[INVOICE_ITEMS] (
    [id]                UNIQUEIDENTIFIER DEFAULT (newsequentialid()) NOT NULL,
    [invoice_id]        UNIQUEIDENTIFIER NOT NULL,
    [product_id]        UNIQUEIDENTIFIER NOT NULL,
    [variant_id]        UNIQUEIDENTIFIER NOT NULL,
    [quantity]          INT              NOT NULL,
    [price_at_purchase] DECIMAL (18, 2)  NOT NULL,
    CONSTRAINT [PK_INVOICE_ITEMS] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_INVOICE_ITEMS_INVOICES_invoice_id] FOREIGN KEY ([invoice_id]) REFERENCES [dbo].[INVOICES] ([id]) ON DELETE CASCADE,
    CONSTRAINT [FK_INVOICE_ITEMS_VARIANTS_variant_id] FOREIGN KEY ([variant_id]) REFERENCES [dbo].[VARIANTS] ([id])
);






GO



GO



GO
CREATE NONCLUSTERED INDEX [IX_INVOICE_ITEMS_variant_id]
    ON [dbo].[INVOICE_ITEMS]([variant_id] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_INVOICE_ITEMS_product_id]
    ON [dbo].[INVOICE_ITEMS]([product_id] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_INVOICE_ITEMS_invoice_id]
    ON [dbo].[INVOICE_ITEMS]([invoice_id] ASC);

