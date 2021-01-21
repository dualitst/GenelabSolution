using Genelab.API.Models;
using Genelab.Common;
using Genelab.Database;
using Genelab.Database.Data;
using Genelab.Database.Models;
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


    public class BandboxController : ControllerBase
    {
        private readonly GenelabContext _context;

        public BandboxController(GenelabContext context)
        {
            _context = context;
        }

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
                BandboxModel userModel1 = new BandboxModel();
                BandboxModel userModel2 = new BandboxModel();
                BandboxModel userModel3 = new BandboxModel();

                List<BandboxModel> listUsers = new List<BandboxModel>();

                List<Pago> listPago = new List<Pago>();


                    listPago = (from o in _context.Pagos
                                       select o).ToList();
               

                var data = new RespuestaAPI(listPago);


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
                BandboxModel userModel1 = new BandboxModel();
                BandboxModel userModel2 = new BandboxModel();
                BandboxModel userModel3 = new BandboxModel();

                List<BandboxModel> listUsers = new List<BandboxModel>();

                userModel1.ID = "EDUARDO LOPEZ SANCHEZ";
                userModel1.Nombre = "COVID-19";
                userModel1.Fecha = "COVID";
                userModel1.Paciente = "EN PROCESO";
                userModel1.Estudio = "01-01-2021";
                userModel1.Estatus = "Activo";


                userModel2.ID = "EDUARDO LOPEZ SANCHEZ";
                userModel2.Nombre = "COVID-19";
                userModel2.Fecha = "COVID";
                userModel2.Paciente = "ENTREGADO";
                userModel2.Estudio = "01-01-2021";
                userModel2.Estatus = "01-01-2021";

                userModel3.ID = "EDUARDO LOPEZ SANCHEZ";
                userModel3.Nombre = "COVID-19";
                userModel3.Fecha = "COVID";
                userModel3.Paciente = "EN PROCESO";
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
        [HttpPost("alta")]
        public IActionResult alta(PagoModel model)
        {
            try
            {
               
                Pago listPago = new Pago();


                listPago.TipoPago = model.TipoPago;
                listPago.Tarjeta = model.Tarjeta;
                listPago.Monto = model.Monto;
                listPago.ImagenId = model.ImagenId;



                _context.Pagos.Add(listPago);
                _context.SaveChanges();


                var data = new RespuestaAPI(listPago);

                return Ok(data);
            }
            catch (Exception ex)
            {

                return Ok(ex);
            }
        }
    }
}


