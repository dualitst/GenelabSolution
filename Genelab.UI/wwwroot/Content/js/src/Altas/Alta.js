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
    var $parentezco = $('#Parentezco');
    var $catalogo = $('#Catalogo');

    //domicilio
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

    //parametros para check
    var mayorEdad = false;
    var enDomicilio = false;
    var facturacion = false;

    $(function () {
        fnInit();
    });


    function setDomicilioF(activo) {

        $("#divFacturacion :input").attr("disabled", activo);
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
            } else {
                enDomicilio = false;
            }
        });

        $chkMayorEdad.click(function () {
           
            if ($(this).is(":checked")) // "this" refers to the element that fired the event
            {
                mayorEdad = true;
            } else
            {
                mayorEdad = false;
            }

        });

        $chkFacturacion.click(function () {

            if ($(this).is(":checked")) // "this" refers to the element that fired the event
            {
                facturacion = true;
                setDomicilioF(false);
            } else {
                facturacion = false;
                setDomicilioF(true);
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

        });

    };

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

        if ($formServicio.valid()) {

            try {
                var oUrl = 'Request/alta';
                var urlIndex = '';

                var oData =
                {
                    "EnDomicilio": enDomicilio,
                    "NombrePaciente": $nombre.val(),
                    "ApellidoMPaciente": $apellidop.val(),
                    "ApellidoPPaciente": $apellidom.val(),
                    "NombreTitular": $titular.val(),
                    "Parentezco": $parentezco.val(),
                    "EstudioId": $catalogo.val(),

                    "CodigoPostal": $cp.val(),
                    "Delegacion": $delegacion.val(),
                    "Colonia": $colonia.val(),
                    "Calle": $cdpn.val(),

                    "isFacturacion": facturacion,
                    "EmpresaFiscal": $EmpresaF.val(),
                    "EmpresaFiscalCP": $cpF.val(),
                    "EmpresaFiscalDelegacion": $delegacionF.val(),
                    "EmpresaFiscalColonia": $coloniaF.val(),
                    "EmpresaFiscalCalle": $cdpnF.val(),
                };

                console.log(oData);

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
                utils.fnExecuteWithResult(e, oUrl, oData, oProcessMessage, success, true, "Originacion");

            }
            catch (e) {
                utils.fnShowErrorMessage(e.message);
            }
        }
    };

}();