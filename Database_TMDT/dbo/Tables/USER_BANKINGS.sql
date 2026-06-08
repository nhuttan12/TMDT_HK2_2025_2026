CREATE TABLE [dbo].[USER_BANKINGS] (
    [id]             UNIQUEIDENTIFIER   DEFAULT (newsequentialid()) NOT NULL,
    [user_id]        UNIQUEIDENTIFIER   NOT NULL,
    [bank_name]      NVARCHAR (255)     NOT NULL,
    [account_name]   NVARCHAR (255)     NOT NULL,
    [account_number] VARCHAR (20)       NOT NULL,
    [status]         BIT                NOT NULL,
    [created_at]     DATETIMEOFFSET (7) DEFAULT (getutcdate()) NOT NULL,
    [updated_at]     DATETIMEOFFSET (7) DEFAULT (getutcdate()) NOT NULL,
    CONSTRAINT [PK_USER_BANKINGS] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_USER_BANKINGS_USERS_user_id] FOREIGN KEY ([user_id]) REFERENCES [dbo].[USERS] ([id])
);






GO
CREATE NONCLUSTERED INDEX [IX_USER_BANKINGS_user_id]
    ON [dbo].[USER_BANKINGS]([user_id] ASC);

