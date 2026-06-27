CREATE TABLE [dbo].[PRODUCT_PROMOTIONS] (
    [id]           UNIQUEIDENTIFIER   DEFAULT (newsequentialid()) NOT NULL,
    [promotion_id] UNIQUEIDENTIFIER   NOT NULL,
    [product_id]   UNIQUEIDENTIFIER   NOT NULL,
    [discount]     INT                NOT NULL,
    [status]       BIT                DEFAULT (CONVERT([bit],(1))) NOT NULL,
    [created_at]   DATETIMEOFFSET (7) DEFAULT (getutcdate()) NOT NULL,
    [updated_at]   DATETIMEOFFSET (7) DEFAULT (getutcdate()) NOT NULL,
    CONSTRAINT [PK_PRODUCT_PROMOTIONS] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_PRODUCT_PROMOTIONS_PRODUCTS_product_id] FOREIGN KEY ([product_id]) REFERENCES [dbo].[PRODUCTS] ([id]),
    CONSTRAINT [FK_PRODUCT_PROMOTIONS_PROMOTIONS_promotion_id] FOREIGN KEY ([promotion_id]) REFERENCES [dbo].[PROMOTIONS] ([id])
);






GO
CREATE NONCLUSTERED INDEX [IX_PRODUCT_PROMOTIONS_product_id]
    ON [dbo].[PRODUCT_PROMOTIONS]([product_id] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_PRODUCT_PROMOTIONS_promotion_id]
    ON [dbo].[PRODUCT_PROMOTIONS]([promotion_id] ASC);

