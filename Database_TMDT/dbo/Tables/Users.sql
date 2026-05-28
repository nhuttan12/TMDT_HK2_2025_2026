CREATE TABLE [dbo].[Users] (
    [Id]           UNIQUEIDENTIFIER DEFAULT (newsequentialid()) NOT NULL,
    [Email]        NVARCHAR (150)   NOT NULL,
    [PasswordHash] NVARCHAR (MAX)   NOT NULL,
    [Phone]        NVARCHAR (MAX)   NULL,
    [FullName]     NVARCHAR (MAX)   NOT NULL,
    [CreateAt]     DATETIME2 (7)    NOT NULL,
    [UpdateAt]     DATETIME2 (7)    NULL,
    [DeleteAt]     DATETIME2 (7)    NULL,
    [RoleId]       INT              NOT NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Users_Roles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[Roles] ([Id])
);


GO
CREATE NONCLUSTERED INDEX [IX_Users_RoleId]
    ON [dbo].[Users]([RoleId] ASC);

