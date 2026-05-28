CREATE TABLE [dbo].[Categories] (
    [Id]        UNIQUEIDENTIFIER   NOT NULL,
    [Name]      NVARCHAR (255)     NOT NULL,
    [Sku]       VARCHAR (100)      NOT NULL,
    [ImageUrl]  VARCHAR (500)      NOT NULL,
    [CreatedAt] DATETIMEOFFSET (7) NOT NULL,
    [UpdatedAt] DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK_Categories] PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_Categories_Sku]
    ON [dbo].[Categories]([Sku] ASC);

