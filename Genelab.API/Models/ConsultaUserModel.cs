using Genelab.Database.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Genelab.API.Models
{
    public class ConsultaUserModel
    {
        public string IdUsuario { get; set; }
    }

    public class InfoUserModel: ApplicationUser
    {
        public string IdRol { get; set; }
    }
}
