using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace Genelab.Common
{
    /// Representa la respuesta básica de un servicio, en la que se valida el estado del resultado
    /// </summary>
    [DataContract()]
    public partial class Response
    {
        /// <summary>
        /// Obtiene o Asigna el estado de la Respuesta
        /// </summary>
        [DataMember]
        public ResponseStatus Status { get; set; }
        /// <summary>
        /// Obtiene o Asigna el mensaje de error. Para el caso en el que la respuesta esta fallida.
        /// </summary>
        [DataMember]
        public string CurrentException { get; set; }
        /// <summary>
        /// Construye una respuesta básica a partir de una excepción.
        /// La respuesta se construye como Fallida
        /// </summary>
        /// <param name="currentException">Objeto de la Excepción. El mensaje de error será de esta excepción.</param>
        public Response(Exception currentException)
        {
            this.CurrentException = currentException.ToString();
            this.Status = ResponseStatus.Failed;
        }
        /// <summary>
        /// Construye una respuesta básica a partir de un mensaje de error.
        /// La respuesta se construye como Fallida.
        /// </summary>
        /// <param name="currentExceptionMessage">Mensaje de error que se presentará en la respuesta.</param>
        public Response(string currentExceptionMessage)
        {
            this.CurrentException = currentExceptionMessage;
            this.Status = ResponseStatus.Failed;
        }
        /// <summary>
        /// Construye una respuesta básica a partir de un mensaje de error con argumentos para formar un texto.
        /// La respuesta se construye como Fallida.
        /// </summary>
        /// <param name="format">Formato del mensaje de error que se enviará</param>
        /// <param name="args">Argumentos para armar el mensaje de error.</param>
        public Response(string format, params object[] args)
        {
            this.CurrentException = string.Format(format, args);
            this.Status = ResponseStatus.Failed;
        }
        /// <summary>
        /// Construye una respuesta básica exitosa.
        /// </summary>
        public Response()
        {
            this.Status = ResponseStatus.Success;
        }
    }

}
