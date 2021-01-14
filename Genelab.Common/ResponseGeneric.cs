using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace Genelab.Common
{
    /// <summary>
    /// Representa la respuesta de un servicio en la que puede viajar un resultado o respuesta de un tipo. 
    /// </summary>
    /// <typeparam name="T">Tipo de dato definido para el resultado obtenido en la respuesta.</typeparam>
    [DataContract()]
    public partial class ResponseGeneric<T> : Response
    {
        /// <summary>
        /// Obtiene o Asigna el Valor del resultado que se devuelve como parte de la respuesta del servicio
        /// </summary>
        [DataMember]
        public T Response { get; set; }
        #region Constructor's
        /// <summary>
        /// Construye la respuesta del servicio con el valor de la respuesta
        /// </summary>
        /// <param name="returnObject">Objeto del tipo de dato que se espera en la respuesta</param>
        public ResponseGeneric(T returnObject)
            : base()
        {
            this.Response = returnObject;
            this.CurrentException = null;
        }
        /// <summary>
        /// Construye la respuesta a partir de una excepción. La respuesta se genera con el estado Fallido 
        /// </summary>
        /// <param name="currentException">Objeto de la Excepción presentada en el servicio</param>
        public ResponseGeneric(Exception currentException)
            : base(currentException)
        {
            Response = default(T);
        }
        /// <summary>
        /// Construye la respuesta fallida a partir de un mensaje de error. La respuesta se genera con el estado Fallido 
        /// </summary>
        /// <param name="currentExceptionMessage"></param>
        public ResponseGeneric(string currentExceptionMessage)
            : base(currentExceptionMessage)
        {
            Response = default(T);
        }
        /// <summary>
        /// Construye la respuesta Genérica a partir de una colección de argumentos para formar un mensaje. La respuesta se genera con el estado Fallido 
        /// </summary>
        /// <param name="format">Formato del mensaje que se va a construir con los argumentos indicados</param>
        /// <param name="args">Argumentos que se agregarán al mensaje.</param>
        public ResponseGeneric(string format, params object[] args)
            : base(format, args)
        {
            Response = default(T);
        }


        #endregion
    }
}
