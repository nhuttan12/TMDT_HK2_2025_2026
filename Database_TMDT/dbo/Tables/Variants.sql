CREATE TABLE [dbo].[VARIANTS] (
    [id]         UNIQUEIDENTIFIER NOT NULL,
    [product_id] UNIQUEIDENTIFIER NOT NULL,
    [sku]        VARCHAR (100)    NOT NULL,
    [name]       NVARCHAR (100)   NOT NULL,
    [cost_price] DECIMAL (18, 2)  NOT NULL,
    [sell_price] DECIMAL (18, 2)  NOT NULL,
    [image_url]  VARCHAR (500)    NOT NULL,
    [status]     INT              NOT NULL,
    CONSTRAINT [PK_VARIANTS] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_VARIANTS_PRODUCTS_product_id] FOREIGN KEY ([product_id]) REFERENCES [dbo].[PRODUCTS] ([id]) ON DELETE CASCADE
);






GO
CREATE NONCLUSTERED INDEX [IX_Variants_ProductId]
    ON [dbo].[VARIANTS]([product_id] ASC);




GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_Variants_Sku]
    ON [dbo].[Variants]([Sku] ASC);

