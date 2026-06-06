using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class FixBannerUserIdMapping : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BANNERS_Users_UserId",
                table: "BANNERS");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "BANNERS",
                newName: "user_id");

            migrationBuilder.RenameIndex(
                name: "IX_BANNERS_UserId",
                table: "BANNERS",
                newName: "IX_BANNERS_user_id");

            migrationBuilder.AddForeignKey(
                name: "FK_BANNERS_Users_user_id",
                table: "BANNERS",
                column: "user_id",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BANNERS_Users_user_id",
                table: "BANNERS");

            migrationBuilder.RenameColumn(
                name: "user_id",
                table: "BANNERS",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_BANNERS_user_id",
                table: "BANNERS",
                newName: "IX_BANNERS_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_BANNERS_Users_UserId",
                table: "BANNERS",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
