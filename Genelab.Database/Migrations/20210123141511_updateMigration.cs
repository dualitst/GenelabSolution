using Microsoft.EntityFrameworkCore.Migrations;

namespace Genelab.Database.Migrations
{
    public partial class updateMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DelegacionId",
                table: "DatosFacturacion");

            migrationBuilder.AlterColumn<string>(
                name: "UsuarioId",
                table: "Servicio",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AddColumn<string>(
                name: "Delegacion",
                table: "DatosFacturacion",
                type: "varchar(150)",
                maxLength: 150,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Delegacion",
                table: "DatosFacturacion");

            migrationBuilder.AlterColumn<string>(
                name: "UsuarioId",
                table: "Servicio",
                type: "varchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(256)",
                oldMaxLength: 256);

            migrationBuilder.AddColumn<int>(
                name: "DelegacionId",
                table: "DatosFacturacion",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
