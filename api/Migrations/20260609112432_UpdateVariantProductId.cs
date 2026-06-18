using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Database.Migrations
{
    /// <inheritdoc />
    public partial class UpdateVariantProductId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VARIANTS_PRODUCTS_ProductId",
                table: "VARIANTS");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "VARIANTS",
                newName: "product_id");

            migrationBuilder.AddForeignKey(
                name: "FK_VARIANTS_PRODUCTS_product_id",
                table: "VARIANTS",
                column: "product_id",
                principalTable: "PRODUCTS",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VARIANTS_PRODUCTS_product_id",
                table: "VARIANTS");

            migrationBuilder.RenameColumn(
                name: "product_id",
                table: "VARIANTS",
                newName: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_VARIANTS_PRODUCTS_ProductId",
                table: "VARIANTS",
                column: "ProductId",
                principalTable: "PRODUCTS",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
