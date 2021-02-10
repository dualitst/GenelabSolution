using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Genelab.API.Models
{
    public class DetailRequest
    {
        public string NombrePaciente { get; set; }
        public string ApellidoPPaciente { get; set; }
        public string ApellidoMPaciente { get; set; }
        public string NombreTitular { get; set; }
        public string Parentezco { get; set; }
        public string Edad { get; set; }
        public string AnioNacimiento { get; set; }
        public string EstudioId { get; set; }
    }
    public class RequestModel
    {
        public int Id { get; set; }

        public string Calle { get; set; }
        public string CodigoPostal { get; set; }
        public string Colonia { get; set; }
        public string Delegacion { get; set; }
        public string Telefono { get; set; }

        public string TipoServicioId { get; set; }
        public string FolioPago { get; set; }
        public bool isFacturacion { get; set; }
        public bool EnDomicilio { get; set; }

        public string FechaHoraVisita { get; set; }


        //DATOS FACTURACION
        public string TipoPersona { get; set; }
        public string EmpresaFiscalCP { get; set; }
        public string EmpresaFiscalDelegacion { get; set; }
        public string EmpresaFiscalColonia { get; set; }
        public string EmpresaFiscalCalle { get; set; }
        public string EmpresaFiscal { get; set; }
        public string RfcF { get; set; }
        public string EmailF { get; set; }
        public string TelF { get; set; }
        public List<DetailRequest> Pacientes { get; set; }

    }

    public class RequestPrepagoModel
    {
        public string IdSolicitud { get; set; }
     
    }

    public class RequestResultFileModel
    {
        public string IdSolicitud { get; set; }
        public string Comentarios { get; set; }
        public string Ct { get; set; }
        public string Resultado { get; set; }
        public IFormFile ComprobanteP { get; set; }
    }

    public class RequestFacturaFileModel
    {
        public string IdSolicitud { get; set; }
        public string Comentarios { get; set; }
        public IFormFile ComprobanteP { get; set; }
    }
    public class RequestPagoModel
    {
      
    }

    public class RequestPagoFileModel
    {
        public string IdSolicitud { get; set; }
        public string TipoPago { get; set; }
        public IFormFile ComprobanteP { get; set; }
    }
}
