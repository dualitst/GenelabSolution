/*eslint eqeqeq:0*/
/// <summary>
/// Nombre: solicitud
/// Descripcion: 
/// Fecha de creación: 180410
/// Autor: fabian
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
var Solicitud = function () {

    var $Nombre = $('#Nombre'); 
    var $ApellidoPaterno = $('#ApellidoPaterno'); 
    var $ApellidoMaterno = $('#ApellidoMaterno'); 
    var $Email = $('#Email'); 
    var $Role = $('#Role'); 
    var $Password = $('#Password');
    var $ConfirmPassword = $('#ConfirmPassword');

    var idUsuario = "";


    $(function () {
        fnInit();
    });

 
    function ConsultaSolicitud() {

        idUsuario = GetParameterValues("user");

        try {

            var oUrl = 'Account/GetUserById';
            var oData =
            {
                "IdUsuario": idUsuario,
            };

            var oProcessMessage = 'Validando información, espere por favor...';
            var success = function (result) {

              
                if (utils.fnValidResult(result)) {

                    SetUser(result.Data);

                }
                else {
                    utils.fnShowSuccessMessage("Error, ha ocurrido un error al dar de alta el servicio");
                }
            };
            utils.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success, true, "Originacion");

        }
        catch (e) {
            utils.fnShowErrorMessage(e.message);
        }

    }

    function SetUser(data) {

        $Nombre.val(data.nombre);
        $ApellidoPaterno.val(data.apellidoPaterno);
        $ApellidoMaterno.val(data.apellidoMaterno);
        $Email.val(data.email);
        $Password.val(data.email);
        $ConfirmPassword.val(data.email);
        $Role.val(data.idRol).trigger('change');
    }

    function fnInit() {

        ConsultaSolicitud();
    };


    function GetParameterValues(param) {
        var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < url.length; i++) {
            var urlparam = url[i].split('=');
            if (urlparam[0] == param) {
                return urlparam[1];
            }
        }
    }  

    /// -------------------------------------------------------------------------
    /// Objeto de regreso
    /// -------------------------------------------------------------------------
    return {
        fnEditar: EditarPaciente,
        fnEliminar: EliminarPaciente,
    }

}();