/*eslint eqeqeq:0*/
/// <summary>
/// Nombre: CardInfo
/// Descripcion: 
/// Fecha de creación: 2018-10-03
/// Autor: mzamudio
/// 
/// Modificaciones:
/// -----------------------------------------------------------------------------
/// Número: 
/// Ticket: 
/// Descripcion:
/// Fecha de creación:
/// Autor:
/// -----------------------------------------------------------------------------
/// </summary>


var cardInfo = function () {
    /// -------------------------------------------------------------------------
    /// Objetos
    /// -------------------------------------------------------------------------
    

    /// -------------------------------------------------------------------------
    /// Init
    /// -------------------------------------------------------------------------
    // Se movio al final del html para poder identificar quien lo llama

    
    /// -------------------------------------------------------------------------
    /// Funciones
    /// -------------------------------------------------------------------------
    function fnInit(id) {
        
    };

    // Carga datos
    //------------
    function cargaDatos(id, id_solicitud) {
        try {
            var _id = '#' + id;
            
            var $_lblNombre = $(_id + '_lblNombre');
            var $_lblTel1 = $(_id + '_lblTel1');
            var $_lblCredito = $(_id + '_lblCredito');
            var $_lblIdSolicitud = $(_id + '_lblIdSolicitud');
            var $_lblProductoSolicitud = $(_id + '_lblProductoSolicitud');
            var $_lblNivelSolicitud = $(_id + '_lblNivelSolicitud');
            var $_lblDomicilio = $(_id + '_lblDomicilio');

            var oUrl = "Solicitudes/GetViewSimple";
            var oData = {
                id_solicitud: id_solicitud
            };
            var oProcessMessage = 'Obteniendo información...';
            var success = function (result) {
                if (result.MessageType == '1') {
                    utils.fnShowErrorMessage(result.ErrorMessage);
                    return;
                }
                //debugger;
                //En caso de éxito - Carga los datos
                if (result.Data !== null) {
                    $_lblNombre.html(result.Data.nomCliente);

                    var tel = "";
                    tel = (result.Data.Celular != null && result.Data.Celular != "") ? result.Data.Celular : ((result.Data.Telefono != null && result.Data.Telefono != "") ? result.Data.Telefono : "");
                    $_lblTel1.html(tel);

                    $_lblCredito.html("$ " + utils.fnMoneyFormat(result.Data.monto_efectivo_sol));

                    $_lblProductoSolicitud.html(result.Data.cve_producto);
                    $_lblIdSolicitud.html(id_solicitud);

                    $_lblNivelSolicitud.html("nivel " + (result.Data.nivel != null ? result.Data.nivel : "1"));


                    if (result.Data.calle != null) {
                        $_lblDomicilio.html(result.Data.calle + " " + result.Data.num_exterior + ((result.Data.num_interior != null && result.Data.num_interior != "") ? (" int " + result.Data.num_interior) : "") + ", col " + result.Data.colonia);
                    }
                }
                else {
                    $(".card-info-container").hide();
                }
                
            };
            utils.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success, true, "Originacion");

        }
        catch (e) {
            utils.fnShowErrorMessage(e.message);
        }
    };


    /// -------------------------------------------------------------------------
    /// Objeto de regreso
    /// -------------------------------------------------------------------------
    return {
        fnInit: fnInit,
        fnCargaDatos: cargaDatos
    }
}();