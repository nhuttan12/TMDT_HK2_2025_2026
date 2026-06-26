CREATE TYPE [dbo].[udt_UserBankingInsertType] AS TABLE (
	[BankName] NVARCHAR(255) NOT NULL,
	[AccountNumber] NVARCHAR(255) NOT NULL,
	[AccountName] NVARCHAR(255) NOT NULL
);
GO