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


    var $nombre = $('#Nombre');
    var $apellidop = $('#ApellidoP');
    var $apellidom = $('#ApellidoM');
    var $titular = $('#Ntitular');
    var $parentesco = $('#Parentesco');
    var $catalogo = $('#Catalogo');

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
    var $chkEnDomicilio = $('#chkEnDomicilio');
    var $chkFacturacion = $('#chkFacturacion');
    var $chkUsarDomicilio = $('#chkUsarDomicilio');
    var $RfcF = $('#RfcF');
    var $EmailF = $('#EmailF');
    var $TelF = $('#TelF');
    var $tipoPersona = $('#tipoPersona');
    var $divMoral = $('#divMoral');
    var $divFisica = $('#divFisica');
    var $RfcFFisica = $('#RfcFFisica');
    var $AnioNacimiento = $('#AnioNacimiento');

    //parametros para check
    var mayorEdad = false;
    var enDomicilio = false;
    var facturacion = false;
    var tipoPersona = "";
    var $btnAgregar = $('#btnAgregar');
    //parametros para paciente
    var pacientesList = [];
    var $btnCancelar = $('#btnCancelar');
    var $btnGuardar = $('#btnGuardar');
    var editObjectPaciente = {}
    var $chkSoyYo = $('#chkSoyYo');
    var $chkNoSoyYo = $('#chkNoSoyYo');
    var esMenorEdad = false;
    var esMiCuenta = false;

    $(function () {
        fnInit();
    });

    function InitDateMax() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }

        today = yyyy + '-' + mm + '-' + dd;

        $AnioNacimiento.attr('max', today);
    }

    function setDomicilioF(activo) {

        $chkUsarDomicilio.attr("disabled", activo);

        if (activo) {
            $cpF.val("");
            $delegacionF.val("");
            $coloniaF.val("");
            $cdpnF.val("");
        }
    }

    function ConsultaSolicitud() {

        var idSol = GetParameterValues("IdSolicitud");

        try {

            var oUrl = 'Request/consulta';
            var oData =
            {
                "IdSolicitud": idSol,
            };

            var oProcessMessage = 'Validando información, espere por favor...';
            var success = function (result) {

                console.log(result);
                if (utils.fnValidResult(result)) {

                    //utils.fnShowSuccessMessage("Se ha creado el servicio correctamente");

                    SetSolicitud(result.Data);

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

    function SetSolicitud(data) {

        pacientesList = data.pacientes;
        console.log(pacientesList);

        $('#table_body').html("");

        $.each(pacientesList, function (index, value) {
            var tBody = "";
            var content = '<tr id="' + value.id + '"><td>' + value.nombrePaciente + " " + value.apellidoPPaciente + " " + value.apellidoMPaciente + '</td><td>' + value.estudioNombre + '</td><td>' + value.anioNacimiento + '</td><td>' + value.parentezco + '</td>';
            content += "<td><a role='button' id='btnEditar_" + value.id + "' name='btnEditar_" + value.id + "' class='btn btn-info btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Editar' onclick='Solicitud.fnEditar(\"" + value.id + "\")'><i class='material-icons'>mode_edit</i></a>&nbsp;&nbsp;&nbsp;&nbsp;";
            content += "<a role='button' id='btnEliminar_" + value.id + "' name='btnEliminar_" + value.id + "' class='btn btn-danger btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Eliminar' onclick='Solicitud.fnEliminar(\"" + value.id + "\")'><i class='material-icons'>delete</i></a>&nbsp;&nbsp;&nbsp;&nbsp;<td>";

            tBody = tBody + content;

            $('#table_body').append(tBody);
        });

        
    }

    function fnInit() {

        
        ConsultaSolicitud();
        // Asignamos los eventos de validación del form.
        $btnSolicitar.click(fnAlta);
        //Deshabilitando 
        setDomicilioF(true);

        //validacion para fecham maxima
        InitDateMax();

        $chkNombreCunenta.click(function () {

        });

        $AnioNacimiento.change(function () {
            var selectedDate = $AnioNacimiento.val();
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = yyyy + '-' + mm + '-' + dd;

            var end = new Date(today);
            var start = new Date(selectedDate);

            var diff = new Date(end - start);
            var days = diff / 1000 / 60 / 60 / 24;

            if (days <= 6570) {
                $("#divMayorEdad").removeClass("hidden").addClass("visible");
                esMenorEdad = true;
            }
            else {
                esMenorEdad = false;
                $("#divMayorEdad").removeClass("visible").addClass("hidden");
            }

        });


        $chkNoSoyYo.click(function () {

            if ($(this).is(":checked")) // "this" refers to the element that fired the event
            {
                $("#divParentesco").removeClass("hidden").addClass("visible");
                $chkSoyYo.attr('checked', false);
                esMiCuenta = false;
            }
            //else {
            //    $("#divParentesco").removeClass("hidden").addClass("hidden");
            //}
        });

        $chkSoyYo.click(function () {

            if ($(this).is(":checked")) // "this" refers to the element that fired the event
            {
                $("#divParentesco").removeClass("visible").addClass("hidden");
                $chkNoSoyYo.attr('checked', false);
                esMiCuenta = true;
            }
            //else {
            //    $("#divParentesco").removeClass("hidden").addClass("hidden");
            //}
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

        $btnAgregar.click(function () {
            AddPaciente();
        });

        $btnCancelar.click(function () {
            $("#divAgregar").removeClass("hidden").addClass("visible");

            $("#divCancelar").removeClass("visible").addClass("hidden");
            $("#divGuardar").removeClass("visible").addClass("hidden");
            cleanPaciente();
        });

        $btnGuardar.click(function () {
            $("#divAgregar").removeClass("hidden").addClass("visible");
            $("#divCancelar").removeClass("visible").addClass("hidden");
            $("#divGuardar").removeClass("visible").addClass("hidden");

            GuardarCambios();
        });

        $chkFacturacion.click(function () {

            if ($(this).is(":checked")) // "this" refers to the element that fired the event
            {
                facturacion = true;
                setDomicilioF(false);
                cleanFacturacionMoral();
                cleanFacturacionFisica();
                $("#divFacturacion").removeClass("hidden").addClass("visible");

            } else {
                facturacion = false;
                setDomicilioF(true);
                $("#divFacturacion").removeClass("visible").addClass("hidden");
                $chkUsarDomicilio.attr('checked', false);
                cleanFacturacionMoral();
                cleanFacturacionFisica();
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
                cleanFacturacionMoral();
                cleanFacturacionFisica();
            }

        });

        $tipoPersona.change(function () {
            if ($tipoPersona.val() == "MORAL") {
                mayorEdad = true;
                tipoPersona = "MORAL";

                $divMoral.removeClass("hidden").addClass("visible");
                $divFisica.removeClass("visible").addClass("hidden");
                cleanFacturacionFisica();
            }
            else {
                mayorEdad = false;
                tipoPersona = "FISICA";

                $divFisica.removeClass("hidden").addClass("visible");
                $divMoral.removeClass("visible").addClass("hidden");
                cleanFacturacionMoral();
            }
        });

    };

    function GuardarCambios() {
        var idPacienteEdit = editObjectPaciente.Id;

        //eliminamos
        pacientesList = $.grep(pacientesList, function (e) {
            return e.Id != idPacienteEdit;
        });

        editObjectPaciente.NombrePaciente = $nombre.val();
        editObjectPaciente.ApellidoPPaciente = $apellidop.val();
        editObjectPaciente.ApellidoMPaciente = $apellidom.val();
        editObjectPaciente.Parentezco = $parentesco.val();
        editObjectPaciente.EstudioId = $catalogo.val();
        editObjectPaciente.AnioNacimiento = $AnioNacimiento.val();
        editObjectPaciente.NombreTitular = $titular.val();
        editObjectPaciente.EstudioNombre = $("#Catalogo option:selected").text();

        //insertamos el nuevo actualizado
        pacientesList.push(editObjectPaciente);

        $('#table_body').html("");

        $.each(pacientesList, function (index, value) {
            var tBody = "";
            var content = '<tr id="' + value.Id + '"><td>' + value.NombrePaciente + " " + value.ApellidoPPaciente + " " + value.ApellidoMPaciente + '</td><td>' + value.EstudioNombre + '</td><td>' + value.AnioNacimiento + '</td><td>' + value.Parentezco + '</td>';
            content += "<td><a role='button' id='btnEditar_" + value.Id + "' name='btnEditar_" + value.Id + "' class='btn btn-info btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Editar' onclick='Solicitud.fnEditar(\"" + value.Id + "\")'><i class='material-icons'>mode_edit</i></a>&nbsp;&nbsp;&nbsp;&nbsp;";
            content += "<a role='button' id='btnEliminar_" + value.Id + "' name='btnEliminar_" + value.Id + "' class='btn btn-danger btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Eliminar' onclick='Solicitud.fnEliminar(\"" + value.Id + "\")'><i class='material-icons'>delete</i></a>&nbsp;&nbsp;&nbsp;&nbsp;<td>";

            tBody = tBody + content;

            $('#table_body').append(tBody);
        });

        cleanPaciente();
    }

    function AddPaciente() {

        if (validInfo() == false) {
            utils.fnShowWarningMessage("Favor de completar toda la información requerida del paciente");
            return;
        }

        var estudioList = $catalogo.val();
        console.log(estudioList);

        //agregando cada estudio con su info
        $.each(estudioList, function (index, value) {
            var idPaciente = create_UUID();
            var estudioNombreList = $("#Catalogo option[value='" + value + "']").text()

            var _pacienteObj =
            {
                "Id": idPaciente,
                "NombrePaciente": $nombre.val(),
                "ApellidoMPaciente": $apellidop.val(),
                "ApellidoPPaciente": $apellidom.val(),
                "NombreTitular": $titular.val(),
                "Parentezco": $parentesco.val(),
                "EstudioId": value,
                "EstudioNombre": estudioNombreList,
                "AnioNacimiento": $AnioNacimiento.val()
            }

            pacientesList.push(_pacienteObj);

        });


        $('#table_body').html("");

        $.each(pacientesList, function (index, value) {
            var tBody = "";
            var content = '<tr id="' + value.Id + '"><td>' + value.NombrePaciente + " " + value.ApellidoPPaciente + " " + value.ApellidoMPaciente + '</td><td>' + value.EstudioNombre + '</td><td>' + value.AnioNacimiento + '</td><td>' + value.Parentezco + '</td>';
            content += "<td><a role='button' id='btnEditar_" + value.Id + "' name='btnEditar_" + value.Id + "' class='btn btn-info btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Editar' onclick='Solicitud.fnEditar(\"" + value.Id + "\")'><i class='material-icons'>mode_edit</i></a>&nbsp;&nbsp;&nbsp;&nbsp;";
            content += "<a role='button' id='btnEliminar_" + value.Id + "' name='btnEliminar_" + value.Id + "' class='btn btn-danger btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Eliminar' onclick='Solicitud.fnEliminar(\"" + value.Id + "\")'><i class='material-icons'>delete</i></a>&nbsp;&nbsp;&nbsp;&nbsp;<td>";

            tBody = tBody + content;

            $('#table_body').append(tBody);
        });

        //console.log(pacientesList);

        cleanPaciente();

    }

    function create_UUID() {
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }


    function cleanPaciente() {
        $nombre.val("");
        $apellidop.val("");
        $apellidom.val("");
        $parentesco.val("");
        $catalogo.val(1);
        $parentesco.val("");
        $AnioNacimiento.val("");
        $titular.val("");
    }

    function cleanFacturacionMoral() {
        $RfcF.val("");
        $EmailF.val("");
        $TelF.val("");
        $EmpresaF.val("");
        $cpF.val("");
        $delegacionF.val("");
        $coloniaF.val("");
        $cdpnF.val("");
    }


    function cleanFacturacionFisica() {
        $RfcFFisica.val("");
    }

    function cleanDomicilio() {
        $tel.val("");
        $cp.val("");
        $delegacion.val("");
        $colonia.val("");
        $cdpn.val("");
    }

    function validFacturacion() {

        if ($tipoPersona.val() == "MORAL") {
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
            $AnioNacimiento.val() == "")
            return false

        if (esMenorEdad == true && $titular.val() == "")
            return false;

        if ($parentesco.val() == "" && esMiCuenta == false)
            return false;

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



        if ($formServicio.valid()) {


            if (pacientesList.length <= 0) {
                utils.fnShowWarningMessage("Favor de registrar por lo menos un paciente");
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
                    "Pacientes": pacientesList,
                    "EnDomicilio": enDomicilio,
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
                    "TipoPersona": $tipoPersona.val(),
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

    function EditarPaciente(idPaciente) {

        var editPaciente = $.grep(pacientesList, function (e) {
            return e.Id == idPaciente;
        });

        $("#divAgregar").removeClass("visible").addClass("hidden");

        $("#divCancelar").removeClass("hidden").addClass("visible");
        $("#divGuardar").removeClass("hidden").addClass("visible");


        $nombre.val(editPaciente[0].NombrePaciente);
        $apellidop.val(editPaciente[0].ApellidoPPaciente);
        $apellidom.val(editPaciente[0].ApellidoMPaciente);
        $parentesco.val(editPaciente[0].Parentezco);
        $catalogo.val(editPaciente[0].EstudioId);
        $AnioNacimiento.val(editPaciente[0].AnioNacimiento);
        $titular.val(editPaciente[0].NombreTitular);

        //temporal para editar
        editObjectPaciente = editPaciente[0];

        console.log(editPaciente[0]);
    }

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