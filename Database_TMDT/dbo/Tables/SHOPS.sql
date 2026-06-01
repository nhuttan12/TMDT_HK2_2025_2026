CREATE TABLE [dbo].[SHOPS] (
    [Id]          UNIQUEIDENTIFIER   DEFAULT (newsequentialid()) NOT NULL,
    [name]        NVARCHAR (255)     NOT NULL,
    [tax_code]    NVARCHAR (50)      NOT NULL,
    [description] TEXT               NOT NULL,
    [created_at]  DATETIMEOFFSET (7) DEFAULT (getutcdate()) NOT NULL,
    [updated_at]  DATETIMEOFFSET (7) DEFAULT (getutcdate()) NOT NULL,
    [status]      VARCHAR (50)       DEFAULT ('') NOT NULL,
    CONSTRAINT [PK_SHOPS] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_SHOPS_Users_Id] FOREIGN KEY ([Id]) REFERENCES [dbo].[Users] ([Id])
);

