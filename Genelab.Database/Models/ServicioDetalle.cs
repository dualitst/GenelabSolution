using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Genelab.Database.Models
{
    public class ServicioDetalle
    {
        public  int Id { get; set; }
        public  string NombrePaciente { get; set; }
        public  string ApellidoPPaciente { get; set; }
        public  string ApellidoMPaciente { get; set; }
        public  string NombreTitular { get; set; }
        public  string Parentezco { get; set; }     
        public string Resultado { get; set; }
        public string Ct { get; set; }
        public int EstudioId { get; set; }
        public DateTime? AnioNacimiento { get; set; }
        public int ServicioId { get; set; }
    }
}
