CREATE TABLE [dbo].[GOODS_ISSUE_DETAILS] (
    [id]            UNIQUEIDENTIFIER   DEFAULT (newsequentialid()) NOT NULL,
    [issue_id]      UNIQUEIDENTIFIER   NOT NULL,
    [variant_id]    UNIQUEIDENTIFIER   NOT NULL,
    [Quantity]      INT                NOT NULL,
    [selling_price] DECIMAL (18, 2)    NOT NULL,
    [created_at]    DATETIMEOFFSET (7) DEFAULT (getutcdate()) NOT NULL,
    CONSTRAINT [PK_GOODS_ISSUE_DETAILS] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_GOODS_ISSUE_DETAILS_GOODS_ISSUES_issue_id] FOREIGN KEY ([issue_id]) REFERENCES [dbo].[GOODS_ISSUES] ([id]),
    CONSTRAINT [FK_GOODS_ISSUE_DETAILS_Variants_variant_id] FOREIGN KEY ([variant_id]) REFERENCES [dbo].[VARIANTS] ([id])
);


GO
CREATE NONCLUSTERED INDEX [IX_GOODS_ISSUE_DETAILS_issue_id]
    ON [dbo].[GOODS_ISSUE_DETAILS]([issue_id] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_GOODS_ISSUE_DETAILS_variant_id]
    ON [dbo].[GOODS_ISSUE_DETAILS]([variant_id] ASC);

