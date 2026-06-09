using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Database.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUserFieldToLowerCase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UpdateAt",
                table: "USERS",
                newName: "update_at");

            migrationBuilder.RenameColumn(
                name: "PasswordHash",
                table: "USERS",
                newName: "password_hash");

            migrationBuilder.RenameColumn(
                name: "FullName",
                table: "USERS",
                newName: "full_name");

            migrationBuilder.RenameColumn(
                name: "DeleteAt",
                table: "USERS",
                newName: "delete_at");

            migrationBuilder.RenameColumn(
                name: "CreateAt",
                table: "USERS",
                newName: "create_at");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "update_at",
                table: "USERS",
                newName: "UpdateAt");

            migrationBuilder.RenameColumn(
                name: "password_hash",
                table: "USERS",
                newName: "PasswordHash");

            migrationBuilder.RenameColumn(
                name: "full_name",
                table: "USERS",
                newName: "FullName");

            migrationBuilder.RenameColumn(
                name: "delete_at",
                table: "USERS",
                newName: "DeleteAt");

            migrationBuilder.RenameColumn(
                name: "create_at",
                table: "USERS",
                newName: "CreateAt");
        }
    }
}
