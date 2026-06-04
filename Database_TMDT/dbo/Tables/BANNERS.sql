CREATE TABLE [dbo].[BANNERS] (
    [id]         UNIQUEIDENTIFIER   DEFAULT (newsequentialid()) NOT NULL,
    [user_id]    UNIQUEIDENTIFIER   NOT NULL,
    [image_url]  NVARCHAR (MAX)     NOT NULL,
    [status]     BIT                NOT NULL,
    [created_at] DATETIMEOFFSET (7) DEFAULT (getutcdate()) NOT NULL,
    [updated_at] DATETIMEOFFSET (7) DEFAULT (getutcdate()) NOT NULL,
    [is_primary] BIT                DEFAULT (CONVERT([bit],(0))) NOT NULL,
    [order]      INT                DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_BANNERS] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_BANNERS_Users_user_id] FOREIGN KEY ([user_id]) REFERENCES [dbo].[Users] ([Id])
);






GO
CREATE NONCLUSTERED INDEX [IX_BANNERS_user_id]
    ON [dbo].[BANNERS]([user_id] ASC);

