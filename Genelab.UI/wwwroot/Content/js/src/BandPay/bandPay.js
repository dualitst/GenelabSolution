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
    var $tarjetaDIV = $('#tarjetaDIV'); 
    var $comprobanteDIV = $('#ComprobanteDIV');
    var $comprobanteP = $('#ComprobanteDIV');

    var colDefs = [
        utils.fnAgGrid_ColumnBuilder({ header: "<i class='material-icons'>settings</i>", noFilter: true, menuTabs:false, cellRenderer: cellRender_Pagar }),
        utils.fnAgGrid_ColumnBuilder({ header: "ID", field: "id" }),
        utils.fnAgGrid_ColumnBuilder({ header: "RECEPCIÓN", field: "fechaHoraCreacion" }),
        utils.fnAgGrid_ColumnBuilder({ header: "PACIENTES", field: "nombrePaciente" }),
        utils.fnAgGrid_ColumnBuilder({ header: "ESTUDIOS", field: "estudioNombre" }),
        utils.fnAgGrid_ColumnBuilder({ header: "PAGO", field: "estatusPagoNombre" }),
        utils.fnAgGrid_ColumnBuilder({ header: "PAGO", field: "fechaHoraPago" }),
        //utils.fnAgGrid_ColumnBuilder({ header: "RESULTADOS", field: "estatusResultadoNombre" }),
        //utils.fnAgGrid_ColumnBuilder({ header: "RESULTADOS", field: "fechaHoraResultado" }),
        utils.fnAgGrid_ColumnBuilder({ header: "REGISTRÓ PAGO", field: "usuarioIdPago" })
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
               
                $tarjetaDIV.addClass("visible").removeClass("hidden");
                $comprobanteDIV.addClass("visible").removeClass("hidden");
            }
            else if (this.value == 'EFECTIVO') {
                $tarjetaDIV.addClass("hidden").removeClass("visible");
                $comprobanteDIV.addClass("hidden").removeClass("visible");

            } else if (this.value == 'TRANSFERENCIA') {
                $tarjetaDIV.addClass("hidden").removeClass("visible");
                $comprobanteDIV.addClass("visible").removeClass("hidden");
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
        if (params.data.estatusPagoId == 1) {
            content += "<a role='button' id='btnAprobar_" + params.rowIndex + "' name='btnAprobar_" + params.rowIndex + "' class='btn btn-success btn-circle btn-circle' data-toggle='tooltip' data-placement='top' title='Registrar el pago' onclick='Solicitudes.fnPagar(\"" + params.data.id + "\")'><i class='material-icons'>request_page</i></a>&nbsp;&nbsp;&nbsp;&nbsp;";
        } else {
            content += "<a role='button' id='btnAprobar_" + params.rowIndex + "' name='btnAprobar_" + params.rowIndex + "' class='btn btn-warning btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Consultar información' onclick='Solicitudes.fnConsulta(\"" + params.data.id + "\")'><i class='material-icons'>description</i></a>&nbsp;";
        }
       return content;
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

    function PagarSolicitud(idSolicitud) {
        clearModal();
        Consulta(idSolicitud);
        $idSolicitud.val(idSolicitud);
        $modalCargar.modal('show');
        
    }


    function InitialCarga() {

        $(function () {
            $("#form_pago").on("submit", function (e) {
                e.preventDefault();
//init submit==========================================

                utils.fnShowConfirmMessage("¿Está seguro que desea guardar el pago de la solicitud " + $idSolicitud.val()+" ?",
                    function () {

                            var token = localStorage.getItem(utils.fnGlobals("Token"));
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
                                        processData: false,
                                        headers: { 'Authorization': 'Bearer ' + token },
                                    })
                                        .done(function (res) {

                                            llenaGrid();

                                            setTimeout(
                                                function () {
                                                    utils.fnShowSuccessMessage("Se ha registrado el pago de la solicitud " + $idSolicitud.val()+" correctamente");
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
        var $radios = $('input:radio[name=tipoPagoRad]');
        $radios.filter('[value=EFECTIVO]').prop('checked', true).trigger("change");

        $tarjeta.val("");
        $monto.val("");
        $comprobanteP.val(''); 
    }

    function GuardarPago(idSolicitud) {

    
    }

    function Consulta(idSolicitud) {

       
                try {
                    var oUrl = 'Request/ConsultaPacientes';
                    var oData =
                    {
                        "IdSolicitud": idSolicitud,
                    };


                    var oProcessMessage = 'Validando información, espere por favor...';
                    var success = function (result) {

                        if (utils.fnValidResult(result)) {
                            //utils.fnShowSuccessMessage("Se ha confirmado la validación de la solicitud correctamente, se continuará con el proceso");

                            $('#table_body').html("");
                            var total = 0;

                            $.each(result.data, function (index, value) {
          
                                var content = '<tr id="' + value.Id + '"><td>' + value.nombrePaciente + " " + value.apellidoPPaciente + " " + value.apellidoMPaciente + '</td><td>' + value.estudioNombre + '</td><td> $ ' + value.precio + '</td><tr>';
                                total += value.precio;

                                $('#table_body').append(content);
                            });

                            var total = '<tr style="background-color:#F3F4F9"><td></td><td style="color:black;font-weight:bold;" >TOTAL</td><td style="color:black;font-weight:bold;"> $ ' + total + '</td><tr>';
                        

                            $('#table_body').append(total);

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
           

    }


    /// -------------------------------------------------------------------------
    /// Objeto de regreso
    /// -------------------------------------------------------------------------
    return {
        fnConsulta: ConsultaLectura,
        fnPagar: PagarSolicitud
    }
}();