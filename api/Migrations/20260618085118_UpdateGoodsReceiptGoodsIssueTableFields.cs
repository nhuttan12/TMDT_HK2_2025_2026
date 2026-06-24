using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateGoodsReceiptGoodsIssueTableFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "shop_id",
                table: "GOODS_RECEIPTS",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "shop_id",
                table: "GOODS_ISSUES",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_GOODS_RECEIPTS_shop_id",
                table: "GOODS_RECEIPTS",
                column: "shop_id");

            migrationBuilder.CreateIndex(
                name: "IX_GOODS_ISSUES_shop_id",
                table: "GOODS_ISSUES",
                column: "shop_id");

            migrationBuilder.AddForeignKey(
                name: "FK_GOODS_ISSUES_SHOPS_shop_id",
                table: "GOODS_ISSUES",
                column: "shop_id",
                principalTable: "SHOPS",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_GOODS_RECEIPTS_SHOPS_shop_id",
                table: "GOODS_RECEIPTS",
                column: "shop_id",
                principalTable: "SHOPS",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GOODS_ISSUES_SHOPS_shop_id",
                table: "GOODS_ISSUES");

            migrationBuilder.DropForeignKey(
                name: "FK_GOODS_RECEIPTS_SHOPS_shop_id",
                table: "GOODS_RECEIPTS");

            migrationBuilder.DropIndex(
                name: "IX_GOODS_RECEIPTS_shop_id",
                table: "GOODS_RECEIPTS");

            migrationBuilder.DropIndex(
                name: "IX_GOODS_ISSUES_shop_id",
                table: "GOODS_ISSUES");

            migrationBuilder.DropColumn(
                name: "shop_id",
                table: "GOODS_RECEIPTS");

            migrationBuilder.DropColumn(
                name: "shop_id",
                table: "GOODS_ISSUES");
        }
    }
}
