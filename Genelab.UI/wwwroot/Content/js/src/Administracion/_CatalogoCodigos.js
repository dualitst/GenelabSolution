/*        
~ Autor: Eduardo Rodriguez
~ Fecha: 15/Octubre/2018
~ Descripción: JavaScript para Vista: _CatalogoCodigos (modal) - Controlador: Administracion
*/

var _CatalogoCodigos = function(){
//----------Objetos----------//
var SessionData = utils.fnLocalData.get("SessionData");
//---------------------------//
//----------Controles----------//
var $frmDatos = $('#frmDatos');
var $txtClaveCodigo = $('#txtClaveCodigo');
var $txtDescripcion = $('#txtDescripcion');
var $chkEstatus = $('#chkEstatus');
var $txtResolucion = $('#txtResolucion');
var $hdnIdDato = $('#hdnIdDato');
var $modalCatalogoCodigos = $('#modalCatalogoCodigos');
var $sltCveCatalogo = $('#sltCveCatalogo');
var $btnGuardar = $('#btnGuardar');
var $boolUpdate = false;
//-----------------------------//
//----------Funciones----------//
$( document ).ready(function() {
	fnInit();
});
function fnInit(){

}

$btnGuardar.click(Guardar);

function MuestraDatos(data, data2) {

	$hdnIdDato.val($sltCveCatalogo.val());
	if($hdnIdDato.val()==""){
		$txtClaveCodigo.prop('disabled', true);
		$txtDescripcion.prop('disabled', true);
		$chkEstatus.prop('disabled', true);
		$txtResolucion.prop('disabled', true);
		$btnGuardar.prop('disabled', true);
		$modalCatalogoCodigos.modal('show');
	}
	else{
		$txtClaveCodigo.prop('disabled', false);
		$txtDescripcion.prop('disabled', false);
		$chkEstatus.prop('disabled', false);
		$txtResolucion.prop('disabled', false);
		$btnGuardar.prop('disabled', false);
		
		Limpiar();
		if (data != undefined) {
			CargaDatos(data, data2);
			$boolUpdate = true;
			$txtClaveCodigo.prop('disabled', true);
		}
		else {
			$txtClaveCodigo.prop('disabled', false);
		}

		$modalCatalogoCodigos.modal('show');
	}
}

function Limpiar() {
	$txtClaveCodigo.val('');
	$txtDescripcion.val('');
	$chkEstatus.prop('checked', false);
	$txtResolucion.val('');
}

function CargaDatos(data, data2) {
	try {
		var oUrl = 'Codigos/Get';
		var oData = {
			cve_codigo:data,
			desc_codigo:data2
		};
		var oProcessMessage = 'Procesando información, espere por favor...';

		var success = function (result) {
			if (result.MessageType == 1) {
				utils.fnShowErrorMessage(result.ErrorMessage);
				return;
			}
			else if (result.MessageType == 2) {
				utils.fnShowWarningMessage(result.ErrorMessage);
				return;
			}

			utils.fnActualizaInput($txtClaveCodigo.attr('id'), result.Data.cve_codigo);
			utils.fnActualizaInput($txtDescripcion.attr('id'), result.Data.desc_codigo);
			utils.fnActualizaInput($txtResolucion.attr('id'), result.Data.resolucion);			
			(result.Data.status == true) ? $chkEstatus.prop('checked', true) : $chkEstatus.prop('checked', false);
		};
		utils.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success, false, "Originacion");
	}
	catch (e) {
		utils.fnShowErrorMessage(e.message)
	}
}

function Guardar() {

	$frmDatos.validate({
		rules: {
			SelectName: { valueNotEquals: '' },
		},
		messages: {
			SelectName: { valueNotEquals: "Este campo es obligatorio." }
		},
		highlight: function (input) {
			$(input).parents('.form-line').addClass('error');
		},
		unhighlight: function (input) {
			$(input).parents('.form-line').removeClass('error');
		},
		errorPlacement: function (error, element) {
			$(element).parents('.form-group').append(error);
		}
	});

	if ($frmDatos.valid()) {

		try {
			var oUrl = '';

			if ($boolUpdate == true)
				{ oUrl = 'Codigos/Update'; }
			else
				{ oUrl = 'Codigos/Insert'; }

			var id = 0;

			var oData = {

				cve_codigo:$txtClaveCodigo.val(),
				desc_codigo:$txtDescripcion.val(),
				cve_catalogo:$hdnIdDato.val(),
				status:($chkEstatus.prop('checked'))?true:false,
				resolucion:$txtResolucion.val(),
				time_stamp: "",
				user_stamp: SessionData.id_usuario.toString()
			};

			var oProcessMessage = 'Procesando información, espere por favor...';

			var success = function (result) {
				if (result.MessageType === 1) {
					utils.fnShowErrorMessage(result.ErrorMessage);
					return;
				}
				else if (result.MessageType == 2) {
					utils.fnShowWarningMessage(result.ErrorMessage);
					return;
				}
				CatalogoCodigos.fnFillGrid();
				Limpiar();
				$boolUpdate = false;
				utils.fnShowSuccessMessage("Se ha guardado el dispositivo correctamente.");

			};
			utils.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success, false, "Originacion");

		}
		catch (e) {
			utils.fnShowErrorMessage(e.message)
		}
	}
}
//-----------------------------//
//----------Retorno----------//
return{
	fnMuestraDatos: MuestraDatos
}
//---------------------------//
}();