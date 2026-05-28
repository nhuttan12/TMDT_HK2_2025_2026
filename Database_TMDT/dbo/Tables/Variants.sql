CREATE TABLE [dbo].[Variants] (
    [Id]        UNIQUEIDENTIFIER NOT NULL,
    [ProductId] UNIQUEIDENTIFIER NOT NULL,
    [Sku]       VARCHAR (100)    NOT NULL,
    [Name]      NVARCHAR (100)   NOT NULL,
    [CostPrice] DECIMAL (18, 2)  NOT NULL,
    [SellPrice] DECIMAL (18, 2)  NOT NULL,
    [ImageUrl]  VARCHAR (500)    NOT NULL,
    [Status]    INT              NOT NULL,
    CONSTRAINT [PK_Variants] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Variants_Products_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Products] ([Id]) ON DELETE CASCADE
);


GO
CREATE NONCLUSTERED INDEX [IX_Variants_ProductId]
    ON [dbo].[Variants]([ProductId] ASC);


GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_Variants_Sku]
    ON [dbo].[Variants]([Sku] ASC);

