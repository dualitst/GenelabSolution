using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Genelab.Database.Migrations
{
    public partial class addEstatusMuestrav2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EstatusResultadoId",
                table: "Servicio");

            migrationBuilder.DropColumn(
                name: "UsuarioId",
                table: "Servicio");

            migrationBuilder.AddColumn<int>(
                name: "EstatusMuestraId",
                table: "ServicioDetalle",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EstatusResultadoId",
                table: "ServicioDetalle",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "FechaHoraMuestra",
                table: "ServicioDetalle",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "FechaHoraResultado",
                table: "ServicioDetalle",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UsuarioIdResultado",
                table: "ServicioDetalle",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UsuarioMuestraId",
                table: "ServicioDetalle",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "UsuarioModificacion",
                table: "Servicio",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "UsuarioCreacion",
                table: "Servicio",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AddColumn<DateTime>(
                name: "FechaHoraFactura",
                table: "Servicio",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "FechaHoraPago",
                table: "Servicio",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "FechaHoraPrepago",
                table: "Servicio",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "FechaHoraVisita",
                table: "Servicio",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "UsuarioIdFactura",
                table: "Servicio",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UsuarioIdPago",
                table: "Servicio",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UsuarioIdPrepago",
                table: "Servicio",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "UsuarioModificacion",
                table: "Estudio",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "UsuarioCreacion",
                table: "Estudio",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldMaxLength: 50);

         
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EstatusMuestraId",
                table: "ServicioDetalle");

            migrationBuilder.DropColumn(
                name: "EstatusResultadoId",
                table: "ServicioDetalle");

            migrationBuilder.DropColumn(
                name: "FechaHoraMuestra",
                table: "ServicioDetalle");

            migrationBuilder.DropColumn(
                name: "FechaHoraResultado",
                table: "ServicioDetalle");

            migrationBuilder.DropColumn(
                name: "UsuarioIdResultado",
                table: "ServicioDetalle");

            migrationBuilder.DropColumn(
                name: "UsuarioMuestraId",
                table: "ServicioDetalle");

            migrationBuilder.DropColumn(
                name: "FechaHoraFactura",
                table: "Servicio");

            migrationBuilder.DropColumn(
                name: "FechaHoraPago",
                table: "Servicio");

            migrationBuilder.DropColumn(
                name: "FechaHoraPrepago",
                table: "Servicio");

            migrationBuilder.DropColumn(
                name: "FechaHoraVisita",
                table: "Servicio");

            migrationBuilder.DropColumn(
                name: "UsuarioIdFactura",
                table: "Servicio");

            migrationBuilder.DropColumn(
                name: "UsuarioIdPago",
                table: "Servicio");

            migrationBuilder.DropColumn(
                name: "UsuarioIdPrepago",
                table: "Servicio");

            migrationBuilder.AlterColumn<string>(
                name: "UsuarioModificacion",
                table: "Servicio",
                type: "varchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(256)",
                oldMaxLength: 256,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "UsuarioCreacion",
                table: "Servicio",
                type: "varchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(256)",
                oldMaxLength: 256,
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "EstatusResultadoId",
                table: "Servicio",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "UsuarioId",
                table: "Servicio",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "UsuarioModificacion",
                table: "Estudio",
                type: "varchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(256)",
                oldMaxLength: 256);

            migrationBuilder.AlterColumn<string>(
                name: "UsuarioCreacion",
                table: "Estudio",
                type: "varchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(256)",
                oldMaxLength: 256);
        }
    }
}
