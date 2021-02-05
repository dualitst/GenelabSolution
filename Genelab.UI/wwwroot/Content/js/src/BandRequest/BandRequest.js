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
    var grdOptions = {};
    var $grdDatos = document.querySelector('#grdDatos');
    var SessionData = utils.fnLocalData.get(utils.fnGlobals("Sesion"));

    var colDefs = [
        utils.fnAgGrid_ColumnBuilder({ header: "ID", field: "id" }),
        utils.fnAgGrid_ColumnBuilder({ header: "NOMBRE", field: "nombrePaciente" }),
        utils.fnAgGrid_ColumnBuilder({ header: "ESTUDIO", field: "estudioNombre" }),
        utils.fnAgGrid_ColumnBuilder({ header: "EDAD", field: "edad" }),
        utils.fnAgGrid_ColumnBuilder({ header: "RESULTADO", field: "resultado" }),
        utils.fnAgGrid_ColumnBuilder({ header: "CT", field: "ct" }),
        utils.fnAgGrid_ColumnBuilder({ header: "FECHA DE RECEPCIÓN", field: "fechaHoraCreacion", sort: "asc" }),
        utils.fnAgGrid_ColumnBuilder({ header: "FECHA DE RESULTADOS", field: "fechaHoraCreacion" }),
        utils.fnAgGrid_ColumnBuilder({ header: "ESTATUS RECEPCIÓN", field: "estatusProcesoNombre" }),
        utils.fnAgGrid_ColumnBuilder({ header: "ESTATUS PAGO", field: "estatusPagoNombre" }),
        utils.fnAgGrid_ColumnBuilder({ header: "ESTATUS RESULTADO", field: "estatusResultadoNombre" }),
        utils.fnAgGrid_ColumnBuilder({ header: "ESTATUS FACTURA", field: "estatusFacturaNombre" }),
        //utils.fnAgGrid_ColumnBuilder({ header: "APROBAR", noFilter: true, cellRenderer: cellRender_Aprobar }),
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

        //Inicializando agGrid
        utils.fnAgGrid_Init(grdOptions, $grdDatos, colDefs, [])
            .done(function (res) {
                grdOptions = res;
            })

            .then(function () {
                //Alimentando agGrid
                llenaGridDomicilio();
            });

        $tipoServicioDrop.change(function () {
            if ($tipoServicioDrop.val() == 1) {
                enDomicilio();
            }
            else {
                enSitio();
            }
        });
    };



    // Funciones manejo Grid
    //----------------------
    function llenaGridDomicilio() {

        utils.fnAgGrid_SetRowsAPI(grdOptions, "request/ListEnDomicilio", {}, false, "Originacion")
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


    function llenaGridEnSitio() {
        utils.fnAgGrid_SetRowsAPI(grdOptions, "request/ListSitio", {}, false, "Originacion")
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

        //console.log(params.data.estatusProcesoId);
        if (params.data.estatusProcesoId == 1) {
            content += "<a role='button' id='btnEditar_" + params.rowIndex + "' name='btnEditar_" + params.rowIndex + "' class='btn btn-info btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Editar' onclick='Solicitudes.fnEditar(\"" + params.data.id + "\")'><i class='material-icons'>mode_edit</i></a>&nbsp;&nbsp;&nbsp;&nbsp;";
            content += "<a role='button' id='btnAprobar_" + params.rowIndex + "' name='btnAprobar_" + params.rowIndex + "' class='btn btn-success btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Aprobar para pago' onclick='Solicitudes.fnAprobar(\"" + params.data.id + "\")'><i class='material-icons'>assignment_turned_in</i></a>&nbsp;&nbsp;&nbsp;&nbsp;";
            //content += "<a role='button' id='btnEliminar_" + params.rowIndex + "' name='btnEliminar_" + params.rowIndex + "' class='btn btn-danger btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Eliminar' onclick='Codigos.fnConfirmEliminarRegistro(\"" + params.data.cve_codigo + "\",\"" + params.data.cve_catalogo + "\")'><i class='material-icons'>delete</i></a>&nbsp;&nbsp;&nbsp;&nbsp;";
        }
        return content;
    }

    function cellRender_Aprobar(params) {
        var content = "";

        content += "<a role='button' id='btnAprobar_" + params.rowIndex + "' name='btnAprobar_" + params.rowIndex + "' class='btn btn-success btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Aprobar para pago' onclick='Solicitudes.fnAprobar(\"" + params.data.servicioId + "\")'><i class='material-icons'>assignment_turned_in</i></a>&nbsp;&nbsp;&nbsp;&nbsp;";
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


    function enDomicilio() {

     
        llenaGridDomicilio();
    }

    function enSitio() {

        llenaGridEnSitio();
    }

    function EditarSolicitud(idSolicitud) {
        alert(JSON.stringify(idSolicitud));
        alert(idSolicitud);
        alert(JSON.parse(idSolicitud));
    }

    function AprobarParaPago(idSolicitud) {

        utils.fnShowConfirmMessage("¿Está seguro que desea pasar a prepago la solicitud ?  " + idSolicitud + "?",
            function () {

                try {
                    var oUrl = 'Request/Prepago';
                    var oData =
                    {
                        "IdSolicitud": idSolicitud,
                    };


                    var oProcessMessage = 'Validando información, espere por favor...';
                    var success = function (result) {

                        if (utils.fnValidResult(result)) {

                            if ($tipoServicioDrop.val() == 1) {
                                enDomicilio();
                            }
                            else {
                                enSitio();
                            }

                            setTimeout(
                                function () {
                                    utils.fnShowSuccessMessage("Se ha pasado a prepago la solicitud correctamente");
                                }, 2000);

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
        fnEditar: EditarSolicitud,
        fnAprobar: AprobarParaPago,

    }
}();