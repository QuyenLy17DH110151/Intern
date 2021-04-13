using Microsoft.EntityFrameworkCore.Migrations;

namespace eCommerce.Persistence.Migrations
{
    public partial class addmailbuyer1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BuyerEmail",
                table: "Order",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BuyerEmail",
                table: "Order");
        }
    }
}
