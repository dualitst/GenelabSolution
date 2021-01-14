/*eslint eqeqeq:0*/
/// <summary>
/// Nombre: GraficaBarrasHorizontales
/// Descripcion: 
/// Fecha de creación: 2020-02-10
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


var GraficaBarrasHorizontales = function () {
    /// -------------------------------------------------------------------------
    /// Objetos
    /// -------------------------------------------------------------------------
    var $o = {};
    var $session = utils.fnLocalData.get(utils.fnGlobals("Sesion"));
    var params = {};
    var _data_Grafica = {};



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


        //Inicializa gráfica
        cargaGrafica(id, 0);
    }


    // Carga datos
    //------------
    function cargaGrafica(id, id_oficina) {
        var _id = '#' + id;
        
        //datos de prueba
        var rawData = [[4, 0], [7, 1], [8, 2], [10, 3], [10, 4], [11, 5], [14, 6], [16, 7], [18, 8]];
        var sampleData = [{ label: "Activaciones", data: rawData, color: "#4285F4" }];
        var ticks = [
            [0, "Pedro Rivapalacio"],
            [1, "Lucía Deyanira Naranjo"],
            [2, "Miguel Ángel García"],
            [3, "Mónica Verduzco"],
            [4, "Marco Antonio Ramírez"],
            [5, "Margarita Villegas"],
            [6, "Rómulo Díaz"],
            [7, "Arturo Rivas"],
            [8, "Miriam Camacho"]
        ];


        //Generando gráfica
        $.plot(_id + "_grfPromotores", sampleData, {
            series: {
                bars: {
                    show: true
                },
                labels: {
                    show: true,
                    position: "end"
                }

            },
            bars: {
                align: "center",
                barWidth: 0.75,
                horizontal: true,
                fillColor: { colors: [{ opacity: 0.5 }, { opacity: 1 }] },
                lineWidth: 1
            },
            xaxis: {
                axisLabel: "Activaciones",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Arial',
                axisLabelPadding: 10,
                max: 20,
                tickColor: "#ecf0f1",
                tickFormatter: function (v, axis) {
                    return Math.ceil(v);
                },
                color: "black"
            },
            yaxis: {
                axisLabel: "Promotores",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Arial',
                axisLabelPadding: 3,
                tickColor: "#ecf0f1",
                ticks: ticks,
                color: "black"
            },
            legend: {
                noColumns: 0,
                labelBoxBorderColor: "#000000",
                position: "ne"
            },
            grid: {
                hoverable: true,
                borderWidth: 1,
                color: "#555555",
                backgroundColor: null
            }
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