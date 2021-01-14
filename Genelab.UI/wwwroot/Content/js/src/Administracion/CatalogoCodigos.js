/*eslint eqeqeq:0*/
/// <summary>
/// Nombre: CatalogoCodigos
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


var CatalogoCodigos = function () {
    /// -------------------------------------------------------------------------
    /// Objetos
    /// -------------------------------------------------------------------------
    var grdOptions = {};
    var $grdDatos = document.querySelector('#grdDatos');
    var SessionData = utils.fnLocalData.get(utils.fnGlobals("Sesion"));

    var colDefs = [
        utils.fnAgGrid_ColumnBuilder({ header: "Código", field: "cve_catalogo" }),
        utils.fnAgGrid_ColumnBuilder({ header: "Descripción", field: "descripcion", sort:"asc" }),
        utils.fnAgGrid_ColumnBuilder({ header: "Estatus", field: "status" }),
        utils.fnAgGrid_ColumnBuilder({ header: "Acciones", noFilter: true, cellRenderer: cellRender_Acciones })
    ];
    

    var $hdnIdDato = $("#hdnIdDato");
    var $frmDatos = $("#frmDatos");

    var $txtCodigo          = $("#txtCodigo");
    var $txtDescripcion     = $("#txtDescripcion");
    var $chkActivo          = $("#chkActivo");

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
        utils.fnAgGrid_SetRowsAPI(grdOptions, "CatalogoCodigos/GetList", {}, false, "Originacion")
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

        content += "<a role='button' id='btnEditar_" + params.rowIndex + "' name='btnEditar_" + params.rowIndex + "' class='btn btn-info btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Editar' onclick='CatalogoCodigos.fnModalRegistro(\"" + params.data.cve_catalogo.trim() + "\")'><i class='material-icons'>mode_edit</i></a>&nbsp;&nbsp;&nbsp;&nbsp;";

        return content;
    }


    // Modal registro
    //---------------
    function modalRegistro(id_dato) {
        if (typeof (id_dato) == "undefined") {
            id_dato = "";
            $txtCodigo.removeAttr("readonly");
        }
        else {
            $txtCodigo.attr("readonly", true);
        }

        utils.fnLimpiaForm($frmDatos.attr('id'));
        $hdnIdDato.val(id_dato);

        if (id_dato != "") {
            utils.fnGetAPIData("CatalogoCodigos/Get", { cve_catalogo: $hdnIdDato.val().trim() }, "Originacion", function (result) {
                if (utils.fnValidResult(result)) {
                    utils.fnActualizaInput($txtCodigo.attr('id'), result.Data.cve_catalogo, "");
                    utils.fnActualizaInput($txtDescripcion.attr('id'), result.Data.descripcion, "");
                    $chkActivo.prop("checked", result.Data.status == "A");
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
                    utils.fnGetAPIData($hdnIdDato.val() == "" ? "CatalogoCodigos/Insert" : "CatalogoCodigos/Update", {
                        cve_catalogo: $txtCodigo.val(),
                        descripcion: $txtDescripcion.val(),
                        status: $chkActivo.prop("checked") ? "A" : "I",
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



    /// -------------------------------------------------------------------------
    /// Objeto de regreso
    /// -------------------------------------------------------------------------
    return {
        fnActualizaFiltro: actualizaFiltro,
        fnModalRegistro: modalRegistro,
        fnConfirmGuardarRegistro: confirmGuardarRegistro
    }
}();