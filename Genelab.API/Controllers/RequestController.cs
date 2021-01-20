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
    public class RequestController : ControllerBase
    {
        private readonly GenelabContext _context;
        public RequestController(GenelabContext context)
        {
            _context = context;
        }


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
                RequestModel userModel1 = new RequestModel();
                RequestModel userModel2 = new RequestModel();
                RequestModel userModel3 = new RequestModel();
                RequestModel userModel4 = new RequestModel();

                List<RequestModel> listUsers = new List<RequestModel>();
                List<Servicio> listServicios;
                listServicios = new List<Servicio>();

                listServicios = (from o in _context.Servicios

                                 select o).ToList();



                var data = new RespuestaAPI(listServicios);

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
                RequestModel userModel1 = new RequestModel();
                RequestModel userModel2 = new RequestModel();
                RequestModel userModel3 = new RequestModel();
                RequestModel userModel4 = new RequestModel();

                List<RequestModel> listUsers = new List<RequestModel>();




                listUsers.Add(userModel1);
                listUsers.Add(userModel2);
                //listUsers.Add(userModel3);
                //listUsers.Add(userModel3);
                //listUsers.Add(userModel3);
                //listUsers.Add(userModel3);
                //listUsers.Add(userModel3);
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


        [HttpPost("alta")]
        public IActionResult alta(RequestModel model)
        {
            try
            {

                ServicioDetalle servicioDetalle = new ServicioDetalle();
                Servicio servicio = new Servicio();

                servicioDetalle.NombrePaciente = model.NombrePaciente;
                servicioDetalle.ApellidoMPaciente = model.ApellidoPPaciente;
                servicioDetalle.ApellidoPPaciente = model.ApellidoMPaciente;
                servicioDetalle.CodigoPostal = model.CodigoPostal;
                servicioDetalle.Colonia = model.Colonia;
                servicioDetalle.Edad = "29";
                servicioDetalle.Estado = "Puebla";
                servicioDetalle.Delegacion = "Iztacalco";
                servicioDetalle.NombreTitular = "Fabian";
                servicioDetalle.Pais = "Mexico";
                servicioDetalle.Parentezco = "TIO";
               


                _context.ServicioDetalles.Add(servicioDetalle);
                _context.SaveChanges();

                servicio.EstatusId = 1;
                servicio.EstudioId = 1;
                servicio.FechaHoraCreacion = DateTime.Now;
                servicio.FechaHoraModificacion = DateTime.Now;
                servicio.FolioPago = "FolioPago";
                servicio.TipoServicioId = 1;
                servicio.UsuarioId = "12312312321";
                servicio.UsuarioModificacion = "123123131";
                servicio.UsuarioCreacion = "123123131";
                servicio.TipoServicioId = servicioDetalle.Id;

                _context.Servicios.Add(servicio);
                _context.SaveChanges();

                var data = new RespuestaAPI(servicio);

                return Ok(data);
            }
            catch (Exception ex)
            {

                return Ok(ex);
            }
        }

    }
}
