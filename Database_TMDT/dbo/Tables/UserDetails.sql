CREATE TABLE [dbo].[UserDetails] (
    [UserId]        UNIQUEIDENTIFIER NOT NULL,
    [LockTimeStart] DATETIME2 (7)    NOT NULL,
    [LockTimeEnd]   DATETIME2 (7)    NOT NULL,
    [AvatarUrl]     NVARCHAR (MAX)   NULL,
    [AddressId]     NVARCHAR (MAX)   NULL,
    CONSTRAINT [PK_UserDetails] PRIMARY KEY CLUSTERED ([UserId] ASC),
    CONSTRAINT [FK_UserDetails_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users] ([Id]) ON DELETE CASCADE
);

