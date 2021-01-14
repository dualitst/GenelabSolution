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


var EdicionControles = function () {
    /// -------------------------------------------------------------------------
    /// Objetos
    /// -------------------------------------------------------------------------
    var grdOptions = {};
    var $grdDatos = document.querySelector('#grdDatos');
    var SessionData = utils.fnLocalData.get(utils.fnGlobals("Sesion"));

    var colDefs = [
        utils.fnAgGrid_ColumnBuilder({ header: "Nombre Etiqueta", field: "NombreEtiqueta" }),
        utils.fnAgGrid_ColumnBuilder({ header: "Codigo Envio", field: "CodigoEnvio" }),
        utils.fnAgGrid_ColumnBuilder({ header: "Tipo de Dato", field: "TipoDatoString" }),
        utils.fnAgGrid_ColumnBuilder({ header: "Tipo de Control", field: "TipoControlString" }),
        utils.fnAgGrid_ColumnBuilder({ header: "Obligatorio", field: "Obligatorio" }),
        utils.fnAgGrid_ColumnBuilder({ header: "Acciones", noFilter: true, cellRenderer: cellRender_Acciones })
    ];
    var $frmDatos = $("#frmDatos");
    var $hdnIdDato = $("#hdnIdDato");
    var $hdnIdTransaccion = $("#hdnIdTransaccion");
    var $txtNombreEtiqueta = $("#txtNombreEtiqueta");
    var $txtCodigoEnvio = $("#txtCodigoEnvio");
    var $selTipoControl = $("#selTipoControl");
    var $selTipoDato = $("#selTipoDato");
    var $txtOpciones = $("#txtOpciones");
    var $chkActivo = $("#chkActivo");
    var $btnGuardar = $("#btnGuardar");



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
        utils.fnAgGrid_Init(grdOptions, $grdDatos, colDefs, Datos)
            .done(function (res) {
                grdOptions = res;
            })

            .then(function () {
                //    //Alimentando agGrid
                //    llenaGrid();
                $('[data-toggle="tooltip"]').tooltip({
                    container: 'body'
                });
            });
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
    }

    //Actualiza filtro
    function actualizaFiltro() {
        grdOptions.api.setQuickFilter(document.getElementById('txtFiltro').value);
    }

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
                    utils.fnActualizaSelect($selTipoDato.attr('id'), true,result.TipoDato);
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
                IdTransaccion : $hdnIdTransaccion.val(),
                NombreEtiqueta : $txtNombreEtiqueta.val(),
                CodigoEnvio : $txtCodigoEnvio.val(),
                IdTipoControl : $selTipoControl.val(),
                TipoDato : $selTipoDato.val(),
                Opciones: $txtOpciones.val(),
                Obligatorio :$chkActivo.prop('checked'),
            };
            URlPost = "../TransacionesAdmin/AgregarControles";
        }
        else {
            DatosGuardados = {
                IdControl : $hdnIdDato.val(),
                IdTransaccion : $hdnIdTransaccion.val(),
                NombreEtiqueta : $txtNombreEtiqueta.val(),
                CodigoEnvio : $txtCodigoEnvio.val(),
                IdTipoControl : $selTipoControl.val(),
                TipoDato : $selTipoDato.val(),
                Opciones: $txtOpciones.val(),
                Obligatorio :$chkActivo.prop('checked'),
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
                            var url = new URL(window.location.href);
                            var search_params = url.searchParams;
                            search_params.set('IdTransacion', result);
                            url.search = search_params.toString();
                            window.location.href=  url.toString();
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
        fnActualizaFiltro: actualizaFiltro,
        fnModalRegistro: modalRegistro,
        fnConfirmGuardarRegistro: confirmGuardarRegistro,
        fnConfirmEliminarRegistro: confirmEliminarRegistro,
        fnEditarControles: editarControles
    }
}();