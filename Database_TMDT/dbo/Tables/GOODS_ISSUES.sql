CREATE TABLE [dbo].[GOODS_ISSUES] (
    [id]          UNIQUEIDENTIFIER   DEFAULT (newsequentialid()) NOT NULL,
    [customer_id] UNIQUEIDENTIFIER   NOT NULL,
    [shop_id]     UNIQUEIDENTIFIER   NOT NULL,
    [code]        VARCHAR (50)       NOT NULL,
    [note]        NVARCHAR (MAX)     NOT NULL,
    [type]        VARCHAR (20)       NOT NULL,
    [created_at]  DATETIMEOFFSET (7) DEFAULT (getutcdate()) NOT NULL,
    CONSTRAINT [PK_GOODS_ISSUES] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_GOODS_ISSUES_SHOPS_shop_id] FOREIGN KEY ([shop_id]) REFERENCES [dbo].[SHOPS] ([id]),
    CONSTRAINT [FK_GOODS_ISSUES_USERS_customer_id] FOREIGN KEY ([customer_id]) REFERENCES [dbo].[USERS] ([id])
);






GO
CREATE NONCLUSTERED INDEX [IX_GOODS_ISSUES_customer_id]
    ON [dbo].[GOODS_ISSUES]([customer_id] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_GOODS_ISSUES_shop_id]
    ON [dbo].[GOODS_ISSUES]([shop_id] ASC);

