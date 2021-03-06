using Genelab.UI.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Reflection;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Genelab.UI.Controllers
{
    
    public class Account : Controller
    {
        private readonly IConfiguration _configuration;
        public Account(IConfiguration configuration)
        {
            _configuration = configuration;

        }

        private void AddErrors(string error)
        {
           ModelState.AddModelError("", error);
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Login()
        {
            return View();
        }

        public IActionResult Register()
        {
            return View();
        }

        public IActionResult RegisterAdmin()
        {
            return View();
        }

        public IActionResult EditAdmin()
        {
            return View();
        }

        public IActionResult Search()
        {
            return View();
        }
        public IActionResult ResetPassword()
        {
            return View();
        }
        public IActionResult ResetPasswordConfirmation()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Register(RegisterViewModel model)
        {
            string error = string.Empty;
            string Baseurl = _configuration.GetValue<string>("UrlLogin") + "/account/register";
            CancellationToken cancellationToken;

            using (var client = new HttpClient())
            using (var request = new HttpRequestMessage(HttpMethod.Post, Baseurl))
            {
                var json = JsonConvert.SerializeObject(model);
                using (var stringContent = new StringContent(json, Encoding.UTF8, "application/json"))
                {
                    request.Content = stringContent;

                    using (var response = await client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead, cancellationToken).ConfigureAwait(false))
                    {
                        if (response.IsSuccessStatusCode)
                        {
                            string product = await response.Content.ReadAsStringAsync();

                            RespuestaAPI contenResponse = JsonConvert.DeserializeObject<RespuestaAPI>(product);

                            if (contenResponse.MessageType == 0)
                            {
                                response.EnsureSuccessStatusCode();
                                //return RedirectToAction("Index", "Home");

                                AddErrors("Se ha creado correctamente su cuenta");

                            }
                            else
                                AddErrors("Error al crear la cuenta");
                        }
                        else
                        {
                            AddErrors("Error al crear la cuenta");
                        }
                    }
                }
            }

            // Si llegamos a este punto, es que se ha producido un error y volvemos a mostrar el formulario
            return View(model);
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> RegisterAdmin(RegisterViewModel model)
        {
            string error = string.Empty;
            string Baseurl = _configuration.GetValue<string>("UrlLogin") + "/account/register";
            CancellationToken cancellationToken;

            using (var client = new HttpClient())
            using (var request = new HttpRequestMessage(HttpMethod.Post, Baseurl))
            {
                var json = JsonConvert.SerializeObject(model);
                using (var stringContent = new StringContent(json, Encoding.UTF8, "application/json"))
                {
                    request.Content = stringContent;

                    using (var response = await client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead, cancellationToken).ConfigureAwait(false))
                    {
                        if (response.IsSuccessStatusCode)
                        {
                            string product = await response.Content.ReadAsStringAsync();

                            RespuestaAPI contenResponse = JsonConvert.DeserializeObject<RespuestaAPI>(product);

                            if (contenResponse.MessageType == 0)
                            {
                                response.EnsureSuccessStatusCode();
                                //return RedirectToAction("Index", "Home");

                                AddErrors("Se ha creado correctamente su cuenta");

                            }
                            else
                                AddErrors("Error al crear la cuenta");
                        }
                        else
                        {
                            AddErrors("Error al crear la cuenta");
                        }
                    }
                }
            }

            // Si llegamos a este punto, es que se ha producido un error y volvemos a mostrar el formulario
            return View(model);
        }


        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> EditAdmin(UpdateViewModel model)
        {
            string error = string.Empty;
            string Baseurl = _configuration.GetValue<string>("UrlLogin") + "/account/Update";
            CancellationToken cancellationToken;

            using (var client = new HttpClient())
            using (var request = new HttpRequestMessage(HttpMethod.Post, Baseurl))
            {
                var json = JsonConvert.SerializeObject(model);
                using (var stringContent = new StringContent(json, Encoding.UTF8, "application/json"))
                {
                    request.Content = stringContent;

                    using (var response = await client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead, cancellationToken).ConfigureAwait(false))
                    {
                        if (response.IsSuccessStatusCode)
                        {
                            string product = await response.Content.ReadAsStringAsync();

                            RespuestaAPI contenResponse = JsonConvert.DeserializeObject<RespuestaAPI>(product);

                            if (contenResponse.MessageType == 0)
                            {
                                response.EnsureSuccessStatusCode();
                                AddErrors("Se ha actualizado correctamente su cuenta");

                            }
                            else
                                AddErrors("Error al crear la cuenta");
                        }
                        else
                        {
                            AddErrors("Error al crear la cuenta");
                        }
                    }
                }
            }

            // Si llegamos a este punto, es que se ha producido un error y volvemos a mostrar el formulario
            return View(model);
        }


        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            string error = string.Empty;
            string Baseurl = _configuration.GetValue<string>("UrlLogin") + "/account/ResetPassword";
            CancellationToken cancellationToken;
            RespuestaAPI contenResponse = new RespuestaAPI();

            using (var client = new HttpClient())
            using (var request = new HttpRequestMessage(HttpMethod.Post, Baseurl))
            {
                var json = JsonConvert.SerializeObject(model);
                using (var stringContent = new StringContent(json, Encoding.UTF8, "application/json"))
                {
                    request.Content = stringContent;

                    using (var response = await client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead, cancellationToken).ConfigureAwait(false))
                    {
                        if (response.IsSuccessStatusCode)
                        {
                            string product = await response.Content.ReadAsStringAsync();

                             contenResponse = JsonConvert.DeserializeObject<RespuestaAPI>(product);

                            if (contenResponse.MessageType == 0)
                            {
                                response.EnsureSuccessStatusCode();
                                return RedirectToAction("ResetPasswordConfirmation", "Account");

                            }
                            else
                                AddErrors(contenResponse.ErrorMessage);
                        }
                        else
                        {
                            AddErrors(contenResponse.ErrorMessage);
                        }
                    }
                }
            }

            // Si llegamos a este punto, es que se ha producido un error y volvemos a mostrar el formulario
            return View(model);
        }


        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Login(LoginViewModel model)
        {
            string error = string.Empty;
            var Baseurl = _configuration.GetValue<string>("UrlLogin")+"/account/login";
            CancellationToken cancellationToken;
            string roleUsuario = string.Empty;

            using (var client = new HttpClient())

            using (var request = new HttpRequestMessage(HttpMethod.Post, Baseurl))
            {
                var json = JsonConvert.SerializeObject(model);
                using (var stringContent = new StringContent(json, Encoding.UTF8, "application/json"))
                {
                    request.Content = stringContent;

                    using (var response = await client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead, cancellationToken).ConfigureAwait(false))
                    {
                        if (response.IsSuccessStatusCode)
                        {
                            string product = await response.Content.ReadAsStringAsync();

                            RespuestaAPI contenResponse = JsonConvert.DeserializeObject<RespuestaAPI>(product);

                            if (contenResponse.MessageType == 0)
                            {
                                response.EnsureSuccessStatusCode();

                                //OBTENIENDO TOKEN DESDE API
                                string tokenObject = JsonConvert.SerializeObject(contenResponse.Data);
                                TokenModel token = JsonConvert.DeserializeObject<TokenModel>(tokenObject);

                                //User.Claims.Where(x => x.Type == ClaimTypes.Email).FirstOrDefault();
                                var _roles = token.claims.Where(x => x.type == "role").ToList();

                                var userClaims = new List<Claim>()
                                {
                                new Claim(ClaimTypes.Name, model.Email),
                                new Claim(ClaimTypes.Email, model.Email),
                                new Claim(ClaimTypes.Authentication, token.rawData),
                                 };

                                foreach (var _rol in _roles)
                                {
                                    Claim claimN = new Claim(ClaimTypes.Role, _rol.value);
                                    userClaims.Add(claimN);
                                }

                               

                                var authProperties = new AuthenticationProperties
                                {
                                    IsPersistent = true,
                                    ExpiresUtc= DateTime.Now.AddDays(1)
                                };

                                authProperties.ExpiresUtc = DateTime.Now.AddDays(1);

                                var grandmaIdentity = new ClaimsIdentity(userClaims, "User Identity");

                                var userPrincipal = new ClaimsPrincipal(new[] { grandmaIdentity });
                                await HttpContext.SignInAsync(userPrincipal, authProperties);


                                //REDIRECCIONAR DEPENDIENDO DE ROL POR AHORA?
                                var _role =token.claims.Where(x => x.type == "role").FirstOrDefault();

                                if (_role != null)
                                {
                                    if(_role.value=="Admin" || 
                                        _role.value == "Caja" ||
                                        _role.value == "Resultados" ||
                                        _role.value == "Muestras" ||
                                        _role.value == "Facturacion" ||
                                        _role.value == "Recepcion" ||
                                        _role.value == "Muestras")
                                        return RedirectToAction("Index", "Home");
                                    else
                                        return RedirectToAction("IndexPublic", "Home");
                                }

                            }
                            else
                            {
                                AddErrors("Error, valide sus datos de inicio");
                                return View();
                            }
                        }
                        else
                        {
                            AddErrors("Error, valide sus datos de inicio");
                            return View();
                        }
                    }
                }
            }

            return View();
        }

        // POST: /Account/LogOff
        public async Task<ActionResult> LogOff()
        {
            //await _signInManager.SignOutAsync();
            await HttpContext.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }
    }
}
