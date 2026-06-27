using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateInvoiceIdFieldsInInvoiceItemsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_INVOICE_ITEMS_INVOICES_InvoiceId",
                table: "INVOICE_ITEMS");

            migrationBuilder.RenameColumn(
                name: "InvoiceId",
                table: "INVOICE_ITEMS",
                newName: "invoice_id");

            migrationBuilder.RenameIndex(
                name: "IX_INVOICE_ITEMS_InvoiceId",
                table: "INVOICE_ITEMS",
                newName: "IX_INVOICE_ITEMS_invoice_id");

            migrationBuilder.AddForeignKey(
                name: "FK_INVOICE_ITEMS_INVOICES_invoice_id",
                table: "INVOICE_ITEMS",
                column: "invoice_id",
                principalTable: "INVOICES",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_INVOICE_ITEMS_INVOICES_invoice_id",
                table: "INVOICE_ITEMS");

            migrationBuilder.RenameColumn(
                name: "invoice_id",
                table: "INVOICE_ITEMS",
                newName: "InvoiceId");

            migrationBuilder.RenameIndex(
                name: "IX_INVOICE_ITEMS_invoice_id",
                table: "INVOICE_ITEMS",
                newName: "IX_INVOICE_ITEMS_InvoiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_INVOICE_ITEMS_INVOICES_InvoiceId",
                table: "INVOICE_ITEMS",
                column: "InvoiceId",
                principalTable: "INVOICES",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
