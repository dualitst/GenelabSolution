var RecuperarContrasenia = function () {

    var $txtEmail = $('#txtEmail');
    var $modalRecuperar = $('#modalRecuperar');
    var $frmPartial = $('#frmPartial');
    var $btnEnviar = $('#btnEnviar');

    $btnEnviar.click(Enviar);

    function MuestraDatos() {
        $modalRecuperar.modal('show');
    }

    function Enviar() {
        $frmPartial.validate({
            rules: {
                SelectName: { valueNotEquals: '' }
            },
            messages: {
                SelectName: { valueNotEquals: "Este campo es obligatorio." }
            },
            highlight: function (input) {
                $(input).parents('.form-line').addClass('error');
            },
            unhighlight: function (input) {
                $(input).parents('.form-line').removeClass('error');
            },
            errorPlacement: function (error, element) {
                $(element).parents('.form-group').append(error);
            }
        });

        if ($frmPartial.valid()) {
            if (!validateEmail($txtEmail.val())) {
                $txtEmail.parents('.form-line').addClass('error');
                return;
            }
            else {
                $txtEmail.parents('.form-line').removeClass('error');
            }
            try {

                var oUrl = 'Account/ObtenerUsuario';
                var oData = $txtEmail.val();
                var oProcessMessage = 'Procesando información, espere por favor...';

                var success = function (result) {
                    if (result.MessageType === 1) {
                        utils.fnShowErrorMessage(result.ErrorMessage);
                        return;
                    }
                    else if (result.MessageType == 2) {
                        utils.fnShowWarningMessage(result.ErrorMessage);
                        return;
                    }

                    Limpiar();
                    utils.fnShowSuccessMessage("Se ha enviado la información al correo solicitado.");

                };
                utils.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success, false, "Security");

            }
            catch (e) {
                utils.fnShowErrorMessage(e.message)
            }

        }

    }

    function Limpiar() {
        $txtEmail.val('');

    }

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    return {
        fnMuestraDatos: MuestraDatos
    }

}();