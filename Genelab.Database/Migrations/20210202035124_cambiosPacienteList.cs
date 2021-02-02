using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Genelab.Database.Migrations
{
    public partial class cambiosPacienteList : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CodigoPostal",
                table: "ServicioDetalle");

            migrationBuilder.DropColumn(
                name: "Colonia",
                table: "ServicioDetalle");

            migrationBuilder.DropColumn(
                name: "Delegacion",
                table: "ServicioDetalle");

            migrationBuilder.DropColumn(
                name: "Estado",
                table: "ServicioDetalle");

            migrationBuilder.DropColumn(
                name: "Pais",
                table: "ServicioDetalle");

            migrationBuilder.DropColumn(
                name: "AnioNacimiento",
                table: "Servicio");

            migrationBuilder.DropColumn(
                name: "EstudioId",
                table: "Servicio");

            migrationBuilder.DropColumn(
                name: "ServicioDetalleID",
                table: "Servicio");

            migrationBuilder.AddColumn<DateTime>(
                name: "AnioNacimiento",
                table: "ServicioDetalle",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "EstudioId",
                table: "ServicioDetalle",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ServicioId",
                table: "ServicioDetalle",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "CodigoPostal",
                table: "Servicio",
                type: "varchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Colonia",
                table: "Servicio",
                type: "varchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Delegacion",
                table: "Servicio",
                type: "varchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Estado",
                table: "Servicio",
                type: "varchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Pais",
                table: "Servicio",
                type: "varchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AnioNacimiento",
                table: "ServicioDetalle");

            migrationBuilder.DropColumn(
                name: "EstudioId",
                table: "ServicioDetalle");

            migrationBuilder.DropColumn(
                name: "ServicioId",
                table: "ServicioDetalle");

            migrationBuilder.DropColumn(
                name: "CodigoPostal",
                table: "Servicio");

            migrationBuilder.DropColumn(
                name: "Colonia",
                table: "Servicio");

            migrationBuilder.DropColumn(
                name: "Delegacion",
                table: "Servicio");

            migrationBuilder.DropColumn(
                name: "Estado",
                table: "Servicio");

            migrationBuilder.DropColumn(
                name: "Pais",
                table: "Servicio");

            migrationBuilder.AddColumn<string>(
                name: "CodigoPostal",
                table: "ServicioDetalle",
                type: "varchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Colonia",
                table: "ServicioDetalle",
                type: "varchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Delegacion",
                table: "ServicioDetalle",
                type: "varchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Estado",
                table: "ServicioDetalle",
                type: "varchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Pais",
                table: "ServicioDetalle",
                type: "varchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "AnioNacimiento",
                table: "Servicio",
                type: "datetime",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "EstudioId",
                table: "Servicio",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ServicioDetalleID",
                table: "Servicio",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
