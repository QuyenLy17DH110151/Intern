using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace eCommerce.Persistence.Migrations
{
    public partial class addKeyResetPassword : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Inventory_Product_ProductId",
                table: "Inventory");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductPhotos_Product_ProductId",
                table: "ProductPhotos");

            migrationBuilder.AlterColumn<Guid>(
                name: "ProductId",
                table: "ProductPhotos",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "ProductId",
                table: "Inventory",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.CreateTable(
                name: "KeyResetPassword",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    IdentityKey = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KeyParam = table.Column<string>(nullable: true),
                    UserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KeyResetPassword", x => x.Id)
                        .Annotation("SqlServer:Clustered", false);
                    table.UniqueConstraint("AK_KeyResetPassword_IdentityKey", x => x.IdentityKey)
                        .Annotation("SqlServer:Clustered", true);
                    table.ForeignKey(
                        name: "FK_KeyResetPassword_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_KeyResetPassword_UserId",
                table: "KeyResetPassword",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Inventory_Product_ProductId",
                table: "Inventory",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductPhotos_Product_ProductId",
                table: "ProductPhotos",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Inventory_Product_ProductId",
                table: "Inventory");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductPhotos_Product_ProductId",
                table: "ProductPhotos");

            migrationBuilder.DropTable(
                name: "KeyResetPassword");

            migrationBuilder.AlterColumn<Guid>(
                name: "ProductId",
                table: "ProductPhotos",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "ProductId",
                table: "Inventory",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Inventory_Product_ProductId",
                table: "Inventory",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductPhotos_Product_ProductId",
                table: "ProductPhotos",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
