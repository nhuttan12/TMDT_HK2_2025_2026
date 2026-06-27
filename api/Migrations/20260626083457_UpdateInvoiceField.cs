using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateInvoiceField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Status",
                table: "INVOICES",
                newName: "status");

            migrationBuilder.RenameColumn(
                name: "TotalAmount",
                table: "INVOICES",
                newName: "total_amount");

            migrationBuilder.RenameIndex(
                name: "IX_INVOICES_Status_created_at",
                table: "INVOICES",
                newName: "IX_INVOICES_status_created_at");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "status",
                table: "INVOICES",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "total_amount",
                table: "INVOICES",
                newName: "TotalAmount");

            migrationBuilder.RenameIndex(
                name: "IX_INVOICES_status_created_at",
                table: "INVOICES",
                newName: "IX_INVOICES_Status_created_at");
        }
    }
}
