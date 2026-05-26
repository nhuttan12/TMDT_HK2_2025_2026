using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class FixCustomerIdType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GOODS_ISSUES",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    customer_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    Note = table.Column<string>(type: "text", nullable: false),
                    type = table.Column<string>(type: "varchar(20)", nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "GETUTCDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GOODS_ISSUES", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GOODS_ISSUES_Users_customer_id",
                        column: x => x.customer_id,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SUPPLIERS",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    Name = table.Column<string>(type: "varchar(100)", nullable: false),
                    tax_code = table.Column<string>(type: "varchar(13)", nullable: false),
                    phone_number = table.Column<string>(type: "varchar(10)", nullable: false),
                    Email = table.Column<string>(type: "varchar(100)", nullable: false),
                    contact_name = table.Column<string>(type: "varchar(100)", nullable: false),
                    Address = table.Column<string>(type: "varchar(100)", nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    updated_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "GETUTCDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SUPPLIERS", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GOODS_ISSUE_DETAILS",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    issue_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    variant_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    selling_price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "GETUTCDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GOODS_ISSUE_DETAILS", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GOODS_ISSUE_DETAILS_GOODS_ISSUES_issue_id",
                        column: x => x.issue_id,
                        principalTable: "GOODS_ISSUES",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_GOODS_ISSUE_DETAILS_Variants_variant_id",
                        column: x => x.variant_id,
                        principalTable: "Variants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "GOODS_RECEIPTS",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    supplier_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    Note = table.Column<string>(type: "text", nullable: false),
                    Type = table.Column<string>(type: "varchar(50)", nullable: false),
                    Status = table.Column<string>(type: "varchar(50)", nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "GETUTCDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GOODS_RECEIPTS", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GOODS_RECEIPTS_SUPPLIERS_supplier_id",
                        column: x => x.supplier_id,
                        principalTable: "SUPPLIERS",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "GOODS_RECEIPT_BATCHES",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    goods_receipt_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BatchCode = table.Column<string>(type: "varchar(50)", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    TotalCostPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    updated_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "GETUTCDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GOODS_RECEIPT_BATCHES", x => x.Id);
                    table.CheckConstraint("CK_GoodsReceiptBatch_Quantity", "[Quantity] > 0");
                    table.ForeignKey(
                        name: "FK_GOODS_RECEIPT_BATCHES_GOODS_RECEIPTS_goods_receipt_id",
                        column: x => x.goods_receipt_id,
                        principalTable: "GOODS_RECEIPTS",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "GOODS_RECEIPT_BATCH_VARIANTS",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    batch_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    variant_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    CostPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "GETUTCDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GOODS_RECEIPT_BATCH_VARIANTS", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GOODS_RECEIPT_BATCH_VARIANTS_GOODS_RECEIPT_BATCHES_batch_id",
                        column: x => x.batch_id,
                        principalTable: "GOODS_RECEIPT_BATCHES",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_GOODS_RECEIPT_BATCH_VARIANTS_Variants_variant_id",
                        column: x => x.variant_id,
                        principalTable: "Variants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "INVENTORY_BATCH_STOCKS",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    variant_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    product_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    batch_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    remaining_quantity = table.Column<int>(type: "int", nullable: false),
                    status = table.Column<string>(type: "varchar(20)", nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    updated_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "GETUTCDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_INVENTORY_BATCH_STOCKS", x => x.Id);
                    table.ForeignKey(
                        name: "FK_INVENTORY_BATCH_STOCKS_GOODS_RECEIPT_BATCHES_batch_id",
                        column: x => x.batch_id,
                        principalTable: "GOODS_RECEIPT_BATCHES",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_INVENTORY_BATCH_STOCKS_Products_product_id",
                        column: x => x.product_id,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_INVENTORY_BATCH_STOCKS_Variants_variant_id",
                        column: x => x.variant_id,
                        principalTable: "Variants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GOODS_ISSUE_DETAILS_issue_id",
                table: "GOODS_ISSUE_DETAILS",
                column: "issue_id");

            migrationBuilder.CreateIndex(
                name: "IX_GOODS_ISSUE_DETAILS_variant_id",
                table: "GOODS_ISSUE_DETAILS",
                column: "variant_id");

            migrationBuilder.CreateIndex(
                name: "IX_GOODS_ISSUES_customer_id",
                table: "GOODS_ISSUES",
                column: "customer_id");

            migrationBuilder.CreateIndex(
                name: "IX_GOODS_RECEIPT_BATCH_VARIANTS_batch_id",
                table: "GOODS_RECEIPT_BATCH_VARIANTS",
                column: "batch_id");

            migrationBuilder.CreateIndex(
                name: "IX_GOODS_RECEIPT_BATCH_VARIANTS_variant_id",
                table: "GOODS_RECEIPT_BATCH_VARIANTS",
                column: "variant_id");

            migrationBuilder.CreateIndex(
                name: "IX_GOODS_RECEIPT_BATCHES_goods_receipt_id",
                table: "GOODS_RECEIPT_BATCHES",
                column: "goods_receipt_id");

            migrationBuilder.CreateIndex(
                name: "IX_GOODS_RECEIPTS_supplier_id",
                table: "GOODS_RECEIPTS",
                column: "supplier_id");

            migrationBuilder.CreateIndex(
                name: "IX_INVENTORY_BATCH_STOCKS_batch_id",
                table: "INVENTORY_BATCH_STOCKS",
                column: "batch_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_INVENTORY_BATCH_STOCKS_product_id",
                table: "INVENTORY_BATCH_STOCKS",
                column: "product_id");

            migrationBuilder.CreateIndex(
                name: "IX_INVENTORY_BATCH_STOCKS_variant_id",
                table: "INVENTORY_BATCH_STOCKS",
                column: "variant_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GOODS_ISSUE_DETAILS");

            migrationBuilder.DropTable(
                name: "GOODS_RECEIPT_BATCH_VARIANTS");

            migrationBuilder.DropTable(
                name: "INVENTORY_BATCH_STOCKS");

            migrationBuilder.DropTable(
                name: "GOODS_ISSUES");

            migrationBuilder.DropTable(
                name: "GOODS_RECEIPT_BATCHES");

            migrationBuilder.DropTable(
                name: "GOODS_RECEIPTS");

            migrationBuilder.DropTable(
                name: "SUPPLIERS");
        }
    }
}
