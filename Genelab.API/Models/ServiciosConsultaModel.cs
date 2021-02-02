using Genelab.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Genelab.API.Models
{
    public class ServiciosConsultaModel : ServicioDetalle
    {
        public int EstatusProcesoId { get; set; }
        public int EstatusPagooId { get; set; }
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
        public DateTime FechaHoraCreacion { get; set; }
        public DateTime FechaHoraModificacion { get; set; }
        public string UsuarioCreacion { get; set; }
        public string UsuarioModificacion { get; set; }
        public int ServicioDetalleID { get; set; }
        public string LinkFactura { get; set; }

        public string CodigoPostal { get; set; }

        public string Colonia { get; set; }

        public string Delegacion { get; set; }

        public string Estado { get; set; }

    }
}
