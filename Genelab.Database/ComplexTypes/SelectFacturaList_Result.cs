using System;
using System.Collections.Generic;
using System.Text;

namespace Genelab.Database.ComplexTypes
{
    public class SelectFacturaList_Result
    {
        public int Id { get; set; }
        public string NombreTitular { get; set; }
        public string NombrePaciente { get; set; }
        public int EstatusProcesoId { get; set; }
        public int EstatusPagoId { get; set; }
        public int EstatusFacturaId { get; set; }
        public int EstatusResultadoId { get; set; }
        public string UsuarioId { get; set; }
        public int TipoServicioId { get; set; }
        public string FolioPago { get; set; }
        public string EstudioNombre { get; set; }
        public string EstatusProcesoNombre { get; set; }
        public string EstatusPagoNombre { get; set; }
        public string EstatusResultadoNombre { get; set; }
        public string EstatusFacturaNombre { get; set; }
        public string FechaHoraCreacion { get; set; }
        public string FechaHoraModificacion { get; set; }
        public string UsuarioCreacion { get; set; }
        public string UsuarioModificacion { get; set; }
        public int ServicioDetalleID { get; set; }
        public string LinkFactura { get; set; }
        public string CodigoPostal { get; set; }
        public string Colonia { get; set; }
        public string Delegacion { get; set; }
        public string Estado { get; set; }
        public DateTime? AnioNacimiento { get; set; }
        public string Resultado { get; set; }
        public string Ct { get; set; }
        public int EstudioId { get; set; }
    }
}
