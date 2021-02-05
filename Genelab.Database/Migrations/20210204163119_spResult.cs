using Microsoft.EntityFrameworkCore.Migrations;

namespace Genelab.Database.Migrations
{
    public partial class spResult : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var sql = @"
           CREATE PROCEDURE [dbo].[SelectResultList]
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   SELECT 
S.EstatusProcesoId,
S.EstatusPagoId,
S.EstatusFacturaId,
S.EstatusResultadoId,
S.UsuarioId,
S.TipoServicioId,
S.FolioPago,
E.Nombre EstudioNombre,
EPRO.Nombre EstatusProcesoNombre,
EP.Nombre EstatusPagoNombre,
ER.Nombre EstatusResultadoNombre,
EF.Nombre EstatusFacturaNombre,
CONVERT(varchar, S.FechaHoraCreacion, 103) FechaHoraCreacion,
CONVERT(varchar, S.FechaHoraModificacion, 103) FechaHoraModificacion,
--S.FechaHoraCreacion,
--S.FechaHoraModificacion,
S.UsuarioCreacion,
S.UsuarioModificacion,
SD.Id ServicioDetalleID,
NULL LinkFactura,
S.CodigoPostal,
S.Colonia,
S.Delegacion,
S.Estado,
'PENDIENTE' Resultado

FROM ServicioDetalle SD
INNER JOIN Servicio S ON SD.ServicioId=S.Id
INNER JOIN EstatusFactura EF ON EF.Id=S.EstatusFacturaId
INNER JOIN EstatusPago EP ON EP.Id=S.EstatusPagoId
INNER JOIN EstatusProceso EPRO ON EPRO.Id=S.EstatusProcesoId
INNER JOIN EstatusResultado ER ON ER.Id=S.EstatusResultadoId
INNER JOIN Estudio E ON E.Id=SD.EstudioId
WHERE 
S.EstatusProcesoId=2 
--AND S.EstatusPagoId=2  --COMENTANDO POR CONDICION DE QUE LLEGUEN DIRECTO A RESULTADOS
--AND S.EstatusResultadoId=1
END";

            migrationBuilder.Sql(sql);

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
