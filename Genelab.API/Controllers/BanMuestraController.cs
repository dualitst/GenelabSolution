using Genelab.API.Models;
using Genelab.Common;
using Genelab.Database.Data;
using Genelab.Database.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Genelab.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BanMuestraController : ControllerBase
    {
        private readonly GenelabContext _context;
        private readonly IMemberRepository _repository;
        public BanMuestraController(GenelabContext context,
                                UserManager<IdentityUser> userManager,
                                IMemberRepository repository)
        {
            _context = context;
            _repository = repository;
        }

        #region Alta de pago

        [HttpPost("AltaMuestra")]
        public IActionResult AltaMuestra([FromForm]TomaMuestraModel model)
        {
            try
            {

                //Filter specific claim    
                Claim claim = User.Claims.Where(x => x.Type == ClaimTypes.Email).FirstOrDefault();

                var servicioDetalle = (from o in _context.ServicioDetalles.Where(x => x.Id == int.Parse(model.IdServicioDetalle))
                                 select o).FirstOrDefault();

                if (servicioDetalle != null)
                {
                    servicioDetalle.EstatusMuestraId = 2;//EN PROCESO
                    servicioDetalle.FechaHoraMuestra = DateTime.Now;

                    if (claim != null)
                    {
                        servicioDetalle.UsuarioMuestraId = claim.Value;
                    }
                }

                _context.ServicioDetalles.Attach(servicioDetalle);
                _context.Entry(servicioDetalle).State = EntityState.Modified;
                _context.SaveChanges();

                var data = new RespuestaAPI(servicioDetalle);

                return Ok(data);
            }
            catch (Exception ex)
            {

                return Ok(ex);
            }
        }

        #endregion

        #region Bandeja de muestras
        [HttpPost("MuestraList")]
        public async Task<IActionResult> MuestraList()
        {
            try
            {
                var result = await _repository.SelectMuestraList();
                var data = new RespuestaAPI(result);

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
