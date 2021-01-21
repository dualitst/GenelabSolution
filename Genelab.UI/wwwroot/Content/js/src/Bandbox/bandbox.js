/*eslint eqeqeq:0*/
/// <summary>
/// Nombre: login
/// Descripcion: 
/// Fecha de creación: 180410
/// Autor: vgonzalez
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
var login = function () {
    // Objetos
    var $btnSignIn = $('#btnSignIn');
    var $formSignIn = $('#sign_in');
    // var $oNombrecuenta = $('#NombreCuenta');
    //var $oMayor = $('#MayorE');
    var $Tipo = $('#caja');
    var $Tarjeta = $('#Tarjeta');
    var $Monto = $('#Monto');
    var $Comprobante = $('#ComprobanteP');









    $(function () {
        $('#sign_in').validate({
            highlight: function (input) {
                console.log(input);
                $(input).parents('.form-line').addClass('error');
            },
            unhighlight: function (input) {
                $(input).parents('.form-line').removeClass('error');
            },
            errorPlacement: function (error, element) {
                $(element).parents('.input-group').append(error);
            }
        });





    });

    $(function () {
        fnInit();
    });

    function fnInit() {
        // Asignamos los eventos de validación del form.
        $btnSignIn.click(fnAlta);
    };

    function fnAlta(e) {
        e.preventDefault();

        if ($formSignIn.valid()) {

            try {
                var oUrl = 'Bandbox/alta';
                var urlIndex = '';

                var oData =
                {
                    "TipoPago": $Tipo.val(),
                    "Tarjeta": $Tarjeta.val(),
                    "Monto": $Monto.val(),
                    "ImagenId": $Comprobante.val()
                };
                var oProcessMessage = 'Validando credenciales, espere por favor...';
                var success = function (result) {


                    console.log(result);
                    if (utils.fnValidResult(result)) {

                        alert("exito");


                    }
                    else {
                        alert("error");
                    }
                };
                utils.fnExecuteWithResult(e, oUrl, oData, oProcessMessage, success, false, "Security");

            }
            catch (e) {
                utils.fnShowErrorMessage(e.message);
            }
        }
    };
}();