/*eslint eqeqeq:0*/
/// <summary>
/// Nombre: Solicitud
/// Descripcion: 
/// Fecha de creación: 2021
/// Autor: fromero
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


var DatosPublico = function () {
    /// -------------------------------------------------------------------------
    /// Objetos
    /// -------------------------------------------------------------------------
    var grdOptions = {};
    var $grdDatos = document.querySelector('#grdDatos');
    var SessionData = utils.fnLocalData.get(utils.fnGlobals("Sesion"));

    var colDefs = [
        utils.fnAgGrid_ColumnBuilder({ header: "Cliente", field: "nombrePaciente" }),
        utils.fnAgGrid_ColumnBuilder({ header: "Paciente", field: "nombrePaciente" }),
        utils.fnAgGrid_ColumnBuilder({ header: "Fecha", field: "fechaHoraCreacion"}),
        utils.fnAgGrid_ColumnBuilder({ header: "Estudio", field: "estudioId" }),
        utils.fnAgGrid_ColumnBuilder({ header: "Estatus", field: "estatusId" }),
        utils.fnAgGrid_ColumnBuilder({ header: "Acciones", noFilter: true, cellRenderer: cellRender_Acciones })
    ];

    var $hdnIdDato = $("#hdnIdDato");
    var $hdnCveCatalogo = $("#hdnCveCatalogo");
    var $frmDatos = $("#frmDatos");
    var $txtCodigo = $("#txtCodigo");
    var $txtDescripcion = $("#txtDescripcion");
    var $selCatalogo = $("#selCatalogo");
    var $txtResolucion = $("#txtResolucion");
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
        var params = utils.fnGetURLParams();

        //Inicializando agGrid
        utils.fnAgGrid_Init(grdOptions, $grdDatos, colDefs, [])
            .done(function (res) {
                grdOptions = res;
            })

            .then(function () {
                //Alimentando agGrid
                llenaGrid();
            });
    };



    // Funciones manejo Grid
    //----------------------
    function llenaGrid() {

        utils.fnAgGrid_SetRowsAPI(grdOptions, "request/list", {}, false, "Originacion")
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

        content += "<a role='button' id='btnEditar_" + params.rowIndex + "' name='btnEditar_" + params.rowIndex + "' class='btn btn-info btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Editar' onclick='Codigos.fnModalRegistro(\"" + params.data.cve_codigo + "\",\"" + params.data.cve_catalogo + "\")'><i class='material-icons'>mode_edit</i></a>&nbsp;&nbsp;&nbsp;&nbsp;";
        content += "<a role='button' id='btnEliminar_" + params.rowIndex + "' name='btnEliminar_" + params.rowIndex + "' class='btn btn-danger btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Eliminar' onclick='Codigos.fnConfirmEliminarRegistro(\"" + params.data.cve_codigo + "\",\"" + params.data.cve_catalogo + "\")'><i class='material-icons'>delete</i></a>&nbsp;&nbsp;&nbsp;&nbsp;";

        return content;
    }


    // Modal registro
    //---------------
    function modalRegistro(id_dato, cve_catalogo) {
        if (typeof (id_dato) == "undefined") {
            id_dato = "";
            $txtCodigo.removeAttr("readonly");
        }
        else {
            $txtCodigo.attr("readonly", true);
        }

        utils.fnLimpiaForm($frmDatos.attr('id'));
        $hdnIdDato.val(id_dato);
        $hdnCveCatalogo.val(cve_catalogo);

        if (id_dato != "") {
            utils.fnGetAPIData("Codigos/Get", { cve_codigo: $hdnIdDato.val(), cve_catalogo: $hdnCveCatalogo.val() }, "Originacion", function (result) {
                if (utils.fnValidResult(result)) {
                    utils.fnActualizaInput($txtCodigo.attr('id'), result.Data.cve_codigo, "");
                    utils.fnActualizaInput($txtDescripcion.attr('id'), result.Data.desc_codigo, "");
                    utils.fnActualizaSelect($selCatalogo.attr('id'), true, result.Data.cve_catalogo.trim(), false, "");
                    utils.fnActualizaInput($txtResolucion.attr('id'), result.Data.resolucion != null ? result.Data.resolucion.trim() : "", "");
                    $chkActivo.prop("checked", result.Data.status);
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

        if ($frmDatos.valid()) {
            utils.fnShowConfirmMessage("¿Está seguro que desea guardar los datos?",
                function () {
                    utils.fnGetAPIData($hdnIdDato.val() == "" ? "Codigos/Insert" : "Codigos/Update", {
                        cve_codigo: $txtCodigo.val(),
                        desc_codigo: $txtDescripcion.val(),
                        cve_catalogo: $selCatalogo.val(),
                        resolucion: $txtResolucion.val(),
                        status: $chkActivo.prop("checked"),
                        user_stamp: SessionData.id_usuario
                    },
                        "Originacion", function (result) {
                            if (utils.fnValidResult(result)) {
                                utils.fnShowSuccessMessage("Datos guardados con éxito!");

                                //Alimentando Grid
                                llenaGrid();

                                $(".close-modal").click();
                            }
                        });
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



    /// -------------------------------------------------------------------------
    /// Objeto de regreso
    /// -------------------------------------------------------------------------
    return {
        fnActualizaFiltro: actualizaFiltro,
        fnModalRegistro: modalRegistro,
        fnConfirmGuardarRegistro: confirmGuardarRegistro,
        fnConfirmEliminarRegistro: confirmEliminarRegistro
    }
}();