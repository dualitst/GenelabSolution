using Genelab.API.Models;
using Genelab.Common;
using Genelab.Database.Data;
using Genelab.Database.Models;
using Genelab.Database.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Genelab.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class EmpresasController : ControllerBase
    {
        private readonly GenelabContext _context;//Acceder a la base de datos
        private readonly IMemberRepository _repository;//Acceder a los stored procedures de la base de datos
        public EmpresasController(GenelabContext context,
                                UserManager<ApplicationUser> userManager,
                                IMemberRepository repository)
        {
            _context = context;
            _repository = repository;
        }


        [HttpPost("consulta")]
        public IActionResult consulta()
        {
            try
            {
                //TODO LO QUE TRUENE DENTRO SE VA A CACHAR
                List<Empresa> listEmpresas = new List<Empresa>();

                listEmpresas = _context.Empresas.ToList();

                var data = new RespuestaAPI(listEmpresas);

                return Ok(data);

            }//maneja excepciones (errores)
            catch (Exception ex)
            {
                return Ok(ex);
            }
        }

        [HttpPost("insertar")]
        public IActionResult insertar(EmpresaModel model)
        {
            try
            {
                //TODO LO QUE TRUENE DENTRO SE VA A CACHAR
                Empresa oInsert = new Empresa();

                oInsert.Calle = model.Calle;
                oInsert.CodigoPostal = model.CodigoPostal;
                oInsert.Colonia = model.Colonia;
                oInsert.Delegacion = model.Delegacion;
                oInsert.EmailF = model.EmailF;
                oInsert.EmpresaFiscal = model.EmpresaFiscal;
                oInsert.RfcF = model.RfcF;
                oInsert.TelF = model.TelF;

                _context.Empresas.Add(oInsert);
                _context.SaveChanges();

                var data = new RespuestaAPI(oInsert);

                return Ok(data);

            }//maneja excepciones (errores)
            catch (Exception ex)
            {
                return Ok(ex);
            }
        }

    }
}
