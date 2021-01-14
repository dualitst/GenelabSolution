/*eslint eqeqeq:0*/
/// <summary>
/// Nombre: GraficaVelocimetro
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


var GraficaVelocimetro = function () {
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
        utils.fnPage_Init(id + "_divContainer_GraficaVelocimetro", params, $o);


        //Inicializa gráfica
        cargaGrafica(id, 0);
    }


    // Carga datos
    //------------
    function cargaGrafica(id, id_oficina) {
        var _id = '#' + id;


        //Generando gráfica
        var opts = {
            angle: 0.15, // The span of the gauge arc
            lineWidth: 0.44, // The line thickness
            radiusScale: 1, // Relative radius
            pointer: {
                length: 0.6, // // Relative to gauge radius
                strokeWidth: 0.035, // The thickness
                color: '#000000' // Fill color
            },
            limitMax: false,     // If false, max value increases automatically if value > maxValue
            limitMin: false,     // If true, the min value of the gauge will be fixed
            //colorStart: '#6FADCF',   // Colors
            //colorStop: '#8FC0DA',    // just experiment with them
            strokeColor: '#E0E0E0',  // to see which ones work best for you
            generateGradient: true,
            highDpiSupport: true,     // High resolution support
            percentColors: [[0.0, "#DB4437"], [0.25, "#e67e22"], [0.5, "#F4B400"], [1.0, "#0F9D58"]],
            staticLabels: {
                font: "10px sans-serif",  // Specifies font
                labels: [0, 500, 1000, 1500, 2000, 2500],  // Print labels at these values
                color: "#000000",  // Optional: Label text color
                fractionDigits: 0  // Optional: Numerical precision. 0=round off.
            },
        };


        var target = document.getElementById(id + "_divVelocimetro"); // your canvas element
        var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!

        gauge.setTextField(document.getElementById(id + "_divValor"));
        gauge.maxValue = 2500; // set max gauge value
        gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
        gauge.animationSpeed = 32; // set animation speed (32 is default value)
        gauge.set(1844); // set actual value




        //var opts = {
        //    lines: 12,
        //    angle: 0.15,
        //    lineWidth: 0.44,
        //    pointer: {
        //        length: 0.9,
        //        strokeWidth: 0.035,
        //        color: '#000000'
        //    },
        //    limitMax: 'false',
        //    percentColors: [[0.0, "#DB4437"], [0.25, "#e67e22"], [0.5, "#F4B400"], [1.0, "#0F9D58"]],
        //    strokeColor: '#E0E0E0',
        //    generateGradient: true
        //};
        //var target = document.getElementById(id + "_divVelocimetro");
        //var gauge = new Gauge(target).setOptions(opts);
        //gauge.maxValue = 3000;
        //gauge.animationSpeed = 32;
        //gauge.set(2250);
    }


    /// -------------------------------------------------------------------------
    /// Objeto de regreso
    /// -------------------------------------------------------------------------
    return {
        fnInit: fnInit,
        fnCargaGrafica: cargaGrafica
    }
}();