using Microsoft.EntityFrameworkCore.Migrations;

namespace Genelab.Database.Migrations
{
    public partial class fechahora2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FechaHoraVisita",
                table: "Servicio",
                newName: "FechaHoraDomicilio");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FechaHoraDomicilio",
                table: "Servicio",
                newName: "FechaHoraVisita");
        }
    }
}
