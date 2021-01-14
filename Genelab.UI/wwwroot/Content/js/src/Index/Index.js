/// <summary>
/// Nombre: index
/// Descripcion: 
/// Fecha de creación: 180524
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

// Objetos
var $tblPrueba = document.querySelector('#myGrid');

//Init
fnInit();

//Vertical form basic
$('#wizard_vertical').steps({
    headerTag: 'h2',
    bodyTag: 'section',
    transitionEffect: 'slideLeft',
    stepsOrientation: 'vertical',
    onInit: function (event, currentIndex) {
        setButtonWavesEffect(event);
    },
    onStepChanged: function (event, currentIndex, priorIndex) {
        setButtonWavesEffect(event);
    }
});

function setButtonWavesEffect(event) {
    $(event.currentTarget).find('[role="menu"] li a').removeClass('waves-effect');
    $(event.currentTarget).find('[role="menu"] li:not(.disabled) a').addClass('waves-effect');
}


/// -----------------------------------------------------------------------------
/// Funciones
/// -----------------------------------------------------------------------------
function fnInit() {
    fnTableDefinition();
};

/// <summary>
/// Nombre: fnTableDefinition.
/// Descripcion: Carga definición de la tabla.
/// Fecha de creación: 20180524
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
function fnTableDefinition() {
    // specify the columns
    var columnDefs = [
        { headerName: "Make", field: "make", enableRowGroup: true, enablePivot: true, enableValue: true },
        { headerName: "Model", field: "model", enableRowGroup: true, enablePivot: true, enableValue: true },
        { headerName: "Price", field: "price", enableRowGroup: true, enablePivot: true, enableValue: true, aggFunc: 'sum' }
    ];

    // specify the data
    var rowData = [
        { make: "Toyota", model: "Celica", price: 35000 },
        { make: "Ford", model: "Mondeo", price: 32000 },
        { make: "Porsche", model: "Boxter", price: 72000 }
    ];

    // let the grid know which columns and what data to use
    var gridOptions = {
        columnDefs: columnDefs,
        rowData: rowData,
        enableColResize: true,
        enableSorting: true,
        enableFilter: true,
        rowSelection: "multiple",
        enableStatusBar: true,
        enableRangeSelection: true,
        groupSelectsChildren: true,
        rowHeight: 22,
        localeText: {
            // for filter panel
            page: 'Página',
            more: 'Más',
            to: 'Para',
            of: 'De',
            next: 'Siguiente',
            last: 'Último',
            first: 'Primero',
            previous: 'Anterior',
            loadingOoo: 'Cargando...',
            loading: 'Cargando',
            // for set filter
            selectAll: 'Seleccionar Todo',
            searchOoo: 'Buscar...',
            blanks: 'Vacío',
            // for number filter and text filter
            filterOoo: 'Filtrar...',
            applyFilter: 'Aplicar Filtro...',
            // for number filter
            equals: 'Igual a',
            notEqual: 'Diferente de',
            lessThan: 'Menor que',
            lessThanOrEqual: 'Menor Igual que',
            greaterThan: 'Mayor que',
            greaterThanOrEqual: 'Mayor Igual que',
            // for text filter
            contains: 'Contiene',
            notEquals: 'Diferente de',
            startsWith: 'Inicia con',
            endsWith: 'Termina con',
            // the header of the default group column
            group: 'Grupo',
            // tool panel
            columns: 'Columnas',
            rowGroupColumns: 'Columnas Pivot',
            rowGroupColumnsEmptyMessage: 'Arrastre columnas para agrupar',
            valueColumns: 'Columnas Valor',
            pivotMode: 'Modo Pivot',
            groups: 'Grupos',
            values: 'Valores',
            pivots: 'Pivots',
            valueColumnsEmptyMessage: 'Arrastre columnas para agregar',
            pivotColumnsEmptyMessage: 'Arrastre aquí para usar como Pivot',
            // other
            noRowsToShow: 'No hay renglones para mostrar',
            // enterprise menu
            pinColumn: 'Inmovilizar columna',
            valueAggregation: 'Agregación de valores',
            autosizeThiscolumn: 'Autoajustar',
            autosizeAllColumns: 'Autoajustar todas',
            groupBy: 'Agrupar por',
            ungroupBy: 'Desagrupar por',
            resetColumns: 'Reestablecer columnas',
            expandAll: 'Abrir todo',
            collapseAll: 'Cerrar todo',
            toolPanel: 'Panel de herramientas',
            export: 'Exportar',
            excelExport: 'Exportar a Excel',
            csvExport: 'Exportar a CSV',
            // enterprise menu pinning
            pinLeft: 'Inmovilizar <<',
            pinRight: 'Inmovilizar >>',
            noPin: 'Movilizar <>',
            // enterprise menu aggregation and status panel
            sum: 'Sum',
            min: 'Min',
            max: 'Max',
            first: 'Primer',
            last: 'Último',
            none: 'Ninguno',
            count: 'Cont',
            average: 'Prom',
            // standard menu
            copy: 'Copiar',
            copyWithHeaders: 'Copiar con encabezados',
            ctrlC: 'Ctrl + C',
            paste: 'Pegar',
            ctrlV: 'Ctrl + V'
        },
        //suppressMenuColumnPanel: true,
        onGridReady: function (event) {
            gridOptions.api.refreshCells();
            gridOptions.api.sizeColumnsToFit();
        }
    };

    // lookup the container we want the Grid to use
    //var eGridDiv = document.querySelector('#myGrid');

    // create the grid passing in the div to use together with the columns & data we want to use
    new agGrid.Grid($tblPrueba, gridOptions);

};