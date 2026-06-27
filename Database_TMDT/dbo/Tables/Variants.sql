CREATE TABLE [dbo].[VARIANTS] (
    [id]         UNIQUEIDENTIFIER NOT NULL,
    [ProductId]  UNIQUEIDENTIFIER NOT NULL,
    [sku]        VARCHAR (100)    NOT NULL,
    [name]       NVARCHAR (100)   NOT NULL,
    [cost_price] DECIMAL (18, 2)  NOT NULL,
    [sell_price] DECIMAL (18, 2)  NOT NULL,
    [image_url]  VARCHAR (500)    NOT NULL,
    [status]     INT              NOT NULL,
    CONSTRAINT [PK_VARIANTS] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_VARIANTS_PRODUCTS_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[PRODUCTS] ([id]) ON DELETE CASCADE
);








GO
CREATE NONCLUSTERED INDEX [IX_Variants_ProductId]
    ON [dbo].[VARIANTS]([ProductId] ASC);






GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_Variants_Sku]
    ON [dbo].[VARIANTS]([sku] ASC);

