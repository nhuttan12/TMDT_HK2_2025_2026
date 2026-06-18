using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Database.Migrations
{
    /// <inheritdoc />
    public partial class ModifyDiscountInProductPromotionsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "discount",
                table: "PRODUCT_PROMOTIONS",
                newName: "discount_price");

            migrationBuilder.AlterColumn<decimal>(
                name: "discount_price",
                table: "PRODUCT_PROMOTIONS",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "discount_price",
                table: "PRODUCT_PROMOTIONS",
                newName: "discount");

            migrationBuilder.AlterColumn<int>(
                name: "discount",
                table: "PRODUCT_PROMOTIONS",
                type: "int",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");
        }
    }
}
