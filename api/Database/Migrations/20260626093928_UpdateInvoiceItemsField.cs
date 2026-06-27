using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateInvoiceItemsField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "INVOICE_ITEMS",
                newName: "quantity");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "INVOICE_ITEMS",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "VariantId",
                table: "INVOICE_ITEMS",
                newName: "variant_id");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "INVOICE_ITEMS",
                newName: "product_id");

            migrationBuilder.RenameColumn(
                name: "PriceAtPurchase",
                table: "INVOICE_ITEMS",
                newName: "price_at_purchase");

            migrationBuilder.RenameIndex(
                name: "IX_INVOICE_ITEMS_VariantId",
                table: "INVOICE_ITEMS",
                newName: "IX_INVOICE_ITEMS_variant_id");

            migrationBuilder.RenameIndex(
                name: "IX_INVOICE_ITEMS_ProductId",
                table: "INVOICE_ITEMS",
                newName: "IX_INVOICE_ITEMS_product_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "quantity",
                table: "INVOICE_ITEMS",
                newName: "Quantity");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "INVOICE_ITEMS",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "variant_id",
                table: "INVOICE_ITEMS",
                newName: "VariantId");

            migrationBuilder.RenameColumn(
                name: "product_id",
                table: "INVOICE_ITEMS",
                newName: "ProductId");

            migrationBuilder.RenameColumn(
                name: "price_at_purchase",
                table: "INVOICE_ITEMS",
                newName: "PriceAtPurchase");

            migrationBuilder.RenameIndex(
                name: "IX_INVOICE_ITEMS_variant_id",
                table: "INVOICE_ITEMS",
                newName: "IX_INVOICE_ITEMS_VariantId");

            migrationBuilder.RenameIndex(
                name: "IX_INVOICE_ITEMS_product_id",
                table: "INVOICE_ITEMS",
                newName: "IX_INVOICE_ITEMS_ProductId");
        }
    }
}
