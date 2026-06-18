using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Database.Migrations
{
    /// <inheritdoc />
    public partial class AddUserIdToCouponsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "user_id",
                table: "COUPONS",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_COUPONS_user_id",
                table: "COUPONS",
                column: "user_id");

            migrationBuilder.AddForeignKey(
                name: "FK_COUPONS_USERS_user_id",
                table: "COUPONS",
                column: "user_id",
                principalTable: "USERS",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_COUPONS_USERS_user_id",
                table: "COUPONS");

            migrationBuilder.DropIndex(
                name: "IX_COUPONS_user_id",
                table: "COUPONS");

            migrationBuilder.DropColumn(
                name: "user_id",
                table: "COUPONS");
        }
    }
}
