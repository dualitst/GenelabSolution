using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Genelab.API.Models
{
    public class RequestModel
    {
        public string Nombre { get; set; }
        public string ApellidoPaterno { get; set; }
        public string ApellidoMaterno { get; set; }
        public string Titular { get; set; }
        public string Parentesco { get; set; }
        public string Estudio { get; set; }
        public string CP { get; set; }
        public string Delegacion { get; set; }
        public string Colonia { get; set; }
        public string Calle { get; set; }
        public string EmpresaFiscal { get; set; }
        public string EmpresaFiscalCP { get; set; }
        public string EmpresaFiscalDelegacion { get; set; }
        public string EmpresaFiscalColonia { get; set; }
        public string EmpresaFiscalCalle { get; set; }

    }
}
