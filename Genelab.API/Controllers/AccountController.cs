using Genelab.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using static Genelab.API.Models.AccountViewModel;

namespace Genelab.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;

        public AccountController(IConfiguration configuration, UserManager<IdentityUser> userManager,
                              SignInManager<IdentityUser> signInManager)
        {
            _configuration = configuration;
            _userManager = userManager;
            _signInManager = signInManager;
        }


        

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult> login(LoginViewModel model) 
        {


            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user != null)
            {
                var result = await _userManager.CheckPasswordAsync(user, model.Password);

                if (result)
                {
                    // Leemos el secret_key desde nuestro appseting
                    var secretKey = _configuration.GetValue<string>("SecretKey");
                    var key = Encoding.ASCII.GetBytes(secretKey);
                    string role = "User";

                    var isInRole = await _userManager.IsInRoleAsync(user, "Admin");
                    if (isInRole)
                        role = "Admin";

                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()), new Claim("email", user.Email), new Claim("role", role) }),
                        // Nuestro token va a durar un día
                        Expires = DateTime.UtcNow.AddDays(1),
                        // Credenciales para generar el token usando nuestro secretykey y el algoritmo hash 256
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                    };

                    var tokenHandler = new JwtSecurityTokenHandler();
                    var createdToken = tokenHandler.CreateToken(tokenDescriptor);

                    tokenHandler.WriteToken(createdToken);

                    var data = new RespuestaAPI(createdToken);

                    return Ok(data);

                }
                else
                {
                    Exception ex = new Exception("Error de autenticación verifique la información de usuario");
                    var data = new RespuestaAPI(ex);
                    return Ok(data);
                }

            }
            else
            {
                Exception ex = new Exception("Error de autenticación verifique la información de usuario");
                var data = new RespuestaAPI(ex);
                return Ok(data);
            }
        }

        [HttpPost]
        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<ActionResult> Register(RegisterViewModel model)
        {
          

            var user = await _userManager.FindByNameAsync(model.Email);

            if (user == null)
            {
                user = new IdentityUser
                {
                    UserName = model.Email,
                    Email= model.Email,
                    EmailConfirmed = true
                };
                await _userManager.CreateAsync(user, model.Password);


                var data = new RespuestaAPI(user);

                return Ok(data);
            }
            else
            {
                Exception ex = new Exception("Error, cuenta de usuario ya existe");
                var data = new RespuestaAPI(ex);

                return Ok(data);
            }
        }

        [HttpPost]
        [AllowAnonymous]
        [HttpPost("ResetPassword")]
        public async Task<ActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            

            try
            {
                var user = await _userManager.FindByNameAsync(model.Email);
                if (user == null)
                {
                    // No revelar que el usuario no existe
                    return Ok("Error al resetear contraseña, verifique su información");
                }

                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                var result = await _userManager.ResetPasswordAsync(user, token, model.Password);

                if (result.Succeeded)
                {
                    var data = new RespuestaAPI(result);
                    return Ok(data);
                }
                else
                {
                    string errors = string.Empty;

                    foreach (var _error in result.Errors)
                    {
                        errors+= _error.Description+"\n";
                    }

                    var data = new RespuestaAPI("Error al resetear contraseña \n"+ errors);

                    return Ok(data);
                }
            
            } catch (Exception ex)
            {
                var data = new RespuestaAPI(ex);
                return Ok(data);
            }
        }

        [HttpPost]
        [AllowAnonymous]
        [HttpPost("GetUsers")]
        public  ActionResult GetUsers()
        {
            try
            {
                var result =  _userManager.Users.ToList();
                var data = new RespuestaAPI(result);

                    return Ok(data);
            }
            catch (Exception ex)
            {
                var data = new RespuestaAPI(ex);
                return Ok(data);
            }
        }


    }
}
