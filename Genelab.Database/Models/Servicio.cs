using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Genelab.Database.Models
{
    public class Paciente {

      
    }
    public class Servicio
    {
        
        public  int Id { get; set; }     
        public  int EstatusProcesoId { get; set; }
        public int EstatusPagoId { get; set; }

        public string UsuarioIdPrepago { get; set; }
        public DateTime? FechaHoraPrepago { get; set; }

        public string UsuarioIdPago { get; set; }
        public DateTime? FechaHoraPago { get; set; }
        public int EstatusFacturaId { get; set; }
        public string UsuarioIdFactura { get; set; }
        public DateTime? FechaHoraFactura { get; set; } 
        public  int TipoServicioId { get; set; }
        public  string FolioPago { get; set; }
        public  DateTime FechaHoraCreacion { get; set; }
        public  DateTime FechaHoraModificacion { get; set; }    
        public  string UsuarioCreacion { get; set; }
        public  string UsuarioModificacion { get; set; }
        public string Calle { get; set; }
        public string CodigoPostal { get; set; }
        public string Colonia { get; set; }
        public string Delegacion { get; set; }
        public string Estado { get; set; }
        public string Pais { get; set; }

        //DATOS NUEVOS PARA DOMICILIO
        public DateTime FechaHoraVisita { get; set; }
    }

}
