using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Genelab.API.Models
{
    public class RequestModel
    {
        public int Id { get; set; }
        public string NombrePaciente { get; set; }
        public string ApellidoPPaciente { get; set; }
        public string ApellidoMPaciente { get; set; }
        public string NombreTitular { get; set; }
        public string Parentezco { get; set; }
        public string Edad { get; set; }
        public string CodigoPostal { get; set; }
        public string Colonia { get; set; }
        public string Delegacion { get; set; }
        public string Estado { get; set; }
        public string Pais { get; set; }
        public int EstudioId { get; set; }
        public int EstatusId { get; set; }
        public string UsuarioId { get; set; }
        public int TipoServicioId { get; set; }
        public string FolioPago { get; set; }
        public DateTime FechaHoraCreacion { get; set; }
        public DateTime FechaHoraModificacion { get; set; }
        public string UsuarioCreacion { get; set; }
        public string UsuarioModificacion { get; set; }
        public int ServicioDetalleID { get; set; }

    }
}
