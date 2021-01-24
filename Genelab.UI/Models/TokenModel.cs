using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Genelab.UI.Models
{
    public class TokenModel
    {
        public string rawData { get; set; }
        public List<ClaimModel> claims { get; set; }
    }

    public class ClaimModel
    {
        public string issuer { get; set; }
        public string originalIssuer { get; set; }
        public object properties { get; set; }
        public string  subject { get; set; }
        public string type { get; set; }
        public string value { get; set; }
        public string valueType { get; set; }
    }
}
