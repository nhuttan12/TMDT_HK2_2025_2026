CREATE TYPE [dbo].[BannerInsertType] AS TABLE (
	[ImageUrl] NVARCHAR(MAX) NOT NULL,
	[Order] INT NOT NULL,
	[IsPrimary] BIT NOT NULL
);
GO