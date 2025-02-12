﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Genelab.UI.Controllers
{
    [Authorize]
    public class RequestController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult IndexAdmin()
        {
            return View();
        }
        public IActionResult EditAdmin()
        {
            return View();
        }

        public IActionResult EditAdminV2()
        {
            return View();
        }
        public IActionResult Detalle()
        {
            return View();
        }
    }
}
