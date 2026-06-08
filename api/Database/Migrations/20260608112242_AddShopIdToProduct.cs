using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Database.Migrations
{
    /// <inheritdoc />
    public partial class AddShopIdToProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PRODUCTS_SHOPS_ShopId1",
                table: "PRODUCTS");

            migrationBuilder.DropIndex(
                name: "IX_PRODUCTS_ShopId1",
                table: "PRODUCTS");

            migrationBuilder.DropColumn(
                name: "ShopId1",
                table: "PRODUCTS");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Shops_ShopId",
                table: "PRODUCTS",
                column: "shop_id",
                principalTable: "SHOPS",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Shops_ShopId",
                table: "PRODUCTS");

            migrationBuilder.AddColumn<Guid>(
                name: "ShopId1",
                table: "PRODUCTS",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_PRODUCTS_ShopId1",
                table: "PRODUCTS",
                column: "ShopId1");

            migrationBuilder.AddForeignKey(
                name: "FK_PRODUCTS_SHOPS_ShopId1",
                table: "PRODUCTS",
                column: "ShopId1",
                principalTable: "SHOPS",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
