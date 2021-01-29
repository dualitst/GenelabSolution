using Genelab.API.Models;
using Genelab.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
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
    [Authorize]
    public class UsuariosController : ControllerBase
    {
        #region ServicesTest

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

        [HttpPost("servicioslist")]
        public IActionResult GetServiciosList()
        {
            try
            {
                UserModel userModel1 = new UserModel();
                UserModel userModel2 = new UserModel();
                UserModel userModel3 = new UserModel();

                List<UserModel> listUsers = new List<UserModel>();

                userModel1.UserName = "EDUARDO LOPEZ SANCHEZ";
                userModel1.Email = "COVID-19";
                userModel1.Email = "COVID";
                userModel1.Activo = "EN PROCESO";
                userModel1.Rol = "01-01-2021";

                userModel2.UserName = "EDUARDO LOPEZ SANCHEZ";
                userModel2.Email = "COVID-19";
                userModel2.Email = "COVID";
                userModel2.Activo = "ENTREGADO";
                userModel2.Rol = "01-01-2021";

                userModel3.UserName = "EDUARDO LOPEZ SANCHEZ";
                userModel3.Email = "COVID-19";
                userModel3.Email = "COVID";
                userModel3.Activo = "EN PROCESO";
                userModel3.Rol = "01-01-2021";

                listUsers.Add(userModel1);
                listUsers.Add(userModel2);
                listUsers.Add(userModel3);
                listUsers.Add(userModel3);
                listUsers.Add(userModel3);
                listUsers.Add(userModel3);
                listUsers.Add(userModel3);
                listUsers.Add(userModel3);


                var data = new RespuestaAPI(listUsers);

                return Ok(data);
            }
            catch (Exception ex)
            {

                return Ok(ex);
            }
        }
        #endregion

    }
}
