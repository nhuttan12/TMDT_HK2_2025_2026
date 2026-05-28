CREATE TABLE [dbo].[Products] (
    [Id]         UNIQUEIDENTIFIER   DEFAULT (newsequentialid()) NOT NULL,
    [Name]       NVARCHAR (255)     NOT NULL,
    [BasePrice]  DECIMAL (18, 2)    NOT NULL,
    [Rating]     DECIMAL (3, 2)     DEFAULT ((0.0)) NOT NULL,
    [CategoryId] UNIQUEIDENTIFIER   NOT NULL,
    [ShopId]     UNIQUEIDENTIFIER   NOT NULL,
    [CreatedAt]  DATETIMEOFFSET (7) NOT NULL,
    [UpdatedAt]  DATETIMEOFFSET (7) NOT NULL,
    CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Products_Categories] FOREIGN KEY ([CategoryId]) REFERENCES [dbo].[Categories] ([Id]),
    CONSTRAINT [FK_Products_Users_ShopId] FOREIGN KEY ([ShopId]) REFERENCES [dbo].[Users] ([Id])
);


GO
CREATE NONCLUSTERED INDEX [IX_Products_CategoryId]
    ON [dbo].[Products]([CategoryId] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_Products_Name]
    ON [dbo].[Products]([Name] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_Products_ShopId]
    ON [dbo].[Products]([ShopId] ASC);

