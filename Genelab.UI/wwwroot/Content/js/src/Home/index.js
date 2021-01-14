/*eslint eqeqeq:0*/
/// <summary>
/// Nombre: Home
/// Descripcion: 
/// Fecha de creación: 2020-02-05
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


var Home = function () {
    /// -------------------------------------------------------------------------
    /// Objetos
    /// -------------------------------------------------------------------------
    var $o = {};
    var $session = utils.fnLocalData.get(utils.fnGlobals("Sesion"));
    var params = {};



    /// -------------------------------------------------------------------------
    /// Init
    /// -------------------------------------------------------------------------
    $(document).ready(function () {
        fnInit();
    });



    /// -------------------------------------------------------------------------
    /// Funciones
    /// -------------------------------------------------------------------------
    function fnInit() {
        //Inicializando página, obteniendo parámetros y elementos
        utils.fnPage_Init(undefined, params, $o);

        cargaDatosSesion();
    }
    

    /// Carga Datos Sesion
    /// ------------------
    function cargaDatosSesion() {
        if (typeof utils.fnLocalData.get(utils.fnGlobals("Sesion")) != 'undefined' && utils.fnLocalData.get(utils.fnGlobals("Sesion")) != null) {
            $o.lblNombreUsuario.set(utils.fnLocalData.get(utils.fnGlobals("Sesion")).nombre_completo);
            $o.lblRolesUsuario.set(utils.fnLocalData.get(utils.fnGlobals("Sesion")).roles);

            // Carga fecha operacion
            utils.fnGetAPIData("CajaControles/Get", { id_oficina: utils.fnLocalData.get(utils.fnGlobals("Sesion")).id_oficina }, "Bancos", function (result) {
                if (utils.fnValidResult(result)) {
                    utils.fnLocalData.set(utils.fnGlobals("FechaSistema"), result.Data.fecha_operacion);

                    $o.lblFechaOperacion.set(moment(result.Data.fecha_operacion).format("DD/MM/YYYY"));
                }
            });
        }
        else {
            $o.lblFechaOperacion.set(moment().format("DD/MM/YYYY"));
        }
    }



    /// -------------------------------------------------------------------------
    /// Objeto de regreso
    /// -------------------------------------------------------------------------
    return {

    };
}();