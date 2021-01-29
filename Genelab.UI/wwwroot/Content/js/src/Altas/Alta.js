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
    var $btnSolicitar = $('#btnSolicitar');
    var $formServicio = $('#formServicio');


    var $nombre = $('#Nombre');
    var $apellidop = $('#ApellidoP');
    var $apellidom = $('#ApellidoM');
    var $titular = $('#Ntitular');
    var $parentesco = $('#Parentesco');
    var $catalogo = $('#Catalogo');
    var $edad = $('#Edad');

    //domicilio
    var $tel = $('#Tel');
    var $cp = $('#Cp');
    var $delegacion = $('#Delegacion');
    var $colonia = $('#Colonia');
    var $cdpn = $('#Cdpn');

    //facuracion
    var $EmpresaF = $('#EmpresaF');
    var $cpF = $('#CpF');
    var $delegacionF = $('#DelegacionF');
    var $coloniaF = $('#ColoniaF');
    var $cdpnF = $('#CdpnF');

    var $chkNombreCunenta = $('#chkNombreCunenta');
    var $chkMayorEdad = $('#chkMayorEdad');
    var $chkEnDomicilio = $('#chkEnDomicilio');
    var $chkFacturacion = $('#chkFacturacion');
    var $chkUsarDomicilio = $('#chkUsarDomicilio');
    var $RfcF = $('#RfcF');
    var $EmailF = $('#EmailF');
    var $TelF = $('#TelF');
    var $tipoPersona = $('#tipoPersona');
    var $divMoral = $('#divMoral');
    var $divFisica = $('#divFisica');
    var $RfcFFisica= $('#RfcFFisica');
    
    //parametros para check
    var mayorEdad = false;
    var enDomicilio = false;
    var facturacion = false;
    var tipoPersona = "";

    $(function () {
        fnInit();
    });


    function setDomicilioF(activo) {

        $chkUsarDomicilio.attr("disabled", activo);

        if (activo) {
            $cpF.val("");
            $delegacionF.val("");
            $coloniaF.val("");
            $cdpnF.val("");
        }
    }

    function fnInit() {
        // Asignamos los eventos de validación del form.
        $btnSolicitar.click(fnAlta);

        //Deshabilitando 
        setDomicilioF(true);

        $chkNombreCunenta.click(function () {

        });

        $chkEnDomicilio.click(function () {
            if ($(this).is(":checked")) // "this" refers to the element that fired the event
            {
                enDomicilio = true;
                $(".inDomicilio").removeClass("hidden").addClass("visible");

            } else {

                //$('.inDomicilio').hide();
                $(".inDomicilio").removeClass("visible").addClass("hidden");
                enDomicilio = false;
                cleanDomicilio();
            }
        });

        $chkMayorEdad.click(function () {
           
            if ($(this).is(":checked")) // "this" refers to the element that fired the event
            {
                mayorEdad = true;
                $("#divMayorEdad").removeClass("visible").addClass("hidden");
                $edad.val(18);
            } else
            {
                mayorEdad = false;
                $("#divMayorEdad").removeClass("hidden").addClass("visible");
                $edad.val(17);
            }

        });

        $chkFacturacion.click(function () {

            if ($(this).is(":checked")) // "this" refers to the element that fired the event
            {
                facturacion = true;
                setDomicilioF(false);
                $("#divFacturacion").removeClass("hidden").addClass("visible");

            } else {
                facturacion = false;
                setDomicilioF(true);
                $("#divFacturacion").removeClass("visible").addClass("hidden");
                $chkUsarDomicilio.attr('checked', false);
                cleanFacturacion();
  
            }
        });

        $chkUsarDomicilio.click(function () {

            if ($(this).is(":checked")) // "this" refers to the element that fired the event
            {
                $cpF.val($cp.val());
                $delegacionF.val($delegacion.val());
                $coloniaF.val($colonia.val());
                $cdpnF.val($cdpn.val());
                
            }
            else {
                cleanFacturacion();
 
            }

        });

        $edad.change(function () {
            console.log($edad.val());
            if ($edad.val() >= 18) {
                mayorEdad = true;
                $chkMayorEdad.prop('checked', true);
      
                $("#divMayorEdad").removeClass("visible").addClass("hidden");
            }
            else {
                mayorEdad = false;
                $chkMayorEdad.prop('checked', false);

                $("#divMayorEdad").removeClass("hidden").addClass("visible");
                $("#divMayorEdad").removeClass("hidden").addClass("visible");
            }
        });

        $tipoPersona.change(function () {
            if ($tipoPersona.val() == "MORAL") {
                mayorEdad = true;
                tipoPersona = "MORAL";

                $divMoral.removeClass("hidden").addClass("visible");
                $divFisica.removeClass("visible").addClass("hidden");
            }
            else {
                mayorEdad = false;
                tipoPersona = "FISICA";

                $divFisica.removeClass("hidden").addClass("visible");
                $divMoral.removeClass("visible").addClass("hidden");
            }
        });

    };

    function cleanFacturacion() {
        $RfcF.val("");
        $EmailF.val("");
        $TelF.val("");
        $EmpresaF.val("");
        $cpF.val("");
        $delegacionF.val("");
        $coloniaF.val("");
        $cdpnF.val("");
    }

    function cleanDomicilio() {
         $tel.val("");
         $cp.val("");
         $delegacion.val("");
         $colonia.val("");
         $cdpn.val("");
    }

    function validFacturacion() {

        if ($tipoPersona == "MORAL") {
            if ($RfcF.val() == "" ||
                $EmailF.val() == "" ||
                $TelF.val() == "" ||
                $EmpresaF.val() == "" ||
                $cpF.val() == "" ||
                $delegacionF.val() == "" ||
                $coloniaF.val() == "" ||
                $cdpnF.val() == "")
                return false;
            else
                return true;
        } else {
            if ($RfcFFisica.val() == "")
                return false;
            else
                return true;
        }
    }

    function validDomicilio() {
        if ($tel.val() == "" ||
            $cp.val() == "" ||
            $delegacion.val() == "" ||
            $colonia.val() == "" ||
            $cdpn.val() == "")
            return false;
        else
            return true;
    }

    function validInfo() {
     
        if ($nombre.val() == "" ||
            $apellidop.val() == "" ||
            $apellidom.val() == "" ||
            $parentesco.val() == "" ||
            $catalogo.val() == "" ||
            $edad.val() == "")
            return false
        else {

            if ($edad.val() < 18 && $titular.val() == "")
                return false
            else
                return true;
        }
    }

    function fnAlta(e) {

        e.preventDefault();

        $formServicio.validate({
            rules: {
                SelectName: { valueNotEquals: "" }
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

        if (validInfo()==false) {
            utils.fnShowWarningMessage("Favor de completar toda la información requerida del paciente");
            return;
        }

        if (enDomicilio == true && validDomicilio() == false) {
            utils.fnShowWarningMessage("Favor de completar toda la información requerida para la prueba en domicilio");
            return;
        }

        if (facturacion == true && validFacturacion() == false) {
            utils.fnShowWarningMessage("Favor de completar toda la información requerida para la facturación");
            return;
        }

        if ($formServicio.valid()) {

            try {
                var oUrl = 'Request/alta';
                var urlIndex = '';
                var rfc = "";
                if ($tipoPersona.val() == "FISICA")
                    rfc = $RfcFFisica.val();
                else
                    rfc = $RfcF.val();

                var oData =
                {
                    "EnDomicilio": enDomicilio,
                    "NombrePaciente": $nombre.val(),
                    "ApellidoMPaciente": $apellidop.val(),
                    "ApellidoPPaciente": $apellidom.val(),
                    "NombreTitular": $titular.val(),
                    "Parentezco": $parentesco.val(),
                    "EstudioId": $catalogo.val(),
                    "Edad": $edad.val(),

                    "CodigoPostal": $cp.val(),
                    "Delegacion": $delegacion.val(),
                    "Colonia": $colonia.val(),
                    "Calle": $cdpn.val(),

                    //NUEVOS
                    "RfcF": rfc,
                    "EmailF": $EmailF.val(),
                    "TelF": $TelF.val(),


                    "isFacturacion": facturacion,
                    "EmpresaFiscal": $EmpresaF.val(),
                    "EmpresaFiscalCP": $cpF.val(),
                    "EmpresaFiscalDelegacion": $delegacionF.val(),
                    "EmpresaFiscalColonia": $coloniaF.val(),
                    "EmpresaFiscalCalle": $cdpnF.val(),
                };

                console.log(oData);

                var oProcessMessage = 'Validando información, espere por favor...';
                var success = function (result) {
                    

                    console.log(result);
                    if (utils.fnValidResult(result)) {

                        utils.fnShowSuccessMessage("Se ha creado el servicio correctamente");

                        //setTimeout(function () {
                        //    window.location = '/home/indexpublic'; 
                        //}, 3000);
                       
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

}();