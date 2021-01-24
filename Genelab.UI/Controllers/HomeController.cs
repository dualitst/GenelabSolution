using Genelab.UI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Genelab.UI.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {

            var claimToken = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Authentication);
            
            if(claimToken!=null)
                ViewBag.tkn = claimToken.Value;

            return View();
        }

        public IActionResult IndexPublic()
        {

            var claimToken = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Authentication);

            if (claimToken != null)
                ViewBag.tkn = claimToken.Value;

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
