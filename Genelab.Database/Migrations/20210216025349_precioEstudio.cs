using Microsoft.EntityFrameworkCore.Migrations;

namespace Genelab.Database.Migrations
{
    public partial class precioEstudio : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Precio",
                table: "Estudio",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Precio",
                table: "Estudio");
        }
    }
}
