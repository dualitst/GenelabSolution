using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Genelab.Database.Migrations
{
    public partial class addEmpresav1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Empresa",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmpresaFiscal = table.Column<string>(type: "varchar(250)", maxLength: 250, nullable: false),
                    CodigoPostal = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    Delegacion = table.Column<string>(type: "varchar(150)", maxLength: 150, nullable: false),
                    Colonia = table.Column<string>(type: "varchar(150)", maxLength: 150, nullable: false),
                    RfcF = table.Column<string>(type: "varchar(250)", maxLength: 250, nullable: false),
                    EmailF = table.Column<string>(type: "varchar(250)", maxLength: 250, nullable: true),
                    TelF = table.Column<string>(type: "varchar(250)", maxLength: 250, nullable: true),
                    Calle = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Empresa", x => x.Id);
                });

         
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Empresa");

        }
    }
}
