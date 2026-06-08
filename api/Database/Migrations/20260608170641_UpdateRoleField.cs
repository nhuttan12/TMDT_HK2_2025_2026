using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Database.Migrations
{
    /// <inheritdoc />
    public partial class UpdateRoleField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_USERS_Roles_RoleId",
                table: "USERS");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Roles",
                table: "Roles");

            migrationBuilder.RenameTable(
                name: "Roles",
                newName: "ROLES");

            migrationBuilder.RenameColumn(
                name: "RoleId",
                table: "USERS",
                newName: "role_id");

            migrationBuilder.RenameIndex(
                name: "IX_USERS_RoleId",
                table: "USERS",
                newName: "IX_USERS_role_id");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "ROLES",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "ROLES",
                newName: "description");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "ROLES",
                newName: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ROLES",
                table: "ROLES",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_USERS_ROLES_role_id",
                table: "USERS",
                column: "role_id",
                principalTable: "ROLES",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_USERS_ROLES_role_id",
                table: "USERS");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ROLES",
                table: "ROLES");

            migrationBuilder.RenameTable(
                name: "ROLES",
                newName: "Roles");

            migrationBuilder.RenameColumn(
                name: "role_id",
                table: "USERS",
                newName: "RoleId");

            migrationBuilder.RenameIndex(
                name: "IX_USERS_role_id",
                table: "USERS",
                newName: "IX_USERS_RoleId");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Roles",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "Roles",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Roles",
                newName: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Roles",
                table: "Roles",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_USERS_Roles_RoleId",
                table: "USERS",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
