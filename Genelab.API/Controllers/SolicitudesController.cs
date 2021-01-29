using Genelab.API.Models;
using Genelab.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Genelab.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SolicitudesController : ControllerBase
    {
        /// <summary>
        /// Devuelve una lista de personas con filtro
        /// </summary>
        /// <param name="oParameter">Finsoft.Common.Model.periodos - Filtra por los artributos SET FILTERS HERE</param>
        /// <returns></returns>
        [HttpPost("list")]
        public IActionResult GetList()
        {
            try
            {
                UserModel userModel1 = new UserModel();
                UserModel userModel2 = new UserModel();
                UserModel userModel3 = new UserModel();

                List<UserModel> listUsers = new List<UserModel>();

                userModel1.UserName = "fabian.romero@genelab.com";
                userModel1.Email = "Fabian Romero";
                userModel1.Email = "fabian.romero@genelab.com";
                userModel1.Activo = "Si";
                userModel1.Rol = "Administrador";

                userModel2.UserName = "victor.gonzalez@genelab.com";
                userModel2.Email = "Victor Gonzalez";
                userModel2.Email = "victor.gonzalez@genelab.com";
                userModel2.Activo = "Si";
                userModel2.Rol = "Analista";

                userModel3.UserName = "arturo.gomez@genelab.com";
                userModel3.Email = "Arturo Gomez";
                userModel3.Email = "arturo.gomez@genelab.com";
                userModel3.Activo = "Si";
                userModel3.Rol = "Facturacion";

                listUsers.Add(userModel1);
                listUsers.Add(userModel2);
                listUsers.Add(userModel3);


                var data = new RespuestaAPI(listUsers);

                return Ok(data);
            }
            catch (Exception ex)
            {

                return Ok(ex);
            }
        }
    }
}
