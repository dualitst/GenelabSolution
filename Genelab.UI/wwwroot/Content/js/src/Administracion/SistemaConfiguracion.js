/*        
~ Autor: Eduardo Rodriguez
~ Fecha: 10/Octubre/2018
~ Descripción: JavaScript para Vista: SistemaConfiguracion - Controlador: Administracion
*/

var SistemaConfiguracion = function(){
//----------Objetos----------//
var grdOptions = {};
var $grdDatos = document.querySelector('#grdDatos');
var SessionData = utils.fnLocalData.get("SessionData");

var colDefs = [
{ headerName: "Unidad de Negocio", field: "estorg_unidad_negocio.descripcion", enableRowGroup: true, enablePivot: true, enableValue: true, filter: 'agTextColumnFilter' },
{ headerName: "Clave", field: "clave", enableRowGroup: true, enablePivot: true, enableValue: true, filter: 'agTextColumnFilter' },
{ headerName: "Valor", field: "valor" },
{ headerName: "Activo", field: "activo" },
{ headerName: "Editar", field: "", enableRowGroup: true, enablePivot: true, enableValue: true, suppressToolPanel: true, suppressFilter: true, getQuickFilterText: function (params) { return ""; }, cellRenderer: cellRender_asignar }
];

//---------------------------//
//----------Controles----------//
//-----------------------------//
//----------Funciones----------//
$( document ).ready(function() {
	fnInit();
});
function fnInit(){
	//Parámetros
	var params = utils.fnGetURLParams();

	//Inicializando agGrid
	utils.fnAgGrid_Init(grdOptions, $grdDatos, colDefs, [])
	.done(function (res) {
		grdOptions = res;
	})

	.then(function () {
                //Alimentando agGrid
                utils.fnAgGrid_SetRowsAPI(grdOptions, "SistemaConfiguracion/GetList", { id_unidad_negocio: SessionData.id_unidad_negocio }, false, "Originacion")
                //utils.fnAgGrid_SetRowsAPI(grdOptions, "SistemaConfiguracion/GetList", { id_unidad_negocio: 1 }, false, "Originacion")
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
}
function cellRender_asignar(params) {
	var content = "";
	content += `<a role='button' id='btnEditar' name='btnEditar' class='btn btn-info btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Editar dispositivo' onclick='_SistemaConfiguracion.fnMuestraDatos(${params.data.id_unidad_negocio}, "${params.data.clave}");'><i class='material-icons'>edit</i></a>`;
	return content;
}
function FillGrid() {

	utils.fnAgGrid_SetRowsAPI(grdOptions, "SistemaConfiguracion/GetList", { id_unidad_negocio: SessionData.id_unidad_negocio }, false, "Originacion")
	//utils.fnAgGrid_SetRowsAPI(grdOptions, "SistemaConfiguracion/GetList", { id_unidad_negocio: 0 }, false, "Originacion")
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
//-----------------------------//
//----------Retorno----------//
return{
	fnActualizarFiltro:actualizaFiltro,
	fnFillGrid: FillGrid
}
//---------------------------//
}();