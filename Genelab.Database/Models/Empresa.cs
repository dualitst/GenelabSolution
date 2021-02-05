using System;
using System.Collections.Generic;
using System.Text;

namespace Genelab.Database.Models
{
    public class Empresa
    {
        public int Id { get; set; }
        public string EmpresaFiscal { get; set; }
        public string CodigoPostal { get; set; }
        public string Delegacion { get; set; }
        public string Colonia { get; set; }
        public string RfcF { get; set; }
        public string EmailF { get; set; }
        public string TelF { get; set; }
        public string Calle { get; set; }
    }
}
