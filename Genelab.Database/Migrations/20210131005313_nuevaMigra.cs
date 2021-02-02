using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Genelab.Database.Migrations
{
    public partial class nuevaMigra : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Edad",
                table: "ServicioDetalle");

            migrationBuilder.AddColumn<DateTime>(
                name: "AnioNacimiento",
                table: "Servicio",
                type: "datetime",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AnioNacimiento",
                table: "Servicio");

            migrationBuilder.AddColumn<string>(
                name: "Edad",
                table: "ServicioDetalle",
                type: "varchar(10)",
                maxLength: 10,
                nullable: false,
                defaultValue: "");
        }
    }
}
