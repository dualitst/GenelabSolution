using Microsoft.AspNetCore.Mvc;
using System;
using Genelab.API.Models;
using Genelab.Common;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Genelab.Database.Models;
using Genelab.Database.Data;

namespace Genelab.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BandResultController : ControllerBase
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
                BandResultModel userModel1 = new BandResultModel();
                BandResultModel userModel2 = new BandResultModel();
                BandResultModel userModel3 = new BandResultModel();

                List<BandResultModel> listUsers = new List<BandResultModel>();
                List<Resultado> listResultados;
                listResultados = new List<Resultado>();
           





                var data = new RespuestaAPI(listResultados);

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
                BandResultModel userModel1 = new BandResultModel();
                BandResultModel userModel2 = new BandResultModel();
                BandResultModel userModel3 = new BandResultModel();

                List<BandResultModel> listUsers = new List<BandResultModel>();
                userModel1.Id = "1";
                userModel1.Cliente = "EDUARDO LOPEZ SANCHEZ";
                userModel1.Paciente = "COVID-19";
                userModel1.Estudio = "COVID";
                userModel1.Estatus = "EN PROCESO";
                userModel1.Fecha = "01-01-2021";

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