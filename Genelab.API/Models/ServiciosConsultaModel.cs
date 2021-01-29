using Genelab.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Genelab.API.Models
{
    public class ServiciosConsultaModel : ServicioDetalle
    {
        public int ServicioId { get; set; }
        public int EstudioId { get; set; }
        public int EstatusId { get; set; }
        public string UsuarioId { get; set; }
        public int TipoServicioId { get; set; }
        public string FolioPago { get; set; }
        public string EstudioNombre { get; set; }
        public string EstatusNombre { get; set; }
        public DateTime FechaHoraCreacion { get; set; }
        public DateTime FechaHoraModificacion { get; set; }
        public string UsuarioCreacion { get; set; }
        public string UsuarioModificacion { get; set; }
        public int ServicioDetalleID { get; set; }
        public string LinkFactura { get; set; }
    }
}
