/*eslint eqeqeq:0*/
/// <summary>
/// Nombre: GraficaGridLineas
/// Descripcion: 
/// Fecha de creación: 2020-02-07
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


var GraficaGridLineas = function () {
    /// -------------------------------------------------------------------------
    /// Objetos
    /// -------------------------------------------------------------------------
    var $o = {};
    var $session = utils.fnLocalData.get(utils.fnGlobals("Sesion"));
    var params = {};
    var _data_Grafica = {};

    var grdOptions = {};
    var $grdDatos;

    var colDefs = utils.fnAgGrid_ColumnBuilderArray([
        { header: "En proceso", field: "id_solicitud" },
        { colId: "NOV9", header: "NOV 9", field: "id_solicitud" },
        { colId: "NOV24", header: "NOV 24", field: "id_solicitud" },
        { colId: "DIC9", header: "DIC 9", field: "id_solicitud" },
        { colId: "DIC24", header: "DIC 24", field: "id_solicitud" },
        { colId: "ENE9", header: "ENE 9", field: "id_solicitud" },
        { colId: "ENE24", header: "ENE 24", field: "id_solicitud" },
        { colId: "FEB9", header: "FEB 9", field: "id_solicitud" },
    ]);



    /// -------------------------------------------------------------------------
    /// Init
    /// -------------------------------------------------------------------------
    // Se movio al final del html para poder identificar quien lo llama


    
    /// -------------------------------------------------------------------------
    /// Funciones
    /// -------------------------------------------------------------------------
    function fnInit(id) {
        var _id = '#' + id;

        //Inicializando data object
        _data_Grafica[id] = {};


        //Inicializando página, obteniendo parámetros y elementos
        utils.fnPage_Init(id + "_divContainer_GraficaGridLineas", params, $o);


        //Inicializando agGrid
        if ($session != null && $session.id_usuario != null) {
            $grdDatos = document.querySelector(_id + "_grdSolicitudes");
            utils.fnAgGrid_InitLite(grdOptions, $grdDatos, colDefs, [], [], [{ id_solicitud: "0", ENE: 0, FEB: 0, MAR: 0, ABR: 0, MAY: 0, JUN: 0, JUL: 0, AGO: 0, SEP: 0, OCT: 0, NOV: 0, DIC: 0 }], [],
                "Solicitudes/GetListViewByJefe", { id_analista: $session.id_usuario, ExtendedProperties: { top: 3 } }, true, "Originacion", false).done(function (res) {
                    //console.log(grdOptions);
                });
        }


        //Inicializa gráfica de lineas
        cargaGrafica(id, 0);
    }


    // Carga datos
    //------------
    function cargaGrafica(id, id_oficina) {
        var _id = '#' + id;

        //Cambiando moment a español
        moment.locale('es');

        //datos de prueba
        var sampleData = [{
            "corte": "NOV 9",
            "fecha": "2019-11-09",
            "problemas": 3,
            "optimo": 9,
            "ideal": 0,
            "total": 12
        }, {
            "corte": "NOV 24",
            "fecha": "2019-11-24",
            "problemas": 2,
            "optimo": 7,
            "ideal": 2,
            "total": 11
        }, {
            "corte": "DIC 9",
            "fecha": "2019-12-09",
            "problemas": 8,
            "optimo": 8,
            "ideal": 1,
            "total": 17
        }, {
            "corte": "DIC 24",
            "fecha": "2019-12-24",
            "problemas": 5,
            "optimo": 11,
            "ideal": 4,
            "total": 20
        }, {
            "corte": "ENE 9",
            "fecha": "2020-01-09",
            "problemas": 4,
            "optimo": 7,
            "ideal": 1,
            "total": 12
        }, {
            "corte": "ENE 24",
            "fecha": "2020-01-24",
            "problemas": 5,
            "optimo": 8,
            "ideal": 3,
            "total": 16
        }, {
            "corte": "FEB 9",
            "fecha": "2020-02-09",
            "problemas": 3,
            "optimo": 6,
            "ideal": 2,
            "total": 11
        }];

        //Generando gráfica
        Morris.Line({
            element: id + "_grfSolicitudes",
                data: sampleData,
            xkey: "fecha",
            ykeys: ["problemas", "optimo", "ideal", "total"],
            labels: ["problemas", "optimo", "ideal", "total"],
            lineColors: ["rgb(66,133,244)", "rgb(219,68,55)", "rgb(15,157,88)", "rgb(244,160,0)"],
            lineWidth: 1,
            pointSize: 4,
            gridTextSize: 14,
            gridTextWeight: "bold",
            resize: true,
            hideHover: "auto",
            parseTime: false,
            xLabelFormat: function (x) { /*console.log(x);*/ return moment(x.src.fecha).format("DD/MMM/YY"); }
        });
    }



    /// -------------------------------------------------------------------------
    /// Objeto de regreso
    /// -------------------------------------------------------------------------
    return {
        fnInit: fnInit,
        fnCargaGrafica: cargaGrafica
    }
}();