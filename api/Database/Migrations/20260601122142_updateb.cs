using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Database.Migrations
{
    /// <inheritdoc />
    public partial class updateb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductDetails_Products_ProductId",
                table: "ProductDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_Variants_Products_ProductId",
                table: "Variants");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Products",
                table: "Products");

            migrationBuilder.RenameTable(
                name: "Products",
                newName: "PRODUCTS");

            migrationBuilder.RenameIndex(
                name: "IX_Products_Name",
                table: "PRODUCTS",
                newName: "IX_PRODUCTS_Name");

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "PRODUCTS",
                type: "nvarchar(2048)",
                maxLength: 2048,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "PRODUCTS",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PRODUCTS",
                table: "PRODUCTS",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductDetails_PRODUCTS_ProductId",
                table: "ProductDetails",
                column: "ProductId",
                principalTable: "PRODUCTS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Variants_PRODUCTS_ProductId",
                table: "Variants",
                column: "ProductId",
                principalTable: "PRODUCTS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductDetails_PRODUCTS_ProductId",
                table: "ProductDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_Variants_PRODUCTS_ProductId",
                table: "Variants");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PRODUCTS",
                table: "PRODUCTS");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "PRODUCTS");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "PRODUCTS");

            migrationBuilder.RenameTable(
                name: "PRODUCTS",
                newName: "Products");

            migrationBuilder.RenameIndex(
                name: "IX_PRODUCTS_Name",
                table: "Products",
                newName: "IX_Products_Name");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Products",
                table: "Products",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductDetails_Products_ProductId",
                table: "ProductDetails",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Variants_Products_ProductId",
                table: "Variants",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
