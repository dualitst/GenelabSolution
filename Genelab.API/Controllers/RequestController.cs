using Genelab.API.Models;
using Genelab.Common;
using Genelab.Database;
using Genelab.Database.Data;
using Genelab.Database.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
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


        #region Solicitudes en recepcion 
        [HttpPost("ListSitio")]
        public IActionResult ListSitio()
        {
            try
            {
             
                List<Servicio> listServicios = new List<Servicio>();
                List<ServicioDetalle> listServiciosDetalles= new List<ServicioDetalle>();
                List<ServiciosConsultaModel> result = new List<ServiciosConsultaModel>();

                listServicios = (from o in _context.Servicios
                                 where o.EstatusProcesoId==1 && 
                                 o.EstatusPagoId==1 &&
                                 o.EstatusFacturaId==1 && 
                                 o.EstatusResultadoId==1 &&
                                 o.TipoServicioId==1
                                 select o).ToList();

                listServiciosDetalles = (from o in _context.ServicioDetalles
                                 select o).ToList();

                foreach(Servicio serv in listServicios){
                    ServiciosConsultaModel objSer = new ServiciosConsultaModel();

                   var serviDetalle= listServiciosDetalles.Where(x => x.Id == serv.ServicioDetalleID).FirstOrDefault();
                    if (serviDetalle != null)
                    {
                        objSer.ServicioId = serv.Id;
                        objSer.ApellidoMPaciente = serviDetalle.ApellidoMPaciente;
                        objSer.ApellidoPPaciente = serviDetalle.ApellidoPPaciente;
                        objSer.CodigoPostal = serviDetalle.CodigoPostal;
                        objSer.Colonia = serviDetalle.Colonia.ToUpper();
                        objSer.Delegacion = serviDetalle.Delegacion.ToUpper();
                        objSer.Edad = serviDetalle.Edad;
                        objSer.Estado = serviDetalle.Estado;
                        objSer.EstatusId = serv.EstatusProcesoId;
                        objSer.EstudioId = serv.EstudioId;
                        objSer.FechaHoraCreacion = serv.FechaHoraCreacion;
                        objSer.NombrePaciente = serviDetalle.NombrePaciente.ToUpper() + " " + serviDetalle.ApellidoPPaciente.ToUpper() + " " + serviDetalle.ApellidoMPaciente.ToUpper();
                        objSer.NombreTitular = serviDetalle.NombreTitular.ToUpper();

                        if (serviDetalle.Resultado == string.Empty)//CAMBIAR POR EL CATALOGO
                            objSer.Resultado = "PENDIENTE";
                        else
                            objSer.Resultado = serviDetalle.Resultado;

                        var estatus = (from o in _context.EstatusProceso
                                       where o.Id == serv.EstatusProcesoId
                                       select o).FirstOrDefault();

                        if (estatus != null)
                        {
                            objSer.EstatusNombre = estatus.Nombre.ToUpper();
                        }

                        var estudio = (from o in _context.Estudios
                                       where o.Id == serv.EstudioId
                                       select o).FirstOrDefault();
                        if (estudio != null)
                        {
                            objSer.EstudioNombre = estudio.Nombre.ToUpper();
                        }

                        result.Add(objSer);
                    }
                }

                var list = result.OrderByDescending(x => x.FechaHoraCreacion);

                var data = new RespuestaAPI(list);

                return Ok(data);
            }
            catch (Exception ex)
            {

                return Ok(ex);
            }
        }

        [HttpPost("ListEnDomicilio")]
        public IActionResult ListEnDomicilio()
        {
            try
            {

                List<Servicio> listServicios = new List<Servicio>();
                List<ServicioDetalle> listServiciosDetalles = new List<ServicioDetalle>();
                List<ServiciosConsultaModel> result = new List<ServiciosConsultaModel>();

                listServicios = (from o in _context.Servicios
                                 where o.EstatusProcesoId == 1 &&
                                 o.EstatusPagoId == 1 &&
                                 o.EstatusFacturaId == 1 &&
                                 o.EstatusResultadoId == 1 &&
                                 o.TipoServicioId == 2
                                 select o).ToList();

                listServiciosDetalles = (from o in _context.ServicioDetalles
                                         select o).ToList();

                foreach (Servicio serv in listServicios)
                {
                    ServiciosConsultaModel objSer = new ServiciosConsultaModel();

                    var serviDetalle = listServiciosDetalles.Where(x => x.Id == serv.ServicioDetalleID).FirstOrDefault();
                    if (serviDetalle != null)
                    {
                        objSer.ServicioId = serv.Id;
                        objSer.ApellidoMPaciente = serviDetalle.ApellidoMPaciente;
                        objSer.ApellidoPPaciente = serviDetalle.ApellidoPPaciente;
                        objSer.CodigoPostal = serviDetalle.CodigoPostal;
                        objSer.Colonia = serviDetalle.Colonia.ToUpper();
                        objSer.Delegacion = serviDetalle.Delegacion.ToUpper();
                        objSer.Edad = serviDetalle.Edad;
                        objSer.Estado = serviDetalle.Estado;
                        objSer.EstatusId = serv.EstatusProcesoId;
                        objSer.EstudioId = serv.EstudioId;
                        objSer.FechaHoraCreacion = serv.FechaHoraCreacion;
                        objSer.NombrePaciente = serviDetalle.NombrePaciente.ToUpper() + " " + serviDetalle.ApellidoPPaciente.ToUpper() + " " + serviDetalle.ApellidoMPaciente.ToUpper();
                        objSer.NombreTitular = serviDetalle.NombreTitular.ToUpper();

                        if (serviDetalle.Resultado == string.Empty)//CAMBIAR POR EL CATALOGO
                            objSer.Resultado = "PENDIENTE";
                        else
                            objSer.Resultado = serviDetalle.Resultado;

                        var estatus = (from o in _context.EstatusProceso
                                       where o.Id == serv.EstatusProcesoId
                                       select o).FirstOrDefault();

                        if (estatus != null)
                        {
                            objSer.EstatusNombre = estatus.Nombre.ToUpper();
                        }

                        var estudio = (from o in _context.Estudios
                                       where o.Id == serv.EstudioId
                                       select o).FirstOrDefault();
                        if (estudio != null)
                        {
                            objSer.EstudioNombre = estudio.Nombre.ToUpper();
                        }

                        result.Add(objSer);
                    }
                }

                var list = result.OrderByDescending(x => x.FechaHoraCreacion);

                var data = new RespuestaAPI(list);

                return Ok(data);
            }
            catch (Exception ex)
            {

                return Ok(ex);
            }
        }

        #endregion


        #region Bandeja de pagos
        [HttpPost("PayList")]
        public IActionResult PayList()
        {
            try
            {

                List<Servicio> listServicios = new List<Servicio>();
                List<ServicioDetalle> listServiciosDetalles = new List<ServicioDetalle>();
                List<ServiciosConsultaModel> result = new List<ServiciosConsultaModel>();

                listServicios = (from o in _context.Servicios
                                 where o.EstatusProcesoId==2 &&
                                       o.EstatusPagoId==1//SOLO IMPORTA QUE NO ESTEN PAGADOS
                                 select o).ToList();

                listServiciosDetalles = (from o in _context.ServicioDetalles
                                         select o).ToList();

                foreach (Servicio serv in listServicios)
                {
                    ServiciosConsultaModel objSer = new ServiciosConsultaModel();

                    var serviDetalle = listServiciosDetalles.Where(x => x.Id == serv.ServicioDetalleID).FirstOrDefault();
                    if (serviDetalle != null)
                    {
                        objSer.ServicioId = serv.Id;
                        objSer.ApellidoMPaciente = serviDetalle.ApellidoMPaciente;
                        objSer.ApellidoPPaciente = serviDetalle.ApellidoPPaciente;
                        objSer.CodigoPostal = serviDetalle.CodigoPostal;
                        objSer.Colonia = serviDetalle.Colonia.ToUpper();
                        objSer.Delegacion = serviDetalle.Delegacion.ToUpper();
                        objSer.Edad = serviDetalle.Edad;
                        objSer.Estado = serviDetalle.Estado;
                        objSer.EstatusId = serv.EstatusProcesoId;
                        objSer.EstudioId = serv.EstudioId;
                        objSer.FechaHoraCreacion = serv.FechaHoraCreacion;
                        objSer.NombrePaciente = serviDetalle.NombrePaciente.ToUpper() + " " + serviDetalle.ApellidoPPaciente.ToUpper() + " " + serviDetalle.ApellidoMPaciente.ToUpper();
                        objSer.NombreTitular = serviDetalle.NombreTitular.ToUpper();

                        if (serviDetalle.Resultado == string.Empty)//CAMBIAR POR EL CATALOGO
                            objSer.Resultado = "PENDIENTE";
                        else
                            objSer.Resultado = serviDetalle.Resultado;

                        var estatus = (from o in _context.EstatusPago
                                       where o.Id == serv.EstatusPagoId
                                       select o).FirstOrDefault();

                        if (estatus != null)
                        {
                            objSer.EstatusNombre = estatus.Nombre.ToUpper();
                        }

                        var estudio = (from o in _context.Estudios
                                       where o.Id == serv.EstudioId
                                       select o).FirstOrDefault();
                        if (estudio != null)
                        {
                            objSer.EstudioNombre = estudio.Nombre.ToUpper();
                        }

                        result.Add(objSer);
                    }
                }

                var list = result.OrderByDescending(x => x.FechaHoraCreacion);

                var data = new RespuestaAPI(list);

                return Ok(data);
            }
            catch (Exception ex)
            {

                return Ok(ex);
            }
        }

        #endregion

        #region Bandeja de resultados
        [HttpPost("ResultList")]
        public IActionResult ResultList()
        {
            try
            {

                List<Servicio> listServicios = new List<Servicio>();
                List<ServicioDetalle> listServiciosDetalles = new List<ServicioDetalle>();
                List<ServiciosConsultaModel> result = new List<ServiciosConsultaModel>();

                listServicios = (from o in _context.Servicios
                                 where o.EstatusProcesoId == 2 &&
                                       o.EstatusPagoId == 2 &&//SOLO IMPORTA QUE NO ESTEN PAGADOS
                                       o.EstatusResultadoId == 1//SOLO IMPORTA QUE NO ESTEN PAGADOS
                                 select o).ToList();

                listServiciosDetalles = (from o in _context.ServicioDetalles
                                         select o).ToList();

                foreach (Servicio serv in listServicios)
                {
                    ServiciosConsultaModel objSer = new ServiciosConsultaModel();

                    var serviDetalle = listServiciosDetalles.Where(x => x.Id == serv.ServicioDetalleID).FirstOrDefault();
                    if (serviDetalle != null)
                    {
                        objSer.ServicioId = serv.Id;
                        objSer.ApellidoMPaciente = serviDetalle.ApellidoMPaciente;
                        objSer.ApellidoPPaciente = serviDetalle.ApellidoPPaciente;
                        objSer.CodigoPostal = serviDetalle.CodigoPostal;
                        objSer.Colonia = serviDetalle.Colonia.ToUpper();
                        objSer.Delegacion = serviDetalle.Delegacion.ToUpper();
                        objSer.Edad = serviDetalle.Edad;
                        objSer.Estado = serviDetalle.Estado;
                        objSer.EstatusId = serv.EstatusProcesoId;
                        objSer.EstudioId = serv.EstudioId;
                        objSer.FechaHoraCreacion = serv.FechaHoraCreacion;
                        objSer.NombrePaciente = serviDetalle.NombrePaciente.ToUpper() + " " + serviDetalle.ApellidoPPaciente.ToUpper() + " " + serviDetalle.ApellidoMPaciente.ToUpper();
                        objSer.NombreTitular = serviDetalle.NombreTitular.ToUpper();

                        if (serviDetalle.Resultado == string.Empty)//CAMBIAR POR EL CATALOGO
                            objSer.Resultado = "PENDIENTE";
                        else
                            objSer.Resultado = serviDetalle.Resultado;

                        var estatus = (from o in _context.EstatusResultado
                                       where o.Id == serv.EstatusResultadoId
                                       select o).FirstOrDefault();

                        if (estatus != null)
                        {
                            objSer.EstatusNombre = estatus.Nombre.ToUpper();
                        }

                        var estudio = (from o in _context.Estudios
                                       where o.Id == serv.EstudioId
                                       select o).FirstOrDefault();
                        if (estudio != null)
                        {
                            objSer.EstudioNombre = estudio.Nombre.ToUpper();
                        }

                        result.Add(objSer);
                    }
                }

                var list = result.OrderByDescending(x => x.FechaHoraCreacion);

                var data = new RespuestaAPI(list);

                return Ok(data);
            }
            catch (Exception ex)
            {

                return Ok(ex);
            }
        }

        #endregion

        #region Bandeja de resultados
        [HttpPost("FacturaList")]
        public IActionResult FacturaList()
        {
            try
            {

                List<Servicio> listServicios = new List<Servicio>();
                List<ServicioDetalle> listServiciosDetalles = new List<ServicioDetalle>();
                List<ServiciosConsultaModel> result = new List<ServiciosConsultaModel>();

                listServicios = (from o in _context.Servicios
                                 join se in _context.ServicioDatosFacturacions
                                 on o.Id equals se.ServicioId
                                 where o.EstatusProcesoId == 2 &&
                                       o.EstatusPagoId == 2 &&//SOLO IMPORTA QUE NO ESTEN PAGADOS
                                       o.EstatusFacturaId == 1//SOLO IMPORTA QUE NO ESTEN PAGADOS
                                 select o).ToList();

                listServiciosDetalles = (from o in _context.ServicioDetalles
                                         select o).ToList();

                foreach (Servicio serv in listServicios)
                {
                    ServiciosConsultaModel objSer = new ServiciosConsultaModel();

                    var serviDetalle = listServiciosDetalles.Where(x => x.Id == serv.ServicioDetalleID).FirstOrDefault();
                    if (serviDetalle != null)
                    {
                        objSer.ServicioId = serv.Id;
                        objSer.ApellidoMPaciente = serviDetalle.ApellidoMPaciente;
                        objSer.ApellidoPPaciente = serviDetalle.ApellidoPPaciente;
                        objSer.CodigoPostal = serviDetalle.CodigoPostal;
                        objSer.Colonia = serviDetalle.Colonia.ToUpper();
                        objSer.Delegacion = serviDetalle.Delegacion.ToUpper();
                        objSer.Edad = serviDetalle.Edad;
                        objSer.Estado = serviDetalle.Estado;
                        objSer.EstatusId = serv.EstatusProcesoId;
                        objSer.EstudioId = serv.EstudioId;
                        objSer.FechaHoraCreacion = serv.FechaHoraCreacion;
                        objSer.NombrePaciente = serviDetalle.NombrePaciente.ToUpper() + " " + serviDetalle.ApellidoPPaciente.ToUpper() + " " + serviDetalle.ApellidoMPaciente.ToUpper();
                        objSer.NombreTitular = serviDetalle.NombreTitular.ToUpper();

                        if (serviDetalle.Resultado == string.Empty)//CAMBIAR POR EL CATALOGO
                            objSer.Resultado = "PENDIENTE";
                        else
                            objSer.Resultado = serviDetalle.Resultado;

                        var estatus = (from o in _context.EstatusFactura
                                       where o.Id == serv.EstatusFacturaId
                                       select o).FirstOrDefault();

                        if (estatus != null)
                        {
                            objSer.EstatusNombre = estatus.Nombre.ToUpper();
                        }

                        var estudio = (from o in _context.Estudios
                                       where o.Id == serv.EstudioId
                                       select o).FirstOrDefault();
                        if (estudio != null)
                        {
                            objSer.EstudioNombre = estudio.Nombre.ToUpper();
                        }

                        result.Add(objSer);
                    }
                }

                var list = result.OrderByDescending(x => x.FechaHoraCreacion);

                var data = new RespuestaAPI(list);

                return Ok(data);
            }
            catch (Exception ex)
            {

                return Ok(ex);
            }
        }

        #endregion

        #region Mis solicitudes sitio publico

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
                        objSer.Colonia = serviDetalle.Colonia.ToUpper();
                        objSer.Delegacion = serviDetalle.Delegacion.ToUpper();
                        objSer.Edad = serviDetalle.Edad;
                        objSer.Estado = serviDetalle.Estado;
                        objSer.EstatusId = serv.EstatusProcesoId;
                        objSer.EstudioId = serv.EstudioId;
                        objSer.FechaHoraCreacion = serv.FechaHoraCreacion;
                        objSer.NombrePaciente = serviDetalle.NombrePaciente.ToUpper()+" "+ serviDetalle.ApellidoPPaciente.ToUpper() + " "+ serviDetalle.ApellidoMPaciente.ToUpper();
                        objSer.NombreTitular = serviDetalle.NombreTitular.ToUpper();
                        
                        if (serviDetalle.Resultado == string.Empty)//CAMBIAR POR EL CATALOGO
                        objSer.Resultado = "PENDIENTE";
                        else
                        objSer.Resultado = serviDetalle.Resultado;

                        var estatus= (from o in _context.EstatusProceso
                                      where o.Id== serv.EstatusProcesoId
                                      select o).FirstOrDefault();

                        if (estatus != null)
                        {
                            objSer.EstatusNombre = estatus.Nombre.ToUpper();
                        }

                        var estudio = (from o in _context.Estudios
                                       where o.Id == serv.EstudioId
                                       select o).FirstOrDefault();
                        if (estudio != null)
                        {
                            objSer.EstudioNombre = estudio.Nombre.ToUpper();
                        }

                        result.Add(objSer);
                    }
                }

                var list = result.OrderByDescending(x => x.FechaHoraCreacion);

                var data = new RespuestaAPI(list);

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

                listServicios = (from serv in _context.Servicios
                                 join fact in _context.ServicioDatosFacturacions on serv.Id equals fact.ServicioId
                                 where serv.UsuarioId==claim.Value
                                 //Where(x => x.UsuarioId == claim.Value)
                                 select serv).ToList();

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
                        objSer.Colonia = serviDetalle.Colonia.ToUpper();
                        objSer.Delegacion = serviDetalle.Delegacion.ToUpper();
                        objSer.Edad = serviDetalle.Edad;
                        objSer.Estado = serviDetalle.Estado;
                        objSer.EstatusId = serv.EstatusProcesoId;
                        objSer.EstudioId = serv.EstudioId;
                        objSer.FechaHoraCreacion = serv.FechaHoraCreacion;
                        objSer.NombrePaciente = serviDetalle.NombrePaciente.ToUpper() + " " + serviDetalle.ApellidoPPaciente.ToUpper() + " " + serviDetalle.ApellidoMPaciente.ToUpper();
                        objSer.NombreTitular = serviDetalle.NombreTitular.ToUpper();
                        if (serviDetalle.Resultado == string.Empty)//CAMBIAR POR EL CATALOGO
                            objSer.Resultado = "PENDIENTE";
                        else
                            objSer.Resultado = serviDetalle.Resultado;

                        var estatus = (from o in _context.EstatusProceso
                                       where o.Id == serv.EstatusProcesoId
                                       select o).FirstOrDefault();

                        if (estatus != null)
                        {
                            objSer.EstatusNombre = estatus.Nombre.ToUpper();
                        }

                        var estudio = (from o in _context.Estudios
                                       where o.Id == serv.EstudioId
                                       select o).FirstOrDefault();
                        if (estudio != null)
                        {
                            objSer.EstudioNombre = estudio.Nombre.ToUpper();
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

        #endregion


        #region Alta de solicitud
        [HttpPost("Alta")]
        public IActionResult Alta(RequestModel model)
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
                servicioDetalle.Edad = model.Edad;
                servicioDetalle.Resultado = string.Empty;
                servicioDetalle.Ct = string.Empty;

              
                _context.ServicioDetalles.Add(servicioDetalle);
                _context.SaveChanges();

                //Inicializa todos los estados de la solicitud
                servicio.EstatusProcesoId = 1;
                servicio.EstatusPagoId = 1;
                servicio.EstatusFacturaId = 1;
                servicio.EstatusResultadoId = 1;

                servicio.EstudioId = int.Parse(model.EstudioId);
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


                if (model.isFacturacion)
                {
                    DatosFacturacion datos = new DatosFacturacion();
                    datos.EmpresaFiscal = model.Delegacion;
                    datos.Colonia = model.EmpresaFiscalColonia;
                    datos.CodigoPostal = model.EmpresaFiscalCP;
                    datos.Delegacion = model.EmpresaFiscalDelegacion;
                    datos.Calle = model.EmpresaFiscalCalle;
                    datos.EmailF = model.EmailF;
                    datos.RfcF = model.RfcF;
                    datos.TelF = model.TelF;

                    _context.DatosFacturacions.Add(datos);
                    _context.SaveChanges();

                    ServicioDatosFacturacion servDatosFac = new ServicioDatosFacturacion();
                    servDatosFac.DatosFacturacionId = datos.Id;
                    servDatosFac.ServicioId = servicio.Id;

                    _context.ServicioDatosFacturacions.Add(servDatosFac);
                    _context.SaveChanges();
                }




                var data = new RespuestaAPI(servicio);

                return Ok(data);
            }
            catch (Exception ex)
            {

                return Ok(ex);
            }
        }

        #endregion

        #region Alta de solicitud
        [HttpPost("Prepago")]
        [AllowAnonymous]
        public IActionResult Prepago(RequestPrepagoModel model)
        {
            try
            {

                //Filter specific claim    
                Claim claim = User.Claims.Where(x => x.Type == ClaimTypes.Email).FirstOrDefault();

                var solicitud= (from o in _context.Servicios.Where(x => x.Id == int.Parse( model.IdSolicitud))
                                  select o).FirstOrDefault();

                if (solicitud != null)
                {
                    solicitud.EstatusProcesoId = 2;//EN PROCESO
                    solicitud.FechaHoraModificacion = DateTime.Now;

                    if (claim != null)
                    {

                        solicitud.UsuarioModificacion = claim.Value;
                    }
                }

                _context.Servicios.Attach(solicitud);
                _context.Entry(solicitud).State = EntityState.Modified;
                _context.SaveChanges();

                var data = new RespuestaAPI(solicitud);

                return Ok(data);
            }
            catch (Exception ex)
            {

                return Ok(ex);
            }
        }

        #endregion

        #region Alta de solicitud
        [HttpPost("Pago")]
        [AllowAnonymous]
        public IActionResult Pago(RequestPagoModel model)
        {
            try
            {

                //Filter specific claim    
                Claim claim = User.Claims.Where(x => x.Type == ClaimTypes.Email).FirstOrDefault();

                var solicitud = (from o in _context.Servicios.Where(x => x.Id == int.Parse(model.IdSolicitud))
                                 select o).FirstOrDefault();

                if (solicitud != null)
                {
                    solicitud.EstatusProcesoId = 2;//EN PROCESO
                    solicitud.EstatusPagoId = 2;//INDICANDO PAGADO
                    solicitud.FechaHoraModificacion = DateTime.Now;

                    if (claim != null)
                    {
                        solicitud.UsuarioModificacion = claim.Value;
                    }
                }

                _context.Servicios.Attach(solicitud);
                _context.Entry(solicitud).State = EntityState.Modified;
                _context.SaveChanges();

                var data = new RespuestaAPI(solicitud);

                return Ok(data);
            }
            catch (Exception ex)
            {

                return Ok(ex);
            }
        }

        [HttpPost("GuardarPago")]
        [AllowAnonymous]
        public IActionResult GuardarPago([FromForm]RequestPagoFileModel model)
        {
            try
            {

                //Filter specific claim    
                Claim claim = User.Claims.Where(x => x.Type == ClaimTypes.Email).FirstOrDefault();

                var solicitud = (from o in _context.Servicios.Where(x => x.Id == int.Parse(model.IdSolicitud))
                                 select o).FirstOrDefault();

                if (solicitud != null)
                {
                    solicitud.EstatusProcesoId = 2;//EN PROCESO
                    solicitud.EstatusPagoId = 2;//INDICANDO PAGADO
                    solicitud.FechaHoraModificacion = DateTime.Now;

                    if (claim != null)
                    {
                        solicitud.UsuarioModificacion = claim.Value;
                    }

                    Guid idFile = Guid.NewGuid();

                    if (model.ComprobanteP!=null) {

                        var fileComprobante = model.ComprobanteP;

                        if (model.ComprobanteP.Length > 0)
                        {
                            using (var fileStream = new FileStream(idFile.ToString()+fileComprobante.Name, FileMode.Create))
                            {
                                fileComprobante.CopyTo(fileStream);
                            }
                        }
                    }
                }

                _context.Servicios.Attach(solicitud);
                _context.Entry(solicitud).State = EntityState.Modified;
                _context.SaveChanges();

                var data = new RespuestaAPI(solicitud);

                return Ok(data);
            }
            catch (Exception ex)
            {

                return Ok(ex);
            }
        }

        #endregion

        #region Alta de solicitud
        [HttpPost("Resultado")]
        public IActionResult Resultado(RequestPagoModel model)
        {
            try
            {

                //Filter specific claim    
                Claim claim = User.Claims.Where(x => x.Type == ClaimTypes.Email).FirstOrDefault();

                var solicitud = (from o in _context.Servicios.Where(x => x.Id == int.Parse(model.IdSolicitud))
                                 select o).FirstOrDefault();

                if (solicitud != null)
                {
                    solicitud.EstatusProcesoId = 2;//EN PROCESO
                    solicitud.EstatusResultadoId = 2;//INDICANDO RESULTADO CARGADO
                    solicitud.FechaHoraModificacion = DateTime.Now;

                    if (claim != null)
                    {
                        solicitud.UsuarioModificacion = claim.Value;
                    }
                }

                _context.Servicios.Attach(solicitud);
                _context.Entry(solicitud).State = EntityState.Modified;
                _context.SaveChanges();

                var data = new RespuestaAPI(solicitud);

                return Ok(data);
            }
            catch (Exception ex)
            {

                return Ok(ex);
            }
        }

        #endregion


        #region Alta de solicitud
        [HttpPost("Facturado")]
        public IActionResult Facturado(RequestPagoModel model)
        {
            try
            {

                //Filter specific claim    
                Claim claim = User.Claims.Where(x => x.Type == ClaimTypes.Email).FirstOrDefault();

                var solicitud = (from o in _context.Servicios.Where(x => x.Id == int.Parse(model.IdSolicitud))
                                 select o).FirstOrDefault();

                if (solicitud != null)
                {
                    solicitud.EstatusProcesoId = 2;//EN PROCESO
                    solicitud.EstatusFacturaId = 2;//INDICANDO RESULTADO CARGADO
                    solicitud.FechaHoraModificacion = DateTime.Now;

                    if (claim != null)
                    {
                        solicitud.UsuarioModificacion = claim.Value;
                    }
                }

                _context.Servicios.Attach(solicitud);
                _context.Entry(solicitud).State = EntityState.Modified;
                _context.SaveChanges();

                var data = new RespuestaAPI(solicitud);

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
