using Genelab.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Genelab.API.Models
{
    public class SolicitudConsultaModel : Servicio
    {
        public List<DetalleConsultaModel> Pacientes { get; set; }

        public bool IsFacturacion { get; set; }
        public FacturacionConsultaModel DatosFacturacion { get; set; }

    }
    public class DetalleConsultaModel : ServicioDetalle
    { 
        public string EstudioNombre { get; set; }
    }

    public class FacturacionConsultaModel : DatosFacturacion
    {
    }
}
