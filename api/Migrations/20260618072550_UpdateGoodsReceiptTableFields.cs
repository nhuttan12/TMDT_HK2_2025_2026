using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateGoodsReceiptTableFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Type",
                table: "GOODS_RECEIPTS",
                newName: "type");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "GOODS_RECEIPTS",
                newName: "status");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "type",
                table: "GOODS_RECEIPTS",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "status",
                table: "GOODS_RECEIPTS",
                newName: "Status");
        }
    }
}
