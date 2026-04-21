using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class updateUserReferent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_user_external_logins_users_user_id",
                table: "user_external_logins");

            migrationBuilder.RenameColumn(
                name: "user_id",
                table: "user_external_logins",
                newName: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_user_external_logins_users_id",
                table: "user_external_logins",
                column: "id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_user_external_logins_users_id",
                table: "user_external_logins");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "user_external_logins",
                newName: "user_id");

            migrationBuilder.AddForeignKey(
                name: "fk_user_external_logins_users_user_id",
                table: "user_external_logins",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
