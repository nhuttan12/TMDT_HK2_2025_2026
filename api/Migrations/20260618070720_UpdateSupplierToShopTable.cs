using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSupplierToShopTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "shop_id",
                table: "SUPPLIERS",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_SUPPLIERS_shop_id",
                table: "SUPPLIERS",
                column: "shop_id");

            migrationBuilder.AddForeignKey(
                name: "FK_SUPPLIERS_SHOPS_shop_id",
                table: "SUPPLIERS",
                column: "shop_id",
                principalTable: "SHOPS",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SUPPLIERS_SHOPS_shop_id",
                table: "SUPPLIERS");

            migrationBuilder.DropIndex(
                name: "IX_SUPPLIERS_shop_id",
                table: "SUPPLIERS");

            migrationBuilder.DropColumn(
                name: "shop_id",
                table: "SUPPLIERS");
        }
    }
}
