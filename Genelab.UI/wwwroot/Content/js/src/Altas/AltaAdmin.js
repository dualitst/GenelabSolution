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
    //fisica
    var $nombreFisica = $('#NombreFisica');
    var $emailFisica = $('#EmailFisica');
    var $telFisica = $('#TelFisica');


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
    var $fechaVisita = $('#FechaVisita'); 
    var $correoE = $('#CorreoE'); 

    $(function () {
        fnInit();
    });

    function InitDateMin() {
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

        $fechaVisita.attr('min', today);
    }

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

    function fnInit() {
        // Asignamos los eventos de validación del form.
        $btnSolicitar.click(fnAlta);
        //Deshabilitando 
        setDomicilioF(true);

        InitDateMin();
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
                $nombre.val("");
                $apellidop.val("");
                $apellidom.val("");
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

                SelectCurrentUser();
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

        //editObjectPaciente.NombrePaciente= $nombre.val();
        //editObjectPaciente.ApellidoPPaciente= $apellidop.val();
        //editObjectPaciente.ApellidoMPaciente=$apellidom.val();
        //editObjectPaciente.Parentezco= $parentesco.val();
        //editObjectPaciente.EstudioId= $catalogo.val();
        //editObjectPaciente.AnioNacimiento=$AnioNacimiento.val();
        //editObjectPaciente.NombreTitular= $titular.val();
        //editObjectPaciente.EstudioNombre = $("#Catalogo option:selected").text();

        ////insertamos el nuevo actualizado
        //pacientesList.push(editObjectPaciente);

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
                "ApellidoMPaciente": $apellidom.val(),
                "ApellidoPPaciente": $apellidop.val(),
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
            var estudioNombreList = $("#Catalogo option[value='" + value+"']").text()

            var _pacienteObj =
            {
                "Id": idPaciente,
                "NombrePaciente": $nombre.val(),
                "ApellidoMPaciente": $apellidom.val(),
                "ApellidoPPaciente": $apellidop.val(),
                "NombreTitular": $titular.val(),
                "Parentezco": $parentesco.val(),
                "EstudioId": value,
                "EstudioNombre": estudioNombreList,
                "AnioNacimiento": $AnioNacimiento.val(),
                "CorreoE": $correoE.val()
            }

            pacientesList.push(_pacienteObj);

        });


        $('#table_body').html("");
        
        $.each(pacientesList, function (index, value) {
            var tBody = "";
            var content = '<tr id="' + value.Id + '"><td>' + value.NombrePaciente + " " + value.ApellidoPPaciente + " " + value.ApellidoMPaciente + '</td><td>' + value.EstudioNombre + '</td><td>' + value.AnioNacimiento + '</td><td>' + value.Parentezco + '</td>';
            content += "<td><a role='button' id='btnEditar_" + value.Id + "' name='btnEditar_" + value.Id + "' class='btn btn-info btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Editar' onclick='Solicitud.fnEditar(\"" + value.Id + "\")'><i class='material-icons'>mode_edit</i></a>&nbsp;&nbsp;&nbsp;&nbsp;";
            content += "<a role='button' id='btnEliminar_" + value.Id + "' name='btnEliminar_" + value.Id + "' class='btn btn-danger btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Eliminar' onclick='Solicitud.fnEliminar(\"" + value.Id + "\")'><i class='material-icons'>delete</i></a>&nbsp;&nbsp;&nbsp;&nbsp;<td>";

            tBody = tBody+ content;

            $('#table_body').append(tBody);
        });

        //console.log(pacientesList);

        cleanPaciente();
        $catalogo.removeClass("selected");

        $catalogo.val(1).trigger('change');

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
        var values = [];

        values.push("1");

        $nombre.val("");
        $apellidop.val("");
        $apellidom.val("");
        $parentesco.val("");

        $catalogo.val(values);
        var valor = $catalogo.val();
        console.log(valor)
       

        //$('#Catalogo option[value="1"]').attr('selected', 'selected');
        //$catalogo.attr("selected", 1);
        $("#catalogo").find('option[value=1]').prop('selected', true);

        $parentesco.val("");
        $AnioNacimiento.val("");
        $titular.val("");

        //$chkNoSoyYo.attr('checked', true);
        $chkSoyYo.attr('checked', false);

        $chkNoSoyYo.attr('checked', true).trigger('click');
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
            if ($RfcFFisica.val() == "" ||
                $nombreFisica.val() == "" ||
                $emailFisica.val() == "" ||
                $telFisica.val() == "") {

                //alert($RfcFFisica.val());
                //alert($EmailF.val());
                //alert($EmpresaF.val());
                //alert($TelF.val());
                return false;
            }
              
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
            $catalogo.val() == "" ||
            $AnioNacimiento.val() == "" )
            return false

        if (esMenorEdad == true && $titular.val() == "")
            return false;

        //if ($parentesco.val() == "" && esMiCuenta == false)
        //    return false;

    }

    function SelectCurrentUser() {
        
        try {
            var oUrl = 'Request/UserData';
            var urlIndex = '';
            var rfc = "";
            if ($tipoPersona.val() == "FISICA")
                rfc = $RfcFFisica.val();
            else
                rfc = $RfcF.val();

            var oData =
            {
                "IdUser": "current",
            };

            var oProcessMessage = 'Validando información, espere por favor...';
            var success = function (result) {

               
                if (utils.fnValidResult(result)) {

                    //console.log(result);

                    $nombre.val(result.Data.nombre);
                    $apellidop.val(result.Data.apellidoPaterno);
                    $apellidom.val(result.Data.apellidoMaterno);

                }
                else {
                    utils.fnShowSuccessMessage("Error, ha ocurrido un error");
                }
            };
            utils.fnExecuteWithResult(null,oUrl, oData, oProcessMessage, success, true, "Originacion");

        }
        catch (e) {
            utils.fnShowErrorMessage(e.message);
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

        

        if ($formServicio.valid()) {


            if (pacientesList.length<=0) {
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
                var email = "";
                var nombre = "";
                var tel = "";

                if ($tipoPersona.val() == "FISICA") {
                    rfc = $RfcFFisica.val();
                    email = $emailFisica.val();
                    nombre = $nombreFisica.val();
                    tel = $telFisica.val();
                }
                else {
                    rfc = $RfcF.val();
                    email = $EmailF.val();
                    nombre = $EmpresaF.val();
                    tel = $TelF.val();
                }


                var oData =
                {
                    "Pacientes": pacientesList,
                    "EnDomicilio": enDomicilio,
                    "CodigoPostal": $cp.val(),
                    "Delegacion": $delegacion.val(),
                    "Colonia": $colonia.val(),
                    "Calle": $cdpn.val(),
                    "FechaHoraVisita": $fechaVisita.val(),
                    "Telefono": $tel.val(),

                    //NUEVOS
                    "RfcF": rfc,
                    "EmailF": email,
                    "TelF": tel,


                    "isFacturacion": facturacion,
                    "EmpresaFiscal": nombre,
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

                        setTimeout(function () {
                            //window.location = '/home/indexpublic'; 
                            var allUrl = /:\/\/([^\/]+)/.exec(window.location.href)[1];
                            if (allUrl == "www.fiinsoft.mx") {
                                var url = "/Genelab/portal/home/index";
                                window.location = url;
                            } else {
                                var url = "/home/index";
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

    function EditarPaciente(idPaciente) {

       var  editPaciente = $.grep(pacientesList, function (e) {
            return e.Id == idPaciente;
       });

        $("#divAgregar").removeClass("visible").addClass("hidden");
        $("#divCancelar").removeClass("hidden").addClass("visible");
        $("#divGuardar").removeClass("hidden").addClass("visible");

     
        $nombre.val(editPaciente[0].nombrePaciente); 
        $apellidop.val(editPaciente[0].apellidoPPaciente);
        $apellidom.val(editPaciente[0].apellidoMPaciente);
        $parentesco.val(editPaciente[0].parentezco);
        $catalogo.val(editPaciente[0].estudioId); 
        $AnioNacimiento.val(editPaciente[0].anioNacimiento); 
        $titular.val(editPaciente[0].nombreTitular);
        $correoE.val(editPaciente[0].usuarioServicio);

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

    /// -------------------------------------------------------------------------
    /// Objeto de regreso
    /// -------------------------------------------------------------------------
    return {
        fnEditar: EditarPaciente,
        fnEliminar: EliminarPaciente,
    }

}();