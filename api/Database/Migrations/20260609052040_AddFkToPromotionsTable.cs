using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Database.Migrations
{
    /// <inheritdoc />
    public partial class AddFkToPromotionsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "user_id",
                table: "PROMOTIONS",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_PROMOTIONS_user_id",
                table: "PROMOTIONS",
                column: "user_id");

            migrationBuilder.AddForeignKey(
                name: "FK_PROMOTIONS_USERS_user_id",
                table: "PROMOTIONS",
                column: "user_id",
                principalTable: "USERS",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PROMOTIONS_USERS_user_id",
                table: "PROMOTIONS");

            migrationBuilder.DropIndex(
                name: "IX_PROMOTIONS_user_id",
                table: "PROMOTIONS");

            migrationBuilder.DropColumn(
                name: "user_id",
                table: "PROMOTIONS");
        }
    }
}
