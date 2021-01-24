using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Genelab.UI.Controllers
{
    [Authorize]
    public class BandFacturacionController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
