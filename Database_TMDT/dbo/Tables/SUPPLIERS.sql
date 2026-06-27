CREATE TABLE [dbo].[SUPPLIERS] (
    [id]           UNIQUEIDENTIFIER   DEFAULT (newsequentialid()) NOT NULL,
    [Name]         VARCHAR (100)      NOT NULL,
    [tax_code]     VARCHAR (13)       NOT NULL,
    [phone_number] VARCHAR (10)       NOT NULL,
    [Email]        VARCHAR (100)      NOT NULL,
    [contact_name] VARCHAR (100)      NOT NULL,
    [address]      VARCHAR (100)      NOT NULL,
    [created_at]   DATETIMEOFFSET (7) DEFAULT (getutcdate()) NOT NULL,
    [updated_at]   DATETIMEOFFSET (7) DEFAULT (getutcdate()) NOT NULL,
    CONSTRAINT [PK_SUPPLIERS] PRIMARY KEY CLUSTERED ([id] ASC)
);




GO
