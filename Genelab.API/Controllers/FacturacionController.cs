using Genelab.API.Models;
using Genelab.Common;
using Genelab.Database.Data;
using Genelab.Database.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Genelab.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacturacionController : ControllerBase


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
                FacturacionModel userModel1 = new FacturacionModel();
                FacturacionModel userModel2 = new FacturacionModel();
                FacturacionModel userModel3 = new FacturacionModel();

                List<FacturacionModel> listUsers = new List<FacturacionModel>();



                listUsers.Add(userModel1);
                listUsers.Add(userModel2);
                listUsers.Add(userModel3);



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
                FacturacionModel userModel1 = new FacturacionModel();
                FacturacionModel userModel2 = new FacturacionModel();
                FacturacionModel userModel3 = new FacturacionModel();

                List<FacturacionModel> listUsers = new List<FacturacionModel>();

                userModel1.Id = "EDUARDO LOPEZ SANCHEZ";
                userModel1.Cliente = "COVID-19";
                userModel1.Paciente = "COVID";
                userModel1.Fecha = "EN PROCESO";
                userModel1.Estudio = "01-01-2021";
                userModel1.Estatus = "01-01-2021";

                userModel2.Id = "EDUARDO LOPEZ SANCHEZ";
                userModel2.Cliente = "COVID-19";
                userModel2.Paciente = "COVID";
                userModel2.Fecha = "ENTREGADO";
                userModel2.Estudio = "01-01-2021";
                userModel2.Estatus = "01-01-2021";

                userModel3.Id = "EDUARDO LOPEZ SANCHEZ";
                userModel3.Cliente = "COVID-19";
                userModel3.Paciente = "COVID";
                userModel3.Fecha = "EN PROCESO";
                userModel3.Estudio = "01-01-2021";
                userModel3.Estatus = "01-01-2021";

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
