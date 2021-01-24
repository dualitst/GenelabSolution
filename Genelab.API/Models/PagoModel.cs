using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Genelab.API.Models
{
    public class PagoModel
    {
        public int Id { get; set; }
        public string TipoPago { get; set; }
        public string Tarjeta { get; set; }
        public string Monto { get; set; }
        public string ImagenId { get; set; }
    }
}
