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
    var $comentarios = $('#Comentarios');  
    var $resultado = $('#resultado');  
    var $ct = $('#ct');  
    var $comprobanteP = $('#ComprobanteP');  

    var colDefs = [
        utils.fnAgGrid_ColumnBuilder({ header: "ACCIONES", noFilter: true, cellRenderer: cellRender_Acciones }),
        utils.fnAgGrid_ColumnBuilder({ header: "SOLICITUD", field: "id" }),
        utils.fnAgGrid_ColumnBuilder({ header: "SERVICIO", field: "servicioDetalleID" }),
        utils.fnAgGrid_ColumnBuilder({ header: "RECEPCIÓN", field: "fechaHoraCreacion" }),
        utils.fnAgGrid_ColumnBuilder({ header: "NOMBRE", field: "nombrePaciente" }),
        utils.fnAgGrid_ColumnBuilder({ header: "ESTUDIO", field: "estudioNombre" }),
        utils.fnAgGrid_ColumnBuilder({ header: "RESULTADO", field: "resultado" }),
        utils.fnAgGrid_ColumnBuilder({ header: "CT", field: "ct" }),
        utils.fnAgGrid_ColumnBuilder({ header: "ESTATUS RESULTADO", field: "estatusResultadoNombre" }),
        utils.fnAgGrid_ColumnBuilder({ header: "RESULTADOS", field: "fechaHoraResultado" }),    
        utils.fnAgGrid_ColumnBuilder({ header: "USUARIO CARGA", field: "usuarioIdResultado" })      
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

        utils.fnAgGrid_SetRowsAPI(grdOptions, "request/ResultList", {}, false, "Originacion")
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

    // cellRender Acciones
    function cellRender_Acciones(params) {
        var content = "";

        if (params.data.estatusResultadoId == 1) {
            //content += "<a role='button' id='btnEditar_" + params.rowIndex + "' name='btnEditar_" + params.rowIndex + "' class='btn btn-info btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Editar' onclick='Solicitudes.fnModalRegistro(\"" + params.servicioId + "\")'><i class='material-icons'>mode_edit</i></a>&nbsp;&nbsp;&nbsp;&nbsp;";
            content += "<a role='button' id='btnAprobar_" + params.rowIndex + "' name='btnAprobar_" + params.rowIndex + "' class='btn btn-success btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Cargar resultado' onclick='Solicitudes.fnCargar(\"" + params.data.servicioDetalleID + "\")'><i class='material-icons'>assignment</i></a>&nbsp;&nbsp;&nbsp;&nbsp;";
        }
        return content;
    }


    function InitialCarga() {
        $(function () {
            $("#form_pago").on("submit", function (e) {
                e.preventDefault();
                //init submit==========================================
                utils.fnShowConfirmMessage("¿Está seguro que desea guardar el resultado de la solicitud " + $idSolicitud.val()+" ?",
                    function () {

                        var token = localStorage.getItem(utils.fnGlobals("Token"));
                        var oUrl = sitioAPI + '/Request/Resultado';
                        var formData = new FormData(document.getElementById("form_pago"));

                        formData.append("IdSolicitud", $idSolicitud.val());
                        formData.append("Resultado", $resultado.val());
                        formData.append("Ct", $ct.val());

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

                                setTimeout(
                                    function () {
                                        utils.fnShowSuccessMessage("Se ha registrado el resultado correctamente");
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
        $comentarios.val("");
        $resultado.val("");
        $ct.val("");
        $comprobanteP.val("");
    }

    function CargarResultado(idSolicitud) {
        $idSolicitud.val(idSolicitud);
        $modalCargar.modal('show');
    }
    /// -------------------------------------------------------------------------
    /// Objeto de regreso
    /// -------------------------------------------------------------------------
    return {
        fnCargar: CargarResultado
    }
}();