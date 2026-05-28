CREATE TABLE [dbo].[ProductDetails] (
    [ProductId]       UNIQUEIDENTIFIER NOT NULL,
    [Summary]         NVARCHAR (500)   NULL,
    [DescriptionHtml] NVARCHAR (MAX)   NULL,
    CONSTRAINT [PK_ProductDetails] PRIMARY KEY CLUSTERED ([ProductId] ASC),
    CONSTRAINT [FK_ProductDetails_Products_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Products] ([Id]) ON DELETE CASCADE
);

