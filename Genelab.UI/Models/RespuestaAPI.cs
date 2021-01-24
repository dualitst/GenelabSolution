using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Genelab.UI.Models
{
    public class RespuestaAPI
    {
        public Object Data { get; set; }
        public ResponseStatus MessageType { get; set; }
        public string InfoMessage { get; set; }
        public string ErrorMessage { get; set; }
    }

    public enum ResponseStatus
    {
        Success, Failed, Warning
    }
}
