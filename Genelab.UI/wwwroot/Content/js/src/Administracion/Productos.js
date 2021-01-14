var Productos = function () {
    var grdOptions = {};
    var $grdDatos = document.querySelector('#grdDatos');
    var SessionData = utils.fnLocalData.get(utils.fnGlobals("Sesion"));

    var colDefs = [
        { headerName: "Clave", field: "cve_producto", enableRowGroup: true, enablePivot: true, enableValue: true, filter: 'agTextColumnFilter' },
        { headerName: "Descripción", field: "desc_producto", enableRowGroup: true, enablePivot: true, enableValue: true, filter: 'agTextColumnFilter' },
        { headerName: "Tipo", field: "tipo_producto", enableRowGroup: true, enablePivot: true, enableValue: true, filter: 'agTextColumnFilter' },
        { headerName: "Frecuencia pago", field: "frecuencia_pago", enableRowGroup: true, enablePivot: true, enableValue: true, filter: 'agTextColumnFilter' },
        { headerName: "Aplica devolución", field: "aplica_devolucion", enableRowGroup: true, enablePivot: true, enableValue: true, filter: 'agTextColumnFilter' },
        { headerName: "Estatus", field: "status" },

        { headerName: "Editar", field: "", enableRowGroup: true, enablePivot: true, enableValue: true, suppressToolPanel: true, suppressFilter: true, getQuickFilterText: function (params) { return ""; }, cellRenderer: cellRender_asignar }
    ];

    //columnas modificadas por coddigo
    function cellRender_asignar(params) {
        //debugger;
        var content = "";
        content += `<a role='button' id='btnEditar' name='btnEditar' class='btn btn-info btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Editar dispositivo' onclick='AgregarProducto.fnMuestraDatos("` + params.data.cve_producto + `");'><i class='material-icons'>edit</i></a>`;
        return content;
    }

    $(document).ready(function () {
        //debugger;
        fnInit();
    });

    function fnInit() {

        //debugger;
        //Parámetros
        var params = utils.fnGetURLParams();

        //Inicializando agGrid
        utils.fnAgGrid_Init(grdOptions, $grdDatos, colDefs, [])
            .done(function (res) {
                grdOptions = res;
            })

            .then(function () {
                //Alimentando agGrid
                utils.fnAgGrid_SetRowsAPI(grdOptions, "Productos/GetList", { id_unidad_negocio: SessionData.id_unidad_negocio }, false, "Originacion")
                //utils.fnAgGrid_SetRowsAPI(grdOptions, "Productos/GetList", { id_unidad_negocio: 1 }, false, "Originacion")
                    .done(function (res) {
                        //debugger;
                        grdOptions = res;
                    })
                    .done(function () {
                        //Inicilizando Tooltips del grid
                        $('[data-toggle="tooltip"]').tooltip({
                            container: 'body'
                        });
                    })
            });
    };

    function FillGrid() {

        utils.fnAgGrid_SetRowsAPI(grdOptions, "Productos/GetList", { id_unidad_negocio: SessionData.id_unidad_negocio }, false, "Originacion")
            //utils.fnAgGrid_SetRowsAPI(grdOptions, "Productos/GetList", { id_unidad_negocio: 1 }, false, "Originacion")
            .done(function (res) {
                grdOptions = res;
            })
            .done(function () {
                //Inicilizando Tooltips del grid
                $('[data-toggle="tooltip"]').tooltip({
                    container: 'body'
                });
            })
    }

    function actualizaFiltro() {
        grdOptions.api.setQuickFilter(document.getElementById('txtFiltro').value);
    }

    return {
        fnActualizaFiltro: actualizaFiltro,
        fnFillGrid: FillGrid
    }

}();