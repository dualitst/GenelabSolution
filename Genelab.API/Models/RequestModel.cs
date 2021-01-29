﻿using Microsoft.AspNetCore.Http;
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
        public string CodigoPostal { get; set; }
        public string Colonia { get; set; }
        public string Delegacion { get; set; }
        public string EstudioId { get; set; }
        public string TipoServicioId { get; set; }
        public string FolioPago { get; set; }
        public bool isFacturacion { get; set; }
        public bool EnDomicilio { get; set; }
        public string Edad { get; set; }

        //DATOS FACTURACION
        public string EmpresaFiscalCP { get; set; }
        public string EmpresaFiscalDelegacion { get; set; }
        public string EmpresaFiscalColonia { get; set; }
        public string EmpresaFiscalCalle { get; set; }
        public string EmpresaFiscal { get; set; }
        public string RfcF { get; set; }
        public string EmailF { get; set; }
        public string TelF { get; set; }
        
    }

    public class RequestPrepagoModel
    {
        public string IdSolicitud { get; set; }
     
    }

    public class RequestPagoModel
    {
        public string IdSolicitud { get; set; }

    }

    public class RequestPagoFileModel
    {
        public string IdSolicitud { get; set; }
        public string TipoPago { get; set; }
        public IFormFile ComprobanteP { get; set; }
    }
}
