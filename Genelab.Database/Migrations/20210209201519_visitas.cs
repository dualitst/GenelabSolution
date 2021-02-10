using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Genelab.Database.Migrations
{
    public partial class visitas : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FechaHoraDomicilio",
                table: "Servicio",
                newName: "FechaVisita");

            migrationBuilder.AddColumn<DateTime>(
                name: "FechaHoraVisitaDom",
                table: "Servicio",
                type: "datetime",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FechaHoraVisitaDom",
                table: "Servicio");

            migrationBuilder.RenameColumn(
                name: "FechaVisita",
                table: "Servicio",
                newName: "FechaHoraDomicilio");
        }
    }
}
