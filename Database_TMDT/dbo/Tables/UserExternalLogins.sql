CREATE TABLE [dbo].[UserExternalLogins] (
    [Id]          UNIQUEIDENTIFIER NOT NULL,
    [Provider]    NVARCHAR (450)   NOT NULL,
    [ProviderKey] NVARCHAR (MAX)   NOT NULL,
    CONSTRAINT [PK_UserExternalLogins] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_UserExternalLogins_Users_Id] FOREIGN KEY ([Id]) REFERENCES [dbo].[Users] ([Id]) ON DELETE CASCADE
);


GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_UserExternalLogins_Provider_Id]
    ON [dbo].[UserExternalLogins]([Provider] ASC, [Id] ASC);

