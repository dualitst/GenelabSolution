using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Genelab.API.Models
{
    public class UserModel
    {
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Correo { get; set; }
        public string Rol { get; set; }
        public string Activo { get; set; }
    }
}
