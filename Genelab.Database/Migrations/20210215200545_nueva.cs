using Microsoft.EntityFrameworkCore.Migrations;

namespace Genelab.Database.Migrations
{
    public partial class nueva : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UsuarioServicio",
                table: "ServicioDetalle",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true);

         
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UsuarioServicio",
                table: "ServicioDetalle");

       
           
        }
    }
}
