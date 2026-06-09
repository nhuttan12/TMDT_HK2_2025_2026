CREATE TABLE [dbo].[USERS] (
    [id]            UNIQUEIDENTIFIER   DEFAULT (newsequentialid()) NOT NULL,
    [email]         NVARCHAR (150)     NOT NULL,
    [password_hash] NVARCHAR (MAX)     NOT NULL,
    [phone]         NVARCHAR (MAX)     NULL,
    [full_name]     NVARCHAR (MAX)     NOT NULL,
    [create_at]     DATETIMEOFFSET (7) NOT NULL,
    [update_at]     DATETIMEOFFSET (7) NULL,
    [delete_at]     DATETIMEOFFSET (7) NULL,
    [role_id]       INT                NOT NULL,
    CONSTRAINT [PK_USERS] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_USERS_ROLES_role_id] FOREIGN KEY ([role_id]) REFERENCES [dbo].[ROLES] ([id])
);








GO
CREATE NONCLUSTERED INDEX [IX_USERS_role_id]
    ON [dbo].[USERS]([role_id] ASC);

