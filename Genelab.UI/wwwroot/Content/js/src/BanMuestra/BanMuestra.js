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
    //var sitioAPI = "http://localhost:57537/api";
    var sitioAPI = "http://www.fiinsoft.mx/Genelab/api/api";
    var grdOptions = {};
    var $grdDatos = document.querySelector('#grdDatos');
    var $modalCargar = $('#modalCargar');
    var $idSolicitud = $('#IdSolicitud');
    var $tarjeta = $('#Tarjeta');
    var $monto = $('#Monto');
    var $pacienteSolicitud = $('#pacienteSolicitud');

    var colDefs = [
        utils.fnAgGrid_ColumnBuilder({ header: "<i class='material-icons'>settings</i>", noFilter: true, cellRenderer: cellRender_Pagar }),
        //utils.fnAgGrid_ColumnBuilder({ header: "SOLICITUD", field: "id" }),
        utils.fnAgGrid_ColumnBuilder({ header: "ID", field: "tipoServicioId" }),
        //utils.fnAgGrid_ColumnBuilder({ header: "SERVICIO", field: "servicioDetalleID" }),
        utils.fnAgGrid_ColumnBuilder({ header: "FECHA", field: "fechaHoraCreacion" }),
        utils.fnAgGrid_ColumnBuilder({ header: "NOMBRE", field: "nombrePaciente" }),
        utils.fnAgGrid_ColumnBuilder({ header: "ESTATUS", field: "estatusMuestraNombre" }),
        utils.fnAgGrid_ColumnBuilder({ header: "ESTUDIO", field: "estudioNombre" }),
        utils.fnAgGrid_ColumnBuilder({ header: "DELEGACIÓN", field: "delegacion" }),
        utils.fnAgGrid_ColumnBuilder({ header: "COLONIA", field: "colonia" }),
        utils.fnAgGrid_ColumnBuilder({ header: "CALLE", field: "calle" }),
        utils.fnAgGrid_ColumnBuilder({ header: "TELEFONO", field: "telefono" }),
        
        
        utils.fnAgGrid_ColumnBuilder({ header: "USUARIO CARGA", field: "usuarioMuestraId" })
    ];

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

        utils.fnAgGrid_SetRowsAPI(grdOptions, "BanMuestra/MuestraList", {}, false, "Originacion")
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
    
        if (params.data.estatusMuestraId == 1) {
            content += "<a role='button' id='btnAprobar_" + params.rowIndex + "' name='btnAprobar_" + params.rowIndex + "' class='btn btn-success btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Registrar la toma de muestra' onclick='Solicitudes.fnPagar(\"" + params.data.servicioDetalleID + "\",\"" + params.data.nombrePaciente + "\")'><i class='material-icons'>assignment_turned_in</i></a>&nbsp;&nbsp;&nbsp;&nbsp;";
        } else {
            content += "<a role='button' id='btnAprobar_" + params.rowIndex + "' name='btnAprobar_" + params.rowIndex + "' class='btn btn-warning btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Consultar información' onclick='Solicitudes.fnConsulta(\"" + params.data.tipoServicioId + "\")'><i class='material-icons'>description</i></a>&nbsp;";
        }

            return content;
    }


    function PagarSolicitud(idSolicitud,nombrePaciente) {
        $idSolicitud.val(idSolicitud);
        $pacienteSolicitud.text(nombrePaciente+"?");
        $modalCargar.modal('show');

        
        //alert(nombrePaciente)
    }

    function ConsultaLectura(idSolicitud) {

        var allUrl = /:\/\/([^\/]+)/.exec(window.location.href)[1];
        if (allUrl == "www.fiinsoft.mx") {
            var url = "/Genelab/portal/Request/Detalle?IdSolicitud=" + idSolicitud;
            window.open(url, "_blank");
        } else {
            var url = "/Request/Detalle?IdSolicitud=" + idSolicitud;
            window.open(url, "_blank");
        }

    }

    function InitialCarga() {

        $(function () {
            $("#form_pago").on("submit", function (e) {
                e.preventDefault();
                //init submit==========================================
                        var token = localStorage.getItem(utils.fnGlobals("Token"));
                        var oUrl = sitioAPI + '/BanMuestra/AltaMuestra';
                        var formData = new FormData(document.getElementById("form_pago"));

                        formData.append("IdServicioDetalle", $idSolicitud.val());

                        $.ajax({
                            url: oUrl,
                            type: "post",
                            dataType: "html",
                            data: formData,
                            cache: false,
                            contentType: false,
                            processData: false,
                            headers: { 'Authorization': 'Bearer ' + token },
                        })
                            .done(function (res) {

                                llenaGrid();

                                setTimeout(
                                    function () {
                                        utils.fnShowSuccessMessage("Se ha registrado la toma de muestra correctamente");
                                        $modalCargar.modal('toggle');
              
                                        //llenaGrid();
                                    }, 2000);

                            }).fail(function (jqXHR, textStatus, errorThrown) {
                                utils.fnShowErrorMessage(JSON.stringify(jqXHR));
                            });


                //end submit===========================================
            });
        });


    }

    /// -------------------------------------------------------------------------
    /// Objeto de regreso
    /// -------------------------------------------------------------------------
    return {
        fnPagar: PagarSolicitud,
        fnConsulta: ConsultaLectura,
    }
}();