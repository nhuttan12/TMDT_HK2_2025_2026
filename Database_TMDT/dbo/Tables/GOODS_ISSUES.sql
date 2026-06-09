CREATE TABLE [dbo].[GOODS_ISSUES] (
    [id]          UNIQUEIDENTIFIER   DEFAULT (newsequentialid()) NOT NULL,
    [customer_id] UNIQUEIDENTIFIER   NOT NULL,
    [Code]        VARCHAR (50)       NOT NULL,
    [Note]        NVARCHAR(MAX)               NOT NULL,
    [type]        VARCHAR (20)       NOT NULL,
    [created_at]  DATETIMEOFFSET (7) DEFAULT (getutcdate()) NOT NULL,
    CONSTRAINT [PK_GOODS_ISSUES] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_GOODS_ISSUES_Users_customer_id] FOREIGN KEY ([customer_id]) REFERENCES [dbo].[Users] ([Id])
);


GO
CREATE NONCLUSTERED INDEX [IX_GOODS_ISSUES_customer_id]
    ON [dbo].[GOODS_ISSUES]([customer_id] ASC);

