using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace Genelab.Common
{
    [DataContract(IsReference = true)]
    public partial class RespuestaAPI : IRespuestaAPI
    {

        public RespuestaAPI(Object Data, ResponseStatus MessageType, string InfoMessage, string ErrorMessage)
        {
            this.Data = Data;
            this.MessageType = MessageType;
            this.InfoMessage = InfoMessage;
            this.ErrorMessage = ErrorMessage;
        }

        public RespuestaAPI(Object Data)
        {
            this.Data = Data;
            this.MessageType = ResponseStatus.Success;
            this.InfoMessage = "Proceso efectuado correctamente.";
            this.ErrorMessage = String.Empty;
        }

        public RespuestaAPI(string ErrorMessage)
        {
            this.Data = String.Empty;
            this.MessageType = ResponseStatus.Failed;
            this.InfoMessage = ErrorMessage;
            this.ErrorMessage = ErrorMessage;
        }

        public RespuestaAPI(Exception ex)
        {
            string ErrorMessage = "";

            if (ex is ApplicationException)
            {
                ErrorMessage = ex.Message;
                this.MessageType = ResponseStatus.Warning;
            }
            else
            {
                ErrorMessage = ex.ToString();
                this.MessageType = ResponseStatus.Failed;
            }

            this.Data = String.Empty;
            this.InfoMessage = ErrorMessage;
            this.ErrorMessage = ErrorMessage;
        }

        [DataMember]
        public Object Data { get; set; }
        [DataMember]
        public ResponseStatus MessageType { get; set; }
        [DataMember]
        public string InfoMessage { get; set; }
        [DataMember]
        public string ErrorMessage { get; set; }
    }

    public interface IRespuestaAPI
    {
        Object Data { get; set; }
        ResponseStatus MessageType { get; set; }
        string InfoMessage { get; set; }
        string ErrorMessage { get; set; }
    }
}
