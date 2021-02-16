using Genelab.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Genelab.API.Models
{
    public class SolicitudConsultaModel 
    {
        public int Id { get; set; }
        public int EstatusProcesoId { get; set; }
        public int EstatusPagoId { get; set; }

        public string UsuarioIdPrepago { get; set; }
        public DateTime? FechaHoraPrepago { get; set; }

        public string FechaHoraVisitaDom { get; set; }
        public string UsuarioIdPago { get; set; }
        public DateTime? FechaHoraPago { get; set; }
        public int EstatusFacturaId { get; set; }
        public string UsuarioIdFactura { get; set; }
        public DateTime? FechaHoraFactura { get; set; }
        public int TipoServicioId { get; set; }
        public string FolioPago { get; set; }
        public DateTime FechaHoraCreacion { get; set; }
        public DateTime FechaHoraModificacion { get; set; }
        public string UsuarioCreacion { get; set; }
        public string UsuarioModificacion { get; set; }
        public string Calle { get; set; }
        public string CodigoPostal { get; set; }
        public string Colonia { get; set; }
        public string Delegacion { get; set; }
        public string Estado { get; set; }
        public string Pais { get; set; }
        public string Telefono { get; set; }
        public List<DetalleConsultaModel> Pacientes { get; set; }

        public bool IsFacturacion { get; set; }
        public FacturacionConsultaModel DatosFacturacion { get; set; }

    }
    public class DetalleConsultaModel 
    { 
        public string EstudioNombre { get; set; }
        public int Id { get; set; }
        public string NombrePaciente { get; set; }
        public string ApellidoPPaciente { get; set; }
        public string ApellidoMPaciente { get; set; }
        public string NombreTitular { get; set; }
        public string Parentezco { get; set; }
        public string Resultado { get; set; }
        public int EstatusResultadoId { get; set; }
        public string UsuarioIdResultado { get; set; }
        public DateTime? FechaHoraResultado { get; set; }
        public int EstatusMuestraId { get; set; }
        public string UsuarioMuestraId { get; set; }
        public DateTime? FechaHoraMuestra { get; set; }
        public string Ct { get; set; }
        public int EstudioId { get; set; }
        public int ServicioId { get; set; }
        public string UsuarioServicio { get; set; }
        public  string  AnioNacimiento { get; set; }
        public int Precio { get; set; }
    }

    public class FacturacionConsultaModel : DatosFacturacion
    {
    }
}
