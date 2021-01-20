using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Genelab.UI.Controllers
{
    public class BandResultadosController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
