CREATE TABLE [dbo].[SUPPLIERS] (
    [id]           UNIQUEIDENTIFIER   DEFAULT (newsequentialid()) NOT NULL,
    [shop_id]      UNIQUEIDENTIFIER   NOT NULL,
    [name]         VARCHAR (100)      NOT NULL,
    [tax_code]     VARCHAR (13)       NOT NULL,
    [phone_number] VARCHAR (10)       NOT NULL,
    [email]        VARCHAR (100)      NOT NULL,
    [contact_name] VARCHAR (100)      NOT NULL,
    [address]      VARCHAR (100)      NOT NULL,
    [created_at]   DATETIMEOFFSET (7) DEFAULT (getutcdate()) NOT NULL,
    [updated_at]   DATETIMEOFFSET (7) DEFAULT (getutcdate()) NOT NULL,
    CONSTRAINT [PK_SUPPLIERS] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_SUPPLIERS_SHOPS_shop_id] FOREIGN KEY ([shop_id]) REFERENCES [dbo].[SHOPS] ([id]) ON DELETE CASCADE
);








GO
CREATE NONCLUSTERED INDEX [IX_SUPPLIERS_shop_id]
    ON [dbo].[SUPPLIERS]([shop_id] ASC);

