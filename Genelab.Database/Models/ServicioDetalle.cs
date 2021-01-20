using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Genelab.Database.Models
{
    public class ServicioDetalle
    {
        
        public  int ID { get; set; }
        public  string NombrePaciente { get; set; }
        public  string ApellidoPPaciente { get; set; }
        public  string ApellidoMPaciente { get; set; }
        public  string NombreTitular { get; set; }
        public  string Parentezco { get; set; }
        public  string Edad { get; set; }
        public  string CodigoPostal { get; set; }
        public  string Colonia { get; set; }
        public  string Delegacion { get; set; }
        public  string Estado { get; set; }
        public  string Pais { get; set; }
    }
}
