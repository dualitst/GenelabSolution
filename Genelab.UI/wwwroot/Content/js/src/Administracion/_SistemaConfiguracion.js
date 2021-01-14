/*        
~ Autor: Eduardo Rodriguez
~ Fecha: 10/Octubre/2018
~ Descripción: JavaScript para Vista: _SistemaConfiguracion (modal) - Controlador: Administracion
*/

var _SistemaConfiguracion = function(){
//----------Objetos----------//
var SessionData = utils.fnLocalData.get("SessionData");
//---------------------------//
//----------Controles----------//
var $frmDatos = $('#frmDatos');
var $lstunidadNegocio = $('#sltUnidadNegocio');
var $txtClave = $('#txtClave');
var $txtValor = $('#txtValor');
var $chkActivo = $('#chkActivo');
var $hdnIdDato = $('#hdnIdDato');
var $modalSistemaConfiguracion = $('#modalSistemaConfiguracion');
var $btnGuardar = $('#btnGuardar');
//-----------------------------//
//----------Funciones----------//
$( document ).ready(function() {
	fnInit();
});
function fnInit(){

	utils.fnLlenaSelect(null, $lstunidadNegocio, 'EstorgUnidadNegocio/GetList', { id_empresa:0, activo:1 }, 'id_unidad_negocio', 'descripcion', '0', 'Unidad de Negocio', null, "Originacion");

}

$btnGuardar.click(Guardar);

function MuestraDatos(data, data2) {
	Limpiar();
	if (data != undefined) {
		CargaDatos(data, data2);
		$txtClave.prop('disabled', true);
	}
	else {
		$hdnIdDato.val('0');
		fnInit();
		$txtClave.prop('disabled', false);
	}
	$modalSistemaConfiguracion.modal('show');
}

function Limpiar() {
	$txtClave.val('');
	$txtValor.val('');
	$chkActivo.prop('checked', false);
	$lstunidadNegocio.prop('disabled', false);
	
}

function CargaDatos(data, data2) {
	$hdnIdDato.val(data);
	try {
		var oUrl = 'SistemaConfiguracion/GetList';
		var oData = {
			id_unidad_negocio:data,
			clave:data2
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

			utils.fnActualizaInput($txtClave.attr('id'), result.Data[0].clave);
			utils.fnActualizaInput($txtValor.attr('id'), result.Data[0].valor);
			$lstunidadNegocio.val(result.Data[0].id_unidad_negocio).selectpicker('refresh').prop('disabled', true);
			(result.Data[0].activo == true) ? $chkActivo.prop('checked', true) : $chkActivo.prop('checked', false);
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
			sltUnidadNegocio: {
				required: true
			}
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
			//debugger;

			if ($hdnIdDato.val() == '0')
				{ oUrl = 'SistemaConfiguracion/Insert'; }
			else
				{ oUrl = 'SistemaConfiguracion/Update'; }

			var id = 0;

			var oData = {
				
				id_unidad_negocio:parseInt( $lstunidadNegocio.val()),
				clave:$txtClave.val(),
				valor:$txtValor.val(),
				activo:($chkActivo.prop('checked'))?true:false,
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
				SistemaConfiguracion.fnFillGrid();
				Limpiar();
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