using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Genelab.API.Models
{
    public class UserModel :IdentityUser
    {
   
        public string Rol { get; set; }
        public string Activo { get; set; }
    }
}
