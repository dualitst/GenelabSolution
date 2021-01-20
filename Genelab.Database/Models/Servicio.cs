using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Genelab.Database.Models
{
    public class Servicio
    {
        
        public  int Id { get; set; }
        public  int EstudioId { get; set; }
        public  int EstatusId { get; set; }
        public  string UsuarioId { get; set; }
        public  int TipoServicioId { get; set; }
        public  string FolioPago { get; set; }
        public  DateTime FechaHoraCreacion { get; set; }
        public  DateTime FechaHoraModificacion { get; set; }
        public  string UsuarioCreacion { get; set; }
        public  string UsuarioModificacion { get; set; }
        public  int ServicioDetalleID { get; set; }
    }

}
