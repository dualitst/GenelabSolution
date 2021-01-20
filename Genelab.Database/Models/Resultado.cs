using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Genelab.Database.Models
{
    public class Resultado
    {
        
        public  int Id { get; set; }
        public  string Comentarios { get; set; }
        public  string ImagenId { get; set; }
    }
}
