CREATE TABLE [dbo].[DELIVERIES] (
    [id]              UNIQUEIDENTIFIER DEFAULT (newsequentialid()) NOT NULL,
    [invoice_id]      UNIQUEIDENTIFIER NOT NULL,
    [address_id]      UNIQUEIDENTIFIER NOT NULL,
    [receiver_phone]  VARCHAR (255)    NOT NULL,
    [receiver_name]   NVARCHAR (255)   NOT NULL,
    [shipping_fee]    DECIMAL (18, 2)  NOT NULL,
    [shipping_status] INT              NOT NULL,
    CONSTRAINT [PK_DELIVERIES] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_DELIVERIES_ADDRESSES_address_id] FOREIGN KEY ([address_id]) REFERENCES [dbo].[ADDRESSES] ([id]),
    CONSTRAINT [FK_DELIVERIES_INVOICES_invoice_id] FOREIGN KEY ([invoice_id]) REFERENCES [dbo].[INVOICES] ([id]) ON DELETE CASCADE
);


GO
CREATE NONCLUSTERED INDEX [IX_DELIVERIES_shipping_status]
    ON [dbo].[DELIVERIES]([shipping_status] ASC);


GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_DELIVERIES_invoice_id]
    ON [dbo].[DELIVERIES]([invoice_id] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_DELIVERIES_address_id]
    ON [dbo].[DELIVERIES]([address_id] ASC);

