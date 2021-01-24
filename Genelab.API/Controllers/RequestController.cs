using Genelab.API.Models;
using Genelab.Common;
using Genelab.Database;
using Genelab.Database.Data;
using Genelab.Database.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Genelab.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class RequestController : ControllerBase
    {
        private readonly GenelabContext _context;
        public RequestController(GenelabContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
        }


        /// <summary>
        /// Devuelve una lista de personas con filtro
        /// </summary>
        /// <param name="oParameter">Finsoft.Common.Model.periodos - Filtra por los artributos SET FILTERS HERE</param>
        /// <returns></returns>
        [HttpPost("List")]
        public IActionResult GetList()
        {
            try
            {
             
                List<Servicio> listServicios = new List<Servicio>();
                List<ServicioDetalle> listServiciosDetalles= new List<ServicioDetalle>();
                List<ServiciosConsultaModel> result = new List<ServiciosConsultaModel>();

                listServicios = (from o in _context.Servicios
                                 select o).ToList();

                listServiciosDetalles = (from o in _context.ServicioDetalles
                                 select o).ToList();

                foreach(Servicio serv in listServicios){
                    ServiciosConsultaModel objSer = new ServiciosConsultaModel();

                   var serviDetalle= listServiciosDetalles.Where(x => x.Id == serv.ServicioDetalleID).FirstOrDefault();

                    objSer.ApellidoMPaciente = serviDetalle.ApellidoMPaciente;
                    objSer.ApellidoPPaciente = serviDetalle.ApellidoPPaciente;
                    objSer.CodigoPostal = serviDetalle.CodigoPostal;
                    objSer.Colonia = serviDetalle.Colonia;
                    objSer.Delegacion = serviDetalle.Delegacion;
                    objSer.Edad = serviDetalle.Edad;
                    objSer.Estado = serviDetalle.Estado;
                    objSer.EstatusId = serv.EstatusId;
                    objSer.EstudioId = serv.EstudioId;
                    objSer.FechaHoraCreacion = serv.FechaHoraCreacion;
                    objSer.NombrePaciente = serviDetalle.NombrePaciente;
                    objSer.NombreTitular = serviDetalle.NombreTitular;

                    result.Add(objSer);
                }

                var data = new RespuestaAPI(result);

                return Ok(data);
            }
            catch (Exception ex)
            {

                return Ok(ex);
            }
        }


        /// <summary>
        /// Devuelve una lista de personas con filtro
        /// </summary>
        /// <param name="oParameter">Finsoft.Common.Model.periodos - Filtra por los artributos SET FILTERS HERE</param>
        /// <returns></returns>
        [HttpPost("MyList")]
        public IActionResult MisResultados()
        {
            try
            {

                List<Servicio> listServicios = new List<Servicio>();
                List<ServicioDetalle> listServiciosDetalles = new List<ServicioDetalle>();
                List<ServiciosConsultaModel> result = new List<ServiciosConsultaModel>();

                //Filter specific claim    
                Claim claim = User.Claims.Where(x => x.Type == ClaimTypes.Email).FirstOrDefault();
                
                listServicios = (from o in _context.Servicios.Where(x=>x.UsuarioId== claim.Value)
                                 select o).ToList();

                listServiciosDetalles = (from o in _context.ServicioDetalles
                                         select o).ToList();

                foreach (Servicio serv in listServicios)
                {
                    ServiciosConsultaModel objSer = new ServiciosConsultaModel();

                    var serviDetalle = listServiciosDetalles.Where(x => x.Id == serv.ServicioDetalleID).FirstOrDefault();
                    if (serviDetalle != null)
                    {
                        objSer.ApellidoMPaciente = serviDetalle.ApellidoMPaciente;
                        objSer.ApellidoPPaciente = serviDetalle.ApellidoPPaciente;
                        objSer.CodigoPostal = serviDetalle.CodigoPostal;
                        objSer.Colonia = serviDetalle.Colonia;
                        objSer.Delegacion = serviDetalle.Delegacion;
                        objSer.Edad = serviDetalle.Edad;
                        objSer.Estado = serviDetalle.Estado;
                        objSer.EstatusId = serv.EstatusId;
                        objSer.EstudioId = serv.EstudioId;
                        objSer.FechaHoraCreacion = serv.FechaHoraCreacion;
                        objSer.NombrePaciente = serviDetalle.NombrePaciente;
                        objSer.NombreTitular = serviDetalle.NombreTitular;

                        var estatus= (from o in _context.Estatus where o.Id== serv.EstatusId
                                      select o).FirstOrDefault();
                        if (estatus != null)
                        {
                            objSer.EstatusNombre = estatus.Nombre;
                        }

                        var estudio = (from o in _context.Estudios
                                       where o.Id == serv.EstudioId
                                       select o).FirstOrDefault();
                        if (estudio != null)
                        {
                            objSer.EstudioNombre = estudio.Nombre;
                        }

                        result.Add(objSer);
                    }
                }

                var data = new RespuestaAPI(result);

                return Ok(data);
            }
            catch (Exception ex)
            {

                return Ok(ex);
            }
        }

        [HttpPost("MyBill")]
        public IActionResult MisFacturas()
        {
            try
            {

                List<Servicio> listServicios = new List<Servicio>();
                List<ServicioDetalle> listServiciosDetalles = new List<ServicioDetalle>();
                List<ServiciosConsultaModel> result = new List<ServiciosConsultaModel>();

                //Filter specific claim    
                Claim claim = User.Claims.Where(x => x.Type == ClaimTypes.Email).FirstOrDefault();

                listServicios = (from o in _context.Servicios.Where(x => x.UsuarioId == claim.Value)
                                 select o).ToList();

                listServiciosDetalles = (from o in _context.ServicioDetalles
                                         select o).ToList();

                foreach (Servicio serv in listServicios)
                {
                    ServiciosConsultaModel objSer = new ServiciosConsultaModel();

                    var serviDetalle = listServiciosDetalles.Where(x => x.Id == serv.ServicioDetalleID).FirstOrDefault();

                    objSer.ApellidoMPaciente = serviDetalle.ApellidoMPaciente;
                    objSer.ApellidoPPaciente = serviDetalle.ApellidoPPaciente;
                    objSer.CodigoPostal = serviDetalle.CodigoPostal;
                    objSer.Colonia = serviDetalle.Colonia;
                    objSer.Delegacion = serviDetalle.Delegacion;
                    objSer.Edad = serviDetalle.Edad;
                    objSer.Estado = serviDetalle.Estado;
                    objSer.EstatusId = serv.EstatusId;
                    objSer.EstudioId = serv.EstudioId;
                    objSer.FechaHoraCreacion = serv.FechaHoraCreacion;
                    objSer.NombrePaciente = serviDetalle.NombrePaciente;
                    objSer.NombreTitular = serviDetalle.NombreTitular;

                    result.Add(objSer);
                }

                var data = new RespuestaAPI(result);

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
                //Filter specific claim    
                Claim claim = User.Claims.Where(x => x.Type == ClaimTypes.Email).FirstOrDefault();


                servicioDetalle.NombrePaciente = model.NombrePaciente;
                servicioDetalle.ApellidoMPaciente = model.ApellidoPPaciente;
                servicioDetalle.ApellidoPPaciente = model.ApellidoMPaciente;
                servicioDetalle.CodigoPostal = model.CodigoPostal;
                servicioDetalle.Colonia = model.Colonia;
                servicioDetalle.Edad = string.Empty;
                servicioDetalle.Estado = string.Empty;
                servicioDetalle.Delegacion = model.Delegacion;
                servicioDetalle.NombreTitular = model.NombreTitular;
                servicioDetalle.Pais = string.Empty;
                servicioDetalle.Parentezco = model.Parentezco;

                if (model.isFacturacion)
                {
                    DatosFacturacion datos = new DatosFacturacion();
                    datos.EmpresaFiscal = model.Delegacion;
                    datos.Colonia = model.EmpresaFiscalColonia;
                    datos.CodigoPostal = model.EmpresaFiscalCP;
                    datos.Delegacion = model.EmpresaFiscalDelegacion;
                    datos.Calle = model.EmpresaFiscalCalle;
                }


                _context.ServicioDetalles.Add(servicioDetalle);
                _context.SaveChanges();

                servicio.EstatusId = 1;
                servicio.EstudioId = model.EstudioId;
                servicio.FechaHoraCreacion = DateTime.Now;
                servicio.FechaHoraModificacion = DateTime.Now;
                servicio.FolioPago = string.Empty;

                if (claim != null)
                {
                    servicio.UsuarioId = claim.Value;
                    servicio.UsuarioModificacion = claim.Value;
                    servicio.UsuarioCreacion = claim.Value;
                }

                servicio.ServicioDetalleID = servicioDetalle.Id;

                //Tipo de servicio
                if (model.EnDomicilio)
                    servicio.TipoServicioId = 1;
                else
                    servicio.TipoServicioId = 2;

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
