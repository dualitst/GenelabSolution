using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Genelab.Database.Models
{
    public class DatosFacturacion
    {
        
        public  int Id { get; set; }
        public  string EmpresaFiscal { get; set; }
        public  string CodigoPostal { get; set; }
        public  int DelegacionId { get; set; }
        public  int Colonia { get; set; }
        public  string Calle { get; set; }
    }
}
