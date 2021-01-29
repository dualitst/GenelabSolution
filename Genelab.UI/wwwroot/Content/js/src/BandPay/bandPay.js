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


var Solicitudes = function () {
    /// -------------------------------------------------------------------------
    /// Objetos
    /// -------------------------------------------------------------------------
    var sitioAPI = "http://localhost:57537/api";
    var grdOptions = {};
    var $grdDatos = document.querySelector('#grdDatos');
    var SessionData = utils.fnLocalData.get(utils.fnGlobals("Sesion"));
    var $modalCargar = $('#modalCargar');
    var $idSolicitud = $('#IdSolicitud');

    var colDefs = [
        utils.fnAgGrid_ColumnBuilder({ header: "NOMBRE", field: "nombrePaciente" }),
        utils.fnAgGrid_ColumnBuilder({ header: "ESTUDIO", field: "estudioNombre" }),
        utils.fnAgGrid_ColumnBuilder({ header: "EDAD", field: "edad" }),
        utils.fnAgGrid_ColumnBuilder({ header: "RESULTADO", field: "resultado" }),
        utils.fnAgGrid_ColumnBuilder({ header: "CT", field: "ct" }),
        utils.fnAgGrid_ColumnBuilder({ header: "FECHA DE RECEPCIÓN", field: "fechaHoraCreacion", sort: "asc" }),
        utils.fnAgGrid_ColumnBuilder({ header: "FECHA DE RESULTADOS", field: "fechaHoraCreacion" }),
        utils.fnAgGrid_ColumnBuilder({ header: "ESTATUS", field: "estatusNombre" }),
        utils.fnAgGrid_ColumnBuilder({ header: "PAGAR", noFilter: true, cellRenderer: cellRender_Pagar }),
        utils.fnAgGrid_ColumnBuilder({ header: "ACCIONES", noFilter: true, cellRenderer: cellRender_Acciones })
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

    var $tipoServicioDrop = $("#TipoServicioDrop");

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

        InitialCarga();

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

        utils.fnAgGrid_SetRowsAPI(grdOptions, "request/PayList", {}, false, "Originacion")
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

        content += "<a role='button' id='btnEditar_" + params.rowIndex + "' name='btnEditar_" + params.rowIndex + "' class='btn btn-info btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Editar' onclick='Solicitudes.fnModalRegistro(\"" + params.servicioId + "\")'><i class='material-icons'>mode_edit</i></a>&nbsp;&nbsp;&nbsp;&nbsp;";
        //content += "<a role='button' id='btnEliminar_" + params.rowIndex + "' name='btnEliminar_" + params.rowIndex + "' class='btn btn-danger btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Eliminar' onclick='Codigos.fnConfirmEliminarRegistro(\"" + params.data.cve_codigo + "\",\"" + params.data.cve_catalogo + "\")'><i class='material-icons'>delete</i></a>&nbsp;&nbsp;&nbsp;&nbsp;";

        return content;
    }

    function cellRender_Pagar(params) {
        var content = "";

        content += "<a role='button' id='btnAprobar_" + params.rowIndex + "' name='btnAprobar_" + params.rowIndex + "' class='btn btn-success btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Registrar el pago' onclick='Solicitudes.fnPagar(\"" + params.data.servicioId + "\")'><i class='material-icons'>attach_money</i></a>&nbsp;&nbsp;&nbsp;&nbsp;";
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


 

    function PagarSolicitud(idSolicitud) {
        $idSolicitud.val(idSolicitud);
        $modalCargar.modal('show');
    }


    function InitialCarga() {

        $(function () {
            $("#form_pago").on("submit", function (e) {
                e.preventDefault();
//init submit==========================================

                utils.fnShowConfirmMessage("¿Está seguro que desea guardar el pago de la solicitud ?",
                    function () {

                        var oUrl = sitioAPI + '/Request/GuardarPago';
                            var formData = new FormData(document.getElementById("form_pago"));
                            var tipoPago = $(".message_pri:checked").val();

                                    formData.append("IdSolicitud", $idSolicitud.val());
                                    formData.append("TipoPago", tipoPago);

                                    $.ajax({
                                        url: oUrl,
                                        type: "post",
                                        dataType: "html",
                                        data: formData,
                                        cache: false,
                                        contentType: false,
                                        processData: false
                                    })
                                        .done(function (res) {

                                            llenaGrid();

                                            setTimeout(
                                                function () {
                                                    utils.fnShowSuccessMessage("Se ha registrado el pago correctamente la solicitud correctamente");
                                                }, 2000);

                                        }).fail(function (jqXHR, textStatus, errorThrown) {
                                            utils.fnShowErrorMessage(JSON.stringify(jqXHR));
                                        });

             
           
                    },
                    function () {
                        utils.fnShowInfoMessage("Se canceló la acción");
                    });


//end submit===========================================
            });
        });


    }

    function GuardarPago(idSolicitud) {

    
    }
    /// -------------------------------------------------------------------------
    /// Objeto de regreso
    /// -------------------------------------------------------------------------
    return {
        fnActualizaFiltro: actualizaFiltro,
        fnModalRegistro: modalRegistro,
        fnPagar: PagarSolicitud
    }
}();