using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Genelab.Database.Data
{
    public class ApplicationUser : IdentityUser
    {
        [PersonalData]
        public string Nombre { get; set; }

        [PersonalData]
        public string ApellidoPaterno { get; set; }

        [PersonalData]
        public string ApellidoMaterno { get; set; }
    }
}
