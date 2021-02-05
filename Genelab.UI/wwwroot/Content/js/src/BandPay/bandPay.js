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
    //var sitioAPI = "http://www.fiinsoft.mx/Genelab/api/api";
    var grdOptions = {};
    var $grdDatos = document.querySelector('#grdDatos');
    var $modalCargar = $('#modalCargar');
    var $idSolicitud = $('#IdSolicitud');
    var $tarjeta = $('#Tarjeta'); 
    var $monto = $('#Monto');

    var colDefs = [
        utils.fnAgGrid_ColumnBuilder({ header: "ID", field: "id" }),
        utils.fnAgGrid_ColumnBuilder({ header: "NOMBRE", field: "nombrePaciente" }),
        utils.fnAgGrid_ColumnBuilder({ header: "ESTUDIO", field: "estudioNombre" }),
        utils.fnAgGrid_ColumnBuilder({ header: "EDAD", field: "edad" }),
        utils.fnAgGrid_ColumnBuilder({ header: "RESULTADO", field: "resultado" }),
        utils.fnAgGrid_ColumnBuilder({ header: "CT", field: "ct" }),
        utils.fnAgGrid_ColumnBuilder({ header: "FECHA DE RECEPCIÓN", field: "fechaHoraCreacion", sort: "asc" }),
        utils.fnAgGrid_ColumnBuilder({ header: "FECHA DE RESULTADOS", field: "fechaHoraCreacion" }),
        utils.fnAgGrid_ColumnBuilder({ header: "ESTATUS", field: "estatusPagoNombre" }),
        utils.fnAgGrid_ColumnBuilder({ header: "ACCIONES", noFilter: true, cellRenderer: cellRender_Pagar })
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

        $('input:radio[name=tipoPagoRad]').change(function () {
            if (this.value == 'TARJETA') {
                $tarjeta.prop("disabled", false);
            }
            else if (this.value == 'EFECTIVO') {
                $tarjeta.prop("disabled", true);

            } else if (this.value == 'TRANSFERENCIA') {
                $tarjeta.prop("disabled", true);
            }
            
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


    function cellRender_Pagar(params) {
        var content = "";

        content += "<a role='button' id='btnAprobar_" + params.rowIndex + "' name='btnAprobar_" + params.rowIndex + "' class='btn btn-success btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Registrar el pago' onclick='Solicitudes.fnPagar(\"" + params.data.id + "\")'><i class='material-icons'>attach_money</i></a>&nbsp;&nbsp;&nbsp;&nbsp;";
        return content;
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
                                                    $modalCargar.modal('toggle');
                                                    clearModal();
                                                    llenaGrid();
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
    function clearModal() {

        $('input[name="tipoPagoRad"]').prop('checked', false);
         $tarjeta.val("");
         $monto.val("");
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