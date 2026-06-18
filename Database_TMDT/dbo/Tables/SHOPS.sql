CREATE TABLE [dbo].[SHOPS] (
    [id]            UNIQUEIDENTIFIER   DEFAULT (newsequentialid()) NOT NULL,
    [status]        VARCHAR (50)       NOT NULL,
    [system_status] VARCHAR (50)       NOT NULL,
    [rating]        INT                NOT NULL,
    [name]          NVARCHAR (255)     NOT NULL,
    [tax_code]      NVARCHAR (50)      NOT NULL,
    [description]   NVARCHAR (MAX)     NULL,
    [created_at]    DATETIMEOFFSET (7) DEFAULT (getutcdate()) NOT NULL,
    [updated_at]    DATETIMEOFFSET (7) DEFAULT (getutcdate()) NOT NULL,
    [ShopLogos]     NVARCHAR (MAX)     NOT NULL,
    CONSTRAINT [PK_SHOPS] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_SHOPS_USERS_id] FOREIGN KEY ([id]) REFERENCES [dbo].[USERS] ([id])
);

