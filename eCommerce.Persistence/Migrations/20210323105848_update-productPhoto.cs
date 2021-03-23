using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace eCommerce.Persistence.Migrations
{
    public partial class updateproductPhoto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Inventory_Product_ProductId",
                table: "Inventory");

            migrationBuilder.DropTable(
                name: "ProductPhotos");

            migrationBuilder.AlterColumn<Guid>(
                name: "ProductId",
                table: "Inventory",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.CreateTable(
                name: "ProductPhoto",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    IdentityKey = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<Guid>(nullable: false),
                    Url = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: false),
                    LastUpdated = table.Column<DateTime>(nullable: true),
                    LastUpdatedBy = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductPhoto", x => x.Id)
                        .Annotation("SqlServer:Clustered", false);
                    table.UniqueConstraint("AK_ProductPhoto_IdentityKey", x => x.IdentityKey)
                        .Annotation("SqlServer:Clustered", true);
                    table.ForeignKey(
                        name: "FK_ProductPhoto_Product_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Product",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProductPhoto_ProductId",
                table: "ProductPhoto",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_Inventory_Product_ProductId",
                table: "Inventory",
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

            migrationBuilder.DropTable(
                name: "ProductPhoto");

            migrationBuilder.AlterColumn<Guid>(
                name: "ProductId",
                table: "Inventory",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "ProductPhotos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IdentityKey = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LastUpdated = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastUpdatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProductId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductPhotos", x => x.Id)
                        .Annotation("SqlServer:Clustered", false);
                    table.UniqueConstraint("AK_ProductPhotos_IdentityKey", x => x.IdentityKey)
                        .Annotation("SqlServer:Clustered", true);
                    table.ForeignKey(
                        name: "FK_ProductPhotos_Product_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Product",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProductPhotos_ProductId",
                table: "ProductPhotos",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_Inventory_Product_ProductId",
                table: "Inventory",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
