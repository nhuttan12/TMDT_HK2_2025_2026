CREATE TYPE [dbo].[udt_ProductPromotionType] AS TABLE (
	[ProductId] UNIQUEIDENTIFIER NOT NULL,
	[PromotionId] UNIQUEIDENTIFIER NOT NULL,
	[Discount] INT NOT NULL
);
GO