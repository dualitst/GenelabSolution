using Genelab.API.Models;
using Genelab.Common;
using Genelab.Database;
using Genelab.Database.Data;
using Genelab.Database.Models;
using Genelab.Database.Repositories;
using Genelab.EmailService;
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
using static Genelab.API.Models.AccountViewModel;

namespace Genelab.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class RequestController : ControllerBase
    {
        private readonly GenelabContext _context;
        private readonly IMemberRepository _repository;
        private readonly UserManager<ApplicationUser> _userManager;
        private RoleManager<IdentityRole> roleManager;
        private readonly IEmailSender _emailSender;
        public RequestController(GenelabContext context, 
                                UserManager<ApplicationUser> userManager,
                                IMemberRepository repository,
                                RoleManager<IdentityRole> roleMgr,
                                IEmailSender emailSender)
        {
            _context = context;
            _repository = repository;
            _userManager = userManager;
            roleManager = roleMgr;
            _emailSender = emailSender;
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
        public async Task<IActionResult> FacturaList()
        {
            try
            {

                var result = await _repository.SelectFacturaList();
                var data = new RespuestaAPI(result);

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
        public async Task<IActionResult> MisResultados()
        {
            try
            {  //Filter specific claim    
                Claim claim = User.Claims.Where(x => x.Type == ClaimTypes.Email).FirstOrDefault();
                string usuario=string.Empty;

                if (claim != null)
                    usuario = claim.Value;

                var result = await _repository.SelectMyList(usuario);
                var data = new RespuestaAPI(result);

              
                return Ok(data);
            }
            catch (Exception ex)
            {

                return Ok(ex);
            }
        }

        [HttpPost("MyBill")]
        public async Task<IActionResult> MisFacturas()
        {
            try
            { //Filter specific claim    
                Claim claim = User.Claims.Where(x => x.Type == ClaimTypes.Email).FirstOrDefault();
                string usuario = string.Empty;

                if (claim != null)
                    usuario = claim.Value;

                var result = await _repository.SelectMyBillList(usuario);
                var data = new RespuestaAPI(result);

                return Ok(data);
            }
            catch (Exception ex)
            {

                return Ok(ex);
            }
        }

        [HttpPost("UserData")]
        public async Task<IActionResult> UserData(CurrentUserModel oModel)
        {
            try
            {  //Filter specific claim    
                Claim claim = User.Claims.Where(x => x.Type == ClaimTypes.Email).FirstOrDefault();
                string usuario = string.Empty;

                if (claim != null)
                    usuario = claim.Value;

                var _user=await _userManager.FindByNameAsync(usuario);

                var data = new RespuestaAPI(_user);


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
        public async Task<IActionResult> Alta(RequestModel model)
        {
            try
            {


                Servicio servicio = new Servicio();
                //Filter specific claim    
                Claim claim = User.Claims.Where(x => x.Type == ClaimTypes.Email).FirstOrDefault();

                var distintosCorreos = model.Pacientes.Where(x => x.CorreoE!=null).Select(x=>x.CorreoE).ToList().Distinct();

                //solo cuando se cargue un correo
                foreach (var corr in distintosCorreos)
                {
                    var obj = model.Pacientes.Where(x => x.CorreoE.Equals(corr)).FirstOrDefault();

                    if (obj.CorreoE != null)
                    {

                        RegisterViewModel userNew = new RegisterViewModel();

                        userNew.ApellidoMaterno = obj.ApellidoMPaciente;
                        userNew.ApellidoPaterno = obj.ApellidoPPaciente;
                        userNew.Email = obj.CorreoE;
                        userNew.Nombre = obj.NombrePaciente;

                        await CrearCuenta(userNew);
                    }
                }

                //Inicializa todos los estados de la solicitud
                servicio.EstatusProcesoId = 1;
                servicio.EstatusPagoId = 1;
                servicio.EstatusFacturaId = 1;
                if (model.FechaHoraVisita != null && model.FechaHoraVisita != "")
                    servicio.FechaHoraVisitaDom = DateTime.Parse(model.FechaHoraVisita);
                else
                    servicio.FechaHoraVisitaDom = DateTime.Now;

                servicio.FechaHoraCreacion = DateTime.Now;
                servicio.FechaHoraModificacion = DateTime.Now;
                servicio.FolioPago = string.Empty;

                if (claim != null)
                {
                    servicio.UsuarioCreacion = claim.Value;
                    servicio.UsuarioModificacion = claim.Value;
                }

                //Tipo de servicio
                if (model.EnDomicilio)
                {
                    servicio.TipoServicioId = 2;
                    ///CAMBIOS
                    servicio.Calle = model.Calle;
                    servicio.CodigoPostal = model.CodigoPostal;
                    servicio.Colonia = model.Colonia;
                    servicio.Estado = string.Empty;
                    servicio.Delegacion = model.Delegacion;
                    servicio.Pais = string.Empty;
                    servicio.Telefono = model.Telefono;
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
                    if(objPaciente.Parentezco!=null)
                        servicioDetalle.Parentezco = objPaciente.Parentezco;
                    else
                        servicioDetalle.Parentezco = string.Empty;
                    servicioDetalle.Resultado = string.Empty;
                    servicioDetalle.Ct = string.Empty;
                    servicioDetalle.AnioNacimiento = DateTime.Parse(objPaciente.AnioNacimiento);
                    servicioDetalle.EstudioId = int.Parse(objPaciente.EstudioId);
                    servicioDetalle.ServicioId = servicio.Id;//AQUI VA LA RELACION

                    //nuevos campos
                    servicioDetalle.EstatusMuestraId = 1;
                    //servicioDetalle.FechaHoraMuestra = DateTime.Now;

                    servicioDetalle.EstatusResultadoId = 1;
                    //servicioDetalle.FechaHoraResultado = DateTime.Now;

                    if (objPaciente.CorreoE != null)
                        servicioDetalle.UsuarioServicio = objPaciente.CorreoE;

                    _context.ServicioDetalles.Add(servicioDetalle);
                    _context.SaveChanges();
                }



                if (model.isFacturacion)
                {
                    DatosFacturacion datos = new DatosFacturacion();

                    if (model.TipoPersona == "MORAL")
                    {
                        datos.EmpresaFiscal = model.EmpresaFiscal;
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
                        datos.EmpresaFiscal = model.EmpresaFiscal;
                        datos.Colonia = string.Empty;
                        datos.CodigoPostal = string.Empty;
                        datos.Delegacion = string.Empty;
                        datos.Calle = string.Empty;
                        datos.EmailF = model.EmailF;
                        datos.RfcF = model.RfcF;
                        datos.TelF = model.TelF;
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

        #region Alta de solicitud
        [HttpPost("Actualizar")]
        public async Task<IActionResult> Actualizar(RequestModel model)
        {
            try
            {
                //Servicio servicio = new Servicio();
                Servicio servicio = _context.Servicios.Where(x => x.Id.Equals(model.Id)).FirstOrDefault();

                //Filter specific claim    
                Claim claim = User.Claims.Where(x => x.Type == ClaimTypes.Email).FirstOrDefault();

                var distintosCorreos = model.Pacientes.Where(x => x.CorreoE != null).Select(x => x.CorreoE).ToList().Distinct();

                //solo cuando se cargue un correo
                foreach (var corr in distintosCorreos)
                {
                    if (corr != string.Empty && corr != null)
                    {
                        var obj = model.Pacientes.Where(x => x.CorreoE.Equals(corr)).FirstOrDefault();

                        if (obj.CorreoE != null)
                        {

                            RegisterViewModel userNew = new RegisterViewModel();

                            userNew.ApellidoMaterno = obj.ApellidoMPaciente;
                            userNew.ApellidoPaterno = obj.ApellidoPPaciente;
                            userNew.Email = obj.CorreoE;
                            userNew.Nombre = obj.NombrePaciente;

                            await CrearCuenta(userNew);
                        }
                    }
                }

                //Inicializa todos los estados de la solicitud
                //servicio.EstatusProcesoId = 1;
                //servicio.EstatusPagoId = 1;
                //servicio.EstatusFacturaId = 1;

                if (model.FechaHoraVisita != null && model.FechaHoraVisita != "")
                    servicio.FechaHoraVisitaDom = DateTime.Parse(model.FechaHoraVisita);
                else
                    servicio.FechaHoraVisitaDom = DateTime.Now;

                servicio.FechaHoraModificacion = DateTime.Now;
                servicio.FolioPago = string.Empty;

                if (claim != null)
                {
                    servicio.UsuarioModificacion = claim.Value;
                }

                //Tipo de servicio
                if (model.EnDomicilio)
                {
                    servicio.TipoServicioId = 2;
                    ///CAMBIOS
                    servicio.Calle = model.Calle;
                    servicio.CodigoPostal = model.CodigoPostal;
                    servicio.Colonia = model.Colonia;
                    servicio.Estado = string.Empty;
                    servicio.Delegacion = model.Delegacion;
                    servicio.Pais = string.Empty;
                    servicio.Telefono = model.Telefono;
                }
                else
                    servicio.TipoServicioId = 1;

                _context.Servicios.Update(servicio);
                _context.SaveChanges();

                var _pacientesExist = _context.ServicioDetalles.Where(x => x.ServicioId.Equals(model.Id)).ToList();

                if (_pacientesExist != null)
                {
                    _context.ServicioDetalles.RemoveRange(_pacientesExist);
                    _context.SaveChanges();
                }

                foreach (var objPaciente in model.Pacientes)
                {

                    ServicioDetalle servicioDetalle = new ServicioDetalle();

                    servicioDetalle.NombrePaciente = objPaciente.NombrePaciente;
                    servicioDetalle.ApellidoMPaciente = objPaciente.ApellidoPPaciente;
                    servicioDetalle.ApellidoPPaciente = objPaciente.ApellidoMPaciente;
                    servicioDetalle.NombreTitular = objPaciente.NombreTitular;
                    if (objPaciente.Parentezco != null)
                        servicioDetalle.Parentezco = objPaciente.Parentezco;
                    else
                        servicioDetalle.Parentezco = string.Empty;
                    servicioDetalle.Resultado = string.Empty;
                    servicioDetalle.Ct = string.Empty;
                    servicioDetalle.AnioNacimiento = DateTime.Parse(objPaciente.AnioNacimiento);
                    servicioDetalle.EstudioId = int.Parse(objPaciente.EstudioId);
                    servicioDetalle.ServicioId = servicio.Id;//AQUI VA LA RELACION

                    //nuevos campos
                    servicioDetalle.EstatusMuestraId = 1;
                    //servicioDetalle.FechaHoraMuestra = DateTime.Now;

                    servicioDetalle.EstatusResultadoId = 1;
                    //servicioDetalle.FechaHoraResultado = DateTime.Now;

                    if (objPaciente.CorreoE != null)
                        servicioDetalle.UsuarioServicio = objPaciente.CorreoE;

                    _context.ServicioDetalles.Add(servicioDetalle);
                    _context.SaveChanges();
                }

                var _datosFactura = _context.ServicioDatosFacturacions.Where(x => x.ServicioId.Equals(model.Id)).ToList();

                if (_datosFactura != null)
                {
                    foreach (var factura in _datosFactura)
                    {
                        var datosFac = _context.DatosFacturacions.Where(x => x.Id.Equals(factura.Id)).FirstOrDefault();
                        if (datosFac != null)
                        {
                            _context.DatosFacturacions.Remove(datosFac);
                            _context.SaveChanges();
                        }
                    }

                    _context.ServicioDatosFacturacions.RemoveRange(_datosFactura);
                    _context.SaveChanges();

                }

                if (model.isFacturacion)
                {
                    DatosFacturacion datos = new DatosFacturacion();

                    if (model.TipoPersona == "MORAL")
                    {
                        datos.EmpresaFiscal = model.EmpresaFiscal;
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
                        datos.EmpresaFiscal = model.EmpresaFiscal;
                        datos.Colonia = string.Empty;
                        datos.CodigoPostal = string.Empty;
                        datos.Delegacion = string.Empty;
                        datos.Calle = string.Empty;
                        datos.EmailF = model.EmailF;
                        datos.RfcF = model.RfcF;
                        datos.TelF = model.TelF;
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
                        solicitud.UsuarioIdPrepago = claim.Value;
                        //solicitud.FechaHoraPago = DateTime.Now;
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
                        solicitud.UsuarioIdPago = claim.Value;
                        solicitud.FechaHoraPago = DateTime.Now;
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
        public IActionResult Resultado([FromForm] RequestResultFileModel model)
        {
            try
            {

                //Filter specific claim    
                Claim claim = User.Claims.Where(x => x.Type == ClaimTypes.Email).FirstOrDefault();

                var detalle = (from o in _context.ServicioDetalles.Where(x => x.Id == int.Parse(model.IdSolicitud))
                                 select o).FirstOrDefault();

                if (detalle != null)
                {
                    var solicitud= (from o in _context.Servicios.Where(x => x.Id == detalle.ServicioId)
                                    select o).FirstOrDefault();

                            solicitud.EstatusProcesoId = 2;//EN PROCESO POR SI CARGAN RESULTADO ANTES DE PAGO
                            solicitud.FechaHoraModificacion = DateTime.Now;

                    if (claim != null)
                    {
                        solicitud.UsuarioModificacion = claim.Value;
                        detalle.UsuarioIdResultado= claim.Value;
                    }

                    detalle.FechaHoraResultado = DateTime.Now;
                    detalle.EstatusResultadoId = 2;
                    detalle.Resultado = model.Resultado;
                    detalle.Ct = model.Ct;
                    //PENDIENTE COMENTARIOS

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

                    _context.ServicioDetalles.Attach(detalle);
                    _context.Entry(detalle).State = EntityState.Modified;
                    _context.SaveChanges();

                    _context.Servicios.Attach(solicitud);
                    _context.Entry(solicitud).State = EntityState.Modified;
                    _context.SaveChanges();
                }

                

                var data = new RespuestaAPI(detalle);

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
        public IActionResult Facturado([FromForm] RequestFacturaFileModel model)
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
                        solicitud.UsuarioIdFactura = claim.Value;
                        solicitud.FechaHoraFactura = DateTime.Now;
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

                servicio.IsFacturacion = false;

                //Servicio servicio = new Servicio();
                var oServicio = _context.Servicios.Where(x => x.Id.Equals(int.Parse(oModel.IdSolicitud))).FirstOrDefault();

                //Filter specific claim    
                Claim claim = User.Claims.Where(x => x.Type == ClaimTypes.Email).FirstOrDefault();

                //Inicializa todos los estados de la solicitud
                servicio.EstatusProcesoId = oServicio.EstatusProcesoId;
                servicio.EstatusPagoId = oServicio.EstatusPagoId;
                servicio.EstatusFacturaId = oServicio.EstatusFacturaId;
                //servicio.EstatusResultadoId = oServicio.EstatusResultadoId;

                servicio.FechaHoraCreacion = oServicio.FechaHoraCreacion;
                servicio.FechaHoraModificacion = oServicio.FechaHoraModificacion;
                servicio.FolioPago = oServicio.FolioPago;


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
                    servicio.Telefono = oServicio.Telefono;
                    servicio.Calle = oServicio.Calle;
                    if (oServicio.FechaHoraVisitaDom != null)
                    {
                    DateTime visita = (DateTime)oServicio.FechaHoraVisitaDom;

                        servicio.FechaHoraVisitaDom = visita.ToString("yyyy-MM-dd");
                    }

                    var _pacientes = _context.ServicioDetalles.Where(x => x.ServicioId.Equals(int.Parse(oModel.IdSolicitud))).ToList();

                List<DetalleConsultaModel> listPacientes = new List<DetalleConsultaModel>();

                foreach (var objPaciente in _pacientes)
                {
                    DetalleConsultaModel servicioDetalle = new DetalleConsultaModel();

                    servicioDetalle.Id = objPaciente.Id;
                    servicioDetalle.NombrePaciente = objPaciente.NombrePaciente;
                    servicioDetalle.ApellidoMPaciente = objPaciente.ApellidoPPaciente;
                    servicioDetalle.ApellidoPPaciente = objPaciente.ApellidoMPaciente;
                    servicioDetalle.NombreTitular = objPaciente.NombreTitular;
                    servicioDetalle.Parentezco = objPaciente.Parentezco;
                    servicioDetalle.Resultado = objPaciente.Resultado;
                    servicioDetalle.Ct = objPaciente.Ct;
                    if (objPaciente.AnioNacimiento != null)
                    {
                        DateTime _fecha = (DateTime)objPaciente.AnioNacimiento;
                        servicioDetalle.AnioNacimiento = _fecha.ToString("yyyy-MM-dd");
                    }
                    servicioDetalle.EstudioId = objPaciente.EstudioId;
                    servicioDetalle.ServicioId = servicio.Id;//AQUI VA LA RELACION
                    servicioDetalle.EstudioNombre = _context.Estudios.Where(x => x.Id.Equals(objPaciente.EstudioId)).Select(x=>x.Nombre).FirstOrDefault();
                    servicioDetalle.UsuarioServicio = objPaciente.UsuarioServicio;

                    listPacientes.Add(servicioDetalle);
                }

                servicio.Pacientes = listPacientes;

                ServicioDatosFacturacion _facturacion = _context.ServicioDatosFacturacions.Where(x => x.ServicioId.Equals(int.Parse(oModel.IdSolicitud))).FirstOrDefault();
                
                if (_facturacion!=null)
                {
                    var infoFacturacion = _context.DatosFacturacions.Where(x => x.Id.Equals(_facturacion.DatosFacturacionId)).FirstOrDefault();

                    servicio.IsFacturacion = true;

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
                        datos.EmpresaFiscal = infoFacturacion.EmpresaFiscal;
                        datos.Colonia = string.Empty;
                        datos.CodigoPostal = string.Empty;
                        datos.Delegacion = string.Empty;
                        datos.Calle = string.Empty;
                        datos.EmailF = infoFacturacion.EmailF;
                        datos.RfcF = infoFacturacion.RfcF;
                        datos.TelF = infoFacturacion.TelF;
                    }

                    servicio.DatosFacturacion = datos;

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

        [HttpPost("ConsultaPacientes")]
        public IActionResult ConsultaPacientes(ConsultaSolicitudModel oModel)
        {
            try
            {
                var _pacientes = _context.ServicioDetalles.Where(x => x.ServicioId.Equals(int.Parse(oModel.IdSolicitud))).ToList();

                List<DetalleConsultaModel> listPacientes = new List<DetalleConsultaModel>();

                foreach (var objPaciente in _pacientes)
                {
                    DetalleConsultaModel servicioDetalle = new DetalleConsultaModel();

                    servicioDetalle.Id = objPaciente.Id;
                    servicioDetalle.NombrePaciente = objPaciente.NombrePaciente;
                    servicioDetalle.ApellidoMPaciente = objPaciente.ApellidoPPaciente;
                    servicioDetalle.ApellidoPPaciente = objPaciente.ApellidoMPaciente;
                    servicioDetalle.NombreTitular = objPaciente.NombreTitular;
                    servicioDetalle.Parentezco = objPaciente.Parentezco;
                    servicioDetalle.Resultado = objPaciente.Resultado;
                    servicioDetalle.Ct = objPaciente.Ct;
                    if (objPaciente.AnioNacimiento != null)
                    {
                        DateTime _fecha = (DateTime)objPaciente.AnioNacimiento;
                        servicioDetalle.AnioNacimiento = _fecha.ToString("yyyy-MM-dd");
                    }
                    servicioDetalle.EstudioId = objPaciente.EstudioId;
                    servicioDetalle.ServicioId = objPaciente.ServicioId;//AQUI VA LA RELACION
                    servicioDetalle.EstudioNombre = _context.Estudios.Where(x => x.Id.Equals(objPaciente.EstudioId)).Select(x => x.Nombre).FirstOrDefault();
                    servicioDetalle.UsuarioServicio = objPaciente.UsuarioServicio;
                    
                    var _precio= _context.Estudios.Where(x => x.Id.Equals(objPaciente.EstudioId)).Select(x => x.Precio).FirstOrDefault();
                    servicioDetalle.Precio = _precio;

                    listPacientes.Add(servicioDetalle);
                }

                var data = new RespuestaAPI(listPacientes);

                return Ok(data);
            }
            catch (Exception ex)
            {

                return Ok(ex);
            }
        }


        public async Task<bool> CrearCuenta(RegisterViewModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Email);

            if (user == null && model.Email != string.Empty && model.Email!=null)
            {
                user = new ApplicationUser
                {
                    UserName = model.Email,
                    Email = model.Email,
                    EmailConfirmed = true,
                    Nombre = model.Nombre,
                    ApellidoPaterno = model.ApellidoPaterno,
                    ApellidoMaterno = model.ApellidoMaterno
                };

                try { 

                string _password=Utils.RandomString(5, false);
                await _userManager.CreateAsync(user, "Passw0rd$"+ _password);

                var result1 = await _userManager.AddToRoleAsync(user, "Public");
            

                    var message = new Message(new string[] { model.Email }, "Genelab registro", "Bienvenido a Genelab, Se ha dado de alta su cuenta satisfactoriamente. Su contraseña es "+ _password);
                    _emailSender.SendEmail(message," Se ha dado de alta su cuenta satisfactoriamente. Su contraseña es Passw0rd$"+ _password);
                }
                catch (Exception ex)
                {
                    return false;
                }


                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
