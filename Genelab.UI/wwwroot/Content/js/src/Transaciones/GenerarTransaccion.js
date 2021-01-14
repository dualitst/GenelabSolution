/*eslint eqeqeq:0*/
/// <summary>
/// Nombre: Codigos
/// Descripcion: 
/// Fecha de creación: 2018-10-12
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


var GenerarTransaccion = function () {
    /// -------------------------------------------------------------------------
    /// Objetos
    /// -------------------------------------------------------------------------
    var grdOptions = {};
    var $grdTransaccion = $('#grdTransaccion');
    var SessionData = utils.fnLocalData.get(utils.fnGlobals("Sesion"));

   
    //var $frmDatos = $("#frmDatos");
    //var $hdnIdDato = $("#hdnIdDato");
    var $hdnURLValidacion = $("#hdnURLValidacion");
    var $selTransacion = $("#selTransacion");
    var $hdnPlantilla = $("hdnPlantilla");
    //var $txtCodigoEnvio = $("#txtCodigoEnvio");
    //var $selTipoControl = $("#selTipoControl");
    //var $selTipoDato = $("#selTipoDato");
    //var $txtOpciones = $("#txtOpciones");
    //var $chkActivo = $("#chkActivo");
    //var $btnGuardar = $("#btnGuardar");



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
        //Inicializando página
        utils.fnPage_Init();

        //Parámetros
        // var params = utils.fnGetURLParams();

        //Llena select Unidad de negocio
        // utils.fnLlenaSelect(null, $selCatalogo, "CatalogoCodigos/GetList", { }, "cve_catalogo", "descripcion", "", "Catálogo:", null, "Originacion");

        //Inicializando agGrid
        //utils.fnAgGrid_Init(grdOptions, $grdDatos, colDefs, Datos)
        //    .done(function (res) {
        //        grdOptions = res;
        //    })

        //    .then(function () {
        //        //    //Alimentando agGrid
        //        //    llenaGrid();
        //        $('[data-toggle="tooltip"]').tooltip({
        //            container: 'body'
        //        });
        //    });
    };



    // Funciones manejo Grid
    //----------------------
    function llenaGrid() {
        utils.fnAgGrid_SetRowsAPI(grdOptions, "TransacionesAdmin/ObtenerTransaciones", {}, false, "Originacion")
            .done(function (res) {
                grdOptions = res;
            })
            .done(function () {
                //Inicilizando Tooltips del grid
                $('[data-toggle="tooltip"]').tooltip({
                    container: 'body'
                });
            });
    };

    function validarRegistro() {
        var URL = $("#hdnURLValidacion").val();
        var variablesURL = [];
        while (URL.indexOf("!_") >= 0)
        {
            var inicio = URL.indexOf("!_");
            var fin = URL.indexOf("_!");
            var variable = URL.slice(inicio + 2, fin)
            URL = URL.replace("!_" + variable + "_!",variable);
            variablesURL.push(variable);
        }
        URL = $("#hdnURLValidacion").val();
        for (var i = 0; i < variablesURL.length; i++) {
           URL= URL.replace("!_" + variablesURL[i] + "_!", $("#" + variablesURL[i]).val());
        }


        $.ajax({
            url: "GenerarTransaccion/ValidacionInicial",
            type: "GET",
            timeout: 180000,
            data: { 'url64': window.btoa(URL) },
            cache: false,
            success: function (result) {
                var resobj = JSON.parse(result);
                var propiedades = Object.keys(resobj);
                for (var i = 0; i < propiedades.length; i++) {
                    $("#" + propiedades[i]).val(resobj[propiedades[i]]);
                }
            },
            error: function (error) {
                alert(error);
            }
        });

        
    }
    function confirmEnviarRegistro() {
        var URL = $("#hdnURLEnvio").val();
        var variablesURL = [];
        while (URL.indexOf("!_") >= 0) {
            var inicio = URL.indexOf("!_");
            var fin = URL.indexOf("_!");
            var variable = URL.slice(inicio + 2, fin)
            URL = URL.replace("!_" + variable + "_!", variable);
            variablesURL.push(variable);
        }
        URL = $("#hdnURLEnvio").val();
        for (var i = 0; i < variablesURL.length; i++) {
            URL = URL.replace("!_" + variablesURL[i] + "_!", $("#" + variablesURL[i]).val());
        }


        $.ajax({
            url: "GenerarTransaccion/EnvioTransacion",
            type: "GET",
            timeout: 180000,
            data: { 'url64': window.btoa(URL), 'idtransaccion': $selTransacion.val() },
            cache: false,
            success: function (result) {
                var resobj = JSON.parse(result);
                var propiedades = Object.keys(resobj);
                var plantilla = $("#hdnPlantilla").val();
                for (var i = 0; i < propiedades.length; i++) {
                    plantilla = plantilla.replace("!_" + propiedades[i] + "_!",  resobj[propiedades[i]]);
                }
                var d = new Date();
                plantilla = plantilla.replace("!_DATENOW_!", d);
                $("#PlantillaPrint").html(plantilla);
                var divToPrint = document.getElementById('PlantillaPrint');
                var newWin = window.open('', 'Print-Window');
                newWin.document.open();
                newWin.document.write('<html><body onload="window.print()">' + divToPrint.innerHTML + '</body></html>');
                newWin.document.close();
                setTimeout(function () { newWin.close(); }, 10);
            },
            error: function (error) {
                alert(error);
            }
        });
    }

    function cargarTransaccion() {
        
        $.ajax({
            url: "GenerarTransaccion/ObtenerControlesTransaccion",
            type: "GET",
            timeout: 180000,
            data: { 'idTransaccion': $selTransacion.val() },
            cache: false,
            success: function (result) {
                $grdTransaccion.html(result);
            },
            error: function (error) {
                alert(error);
            }

        });
    };

    //Actualiza filtro
    function actualizaFiltro() {
        grdOptions.api.setQuickFilter(document.getElementById('txtFiltro').value);
    };

    // cellRender Acciones
    function cellRender_Acciones(params) {
        var content = "";
        content += "<a role='button' id='btnEditar_" + params.rowIndex + "' name='btnEditar_" + params.rowIndex + "' class='btn btn-info btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Editar' onclick='EdicionControles.fnModalRegistro(\"" + params.data.IdControl + "\")'><i class='material-icons'>mode_edit</i></a>&nbsp;&nbsp;&nbsp;&nbsp;";
        content += "<a role='button' id='btnEliminar_" + params.rowIndex + "' name='btnEliminar_" + params.rowIndex + "' class='btn btn-danger btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Eliminar' onclick='EdicionControles.fnConfirmEliminarRegistro(\"" + params.data.IdTransacion + "\")'><i class='material-icons'>delete</i></a>&nbsp;&nbsp;&nbsp;&nbsp;";

        return content;
    }


    // Modal registro
    //---------------
    function modalRegistro(idControl, cve_catalogo) {
        if (typeof (idControl) == "undefined") {
            idControl = "";
            $txtNombreEtiqueta.removeAttr("readonly");
        }
        else {
            $txtNombreEtiqueta.attr("readonly", true);
        }

        utils.fnLimpiaForm($frmDatos.attr('id'));
        $hdnIdDato.val(idControl);

        if (idControl != "") {

            $.ajax({
                url: "../TransacionesAdmin/ObtenerControl",
                type: "GET",
                timeout: 180000,
                data: { 'idControl': idControl },
                cache: false,
                success: function (result) {
                    utils.fnActualizaInput($txtNombreEtiqueta.attr('id'), result.NombreEtiqueta, "");
                    utils.fnActualizaInput($txtCodigoEnvio.attr('id'), result.CodigoEnvio, "");
                    utils.fnActualizaSelect($selTipoControl.attr('id'), true, result.IdTipoControl);
                    utils.fnActualizaSelect($selTipoDato.attr('id'), true, result.TipoDato);
                    utils.fnActualizaInput($txtOpciones.attr('id'), result.Opciones, "");
                    $chkActivo.prop("checked", result.Activo);
                },
                error: function (error) {
                    alert(error);
                }

            });
        }




        $('#modalAgregar').modal('show');
    }


    // Confirm guardar registro
    //-------------------------
    function confirmGuardarRegistro() {
        //Validando
        $frmDatos.validate({
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
        var DatosGuardados;
        var URlPost = "";
        if ($hdnIdDato.val() == "") {
            DatosGuardados = {
                IdTransaccion: $hdnIdTransaccion.val(),
                NombreEtiqueta: $txtNombreEtiqueta.val(),
                CodigoEnvio: $txtCodigoEnvio.val(),
                IdTipoControl: $selTipoControl.val(),
                TipoDato: $selTipoDato.val(),
                Opciones: $txtOpciones.val(),
                Obligatorio: $chkActivo.prop('checked'),
            };
            URlPost = "../TransacionesAdmin/AgregarControles";
        }
        else {
            DatosGuardados = {
                IdControl: $hdnIdDato.val(),
                IdTransaccion: $hdnIdTransaccion.val(),
                NombreEtiqueta: $txtNombreEtiqueta.val(),
                CodigoEnvio: $txtCodigoEnvio.val(),
                IdTipoControl: $selTipoControl.val(),
                TipoDato: $selTipoDato.val(),
                Opciones: $txtOpciones.val(),
                Obligatorio: $chkActivo.prop('checked'),
            };
            URlPost = "../TransacionesAdmin/ActualizarControles";
        }




        if ($frmDatos.valid()) {

            utils.fnShowConfirmMessage("¿Está seguro que desea guardar los datos?",
                function () {
                    $.ajax({
                        url: URlPost,
                        type: "POST",
                        timeout: 180000,
                        data: DatosGuardados,
                        cache: false,
                        success: function (result) {
                            utils.fnShowSuccessMessage("Datos guardados con éxito!");
                            //Alimentando Grid
                            //  llenaGrid();
                            $(".close-modal").click();
                        },
                        error: function (error) {
                            alert(error);
                        }

                    })
                },
                function () {
                    utils.fnShowInfoMessage("Se canceló la acción");
                });
        }
    }


    // Confirm eliminar registro
    //--------------------------
    function confirmEliminarRegistro(id_dato, cve_catalogo) {
        if (typeof (id_dato) == "undefined") {
            id_dato = 0;
        }

        utils.fnShowConfirmMessage("¿Está seguro que desea eliminar el registro: " + id_dato + "?",
            function () {
                utils.fnGetAPIData("Codigos/Delete", {
                    cve_codigo: id_dato,
                    cve_catalogo: cve_catalogo,
                    user_stamp: SessionData.id_usuario
                }, "Originacion", function (result) {
                    if (utils.fnValidResult(result)) {
                        utils.fnShowSuccessMessage("Registro eliminado con éxito!");

                        //Alimentando Grid
                        llenaGrid();
                    }
                });
            },
            function () {
                utils.fnShowInfoMessage("Se canceló la acción");
            });
    }
    function editarControles(IdTransacion) {
        window.location.href += '/Editarcontroles?IdTransacion=' + IdTransacion;
    }



    /// -------------------------------------------------------------------------
    /// Objeto de regreso
    /// -------------------------------------------------------------------------
    return {
        fnCargarTransaccion: cargarTransaccion,
        fnValidarRegistro: validarRegistro,
        fnConfirmEnviarRegistro: confirmEnviarRegistro,
        fnActualizaFiltro: actualizaFiltro,
        fnModalRegistro: modalRegistro,
        fnConfirmGuardarRegistro: confirmGuardarRegistro,
        fnConfirmEliminarRegistro: confirmEliminarRegistro,
        
    }
}();