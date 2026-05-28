CREATE TABLE [dbo].[GOODS_RECEIPTS] (
    [Id]          UNIQUEIDENTIFIER   DEFAULT (newsequentialid()) NOT NULL,
    [supplier_id] UNIQUEIDENTIFIER   NOT NULL,
    [Code]        VARCHAR (50)       NOT NULL,
    [Note]        NVARCHAR(MAX)               NOT NULL,
    [Type]        VARCHAR (50)       NOT NULL,
    [Status]      VARCHAR (50)       NOT NULL,
    [created_at]  DATETIMEOFFSET (7) DEFAULT (getutcdate()) NOT NULL,
    CONSTRAINT [PK_GOODS_RECEIPTS] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_GOODS_RECEIPTS_SUPPLIERS_supplier_id] FOREIGN KEY ([supplier_id]) REFERENCES [dbo].[SUPPLIERS] ([Id])
);


GO
CREATE NONCLUSTERED INDEX [IX_GOODS_RECEIPTS_supplier_id]
    ON [dbo].[GOODS_RECEIPTS]([supplier_id] ASC);

