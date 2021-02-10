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
    var sitioAPI = "http://www.fiinsoft.mx/Genelab/api/api";
    //var sitioAPI = "http://localhost:57537/api";
    var grdOptions = {};
    var $grdDatos = document.querySelector('#grdDatos');
    var $modalCargar = $('#modalCargar');
    var $idSolicitud = $('#IdSolicitud');
    var $comentarios = $('#Comentarios');  

    var colDefs = [
        utils.fnAgGrid_ColumnBuilder({ header: "ID", field: "id" }),
        utils.fnAgGrid_ColumnBuilder({ header: "NOMBRE", field: "nombrePaciente" }),
        utils.fnAgGrid_ColumnBuilder({ header: "ESTUDIO", field: "estudioNombre" }),
        utils.fnAgGrid_ColumnBuilder({ header: "RESULTADO", field: "resultado" }),
        utils.fnAgGrid_ColumnBuilder({ header: "FECHA DE RECEPCIÓN", field: "fechaHoraCreacion", sort: "asc" }),
        //utils.fnAgGrid_ColumnBuilder({ header: "ESTATUS PAGO", field: "estatusPagoNombre" }),
        utils.fnAgGrid_ColumnBuilder({ header: "FECHA PAGO", field: "fechaHoraPago" }),
        utils.fnAgGrid_ColumnBuilder({ header: "ESTATUS FACTURA", field: "estatusFacturaNombre" }),
        utils.fnAgGrid_ColumnBuilder({ header: "FECHA FACTURA", field: "fechaHoraFactura" }),
        utils.fnAgGrid_ColumnBuilder({ header: "USUARIO CARGA", field: "usuarioIdFactura" }), 
        utils.fnAgGrid_ColumnBuilder({ header: "ACCIONES", noFilter: true, cellRenderer: cellRender_Pagar })
    ];

   
    /// -------------------------------------------------------------------------
    /// Init
    /// -------------------------------------------------------------------------
    $(document).ready(function () {
        fnInit();
    });


    function InitialCarga() {
        $(function () {
            $("#form_pago").on("submit", function (e) {
                e.preventDefault();
                //init submit==========================================
                utils.fnShowConfirmMessage("¿Está seguro que desea cargar la factura de la solicitud " + $idSolicitud.val()+" ?",
                    function () {

                        var token = localStorage.getItem(utils.fnGlobals("Token"));
                        var oUrl = sitioAPI + '/Request/Facturado';
                        var formData = new FormData(document.getElementById("form_pago"));

                        formData.append("IdSolicitud", $idSolicitud.val());
                        //formData.append("Comentarios", $comentarios.val());

                        $.ajax({
                            url: oUrl,
                            type: "post",
                            dataType: "html",
                            data: formData,
                            cache: false,
                            contentType: false,
                            processData: false,
                            headers: { 'Authorization': 'Bearer ' + token},
                        })
                            .done(function (res) {

                                setTimeout(
                                    function () {
                                        utils.fnShowSuccessMessage("Se ha registrado el pago correctamente la solicitud correctamente");
                                        $modalCargar.modal('toggle');
                                        //clearModal();
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
    /// -------------------------------------------------------------------------
    /// Funciones
    /// -------------------------------------------------------------------------
    function fnInit() {
        //Inicializando página
        utils.fnPage_Init();

        //Inicializando agGrid
        utils.fnAgGrid_Init(grdOptions, $grdDatos, colDefs, [])
            .done(function (res) {
                grdOptions = res;
            })

            .then(function () {
                //Alimentando agGrid
                llenaGrid();
            });

        InitialCarga();
    };

    // Funciones manejo Grid
    //----------------------
    function llenaGrid() {

        utils.fnAgGrid_SetRowsAPI(grdOptions, "request/FacturaList", {}, false, "Originacion")
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
        if (params.data.estatusFacturaId == 1) {
            content += "<a role='button' id='btnAprobar_" + params.rowIndex + "' name='btnAprobar_" + params.rowIndex + "' class='btn btn-success btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Cargar factura de la solicitud' onclick='Solicitudes.fnCargarFactura(\"" + params.data.id + "\")'><i class='material-icons'>chrome_reader_mode</i></a>&nbsp;&nbsp;&nbsp;&nbsp;";
        }
            return content;
    }

    function CargarFactura(idSolicitud) {

        $idSolicitud.val(idSolicitud);
        $modalCargar.modal('show');

    }
    /// -------------------------------------------------------------------------
    /// Objeto de regreso
    /// -------------------------------------------------------------------------
    return {
        fnCargarFactura: CargarFactura
    }
}();