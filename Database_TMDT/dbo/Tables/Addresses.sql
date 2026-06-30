CREATE TABLE [dbo].[ADDRESSES] (
    [id]          UNIQUEIDENTIFIER   DEFAULT (newsequentialid()) NOT NULL,
    [user_id]     UNIQUEIDENTIFIER   NOT NULL,
    [address_url] NVARCHAR (MAX)     NOT NULL,
    [created_at]  DATETIMEOFFSET (7) DEFAULT (getutcdate()) NOT NULL,
    [is_used]     BIT                DEFAULT (CONVERT([bit],(0))) NOT NULL,
    CONSTRAINT [PK_ADDRESSES] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_ADDRESSES_USERS_user_id] FOREIGN KEY ([user_id]) REFERENCES [dbo].[USERS] ([id]) ON DELETE CASCADE
);








GO
CREATE NONCLUSTERED INDEX [IX_ADDRESSES_user_id]
    ON [dbo].[ADDRESSES]([user_id] ASC);

