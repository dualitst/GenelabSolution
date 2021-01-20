using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Genelab.Database.Models
{
  public  class Estudio
    {
        
        public  int Id { get; set; }
        public  string Nombre { get; set; }
        public  string Descripcion { get; set; }
        public  bool Activo { get; set; }
        public  DateTime FechaHoraCreacion { get; set; }
        public  DateTime FechaHoraModificacion { get; set; }
        public  string UsuarioCreacion { get; set; }
        public  string UsuarioModificacion { get; set; }
    }
}
