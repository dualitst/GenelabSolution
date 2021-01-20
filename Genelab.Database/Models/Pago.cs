using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Genelab.Database.Models
{
    public class Pago
    {
        
        public  int Id { get; set; }
        public  string TipoPago { get; set; }
        public  string Tarjeta { get; set; }
        public  float Monto { get; set; }
        public  string ImagenId { get; set; }
    }
}
