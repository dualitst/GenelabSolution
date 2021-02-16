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
    var $comprobanteP = $('#ComprobanteP');  
    var $btnSolicitar = $("#btnSolicitar");

    var colDefs = [
        //utils.fnAgGrid_ColumnBuilder({ header: "ACCIONES", noFilter: true, cellRenderer: cellRender_Pagar }),
        utils.fnAgGrid_ColumnBuilder({ header: "ID", field: "id" }),
        utils.fnAgGrid_ColumnBuilder({ header: "NOMBRE", field: "empresaFiscal" }),
        utils.fnAgGrid_ColumnBuilder({ header: "RFC", field: "rfcF" }),
        utils.fnAgGrid_ColumnBuilder({ header: "CORREO ELECTRONICO", field: "emailF" }),
        utils.fnAgGrid_ColumnBuilder({ header: "TELEFONO", field: "telF" }),
        utils.fnAgGrid_ColumnBuilder({ header: "CODIGO POSTAL", field: "codigoPostal" })    
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

        //Inicializando agGrid
        utils.fnAgGrid_Init(grdOptions, $grdDatos, colDefs, [])
            .done(function (res) {
                grdOptions = res;
            })

            .then(function () {
                //Alimentando agGrid
                llenaGrid();
            });
        $btnSolicitar.click(function () {
            //window.location.href = '/Request/Index';
            var allUrl = /:\/\/([^\/]+)/.exec(window.location.href)[1];
            if (allUrl == "www.fiinsoft.mx") {
                var url = "/Genelab/portal/Empresas/alta";
                window.location = url;
            } else {
                var url = "/Empresas/alta";
                window.location = url;
            }
        });


        
    };

    // Funciones manejo Grid
    //----------------------
    function llenaGrid() {

        utils.fnAgGrid_SetRowsAPI(grdOptions, "empresas/consulta", {}, false, "Originacion")
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
        //content += "<a role='button' id='btnAprobar_" + params.rowIndex + "' name='btnAprobar_" + params.rowIndex + "' class='btn btn-primary btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Cargar factura de la solicitud' onclick='Solicitudes.fnEditar(\"" + params.data.id + "\")'><i class='material-icons'>mode_edit</i></a>&nbsp;&nbsp;&nbsp;&nbsp;";
        //content += "<a role='button' id='btnEliminar_" + params.rowIndex + "' name='btnEliminar_" + params.rowIndex + "' class='btn btn-danger btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Eliminar' onclick='Solicitudes.fnEliminar(\"" + params.data.id + "\")'><i class='material-icons'>delete</i></a>&nbsp;&nbsp;&nbsp;&nbsp;";

        return content;
    }

          function EditarFactura(idFac)
        {
            alert("hola")
    }

    function EliminarFactura(idFac) {
        alert("hola")
    }

    /// -------------------------------------------------------------------------
    /// Objeto de regreso
    /// -------------------------------------------------------------------------
    return {
        fnEditar: EditarFactura,
        fnEliminar:EliminarFactura
    }
}();