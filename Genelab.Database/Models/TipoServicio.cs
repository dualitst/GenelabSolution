using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Genelab.Database.Models
{
    public class TipoServicio
    {
        
        public  int Id { get; set; }
        public  string Nombre { get; set; }
        public  bool Activo { get; set; }
    }
}
