﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Genelab.API.Models
{
    public class FacturacionModel
    {
        public string Id { get; set; }

        public string Cliente { get; set; }

        public string Paciente { get; set; }

        public string Fecha { get; set; }

        public string Estudio{ get; set; }

        public string Estatus { get; set; }
    }
}
