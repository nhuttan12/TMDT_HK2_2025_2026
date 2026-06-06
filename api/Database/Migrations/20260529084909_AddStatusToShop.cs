using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddStatusToShop : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TaxCode",
                table: "SHOPS",
                newName: "tax_code");

            migrationBuilder.AlterColumn<string>(
                name: "tax_code",
                table: "SHOPS",
                type: "nvarchar(50)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "status",
                table: "SHOPS",
                type: "varchar(50)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "status",
                table: "SHOPS");

            migrationBuilder.RenameColumn(
                name: "tax_code",
                table: "SHOPS",
                newName: "TaxCode");

            migrationBuilder.AlterColumn<string>(
                name: "TaxCode",
                table: "SHOPS",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)");
        }
    }
}
