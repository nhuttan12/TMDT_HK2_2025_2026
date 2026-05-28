CREATE TABLE [dbo].[Addresses] (
    [Id]         INT              IDENTITY (1, 1) NOT NULL,
    [UserId]     UNIQUEIDENTIFIER NOT NULL,
    [AddressUrl] NVARCHAR (MAX)   NOT NULL,
    [CreatedAt]  DATETIME2 (7)    NOT NULL,
    [IsUsed]     BIT              NOT NULL,
    CONSTRAINT [PK_Addresses] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Addresses_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users] ([Id]) ON DELETE CASCADE
);


GO
CREATE NONCLUSTERED INDEX [IX_Addresses_UserId]
    ON [dbo].[Addresses]([UserId] ASC);

