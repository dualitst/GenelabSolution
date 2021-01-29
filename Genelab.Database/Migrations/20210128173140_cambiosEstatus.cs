using Microsoft.EntityFrameworkCore.Migrations;

namespace Genelab.Database.Migrations
{
    public partial class cambiosEstatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Estatus");

            migrationBuilder.RenameColumn(
                name: "EstatusId",
                table: "Servicio",
                newName: "EstatusResultadoId");

            migrationBuilder.AddColumn<int>(
                name: "EstatusFacturaId",
                table: "Servicio",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EstatusPagoId",
                table: "Servicio",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EstatusProcesoId",
                table: "Servicio",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "EstatusFactura",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EstatusFactura", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EstatusPago",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EstatusPago", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EstatusProceso",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EstatusProceso", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EstatusResultado",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EstatusResultado", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EstatusFactura");

            migrationBuilder.DropTable(
                name: "EstatusPago");

            migrationBuilder.DropTable(
                name: "EstatusProceso");

            migrationBuilder.DropTable(
                name: "EstatusResultado");

            migrationBuilder.DropColumn(
                name: "EstatusFacturaId",
                table: "Servicio");

            migrationBuilder.DropColumn(
                name: "EstatusPagoId",
                table: "Servicio");

            migrationBuilder.DropColumn(
                name: "EstatusProcesoId",
                table: "Servicio");

            migrationBuilder.RenameColumn(
                name: "EstatusResultadoId",
                table: "Servicio",
                newName: "EstatusId");

            migrationBuilder.CreateTable(
                name: "Estatus",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Estatus", x => x.Id);
                });
        }
    }
}
