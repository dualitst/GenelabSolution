using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Genelab.Database.Models
{
    public class ServicioDatosFacturacion
    {
        
        public  int Id { get; set; }
        public  int ServicioId { get; set; }
        public  int DatosFacturacionId { get; set; }
    }



}
