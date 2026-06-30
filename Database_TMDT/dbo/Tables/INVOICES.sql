CREATE TABLE [dbo].[INVOICES] (
    [id]           UNIQUEIDENTIFIER   DEFAULT (newsequentialid()) NOT NULL,
    [total_amount] DECIMAL (18, 2)    NOT NULL,
    [status]       TINYINT            NOT NULL,
    [user_id]      UNIQUEIDENTIFIER   NOT NULL,
    [shop_id]      UNIQUEIDENTIFIER   NULL,
    [coupon_id]    UNIQUEIDENTIFIER   NULL,
    [created_at]   DATETIMEOFFSET (7) DEFAULT (sysutcdatetime()) NOT NULL,
    [updated_at]   DATETIMEOFFSET (7) DEFAULT (sysutcdatetime()) NOT NULL,
    CONSTRAINT [PK_INVOICES] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_INVOICES_SHOPS_shop_id] FOREIGN KEY ([shop_id]) REFERENCES [dbo].[SHOPS] ([id]) ON DELETE SET NULL,
    CONSTRAINT [FK_INVOICES_USERS_user_id] FOREIGN KEY ([user_id]) REFERENCES [dbo].[USERS] ([id])
);








GO
CREATE NONCLUSTERED INDEX [IX_INVOICES_user_id]
    ON [dbo].[INVOICES]([user_id] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_INVOICES_Status_created_at]
    ON [dbo].[INVOICES]([status] ASC, [created_at] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_INVOICES_shop_id]
    ON [dbo].[INVOICES]([shop_id] ASC);

