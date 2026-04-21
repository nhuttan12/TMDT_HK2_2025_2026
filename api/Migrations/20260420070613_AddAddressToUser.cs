using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddAddressToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_addresses_users_user_id",
                table: "addresses");

            migrationBuilder.DropColumn(
                name: "user_id1",
                table: "addresses");

            migrationBuilder.AlterColumn<int>(
                name: "user_id",
                table: "addresses",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "fk_addresses_users_user_id",
                table: "addresses",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_addresses_users_user_id",
                table: "addresses");

            migrationBuilder.AlterColumn<int>(
                name: "user_id",
                table: "addresses",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<string>(
                name: "user_id1",
                table: "addresses",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "fk_addresses_users_user_id",
                table: "addresses",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id");
        }
    }
}
