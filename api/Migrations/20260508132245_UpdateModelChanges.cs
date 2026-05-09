using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateModelChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_addresses_users_user_id",
                table: "addresses");

            migrationBuilder.DropForeignKey(
                name: "fk_user_details_users_user_id",
                table: "user_details");

            migrationBuilder.DropForeignKey(
                name: "fk_user_external_logins_users_id",
                table: "user_external_logins");

            migrationBuilder.DropForeignKey(
                name: "fk_users_roles_role_id",
                table: "users");

            migrationBuilder.DropPrimaryKey(
                name: "pk_users",
                table: "users");

            migrationBuilder.DropPrimaryKey(
                name: "pk_user_external_logins",
                table: "user_external_logins");

            migrationBuilder.DropPrimaryKey(
                name: "pk_user_details",
                table: "user_details");

            migrationBuilder.DropPrimaryKey(
                name: "pk_roles",
                table: "roles");

            migrationBuilder.DropPrimaryKey(
                name: "pk_products",
                table: "products");

            migrationBuilder.DropPrimaryKey(
                name: "pk_addresses",
                table: "addresses");

            migrationBuilder.RenameTable(
                name: "roles",
                newName: "Roles");

            migrationBuilder.RenameTable(
                name: "products",
                newName: "Products");

            migrationBuilder.RenameColumn(
                name: "phone",
                table: "users",
                newName: "Phone");

            migrationBuilder.RenameColumn(
                name: "email",
                table: "users",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "users",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "update_at",
                table: "users",
                newName: "UpdateAt");

            migrationBuilder.RenameColumn(
                name: "role_id",
                table: "users",
                newName: "RoleId");

            migrationBuilder.RenameColumn(
                name: "password_hash",
                table: "users",
                newName: "PasswordHash");

            migrationBuilder.RenameColumn(
                name: "full_name",
                table: "users",
                newName: "FullName");

            migrationBuilder.RenameColumn(
                name: "delete_at",
                table: "users",
                newName: "DeleteAt");

            migrationBuilder.RenameColumn(
                name: "create_at",
                table: "users",
                newName: "CreateAt");

            migrationBuilder.RenameIndex(
                name: "ix_users_role_id",
                table: "users",
                newName: "IX_users_RoleId");

            migrationBuilder.RenameColumn(
                name: "provider",
                table: "user_external_logins",
                newName: "Provider");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "user_external_logins",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "provider_key",
                table: "user_external_logins",
                newName: "ProviderKey");

            migrationBuilder.RenameIndex(
                name: "ix_user_external_logins_provider_id",
                table: "user_external_logins",
                newName: "IX_user_external_logins_Provider_Id");

            migrationBuilder.RenameColumn(
                name: "lock_time_start",
                table: "user_details",
                newName: "LockTimeStart");

            migrationBuilder.RenameColumn(
                name: "lock_time_end",
                table: "user_details",
                newName: "LockTimeEnd");

            migrationBuilder.RenameColumn(
                name: "avatar_url",
                table: "user_details",
                newName: "AvatarUrl");

            migrationBuilder.RenameColumn(
                name: "address_id",
                table: "user_details",
                newName: "AddressId");

            migrationBuilder.RenameColumn(
                name: "user_id",
                table: "user_details",
                newName: "UserId");

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

            migrationBuilder.RenameColumn(
                name: "price",
                table: "Products",
                newName: "Price");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Products",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Products",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "created_at",
                table: "Products",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "user_id",
                table: "addresses",
                newName: "User_id");

            migrationBuilder.RenameColumn(
                name: "is_used",
                table: "addresses",
                newName: "Is_used");

            migrationBuilder.RenameColumn(
                name: "create_at",
                table: "addresses",
                newName: "Create_at");

            migrationBuilder.RenameColumn(
                name: "address_url",
                table: "addresses",
                newName: "Address_url");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "addresses",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "ix_addresses_user_id",
                table: "addresses",
                newName: "IX_addresses_User_id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_users",
                table: "users",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_user_external_logins",
                table: "user_external_logins",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_user_details",
                table: "user_details",
                column: "UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Roles",
                table: "Roles",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Products",
                table: "Products",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_addresses",
                table: "addresses",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_addresses_users_User_id",
                table: "addresses",
                column: "User_id",
                principalTable: "users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_user_details_users_UserId",
                table: "user_details",
                column: "UserId",
                principalTable: "users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_user_external_logins_users_Id",
                table: "user_external_logins",
                column: "Id",
                principalTable: "users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_users_Roles_RoleId",
                table: "users",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_addresses_users_User_id",
                table: "addresses");

            migrationBuilder.DropForeignKey(
                name: "FK_user_details_users_UserId",
                table: "user_details");

            migrationBuilder.DropForeignKey(
                name: "FK_user_external_logins_users_Id",
                table: "user_external_logins");

            migrationBuilder.DropForeignKey(
                name: "FK_users_Roles_RoleId",
                table: "users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_users",
                table: "users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_user_external_logins",
                table: "user_external_logins");

            migrationBuilder.DropPrimaryKey(
                name: "PK_user_details",
                table: "user_details");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Roles",
                table: "Roles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Products",
                table: "Products");

            migrationBuilder.DropPrimaryKey(
                name: "PK_addresses",
                table: "addresses");

            migrationBuilder.RenameTable(
                name: "Roles",
                newName: "roles");

            migrationBuilder.RenameTable(
                name: "Products",
                newName: "products");

            migrationBuilder.RenameColumn(
                name: "Phone",
                table: "users",
                newName: "phone");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "users",
                newName: "email");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "users",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "UpdateAt",
                table: "users",
                newName: "update_at");

            migrationBuilder.RenameColumn(
                name: "RoleId",
                table: "users",
                newName: "role_id");

            migrationBuilder.RenameColumn(
                name: "PasswordHash",
                table: "users",
                newName: "password_hash");

            migrationBuilder.RenameColumn(
                name: "FullName",
                table: "users",
                newName: "full_name");

            migrationBuilder.RenameColumn(
                name: "DeleteAt",
                table: "users",
                newName: "delete_at");

            migrationBuilder.RenameColumn(
                name: "CreateAt",
                table: "users",
                newName: "create_at");

            migrationBuilder.RenameIndex(
                name: "IX_users_RoleId",
                table: "users",
                newName: "ix_users_role_id");

            migrationBuilder.RenameColumn(
                name: "Provider",
                table: "user_external_logins",
                newName: "provider");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "user_external_logins",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "ProviderKey",
                table: "user_external_logins",
                newName: "provider_key");

            migrationBuilder.RenameIndex(
                name: "IX_user_external_logins_Provider_Id",
                table: "user_external_logins",
                newName: "ix_user_external_logins_provider_id");

            migrationBuilder.RenameColumn(
                name: "LockTimeStart",
                table: "user_details",
                newName: "lock_time_start");

            migrationBuilder.RenameColumn(
                name: "LockTimeEnd",
                table: "user_details",
                newName: "lock_time_end");

            migrationBuilder.RenameColumn(
                name: "AvatarUrl",
                table: "user_details",
                newName: "avatar_url");

            migrationBuilder.RenameColumn(
                name: "AddressId",
                table: "user_details",
                newName: "address_id");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "user_details",
                newName: "user_id");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "roles",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "roles",
                newName: "description");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "roles",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "products",
                newName: "price");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "products",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "products",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "products",
                newName: "created_at");

            migrationBuilder.RenameColumn(
                name: "User_id",
                table: "addresses",
                newName: "user_id");

            migrationBuilder.RenameColumn(
                name: "Is_used",
                table: "addresses",
                newName: "is_used");

            migrationBuilder.RenameColumn(
                name: "Create_at",
                table: "addresses",
                newName: "create_at");

            migrationBuilder.RenameColumn(
                name: "Address_url",
                table: "addresses",
                newName: "address_url");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "addresses",
                newName: "id");

            migrationBuilder.RenameIndex(
                name: "IX_addresses_User_id",
                table: "addresses",
                newName: "ix_addresses_user_id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_users",
                table: "users",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_user_external_logins",
                table: "user_external_logins",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_user_details",
                table: "user_details",
                column: "user_id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_roles",
                table: "roles",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_products",
                table: "products",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_addresses",
                table: "addresses",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_addresses_users_user_id",
                table: "addresses",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_user_details_users_user_id",
                table: "user_details",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_user_external_logins_users_id",
                table: "user_external_logins",
                column: "id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_users_roles_role_id",
                table: "users",
                column: "role_id",
                principalTable: "roles",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
