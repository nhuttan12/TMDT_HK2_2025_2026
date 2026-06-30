CREATE TABLE [dbo].[PAYMENTS] (
    [Id]              UNIQUEIDENTIFIER   DEFAULT (newsequentialid()) NOT NULL,
    [InvoiceId]       UNIQUEIDENTIFIER   NOT NULL,
    [TransactionId]   VARCHAR (255)      NULL,
    [Amount]          DECIMAL (19, 2)    NOT NULL,
    [PaymentMethod]   VARCHAR (255)      NOT NULL,
    [InformationCard] VARCHAR (50)       NULL,
    [Status]          VARCHAR (50)       NOT NULL,
    [CreatedAt]       DATETIMEOFFSET (7) NOT NULL,
    CONSTRAINT [PK_PAYMENTS] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_PAYMENTS_INVOICES_InvoiceId] FOREIGN KEY ([InvoiceId]) REFERENCES [dbo].[INVOICES] ([id]) ON DELETE CASCADE
);


GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_PAYMENTS_TransactionId]
    ON [dbo].[PAYMENTS]([TransactionId] ASC) WHERE ([TransactionId] IS NOT NULL);


GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_PAYMENTS_InvoiceId]
    ON [dbo].[PAYMENTS]([InvoiceId] ASC);

