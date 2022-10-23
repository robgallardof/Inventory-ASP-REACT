using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DovaPackAPI.Migrations
{
    public partial class fix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InWarehouse",
                table: "PackageBox");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "InWarehouse",
                table: "PackageBox",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
