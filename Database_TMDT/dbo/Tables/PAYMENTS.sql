CREATE TABLE [dbo].[PAYMENTS] (
    [Id]              UNIQUEIDENTIFIER   DEFAULT (newsequentialid()) NOT NULL,
    [InvoiceId]       UNIQUEIDENTIFIER   NOT NULL,
    [TransactionId]   VARCHAR (255)      NULL,
    [Amount]          DECIMAL (19, 2)    NOT NULL,
    [PaymentMethod]   TINYINT            NOT NULL,
    [InformationCard] VARCHAR (50)       NULL,
    [RawResponse]     NVARCHAR (MAX)     NULL,
    [Status]          TINYINT            NOT NULL,
    [CreatedAt]       DATETIMEOFFSET (7) NOT NULL,
    [UpdatedAt]       DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK_PAYMENTS] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_PAYMENTS_INVOICES_InvoiceId] FOREIGN KEY ([InvoiceId]) REFERENCES [dbo].[INVOICES] ([id])
);




GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_PAYMENTS_TransactionId]
    ON [dbo].[PAYMENTS]([TransactionId] ASC) WHERE ([TransactionId] IS NOT NULL);


GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_PAYMENTS_InvoiceId]
    ON [dbo].[PAYMENTS]([InvoiceId] ASC);

