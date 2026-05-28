CREATE TABLE [dbo].[PROMOTIONS] (
    [Id]         UNIQUEIDENTIFIER   DEFAULT (newsequentialid()) NOT NULL,
    [name]       NVARCHAR (255)     NOT NULL,
    [start_at]   DATETIMEOFFSET (7) NOT NULL,
    [end_at]     DATETIMEOFFSET (7) NOT NULL,
    [status]     BIT                DEFAULT (CONVERT([bit],(1))) NOT NULL,
    [created_at] DATETIMEOFFSET (7) DEFAULT (getutcdate()) NOT NULL,
    [updated_at] DATETIMEOFFSET (7) DEFAULT (getutcdate()) NOT NULL,
    CONSTRAINT [PK_PROMOTIONS] PRIMARY KEY CLUSTERED ([Id] ASC)
);

