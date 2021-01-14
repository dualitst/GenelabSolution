/*eslint eqeqeq:0*/
/// <summary>
/// Nombre: GraficaCuadrada
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


var GraficaCuadrada = function () {
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
        utils.fnPage_Init(id + "_divContainer_GraficaCuadrada", params, $o);


        //Inicializa gráfica
        cargaGrafica(id, 0);
    }


    // Carga datos
    //------------
    function cargaGrafica(id, id_oficina) {
        var _id = '#' + id;

        //datos de prueba
        var sampleData = [{
            "label": "Rechazadas",
            "data": 3,
            "color": "#DB4437"
        }, {
            "label": "Faltan Docs",
            "data": 6,
            "color": "#0F9D58"
        }, {
            "label": "CC",
            "data": 2,
            "color": "#4285F4"
        }];


        //Generando gráfica
        $.plot(_id + "_grfMotivosRechazo", sampleData, {
            series: {
                pie: {
                    show: true,
                    radius: 500,
                    label: {
                        show: true,
                        radius: 3 / 4,
                        formatter: labelFormatter,
                        background: {
                            opacity: 0.5,
                            color: '#000'
                        }
                    }
                }
            },
            legend: {
                show: false
            }
        });
    }


    // Label Formatter
    //----------------
    function labelFormatter(label, series) {
        return '<div style="font-size:14px; text-align:center; padding:5px; color:white; weight: bold;">' + label + '<br/>' + Math.round(series.percent) + '%</div>';
    }



    /// -------------------------------------------------------------------------
    /// Objeto de regreso
    /// -------------------------------------------------------------------------
    return {
        fnInit: fnInit,
        fnCargaGrafica: cargaGrafica
    }
}();