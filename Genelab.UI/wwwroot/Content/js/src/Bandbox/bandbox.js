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
var pagoAlta = function () {
    // Objetos
    var $btnPagar = $('#btnPagar');
    var $form_pago = $('#form_pago');
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
        $btnPagar.click(fnPago);
    };

    function fnPago(e) {
        e.preventDefault();

        if ($form_pago.valid()) {

            try {
                var oUrl = 'Bandbox/alta';
                var urlIndex = '';

                var _tipoPago = $('input[name="tipoPagoRad"]:checked').val();

                var oData =
                {
                    "TipoPago": _tipoPago,
                    "Tarjeta": $Tarjeta.val(),
                    "Monto": $Monto.val(),
                    "ImagenId": $Comprobante.val()
                };

                console.log(oData);

                var oProcessMessage = 'Validando credenciales, espere por favor...';
                var success = function (result) {


                    console.log(result);

                    if (utils.fnValidResult(result)) {
                        utils.fnShowSuccessMessage("Se guardo correctamente el pago");

                    }
                    else {
                        utils.fnShowSuccessMessage("Error al guardar el pago");
                    }
                };
                utils.fnExecuteWithResult(e, oUrl, oData, oProcessMessage, success, false, "Originacion");

            }
            catch (e) {
                utils.fnShowErrorMessage(e.message);
            }
        }
    };
}();