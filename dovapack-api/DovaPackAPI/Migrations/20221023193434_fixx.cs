using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DovaPackAPI.Migrations
{
    public partial class fixx : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "PackageBox");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "PackageBox",
                type: "decimal(5,2)",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
