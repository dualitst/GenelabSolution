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
    // Objetos
    var $btnSolicitar = $('#btnSolicitar');
    var $formServicio = $('#formServicio');


    var $nombreE = $('#NombreE');
    var $telE = $('#TelE');
    var $cpE = $('#CpE');
    var $delegacion = $('#Delegacion');
    var $coloniaE = $('#ColoniaE');
    var $calleE = $('#CalleE');
    var $rfcE = $('#RfcE');
    var $emailE = $('#EmailE');
    

    $(function () {
        fnInit();
    });


  
    function fnInit() {
        // Asignamos los eventos de validación del form.
        $btnSolicitar.click(fnAlta);
    };

    function validInfo() {

        if ($nombreE.val() == "" ||
            $telE.val() == "" ||
            $cpE.val() == "" ||
            $delegacion.val() == "" ||
            $coloniaE.val() == "" ||
            $calleE.val() == "" ||
            $rfcE.val() == "" ||
            $emailE.val() == ""
        ) {
            return false
        }
        else {
            return true
        }
    }

    function fnAlta(e) {

        e.preventDefault();

        $formServicio.validate({
            rules: {
                required: { valueNotEquals: "" }
            },
            messages: {
                required: { valueNotEquals: "Este campo es obligatorio." }
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


        if (validInfo() == false) {
            utils.fnShowWarningMessage("Favor de completar toda la información requerida");
            return;
        }

        if ($formServicio.valid()) {


            try {
                var oUrl = 'Empresas/insertar';

                var oData =
                {
                    //NUEVOS
                    "Calle": $calleE.val(),
                    "CodigoPostal": $cpE.val(),
                    "Colonia": $coloniaE.val(),
                    "Delegacion": $delegacion.val(),
                    "EmailF": $emailE.val(),
                    "EmpresaFiscal": $nombreE.val(),
                    "RfcF": $rfcE.val(),
                    "TelF": $telE.val(),
                };

                console.log(oData);

                var oProcessMessage = 'Validando información, espere por favor...';
                var success = function (result) {
                    

                    console.log(result);
                    if (utils.fnValidResult(result)) {

                        utils.fnShowSuccessMessage("Se ha creado la empresa correctamente");

                        setTimeout(function () {
                            //window.location = '/home/indexpublic'; 
                            var allUrl = /:\/\/([^\/]+)/.exec(window.location.href)[1];
                            if (allUrl == "www.fiinsoft.mx") {
                                var url = "/Genelab/portal/empresas/index";
                                window.location = url;
                            } else {
                                var url = "/empresas/index";
                                window.location = url;
                            }


                        }, 1000);
                       
                    }
                    else {
                        utils.fnShowSuccessMessage("Error, ha ocurrido un error al dar de alta el servicio");
                    }
                };
                utils.fnExecuteWithResult(e, oUrl, oData, oProcessMessage, success, true, "Originacion");

            }
            catch (e) {
                utils.fnShowErrorMessage(e.message);
            }
        }
    };

    function EliminarPaciente(idPaciente) {
     

        $('table > tbody  > tr').each(function (index, tr) {
            if (tr.id == idPaciente) {
                tr.remove();
            }
        });

        pacientesList = $.grep(pacientesList, function (e) {
            return e.Id != idPaciente;
        });

    }

    /// -------------------------------------------------------------------------
    /// Objeto de regreso
    /// -------------------------------------------------------------------------
    return {
        fnEliminar: EliminarPaciente,
    }

}();