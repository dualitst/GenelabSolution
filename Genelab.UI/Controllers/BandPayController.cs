﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Genelab.UI.Controllers
{
    public class BandPayController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
