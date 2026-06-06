using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class ModifyIdColumnNameAndAddShopLogo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SHOPS_Users_Id",
                table: "SHOPS");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "USER_BANKINGS",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "SUPPLIERS",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "SHOPS",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "PROMOTIONS",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "PRODUCT_PROMOTIONS",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "INVENTORY_BATCH_STOCKS",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "GOODS_RECEIPTS",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "GOODS_RECEIPT_BATCHES",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "GOODS_RECEIPT_BATCH_VARIANTS",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "GOODS_ISSUES",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "GOODS_ISSUE_DETAILS",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "BANNERS",
                newName: "id");

            migrationBuilder.CreateTable(
                name: "SHOP_LOGOS",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    shop_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    logo_url = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "GETUTCDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SHOP_LOGOS", x => x.id);
                    table.ForeignKey(
                        name: "FK_SHOP_LOGOS_SHOPS_shop_id",
                        column: x => x.shop_id,
                        principalTable: "SHOPS",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SHOP_LOGOS_shop_id",
                table: "SHOP_LOGOS",
                column: "shop_id");

            migrationBuilder.AddForeignKey(
                name: "FK_SHOPS_Users_id",
                table: "SHOPS",
                column: "id",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SHOPS_Users_id",
                table: "SHOPS");

            migrationBuilder.DropTable(
                name: "SHOP_LOGOS");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "USER_BANKINGS",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "SUPPLIERS",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "SHOPS",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "PROMOTIONS",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "PRODUCT_PROMOTIONS",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "INVENTORY_BATCH_STOCKS",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "GOODS_RECEIPTS",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "GOODS_RECEIPT_BATCHES",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "GOODS_RECEIPT_BATCH_VARIANTS",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "GOODS_ISSUES",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "GOODS_ISSUE_DETAILS",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "BANNERS",
                newName: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SHOPS_Users_Id",
                table: "SHOPS",
                column: "Id",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
