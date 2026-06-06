using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class ModifyIdColumnNameToLowerCase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_GoodsReceiptBatch_Quantity",
                table: "GOODS_RECEIPT_BATCHES");

            migrationBuilder.RenameColumn(
                name: "Address",
                table: "SUPPLIERS",
                newName: "address");

            migrationBuilder.RenameColumn(
                name: "Note",
                table: "GOODS_RECEIPTS",
                newName: "note");

            migrationBuilder.RenameColumn(
                name: "Code",
                table: "GOODS_RECEIPTS",
                newName: "code");

            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "GOODS_RECEIPT_BATCHES",
                newName: "quantity");

            migrationBuilder.RenameColumn(
                name: "TotalCostPrice",
                table: "GOODS_RECEIPT_BATCHES",
                newName: "total_cost_price");

            migrationBuilder.RenameColumn(
                name: "BatchCode",
                table: "GOODS_RECEIPT_BATCHES",
                newName: "batch_code");

            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "GOODS_RECEIPT_BATCH_VARIANTS",
                newName: "quantity");

            migrationBuilder.RenameColumn(
                name: "CostPrice",
                table: "GOODS_RECEIPT_BATCH_VARIANTS",
                newName: "cost_price");

            migrationBuilder.RenameColumn(
                name: "Note",
                table: "GOODS_ISSUES",
                newName: "note");

            migrationBuilder.RenameColumn(
                name: "Code",
                table: "GOODS_ISSUES",
                newName: "code");

            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "GOODS_ISSUE_DETAILS",
                newName: "quantity");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "address",
                table: "SUPPLIERS",
                newName: "Address");

            migrationBuilder.RenameColumn(
                name: "note",
                table: "GOODS_RECEIPTS",
                newName: "Note");

            migrationBuilder.RenameColumn(
                name: "code",
                table: "GOODS_RECEIPTS",
                newName: "Code");

            migrationBuilder.RenameColumn(
                name: "quantity",
                table: "GOODS_RECEIPT_BATCHES",
                newName: "Quantity");

            migrationBuilder.RenameColumn(
                name: "total_cost_price",
                table: "GOODS_RECEIPT_BATCHES",
                newName: "TotalCostPrice");

            migrationBuilder.RenameColumn(
                name: "batch_code",
                table: "GOODS_RECEIPT_BATCHES",
                newName: "BatchCode");

            migrationBuilder.RenameColumn(
                name: "quantity",
                table: "GOODS_RECEIPT_BATCH_VARIANTS",
                newName: "Quantity");

            migrationBuilder.RenameColumn(
                name: "cost_price",
                table: "GOODS_RECEIPT_BATCH_VARIANTS",
                newName: "CostPrice");

            migrationBuilder.RenameColumn(
                name: "note",
                table: "GOODS_ISSUES",
                newName: "Note");

            migrationBuilder.RenameColumn(
                name: "code",
                table: "GOODS_ISSUES",
                newName: "Code");

            migrationBuilder.RenameColumn(
                name: "quantity",
                table: "GOODS_ISSUE_DETAILS",
                newName: "Quantity");

            migrationBuilder.AddCheckConstraint(
                name: "CK_GoodsReceiptBatch_Quantity",
                table: "GOODS_RECEIPT_BATCHES",
                sql: "[Quantity] > 0");
        }
    }
}
