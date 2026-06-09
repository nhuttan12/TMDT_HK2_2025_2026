CREATE TABLE [dbo].[PROMOTIONS] (
    [id]         UNIQUEIDENTIFIER   DEFAULT (newsequentialid()) NOT NULL,
    [user_id]    UNIQUEIDENTIFIER   NOT NULL,
    [name]       NVARCHAR (255)     NOT NULL,
    [start_at]   DATETIMEOFFSET (7) NOT NULL,
    [end_at]     DATETIMEOFFSET (7) NOT NULL,
    [status]     BIT                DEFAULT (CONVERT([bit],(1))) NOT NULL,
    [created_at] DATETIMEOFFSET (7) DEFAULT (getutcdate()) NOT NULL,
    [updated_at] DATETIMEOFFSET (7) DEFAULT (getutcdate()) NOT NULL,
    CONSTRAINT [PK_PROMOTIONS] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_PROMOTIONS_USERS_user_id] FOREIGN KEY ([user_id]) REFERENCES [dbo].[USERS] ([id]) ON DELETE CASCADE
);




GO
CREATE NONCLUSTERED INDEX [IX_PROMOTIONS_user_id]
    ON [dbo].[PROMOTIONS]([user_id] ASC);

