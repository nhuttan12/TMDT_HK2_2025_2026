using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Database.Migrations
{
    /// <inheritdoc />
    public partial class AddUserCouponSavedAndInvoiceAppliedCoupon : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ADDRESSES_USERS_UserId",
                table: "ADDRESSES");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "INVOICES",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                table: "INVOICES",
                newName: "updated_at");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "INVOICES",
                newName: "created_at");

            migrationBuilder.RenameColumn(
                name: "CouponId",
                table: "INVOICES",
                newName: "coupon_id");

            migrationBuilder.RenameIndex(
                name: "IX_INVOICES_Status_CreatedAt",
                table: "INVOICES",
                newName: "IX_INVOICES_Status_created_at");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "ADDRESSES",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "ADDRESSES",
                newName: "user_id");

            migrationBuilder.RenameColumn(
                name: "IsUsed",
                table: "ADDRESSES",
                newName: "is_used");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "ADDRESSES",
                newName: "created_at");

            migrationBuilder.RenameColumn(
                name: "AddressUrl",
                table: "ADDRESSES",
                newName: "address_url");

            migrationBuilder.RenameIndex(
                name: "IX_ADDRESSES_UserId",
                table: "ADDRESSES",
                newName: "IX_ADDRESSES_user_id");

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "updated_at",
                table: "INVOICES",
                type: "datetimeoffset",
                nullable: false,
                defaultValueSql: "SYSUTCDATETIME()",
                oldClrType: typeof(DateTimeOffset),
                oldType: "datetimeoffset");

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "created_at",
                table: "INVOICES",
                type: "datetimeoffset",
                nullable: false,
                defaultValueSql: "SYSUTCDATETIME()",
                oldClrType: typeof(DateTimeOffset),
                oldType: "datetimeoffset");

            migrationBuilder.AddColumn<Guid>(
                name: "shop_id",
                table: "INVOICES",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "user_id",
                table: "INVOICES",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AlterColumn<bool>(
                name: "is_used",
                table: "ADDRESSES",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "created_at",
                table: "ADDRESSES",
                type: "datetimeoffset",
                nullable: false,
                defaultValueSql: "GETUTCDATE()",
                oldClrType: typeof(DateTimeOffset),
                oldType: "datetimeoffset");

            migrationBuilder.CreateTable(
                name: "COUPONS",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    code = table.Column<string>(type: "varchar(50)", nullable: false),
                    name = table.Column<string>(type: "varchar(255)", nullable: false),
                    scope = table.Column<string>(type: "varchar(20)", nullable: false),
                    category = table.Column<string>(type: "varchar(20)", nullable: false),
                    type = table.Column<string>(type: "varchar(20)", nullable: false),
                    discount_value = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    max_discount_amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    min_order_value = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    total_quantity = table.Column<int>(type: "int", nullable: false),
                    used_quantity = table.Column<int>(type: "int", nullable: false),
                    start_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    end_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    status = table.Column<bool>(type: "bit", nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "GETDATE()"),
                    updated_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "GETDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_COUPONS", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "INVOICE_APPLIED_COUPONS",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    invoice_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    coupon_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    discount_amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    applied_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "GETUTCDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_INVOICE_APPLIED_COUPONS", x => x.id);
                    table.ForeignKey(
                        name: "FK_INVOICE_APPLIED_COUPONS_COUPONS_coupon_id",
                        column: x => x.coupon_id,
                        principalTable: "COUPONS",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_INVOICE_APPLIED_COUPONS_INVOICES_invoice_id",
                        column: x => x.invoice_id,
                        principalTable: "INVOICES",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "USER_SAVED_COUPONS",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    user_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    coupon_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    is_used = table.Column<bool>(type: "bit", nullable: false),
                    saved_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    last_used_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_USER_SAVED_COUPONS", x => x.id);
                    table.ForeignKey(
                        name: "FK_USER_SAVED_COUPONS_COUPONS_coupon_id",
                        column: x => x.coupon_id,
                        principalTable: "COUPONS",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_USER_SAVED_COUPONS_USERS_user_id",
                        column: x => x.user_id,
                        principalTable: "USERS",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_INVOICES_shop_id",
                table: "INVOICES",
                column: "shop_id");

            migrationBuilder.CreateIndex(
                name: "IX_INVOICES_user_id",
                table: "INVOICES",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_INVOICE_APPLIED_COUPONS_coupon_id",
                table: "INVOICE_APPLIED_COUPONS",
                column: "coupon_id");

            migrationBuilder.CreateIndex(
                name: "IX_INVOICE_APPLIED_COUPONS_invoice_id",
                table: "INVOICE_APPLIED_COUPONS",
                column: "invoice_id");

            migrationBuilder.CreateIndex(
                name: "IX_USER_SAVED_COUPONS_coupon_id",
                table: "USER_SAVED_COUPONS",
                column: "coupon_id");

            migrationBuilder.CreateIndex(
                name: "IX_USER_SAVED_COUPONS_user_id",
                table: "USER_SAVED_COUPONS",
                column: "user_id");

            migrationBuilder.AddForeignKey(
                name: "FK_ADDRESSES_USERS_user_id",
                table: "ADDRESSES",
                column: "user_id",
                principalTable: "USERS",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_INVOICES_SHOPS_shop_id",
                table: "INVOICES",
                column: "shop_id",
                principalTable: "SHOPS",
                principalColumn: "id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_INVOICES_USERS_user_id",
                table: "INVOICES",
                column: "user_id",
                principalTable: "USERS",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ADDRESSES_USERS_user_id",
                table: "ADDRESSES");

            migrationBuilder.DropForeignKey(
                name: "FK_INVOICES_SHOPS_shop_id",
                table: "INVOICES");

            migrationBuilder.DropForeignKey(
                name: "FK_INVOICES_USERS_user_id",
                table: "INVOICES");

            migrationBuilder.DropTable(
                name: "INVOICE_APPLIED_COUPONS");

            migrationBuilder.DropTable(
                name: "USER_SAVED_COUPONS");

            migrationBuilder.DropTable(
                name: "COUPONS");

            migrationBuilder.DropIndex(
                name: "IX_INVOICES_shop_id",
                table: "INVOICES");

            migrationBuilder.DropIndex(
                name: "IX_INVOICES_user_id",
                table: "INVOICES");

            migrationBuilder.DropColumn(
                name: "shop_id",
                table: "INVOICES");

            migrationBuilder.DropColumn(
                name: "user_id",
                table: "INVOICES");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "INVOICES",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "updated_at",
                table: "INVOICES",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "created_at",
                table: "INVOICES",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "coupon_id",
                table: "INVOICES",
                newName: "CouponId");

            migrationBuilder.RenameIndex(
                name: "IX_INVOICES_Status_created_at",
                table: "INVOICES",
                newName: "IX_INVOICES_Status_CreatedAt");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "ADDRESSES",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "user_id",
                table: "ADDRESSES",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "is_used",
                table: "ADDRESSES",
                newName: "IsUsed");

            migrationBuilder.RenameColumn(
                name: "created_at",
                table: "ADDRESSES",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "address_url",
                table: "ADDRESSES",
                newName: "AddressUrl");

            migrationBuilder.RenameIndex(
                name: "IX_ADDRESSES_user_id",
                table: "ADDRESSES",
                newName: "IX_ADDRESSES_UserId");

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedAt",
                table: "INVOICES",
                type: "datetimeoffset",
                nullable: false,
                oldClrType: typeof(DateTimeOffset),
                oldType: "datetimeoffset",
                oldDefaultValueSql: "SYSUTCDATETIME()");

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedAt",
                table: "INVOICES",
                type: "datetimeoffset",
                nullable: false,
                oldClrType: typeof(DateTimeOffset),
                oldType: "datetimeoffset",
                oldDefaultValueSql: "SYSUTCDATETIME()");

            migrationBuilder.AlterColumn<bool>(
                name: "IsUsed",
                table: "ADDRESSES",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldDefaultValue: false);

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedAt",
                table: "ADDRESSES",
                type: "datetimeoffset",
                nullable: false,
                oldClrType: typeof(DateTimeOffset),
                oldType: "datetimeoffset",
                oldDefaultValueSql: "GETUTCDATE()");

            migrationBuilder.AddForeignKey(
                name: "FK_ADDRESSES_USERS_UserId",
                table: "ADDRESSES",
                column: "UserId",
                principalTable: "USERS",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
