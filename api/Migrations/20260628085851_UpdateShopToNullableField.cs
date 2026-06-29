using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateShopToNullableField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "tax_code",
                table: "SHOPS",
                type: "nvarchar(50)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)");

            migrationBuilder.AlterColumn<string>(
                name: "shop_logo",
                table: "SHOPS",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "tax_code",
                table: "SHOPS",
                type: "nvarchar(50)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "shop_logo",
                table: "SHOPS",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }
    }
}
