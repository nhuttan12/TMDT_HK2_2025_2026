using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class FixInvoicePaymentRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_INVOICES_PAYMENTS_PaymentId1",
                table: "INVOICES");

            migrationBuilder.DropIndex(
                name: "IX_INVOICES_PaymentId1",
                table: "INVOICES");

            migrationBuilder.DropColumn(
                name: "PaymentId1",
                table: "INVOICES");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "PaymentId1",
                table: "INVOICES",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_INVOICES_PaymentId1",
                table: "INVOICES",
                column: "PaymentId1");

            migrationBuilder.AddForeignKey(
                name: "FK_INVOICES_PAYMENTS_PaymentId1",
                table: "INVOICES",
                column: "PaymentId1",
                principalTable: "PAYMENTS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
