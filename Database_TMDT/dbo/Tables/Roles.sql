CREATE TABLE [dbo].[ROLES] (
    [id]          INT            IDENTITY (1, 1) NOT NULL,
    [name]        NVARCHAR (255) NOT NULL,
    [description] NVARCHAR (MAX) NOT NULL,
    CONSTRAINT [PK_Roles] PRIMARY KEY CLUSTERED ([id] ASC)
);

