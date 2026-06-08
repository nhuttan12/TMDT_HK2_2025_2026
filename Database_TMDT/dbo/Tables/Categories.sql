CREATE TABLE [dbo].[CATEGORIES] (
    [id]         UNIQUEIDENTIFIER   NOT NULL,
    [name]       NVARCHAR (255)     NOT NULL,
    [sku]        VARCHAR (100)      NOT NULL,
    [image_url]  VARCHAR (500)      NOT NULL,
    [created_at] DATETIMEOFFSET (7) NOT NULL,
    [UpdatedAt]  DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK_CATEGORIES] PRIMARY KEY CLUSTERED ([id] ASC)
);




GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_Categories_Sku]
    ON [dbo].[Categories]([Sku] ASC);

