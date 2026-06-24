CREATE TABLE [dbo].[PRODUCTS] (
    [id]            UNIQUEIDENTIFIER   DEFAULT (newsequentialid()) NOT NULL,
    [name]          NVARCHAR (255)     NOT NULL,
    [base_price]    DECIMAL (18, 2)    NOT NULL,
    [rating]        DECIMAL (3, 2)     DEFAULT ((0.0)) NOT NULL,
    [image_urls]    NVARCHAR (MAX)     NOT NULL,
    [status]        NVARCHAR (50)      NOT NULL,
    [category_id]   UNIQUEIDENTIFIER   NOT NULL,
    [shop_id]       UNIQUEIDENTIFIER   NOT NULL,
    [created_at]    DATETIMEOFFSET (7) NOT NULL,
    [updated_at]    DATETIMEOFFSET (7) NOT NULL,
    [system_status] VARCHAR (50)       DEFAULT ('') NOT NULL,
    CONSTRAINT [PK_PRODUCTS] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_Products_Categories] FOREIGN KEY ([category_id]) REFERENCES [dbo].[CATEGORIES] ([id]),
    CONSTRAINT [FK_Products_Shops_ShopId] FOREIGN KEY ([shop_id]) REFERENCES [dbo].[SHOPS] ([id]),
    CONSTRAINT [FK_Products_Users_ShopId] FOREIGN KEY ([shop_id]) REFERENCES [dbo].[USERS] ([id])
);










GO
CREATE NONCLUSTERED INDEX [IX_Products_CategoryId]
    ON [dbo].[PRODUCTS]([category_id] ASC);




GO
CREATE NONCLUSTERED INDEX [IX_Products_Name]
    ON [dbo].[PRODUCTS]([name] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_Products_ShopId]
    ON [dbo].[PRODUCTS]([shop_id] ASC);




GO
