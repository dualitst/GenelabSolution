using Genelab.API.Models;
using Genelab.Common;
using Genelab.Database;
using Genelab.Database.Data;
using Genelab.Database.Models;
using Genelab.Database.Repositories;
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
        private readonly IMemberRepository _repository;
        public RequestController(GenelabContext context, 
                                UserManager<IdentityUser> userManager,
                                IMemberRepository repository)
        {
            _context = context;
            _repository = repository;
        }


        #region Solicitudes en recepcion 
        [HttpPost("ListSitio")]
        public async Task<IActionResult> ListSitio()
        {
            try
            {
                var result = await _repository.SelectSitioList();
                var data = new RespuestaAPI(result);

                return Ok(data);
            }
            catch (Exception ex)
            {

                return Ok(ex);
            }
        }

        [HttpPost("ListEnDomicilio")]
        public async Task<IActionResult> ListEnDomicilio()
        {
            try
            {
                var result = await _repository.SelectDomicilioList();
                var data = new RespuestaAPI(result);

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
        public async Task<IActionResult> PayList()
        {
            try
            {
                var result = await _repository.SelectPayList();
                var data = new RespuestaAPI(result);

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
        public async Task<IActionResult> ResultList()
        {
            try
            {

                var result = await _repository.SelectResultList();

                var data = new RespuestaAPI(result);

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
                                         join p in _context.Servicios on o.ServicioId equals p.Id
                                         join se in _context.ServicioDatosFacturacions on p.Id equals se.ServicioId
                                         where p.EstatusProcesoId == 2 &&
                                         p.EstatusPagoId == 2 &&//SOLO IMPORTA QUE NO ESTEN PAGADOS
                                         p.EstatusFacturaId == 1//SOLO IMPORTA QUE NO ESTEN PAGADOS
                                         select o).ToList();

                foreach (var serviDetalle in listServiciosDetalles)
                {
                    ServiciosConsultaModel objSer = new ServiciosConsultaModel();
                    var serv = listServicios.Where(x => x.Id == serviDetalle.ServicioId).FirstOrDefault();

                    //objSer.CodigoPostal = serv.CodigoPostal;
                    //objSer.Colonia = serv.Colonia.ToUpper();
                    //objSer.Delegacion = serv.Delegacion.ToUpper();
                    //objSer.Estado = serv.Estado;
                    if (serv.TipoServicioId == 2)
                    {
                        objSer.CodigoPostal = serv.CodigoPostal;
                        objSer.Colonia = serv.Colonia.ToUpper();
                        objSer.Delegacion = serv.Delegacion.ToUpper();
                        objSer.Estado = serv.Estado;
                    }

                    if (serviDetalle != null)
                    {
                        objSer.ServicioId = serv.Id;
                        objSer.ApellidoMPaciente = serviDetalle.ApellidoMPaciente;
                        objSer.ApellidoPPaciente = serviDetalle.ApellidoPPaciente;
                        objSer.EstatusProcesoId = serv.EstatusProcesoId;
                        objSer.FechaHoraCreacion = serv.FechaHoraCreacion;
                        objSer.NombrePaciente = serviDetalle.NombrePaciente.ToUpper() + " " + serviDetalle.ApellidoPPaciente.ToUpper() + " " + serviDetalle.ApellidoMPaciente.ToUpper();
                        objSer.NombreTitular = (serviDetalle.NombreTitular == null) ? serviDetalle.NombreTitular.ToUpper() : null;
                        objSer.EstudioId = serviDetalle.EstudioId;

                        if (serviDetalle.Resultado == string.Empty)//CAMBIAR POR EL CATALOGO
                            objSer.Resultado = "PENDIENTE";
                        else
                            objSer.Resultado = serviDetalle.Resultado;

                        var estatus = (from o in _context.EstatusFactura
                                       where o.Id == serv.EstatusFacturaId
                                       select o).FirstOrDefault();

                        //LOGICA PARA MOSTRAR LOS DISTINTOS ESTATUS
                        if (estatus != null)
                        {
                            objSer.EstatusProcesoNombre = estatus.Nombre.ToUpper();
                        }

                        var estatusPago = (from o in _context.EstatusPago
                                           where o.Id == serv.EstatusPagoId
                                           select o).FirstOrDefault();

                        if (estatusPago != null)
                        {
                            objSer.EstatusPagoNombre = estatusPago.Nombre.ToUpper();
                        }



                        var estatusFactura = (from o in _context.EstatusFactura
                                              where o.Id == serv.EstatusFacturaId
                                              select o).FirstOrDefault();

                        if (estatusFactura != null)
                        {
                            objSer.EstatusFacturaNombre = estatusFactura.Nombre.ToUpper();
                        }

                        var estatusResultado = (from o in _context.EstatusResultado
                                                where o.Id == serv.EstatusResultadoId
                                                select o).FirstOrDefault();

                        if (estatusResultado != null)
                        {
                            objSer.EstatusResultadoNombre = estatusResultado.Nombre.ToUpper();
                        }

                        var estudio = (from o in _context.Estudios
                                       where o.Id == serviDetalle.EstudioId
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

                listServicios = (from o in _context.Servicios.Where(x => x.UsuarioId == claim.Value)
                                 select o).ToList();

                listServiciosDetalles = (from o in _context.ServicioDetalles
                                         join p in _context.Servicios on o.ServicioId equals p.Id
                                         where p.UsuarioId == claim.Value
                                         select o).ToList();

                foreach (var serviDetalle in listServiciosDetalles)
                {
                    ServiciosConsultaModel objSer = new ServiciosConsultaModel();
                    var serv = listServicios.Where(x => x.Id == serviDetalle.ServicioId).FirstOrDefault();

                    if (serv.TipoServicioId == 2)
                    {
                        objSer.CodigoPostal = serv.CodigoPostal;
                        objSer.Colonia = serv.Colonia.ToUpper();
                        objSer.Delegacion = serv.Delegacion.ToUpper();
                        objSer.Estado = serv.Estado;
                    }


                    if (serviDetalle != null)
                    {
                        objSer.ServicioId = serv.Id;
                        objSer.ApellidoMPaciente = serviDetalle.ApellidoMPaciente;
                        objSer.ApellidoPPaciente = serviDetalle.ApellidoPPaciente;
                        objSer.EstatusProcesoId = serv.EstatusProcesoId;
                        objSer.FechaHoraCreacion = serv.FechaHoraCreacion;
                        objSer.NombrePaciente = serviDetalle.NombrePaciente.ToUpper() + " " + serviDetalle.ApellidoPPaciente.ToUpper() + " " + serviDetalle.ApellidoMPaciente.ToUpper();
                        objSer.NombreTitular = (serviDetalle.NombreTitular == null) ? serviDetalle.NombreTitular.ToUpper() : null;
                        objSer.EstudioId = serviDetalle.EstudioId;

                        if (serviDetalle.Resultado == string.Empty)//CAMBIAR POR EL CATALOGO
                            objSer.Resultado = "PENDIENTE";
                        else
                            objSer.Resultado = serviDetalle.Resultado;

                        var estatus = (from o in _context.EstatusProceso
                                       where o.Id == serv.EstatusProcesoId
                                       select o).FirstOrDefault();

                        //LOGICA PARA MOSTRAR LOS DISTINTOS ESTATUS
                        if (estatus != null)
                        {
                            objSer.EstatusProcesoNombre = estatus.Nombre.ToUpper();
                        }

                        var estatusPago = (from o in _context.EstatusPago
                                           where o.Id == serv.EstatusPagoId
                                           select o).FirstOrDefault();

                        if (estatusPago != null)
                        {
                            objSer.EstatusPagoNombre = estatusPago.Nombre.ToUpper();
                        }



                        var estatusFactura = (from o in _context.EstatusFactura
                                              where o.Id == serv.EstatusFacturaId
                                              select o).FirstOrDefault();

                        if (estatusFactura != null)
                        {
                            objSer.EstatusFacturaNombre = estatusFactura.Nombre.ToUpper();
                        }

                        var estatusResultado = (from o in _context.EstatusResultado
                                                where o.Id == serv.EstatusResultadoId
                                                select o).FirstOrDefault();

                        if (estatusResultado != null)
                        {
                            objSer.EstatusResultadoNombre = estatusResultado.Nombre.ToUpper();
                        }

                        var estudio = (from o in _context.Estudios
                                       where o.Id == serviDetalle.EstudioId
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
                                 where serv.UsuarioId == claim.Value
                                 //Where(x => x.UsuarioId == claim.Value)
                                 select serv).ToList();

                listServiciosDetalles = (from o in _context.ServicioDetalles
                                         select o).ToList();

                if(listServiciosDetalles.Count>0)
                foreach (var serviDetalle in listServiciosDetalles)
                {
                    ServiciosConsultaModel objSer = new ServiciosConsultaModel();
                    var serv = listServicios.Where(x => x.Id == serviDetalle.ServicioId).FirstOrDefault();

                    if (serv.TipoServicioId == 2)
                    {
                        objSer.CodigoPostal = serv.CodigoPostal;
                        objSer.Colonia = serv.Colonia.ToUpper();
                        objSer.Delegacion = serv.Delegacion.ToUpper();
                        objSer.Estado = serv.Estado;
                    }


                    if (serviDetalle != null)
                    {

                        objSer.ServicioId = serv.Id;
                        objSer.ApellidoMPaciente = serviDetalle.ApellidoMPaciente;
                        objSer.ApellidoPPaciente = serviDetalle.ApellidoPPaciente;
                        objSer.EstatusProcesoId = serv.EstatusProcesoId;
                        objSer.FechaHoraCreacion = serv.FechaHoraCreacion;
                        objSer.NombrePaciente = serviDetalle.NombrePaciente.ToUpper() + " " + serviDetalle.ApellidoPPaciente.ToUpper() + " " + serviDetalle.ApellidoMPaciente.ToUpper();
                        objSer.NombreTitular = serviDetalle.NombreTitular.ToUpper();
                        objSer.EstudioId = serviDetalle.EstudioId;

                        if (serviDetalle.Resultado == string.Empty)//CAMBIAR POR EL CATALOGO
                            objSer.Resultado = "PENDIENTE";
                        else
                            objSer.Resultado = serviDetalle.Resultado;

                        var estatus = (from o in _context.EstatusProceso
                                       where o.Id == serv.EstatusProcesoId
                                       select o).FirstOrDefault();

                        //LOGICA PARA MOSTRAR LOS DISTINTOS ESTATUS
                        if (estatus != null)
                        {
                            objSer.EstatusProcesoNombre = estatus.Nombre.ToUpper();
                        }

                        var estatusPago = (from o in _context.EstatusPago
                                           where o.Id == serv.EstatusPagoId
                                           select o).FirstOrDefault();

                        if (estatusPago != null)
                        {
                            objSer.EstatusPagoNombre = estatusPago.Nombre.ToUpper();
                        }



                        var estatusFactura = (from o in _context.EstatusFactura
                                              where o.Id == serv.EstatusFacturaId
                                              select o).FirstOrDefault();

                        if (estatusFactura != null)
                        {
                            objSer.EstatusFacturaNombre = estatusFactura.Nombre.ToUpper();
                        }

                        var estatusResultado = (from o in _context.EstatusResultado
                                                where o.Id == serv.EstatusResultadoId
                                                select o).FirstOrDefault();

                        if (estatusResultado != null)
                        {
                            objSer.EstatusResultadoNombre = estatusResultado.Nombre.ToUpper();
                        }

                        var estudio = (from o in _context.Estudios
                                       where o.Id == serviDetalle.EstudioId
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


                Servicio servicio = new Servicio();
                //Filter specific claim    
                Claim claim = User.Claims.Where(x => x.Type == ClaimTypes.Email).FirstOrDefault();

                //Inicializa todos los estados de la solicitud
                servicio.EstatusProcesoId = 1;
                servicio.EstatusPagoId = 1;
                servicio.EstatusFacturaId = 1;
                servicio.EstatusResultadoId = 1;


                servicio.FechaHoraCreacion = DateTime.Now;
                servicio.FechaHoraModificacion = DateTime.Now;
                servicio.FolioPago = string.Empty;



                if (claim != null)
                {
                    servicio.UsuarioId = claim.Value;
                    servicio.UsuarioModificacion = claim.Value;
                    servicio.UsuarioCreacion = claim.Value;
                }

                //Tipo de servicio
                if (model.EnDomicilio)
                {
                    servicio.TipoServicioId = 2;
                    ///CAMBIOS
                    servicio.CodigoPostal = model.CodigoPostal;
                    servicio.Colonia = model.Colonia;
                    servicio.Estado = string.Empty;
                    servicio.Delegacion = model.Delegacion;
                    servicio.Pais = string.Empty;
                }
                else
                    servicio.TipoServicioId = 1;

                _context.Servicios.Add(servicio);
                _context.SaveChanges();


                foreach (var objPaciente in model.Pacientes)
                {

                    ServicioDetalle servicioDetalle = new ServicioDetalle();

                    servicioDetalle.NombrePaciente = objPaciente.NombrePaciente;
                    servicioDetalle.ApellidoMPaciente = objPaciente.ApellidoPPaciente;
                    servicioDetalle.ApellidoPPaciente = objPaciente.ApellidoMPaciente;
                    servicioDetalle.NombreTitular = objPaciente.NombreTitular;
                    servicioDetalle.Parentezco = objPaciente.Parentezco;
                    servicioDetalle.Resultado = string.Empty;
                    servicioDetalle.Ct = string.Empty;
                    servicioDetalle.AnioNacimiento = DateTime.Parse(objPaciente.AnioNacimiento);
                    servicioDetalle.EstudioId = int.Parse(objPaciente.EstudioId);
                    servicioDetalle.ServicioId = servicio.Id;//AQUI VA LA RELACION

                    _context.ServicioDetalles.Add(servicioDetalle);
                    _context.SaveChanges();
                }



                if (model.isFacturacion)
                {
                    DatosFacturacion datos = new DatosFacturacion();

                    if (model.TipoPersona == "MORAL")
                    {
                        datos.EmpresaFiscal = model.Delegacion;
                        datos.Colonia = model.EmpresaFiscalColonia;
                        datos.CodigoPostal = model.EmpresaFiscalCP;
                        datos.Delegacion = model.EmpresaFiscalDelegacion;
                        datos.Calle = model.EmpresaFiscalCalle;
                        datos.EmailF = model.EmailF;
                        datos.RfcF = model.RfcF;
                        datos.TelF = model.TelF;
                        datos.TipoPersona = model.TipoPersona;
                    }
                    else
                    {
                        datos.EmpresaFiscal = string.Empty;
                        datos.Colonia = string.Empty;
                        datos.CodigoPostal = string.Empty;
                        datos.Delegacion = string.Empty;
                        datos.Calle = string.Empty;
                        datos.EmailF = string.Empty;
                        datos.RfcF = model.RfcF;
                        datos.TelF = string.Empty;
                        datos.TipoPersona = model.TipoPersona;
                    }

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

        #region Alta de prepago
        [HttpPost("Prepago")]
        [AllowAnonymous]
        public IActionResult Prepago(RequestPrepagoModel model)
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

        #region Alta de pago
        //[HttpPost("Pago")]
        //[AllowAnonymous]
        //public IActionResult Pago(RequestPagoModel model)
        //{
        //    try
        //    {

        //        //Filter specific claim    
        //        Claim claim = User.Claims.Where(x => x.Type == ClaimTypes.Email).FirstOrDefault();

        //        var solicitud = (from o in _context.Servicios.Where(x => x.Id == int.Parse(model.IdSolicitud))
        //                         select o).FirstOrDefault();

        //        if (solicitud != null)
        //        {
        //            solicitud.EstatusProcesoId = 2;//EN PROCESO
        //            solicitud.EstatusPagoId = 2;//INDICANDO PAGADO
        //            solicitud.FechaHoraModificacion = DateTime.Now;

        //            if (claim != null)
        //            {
        //                solicitud.UsuarioModificacion = claim.Value;
        //            }
        //        }

        //        _context.Servicios.Attach(solicitud);
        //        _context.Entry(solicitud).State = EntityState.Modified;
        //        _context.SaveChanges();

        //        var data = new RespuestaAPI(solicitud);

        //        return Ok(data);
        //    }
        //    catch (Exception ex)
        //    {

        //        return Ok(ex);
        //    }
        //}

        [HttpPost("GuardarPago")]
        [AllowAnonymous]
        public IActionResult GuardarPago([FromForm] RequestPagoFileModel model)
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

                    if (model.ComprobanteP != null)
                    {

                        var fileComprobante = model.ComprobanteP;

                        if (model.ComprobanteP.Length > 0)
                        {
                            using (var fileStream = new FileStream(idFile.ToString() + fileComprobante.Name, FileMode.Create))
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

        #region Alta de resultado
        [HttpPost("Resultado")]
        public IActionResult Resultado(RequestResultFileModel model)
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

                    Guid idFile = Guid.NewGuid();

                    if (model.ComprobanteP != null)
                    {

                        var fileComprobante = model.ComprobanteP;

                        if (model.ComprobanteP.Length > 0)
                        {
                            using (var fileStream = new FileStream(idFile.ToString() + fileComprobante.Name, FileMode.Create))
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

        #region Alta de factura
        [HttpPost("Facturado")]
        public IActionResult Facturado(RequestFacturaFileModel model)
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

                    Guid idFile = Guid.NewGuid();

                    if (model.ComprobanteP != null)
                    {

                        var fileComprobante = model.ComprobanteP;

                        if (model.ComprobanteP.Length > 0)
                        {
                            using (var fileStream = new FileStream(idFile.ToString() + fileComprobante.Name, FileMode.Create))
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

        #region consulta solicitud

        [HttpPost("Consulta")]
        public IActionResult Consulta(ConsultaSolicitudModel oModel)
        {
            try
            {
                SolicitudConsultaModel servicio = new SolicitudConsultaModel();


                //Servicio servicio = new Servicio();
                var oServicio = _context.Servicios.Where(x => x.Id.Equals(int.Parse(oModel.IdSolicitud))).FirstOrDefault();

                //Filter specific claim    
                Claim claim = User.Claims.Where(x => x.Type == ClaimTypes.Email).FirstOrDefault();

                //Inicializa todos los estados de la solicitud
                servicio.EstatusProcesoId = oServicio.EstatusProcesoId;
                servicio.EstatusPagoId = oServicio.EstatusPagoId;
                servicio.EstatusFacturaId = oServicio.EstatusFacturaId;
                servicio.EstatusResultadoId = oServicio.EstatusResultadoId;

                servicio.FechaHoraCreacion = oServicio.FechaHoraCreacion;
                servicio.FechaHoraModificacion = oServicio.FechaHoraModificacion;
                servicio.FolioPago = oServicio.FolioPago;


                    servicio.UsuarioId = oServicio.UsuarioId;
                    servicio.UsuarioModificacion = oServicio.UsuarioModificacion;
                    servicio.UsuarioCreacion = oServicio.UsuarioCreacion;

                //Tipo de servicio
                //if (model.EnDomicilio)
                //{
                    servicio.TipoServicioId = oServicio.TipoServicioId;
                    ///CAMBIOS
                    servicio.CodigoPostal = oServicio.CodigoPostal;
                    servicio.Colonia = oServicio.Colonia;
                    servicio.Estado = oServicio.Estado;
                    servicio.Delegacion = oServicio.Delegacion;
                    servicio.Pais = oServicio.Pais;

                var _pacientes = _context.ServicioDetalles.Where(x => x.ServicioId.Equals(int.Parse(oModel.IdSolicitud))).ToList();

                List<DetalleConsultaModel> listPacientes = new List<DetalleConsultaModel>();

                foreach (var objPaciente in _pacientes)
                {
                    DetalleConsultaModel servicioDetalle = new DetalleConsultaModel();

                    servicioDetalle.NombrePaciente = objPaciente.NombrePaciente;
                    servicioDetalle.ApellidoMPaciente = objPaciente.ApellidoPPaciente;
                    servicioDetalle.ApellidoPPaciente = objPaciente.ApellidoMPaciente;
                    servicioDetalle.NombreTitular = objPaciente.NombreTitular;
                    servicioDetalle.Parentezco = objPaciente.Parentezco;
                    servicioDetalle.Resultado = objPaciente.Resultado;
                    servicioDetalle.Ct = objPaciente.Ct;
                    servicioDetalle.AnioNacimiento = objPaciente.AnioNacimiento;
                    servicioDetalle.EstudioId = objPaciente.EstudioId;
                    servicioDetalle.ServicioId = servicio.Id;//AQUI VA LA RELACION

                    listPacientes.Add(servicioDetalle);
                }

                servicio.Pacientes = listPacientes;

                ServicioDatosFacturacion _facturacion = _context.ServicioDatosFacturacions.Where(x => x.ServicioId.Equals(oModel.IdSolicitud)).FirstOrDefault();
                
                if (_facturacion!=null)
                {
                    var infoFacturacion = _context.DatosFacturacions.Where(x => x.Id.Equals(_facturacion.DatosFacturacionId)).FirstOrDefault();

                    FacturacionConsultaModel datos =new FacturacionConsultaModel();

                    if (infoFacturacion.TipoPersona == "MORAL")
                    {
                        datos.TipoPersona = infoFacturacion.TipoPersona;
                        datos.EmpresaFiscal = infoFacturacion.EmpresaFiscal;
                        datos.Colonia = infoFacturacion.Colonia;
                        datos.CodigoPostal = infoFacturacion.CodigoPostal;
                        datos.Delegacion = infoFacturacion.Delegacion;
                        datos.Calle = infoFacturacion.Calle;
                        datos.EmailF = infoFacturacion.EmailF;
                        datos.RfcF = infoFacturacion.RfcF;
                        datos.TelF = infoFacturacion.TelF;
                    }
                    else
                    {
                        datos.TipoPersona = infoFacturacion.TipoPersona;
                        datos.EmpresaFiscal = string.Empty;
                        datos.Colonia = string.Empty;
                        datos.CodigoPostal = string.Empty;
                        datos.Delegacion = string.Empty;
                        datos.Calle = string.Empty;
                        datos.EmailF = string.Empty;
                        datos.RfcF = infoFacturacion.RfcF;
                        datos.TelF = string.Empty;
                    }

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
    }
}
