using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Database.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CATEGORIES",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    sku = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    image_url = table.Column<string>(type: "varchar(500)", unicode: false, maxLength: 500, nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "datetimeoffset(7)", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CATEGORIES", x => x.id);
                });

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
                name: "ROLES",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ROLES", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "SUPPLIERS",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    Name = table.Column<string>(type: "varchar(100)", nullable: false),
                    tax_code = table.Column<string>(type: "varchar(13)", nullable: false),
                    phone_number = table.Column<string>(type: "varchar(10)", nullable: false),
                    Email = table.Column<string>(type: "varchar(100)", nullable: false),
                    contact_name = table.Column<string>(type: "varchar(100)", nullable: false),
                    address = table.Column<string>(type: "varchar(100)", nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    updated_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "GETUTCDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SUPPLIERS", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "USERS",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    email = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    password_hash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    full_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    create_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    update_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    delete_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    role_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_USERS", x => x.id);
                    table.ForeignKey(
                        name: "FK_USERS_ROLES_role_id",
                        column: x => x.role_id,
                        principalTable: "ROLES",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "GOODS_RECEIPTS",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    supplier_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    code = table.Column<string>(type: "varchar(50)", nullable: false),
                    note = table.Column<string>(type: "NVARCHAR(MAX)", nullable: false),
                    Type = table.Column<string>(type: "varchar(50)", nullable: false),
                    Status = table.Column<string>(type: "varchar(50)", nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "GETUTCDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GOODS_RECEIPTS", x => x.id);
                    table.ForeignKey(
                        name: "FK_GOODS_RECEIPTS_SUPPLIERS_supplier_id",
                        column: x => x.supplier_id,
                        principalTable: "SUPPLIERS",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ADDRESSES",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    user_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    address_url = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    is_used = table.Column<bool>(type: "bit", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ADDRESSES", x => x.id);
                    table.ForeignKey(
                        name: "FK_ADDRESSES_USERS_user_id",
                        column: x => x.user_id,
                        principalTable: "USERS",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BANNERS",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    user_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    image_url = table.Column<string>(type: "NVARCHAR(MAX)", nullable: false),
                    order = table.Column<int>(type: "int", nullable: false),
                    is_primary = table.Column<bool>(type: "bit", nullable: false),
                    status = table.Column<bool>(type: "bit", nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    updated_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "GETUTCDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BANNERS", x => x.id);
                    table.ForeignKey(
                        name: "FK_BANNERS_USERS_user_id",
                        column: x => x.user_id,
                        principalTable: "USERS",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "GOODS_ISSUES",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    customer_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    code = table.Column<string>(type: "varchar(50)", nullable: false),
                    note = table.Column<string>(type: "NVARCHAR(MAX)", nullable: false),
                    type = table.Column<string>(type: "varchar(20)", nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "GETUTCDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GOODS_ISSUES", x => x.id);
                    table.ForeignKey(
                        name: "FK_GOODS_ISSUES_USERS_customer_id",
                        column: x => x.customer_id,
                        principalTable: "USERS",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PROMOTIONS",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    user_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    name = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    start_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    end_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    status = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    created_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    updated_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "GETUTCDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PROMOTIONS", x => x.id);
                    table.ForeignKey(
                        name: "FK_PROMOTIONS_USERS_user_id",
                        column: x => x.user_id,
                        principalTable: "USERS",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SHOPS",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    status = table.Column<string>(type: "varchar(50)", nullable: false),
                    system_status = table.Column<string>(type: "varchar(50)", nullable: false),
                    rating = table.Column<int>(type: "int", nullable: false),
                    name = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    tax_code = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    description = table.Column<string>(type: "NVARCHAR(MAX)", nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    updated_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "GETUTCDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SHOPS", x => x.id);
                    table.ForeignKey(
                        name: "FK_SHOPS_USERS_id",
                        column: x => x.id,
                        principalTable: "USERS",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "USER_BANKINGS",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    user_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    bank_name = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    account_name = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    account_number = table.Column<string>(type: "varchar(20)", nullable: false),
                    status = table.Column<bool>(type: "bit", nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    updated_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "GETUTCDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_USER_BANKINGS", x => x.id);
                    table.ForeignKey(
                        name: "FK_USER_BANKINGS_USERS_user_id",
                        column: x => x.user_id,
                        principalTable: "USERS",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "USER_DETAILS",
                columns: table => new
                {
                    user_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LockTimeStart = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LockTimeEnd = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AvatarUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AddressId = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_USER_DETAILS", x => x.user_id);
                    table.ForeignKey(
                        name: "FK_USER_DETAILS_USERS_user_id",
                        column: x => x.user_id,
                        principalTable: "USERS",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "USER_EXTERNAL_LOGINS",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Provider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_USER_EXTERNAL_LOGINS", x => x.Id);
                    table.ForeignKey(
                        name: "FK_USER_EXTERNAL_LOGINS_USERS_Id",
                        column: x => x.Id,
                        principalTable: "USERS",
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

            migrationBuilder.CreateTable(
                name: "GOODS_RECEIPT_BATCHES",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    goods_receipt_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    batch_code = table.Column<string>(type: "varchar(50)", nullable: false),
                    quantity = table.Column<int>(type: "int", nullable: false),
                    total_cost_price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    updated_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "GETUTCDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GOODS_RECEIPT_BATCHES", x => x.id);
                    table.ForeignKey(
                        name: "FK_GOODS_RECEIPT_BATCHES_GOODS_RECEIPTS_goods_receipt_id",
                        column: x => x.goods_receipt_id,
                        principalTable: "GOODS_RECEIPTS",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "INVOICES",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    TotalAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Status = table.Column<byte>(type: "tinyint", nullable: false),
                    user_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    shop_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    coupon_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    created_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "SYSUTCDATETIME()"),
                    updated_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "SYSUTCDATETIME()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_INVOICES", x => x.id);
                    table.ForeignKey(
                        name: "FK_INVOICES_SHOPS_shop_id",
                        column: x => x.shop_id,
                        principalTable: "SHOPS",
                        principalColumn: "id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_INVOICES_USERS_user_id",
                        column: x => x.user_id,
                        principalTable: "USERS",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PRODUCTS",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    base_price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    rating = table.Column<decimal>(type: "decimal(3,2)", precision: 3, scale: 2, nullable: false, defaultValue: 0m),
                    image_urls = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    category_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    shop_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    updated_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PRODUCTS", x => x.id);
                    table.ForeignKey(
                        name: "FK_Products_Categories",
                        column: x => x.category_id,
                        principalTable: "CATEGORIES",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Products_Shops_ShopId",
                        column: x => x.shop_id,
                        principalTable: "SHOPS",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Products_Users_ShopId",
                        column: x => x.shop_id,
                        principalTable: "USERS",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

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
                name: "INVOICE_ITEMS",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    InvoiceId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProductId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    VariantId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    PriceAtPurchase = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_INVOICE_ITEMS", x => x.Id);
                    table.ForeignKey(
                        name: "FK_INVOICE_ITEMS_INVOICES_InvoiceId",
                        column: x => x.InvoiceId,
                        principalTable: "INVOICES",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PRODUCT_DETAILS",
                columns: table => new
                {
                    ProductId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    summary = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    description_html = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PRODUCT_DETAILS", x => x.ProductId);
                    table.ForeignKey(
                        name: "FK_PRODUCT_DETAILS_PRODUCTS_ProductId",
                        column: x => x.ProductId,
                        principalTable: "PRODUCTS",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PRODUCT_PROMOTIONS",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    promotion_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    product_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    discount = table.Column<int>(type: "int", nullable: false),
                    status = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    created_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    updated_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "GETUTCDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PRODUCT_PROMOTIONS", x => x.id);
                    table.ForeignKey(
                        name: "FK_PRODUCT_PROMOTIONS_PRODUCTS_product_id",
                        column: x => x.product_id,
                        principalTable: "PRODUCTS",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PRODUCT_PROMOTIONS_PROMOTIONS_promotion_id",
                        column: x => x.promotion_id,
                        principalTable: "PROMOTIONS",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "VARIANTS",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProductId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    sku = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    cost_price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    sell_price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    image_url = table.Column<string>(type: "varchar(500)", unicode: false, maxLength: 500, nullable: false),
                    status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VARIANTS", x => x.id);
                    table.ForeignKey(
                        name: "FK_VARIANTS_PRODUCTS_ProductId",
                        column: x => x.ProductId,
                        principalTable: "PRODUCTS",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GOODS_ISSUE_DETAILS",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    issue_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    variant_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    quantity = table.Column<int>(type: "int", nullable: false),
                    selling_price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "GETUTCDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GOODS_ISSUE_DETAILS", x => x.id);
                    table.ForeignKey(
                        name: "FK_GOODS_ISSUE_DETAILS_GOODS_ISSUES_issue_id",
                        column: x => x.issue_id,
                        principalTable: "GOODS_ISSUES",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_GOODS_ISSUE_DETAILS_VARIANTS_variant_id",
                        column: x => x.variant_id,
                        principalTable: "VARIANTS",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "GOODS_RECEIPT_BATCH_VARIANTS",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    batch_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    variant_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    quantity = table.Column<int>(type: "int", nullable: false),
                    cost_price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "GETUTCDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GOODS_RECEIPT_BATCH_VARIANTS", x => x.id);
                    table.ForeignKey(
                        name: "FK_GOODS_RECEIPT_BATCH_VARIANTS_GOODS_RECEIPT_BATCHES_batch_id",
                        column: x => x.batch_id,
                        principalTable: "GOODS_RECEIPT_BATCHES",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_GOODS_RECEIPT_BATCH_VARIANTS_VARIANTS_variant_id",
                        column: x => x.variant_id,
                        principalTable: "VARIANTS",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "INVENTORY_BATCH_STOCKS",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
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
                    table.PrimaryKey("PK_INVENTORY_BATCH_STOCKS", x => x.id);
                    table.ForeignKey(
                        name: "FK_INVENTORY_BATCH_STOCKS_GOODS_RECEIPT_BATCHES_batch_id",
                        column: x => x.batch_id,
                        principalTable: "GOODS_RECEIPT_BATCHES",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_INVENTORY_BATCH_STOCKS_PRODUCTS_product_id",
                        column: x => x.product_id,
                        principalTable: "PRODUCTS",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_INVENTORY_BATCH_STOCKS_VARIANTS_variant_id",
                        column: x => x.variant_id,
                        principalTable: "VARIANTS",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ADDRESSES_user_id",
                table: "ADDRESSES",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_BANNERS_user_id",
                table: "BANNERS",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_CATEGORIES_sku",
                table: "CATEGORIES",
                column: "sku",
                unique: true);

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

            migrationBuilder.CreateIndex(
                name: "IX_INVOICE_APPLIED_COUPONS_coupon_id",
                table: "INVOICE_APPLIED_COUPONS",
                column: "coupon_id");

            migrationBuilder.CreateIndex(
                name: "IX_INVOICE_APPLIED_COUPONS_invoice_id",
                table: "INVOICE_APPLIED_COUPONS",
                column: "invoice_id");

            migrationBuilder.CreateIndex(
                name: "IX_INVOICE_ITEMS_InvoiceId",
                table: "INVOICE_ITEMS",
                column: "InvoiceId");

            migrationBuilder.CreateIndex(
                name: "IX_INVOICE_ITEMS_ProductId",
                table: "INVOICE_ITEMS",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_INVOICE_ITEMS_VariantId",
                table: "INVOICE_ITEMS",
                column: "VariantId");

            migrationBuilder.CreateIndex(
                name: "IX_INVOICES_shop_id",
                table: "INVOICES",
                column: "shop_id");

            migrationBuilder.CreateIndex(
                name: "IX_INVOICES_Status_created_at",
                table: "INVOICES",
                columns: new[] { "Status", "created_at" });

            migrationBuilder.CreateIndex(
                name: "IX_INVOICES_user_id",
                table: "INVOICES",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_PRODUCT_PROMOTIONS_product_id",
                table: "PRODUCT_PROMOTIONS",
                column: "product_id");

            migrationBuilder.CreateIndex(
                name: "IX_PRODUCT_PROMOTIONS_promotion_id",
                table: "PRODUCT_PROMOTIONS",
                column: "promotion_id");

            migrationBuilder.CreateIndex(
                name: "IX_Products_CategoryId",
                table: "PRODUCTS",
                column: "category_id");

            migrationBuilder.CreateIndex(
                name: "IX_PRODUCTS_name",
                table: "PRODUCTS",
                column: "name");

            migrationBuilder.CreateIndex(
                name: "IX_Products_ShopId",
                table: "PRODUCTS",
                column: "shop_id");

            migrationBuilder.CreateIndex(
                name: "IX_PROMOTIONS_user_id",
                table: "PROMOTIONS",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_SHOP_LOGOS_shop_id",
                table: "SHOP_LOGOS",
                column: "shop_id");

            migrationBuilder.CreateIndex(
                name: "IX_USER_BANKINGS_user_id",
                table: "USER_BANKINGS",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_USER_EXTERNAL_LOGINS_Provider_Id",
                table: "USER_EXTERNAL_LOGINS",
                columns: new[] { "Provider", "Id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_USER_SAVED_COUPONS_coupon_id",
                table: "USER_SAVED_COUPONS",
                column: "coupon_id");

            migrationBuilder.CreateIndex(
                name: "IX_USER_SAVED_COUPONS_user_id",
                table: "USER_SAVED_COUPONS",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_USERS_role_id",
                table: "USERS",
                column: "role_id");

            migrationBuilder.CreateIndex(
                name: "IX_Variants_ProductId",
                table: "VARIANTS",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Variants_Sku",
                table: "VARIANTS",
                column: "sku",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ADDRESSES");

            migrationBuilder.DropTable(
                name: "BANNERS");

            migrationBuilder.DropTable(
                name: "GOODS_ISSUE_DETAILS");

            migrationBuilder.DropTable(
                name: "GOODS_RECEIPT_BATCH_VARIANTS");

            migrationBuilder.DropTable(
                name: "INVENTORY_BATCH_STOCKS");

            migrationBuilder.DropTable(
                name: "INVOICE_APPLIED_COUPONS");

            migrationBuilder.DropTable(
                name: "INVOICE_ITEMS");

            migrationBuilder.DropTable(
                name: "PRODUCT_DETAILS");

            migrationBuilder.DropTable(
                name: "PRODUCT_PROMOTIONS");

            migrationBuilder.DropTable(
                name: "SHOP_LOGOS");

            migrationBuilder.DropTable(
                name: "USER_BANKINGS");

            migrationBuilder.DropTable(
                name: "USER_DETAILS");

            migrationBuilder.DropTable(
                name: "USER_EXTERNAL_LOGINS");

            migrationBuilder.DropTable(
                name: "USER_SAVED_COUPONS");

            migrationBuilder.DropTable(
                name: "GOODS_ISSUES");

            migrationBuilder.DropTable(
                name: "GOODS_RECEIPT_BATCHES");

            migrationBuilder.DropTable(
                name: "VARIANTS");

            migrationBuilder.DropTable(
                name: "INVOICES");

            migrationBuilder.DropTable(
                name: "PROMOTIONS");

            migrationBuilder.DropTable(
                name: "COUPONS");

            migrationBuilder.DropTable(
                name: "GOODS_RECEIPTS");

            migrationBuilder.DropTable(
                name: "PRODUCTS");

            migrationBuilder.DropTable(
                name: "SUPPLIERS");

            migrationBuilder.DropTable(
                name: "CATEGORIES");

            migrationBuilder.DropTable(
                name: "SHOPS");

            migrationBuilder.DropTable(
                name: "USERS");

            migrationBuilder.DropTable(
                name: "ROLES");
        }
    }
}
