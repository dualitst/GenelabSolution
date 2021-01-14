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


var DenominacionesMoneda = function () {
    /// -------------------------------------------------------------------------
    /// Objetos
    /// -------------------------------------------------------------------------
    var grdOptions = {};
    var $grdDatos = document.querySelector('#grdDatos');
    var SessionData = utils.fnLocalData.get(utils.fnGlobals("Sesion"));

    var colDefs = [
        utils.fnAgGrid_ColumnBuilder({ header: "Moneda", field: "id_moneda", sort: "asc" }),
        utils.fnAgGrid_ColumnBuilder({ header: "Denominacion", field: "id_denominacion", sort: "asc" }),
        utils.fnAgGrid_ColumnBuilder({ header: "Acciones", noFilter: true, cellRenderer: cellRender_Acciones })
    ];

    var $hdnIdDato = $("#hdnIdDato");
    var $hdnidDenominacionMoneda = $("#hdnidDenominacionMoneda");
    var $frmDatos = $("#frmDatos");
    var $selMoneda = $("#selMoneda");
    var $selDenominacion = $("#selDenominacion");


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

        //Llena select Unidad de negocio
        utils.fnLlenaSelect(null, $selMoneda, "Monedas/GetList", {}, "id_moneda", "nombre", "", "Moneda:", null, "Reporteria");
        utils.fnLlenaSelect(null, $selDenominacion, "Denominaciones/GetList", {}, "id_denominacion", "denominacion", "", "Denominacion:", null, "Reporteria");

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
        utils.fnAgGrid_SetRowsAPI(grdOptions, "DenominacionesMoneda/GetList", {}, false, "Reporteria")
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

        content += "<a role='button' id='btnEditar_" + params.rowIndex + "' name='btnEditar_" + params.rowIndex + "' class='btn btn-info btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Editar' onclick='DenominacionesMoneda.fnModalRegistro(\"" + params.data.id_denominacion_moneda + "\")'><i class='material-icons'>mode_edit</i></a>&nbsp;&nbsp;&nbsp;&nbsp;";
        content += "<a role='button' id='btnEliminar_" + params.rowIndex + "' name='btnEliminar_" + params.rowIndex + "' class='btn btn-danger btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Eliminar' onclick='DenominacionesMoneda.fnConfirmEliminarRegistro(\"" + params.data.id_denominacion_moneda + "\")'><i class='material-icons'>delete</i></a>&nbsp;&nbsp;&nbsp;&nbsp;";

        return content;
    }


    // Modal registro
    //---------------
    function modalRegistro(id_dato) {
        if (typeof (id_dato) == "undefined") {
            id_dato = "";
        }

        utils.fnLimpiaForm($frmDatos.attr('id'));
        $hdnIdDato.val(id_dato);

        if (id_dato != "") {
            utils.fnGetAPIData("DenominacionesMoneda/Get", { id_denominacion_moneda: $hdnIdDato.val() }, "Reporteria", function (result) {
                if (utils.fnValidResult(result)) {
                    utils.fnActualizaSelect($selMoneda.attr('id'),true, result.Data.id_moneda,false, "");
                    utils.fnActualizaSelect($selDenominacion.attr('id'),true, result.Data.id_denominacion,false, "");
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
                    utils.fnGetAPIData($hdnIdDato.val() == "" ? "DenominacionesMoneda/Insert" : "DenominacionesMoneda/Update", {
                        id_denominacion_moneda: $hdnIdDato.val(),
                        id_moneda: $selMoneda.val(),
                        id_denominacion: $selDenominacion.val()

                    },
                        "Reporteria", function (result) {
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
                utils.fnGetAPIData("DenominacionesMoneda/Delete", {
                    id_moneda: id_dato

                }, "Reporteria", function (result) {
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