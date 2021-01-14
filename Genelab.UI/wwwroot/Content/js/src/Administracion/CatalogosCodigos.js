/*        
~ Autor: Eduardo Rodriguez
~ Fecha: 15/Octubre/2018
~ Descripción: JavaScript para Vista: CatalogoCodigos - Controlador: Administracion
*/

var CatalogoCodigos = function(){
//----------Objetos----------//
var grdOptions = {};
var $grdDatos = document.querySelector('#grdDatos');
var SessionData = utils.fnLocalData.get("SessionData");

var colDefs = [
{ headerName: "Clave Código", field: "cve_codigo", enableRowGroup: true, enablePivot: true, enableValue: true, filter: 'agTextColumnFilter' },
{ headerName: "Descripción", field: "desc_codigo", enableRowGroup: true, enablePivot: true, enableValue: true, filter: 'agTextColumnFilter' },
{ headerName: "Estatus", field: "status" },
{ headerName: "Resolución", field: "resolucion" },
{ headerName: "Editar", field: "", enableRowGroup: true, enablePivot: true, enableValue: true, suppressToolPanel: true, suppressFilter: true, getQuickFilterText: function (params) { return ""; }, cellRenderer: cellRender_asignar }
];

//---------------------------//
//----------Controles----------//
var $sltCveCatalogo = $('#sltCveCatalogo');
//-----------------------------//
//----------Funciones----------//
$( document ).ready(function() {
	fnInit();
});

function fnInit(){

	utils.fnLlenaSelect(null, $sltCveCatalogo, 'CatalogoCodigos/GetList', { }, 'cve_catalogo', 'descripcion', '0', 'Descripción', null, "Originacion");

		//Parámetros
	var params = utils.fnGetURLParams();

	//Inicializando agGrid
	utils.fnAgGrid_Init(grdOptions, $grdDatos, colDefs, [])
	.done(function (res) {
		grdOptions = res;
	})

	.then(function () {
                //Alimentando agGrid
                utils.fnAgGrid_SetRowsAPI(grdOptions, "Codigos/GetByCatalogo", { cve_catalogo:$sltCveCatalogo.val() }, false, "Originacion")
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
	content += `<a role='button' id='btnEditar' name='btnEditar' class='btn btn-info btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Editar dispositivo' onclick='_CatalogoCodigos.fnMuestraDatos("${params.data.cve_codigo}", "${params.data.desc_codigo}");'><i class='material-icons'>edit</i></a>`;
	return content;
}
function FillGrid() {

	utils.fnAgGrid_SetRowsAPI(grdOptions, "Codigos/GetByCatalogo", { cve_catalogo: $sltCveCatalogo.val() }, false, "Originacion")
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