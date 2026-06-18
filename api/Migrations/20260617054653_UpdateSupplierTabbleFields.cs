using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Database.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSupplierTabbleFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "SUPPLIERS",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "SUPPLIERS",
                newName: "email");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "name",
                table: "SUPPLIERS",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "email",
                table: "SUPPLIERS",
                newName: "Email");
        }
    }
}
