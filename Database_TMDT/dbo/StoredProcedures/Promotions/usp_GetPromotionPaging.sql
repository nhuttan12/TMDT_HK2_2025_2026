CREATE PROCEDURE [dbo].[usp_GetPromotionPaging]
	@UserId UNIQUEIDENTIFIER,
	@PageNumber INT,
	@PageSize INT
AS
BEGIN
	BEGIN TRY
		SET NOCOUNT ON;

		DECLARE @TotalItems INT;

		SELECT @TotalItems = COUNT(1)
		FROM PROMOTIONS p
		WHERE p.user_id = @UserId
			AND p.status = 1

		SELECT 
			p.id As Id, 
			p.[name] AS [Name], 
			p.[status] AS [Status],
			p.start_at AS StartAt,
			p.end_at AS EndAt,
			p.created_at As CreatedAt,
			p.updated_at As UpdatedAt,
			@TotalItems AS [TotalItems]
		FROM PROMOTIONS p
		WHERE p.user_id = @UserId
			AND p.status = 1
		ORDER BY p.created_at DESC
		OFFSET (@PageNumber - 1) * @PageSize ROWS
		FETCH NEXT @PageSize ROWS ONLY;

	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
			ROLLBACK;
		THROW
	END CATCH
END