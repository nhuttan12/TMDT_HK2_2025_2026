using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Database.Migrations
{
    /// <inheritdoc />
    public partial class UpdateMinOrderValueFieldCouponsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "min_order_value",
                table: "COUPONS",
                newName: "min_invoice_value");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "min_invoice_value",
                table: "COUPONS",
                newName: "min_order_value");
        }
    }
}
