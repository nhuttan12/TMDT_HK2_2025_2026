using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class RemoveShopSupplierTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SHOP_SUPPLIERS");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SHOP_SUPPLIERS",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    shop_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    supplier_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    status = table.Column<bool>(type: "bit", nullable: false),
                    updated_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "GETUTCDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SHOP_SUPPLIERS", x => x.id);
                    table.ForeignKey(
                        name: "FK_SHOP_SUPPLIERS_SHOPS_shop_id",
                        column: x => x.shop_id,
                        principalTable: "SHOPS",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SHOP_SUPPLIERS_SUPPLIERS_supplier_id",
                        column: x => x.supplier_id,
                        principalTable: "SUPPLIERS",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SHOP_SUPPLIERS_shop_id",
                table: "SHOP_SUPPLIERS",
                column: "shop_id");

            migrationBuilder.CreateIndex(
                name: "IX_SHOP_SUPPLIERS_supplier_id",
                table: "SHOP_SUPPLIERS",
                column: "supplier_id");
        }
    }
}
