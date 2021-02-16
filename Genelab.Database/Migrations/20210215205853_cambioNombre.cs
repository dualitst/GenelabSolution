using Microsoft.EntityFrameworkCore.Migrations;

namespace Genelab.Database.Migrations
{
    public partial class cambioNombre : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Parentezco",
                table: "ServicioDetalle",
                newName: "Parentesco");

            migrationBuilder.AlterColumn<string>(
                name: "Parentesco",
                table: "ServicioDetalle",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldMaxLength: 50);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Parentesco",
                table: "ServicioDetalle",
                newName: "Parentezco");

            migrationBuilder.AlterColumn<string>(
                name: "Parentezco",
                table: "ServicioDetalle",
                type: "varchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldMaxLength: 50,
                oldNullable: true);
        }
    }
}
