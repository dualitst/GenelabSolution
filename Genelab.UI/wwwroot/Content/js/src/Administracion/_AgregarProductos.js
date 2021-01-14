/*eslint eqeqeq:0*/
var AgregarProducto = function () {

    var $txtCveProducto = $('#txtCveProducto');
    var $txtDescripcion = $('#txtDescripcion');
    var $selTipo = $('#selTipo');
    var $selFrecuenciaPago = $('#selFrecuenciaPago');
    var $selAplicaDevolucion = $('#selAplicaDevolucion');
    var $selEstatus = $('#selEstatus');
    var $btnGuardar = $('#btnGuardar');

    var $frmDatos = $('#frmDatos');
    var $hdnIdDato = $('#hdnIdDato');

    var $modalAgregar = $('#modalAgregar');

    var SessionData = utils.fnLocalData.get(utils.fnGlobals("Sesion"));

    $btnGuardar.click(Guardar);

    function MuestraDatos(data) {
        
        Limpiar();
        if (data != undefined) {
            CargaDatos(data);
            $txtCveProducto.prop('disabled', true);
        }
        else {
            $hdnIdDato.val('0');
            $txtCveProducto.prop('disabled', false);
        }
   

        $modalAgregar.modal('show');
    }

    function CargaDatos(data) {
        $hdnIdDato.val(data);


        try {
            var oUrl = 'Productos/Get';
            var oData = {
                cve_producto: data
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
                debugger;
                
                utils.fnActualizaInput($txtCveProducto.attr('id'), result.Data.cve_producto);
                utils.fnActualizaInput($txtDescripcion.attr('id'), result.Data.desc_producto);
                utils.fnActualizaSelect($selTipo.attr('id'), true, result.Data.tipo_producto)
                utils.fnActualizaSelect($selFrecuenciaPago.attr('id'), true, result.Data.frecuencia_pago)
                utils.fnActualizaSelect($selAplicaDevolucion.attr('id'), true, result.Data.aplica_devolucion)
                utils.fnActualizaSelect($selEstatus.attr('id'), true, result.Data.status)

            };
            utils.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success, true, "Originacion");

        }
        catch (e) {
            utils.fnShowErrorMessage(e.message)
        }

    }

    function Guardar() {

        $frmDatos.validate({
            rules: {
                SelectName: { valueNotEquals: '' }
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

                if ($hdnIdDato.val() == '0')
                { oUrl = 'Productos/Insert'; }
                else
                { oUrl = 'Productos/Update'; }

                var id = 0;
               
                
                var oData = {
                    cve_producto: $txtCveProducto.val(),
                    desc_producto: $txtDescripcion.val(),
                    segmento: 'INFOR',
                    tipo_producto: $selTipo.val(),
                    tipo_contrato_buro: 'CS',
                    depende_gastos_cob: 'contratos.dias_atraso',
                    visible: 'S',
                    status: $selEstatus.val(),
                    frecuencia_pago: $selFrecuenciaPago.val(),
                    aplica_devolucion: $selAplicaDevolucion.val(),
                    id_unidad_negocio: SessionData.id_unidad_negocio,
                    user_stamp: SessionData.id_usuario
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
                    Productos.fnFillGrid();
                    Limpiar();
                    utils.fnShowSuccessMessage("Se ha guardado el dispositivo correctamente.");

                };
                utils.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success, true, "Originacion");

            }
            catch (e) {
                utils.fnShowErrorMessage(e.message)
            }

        }

    }

    function Limpiar() {
        
        $txtCveProducto.val('');
        $txtDescripcion.val('');

        utils.fnActualizaSelect($selTipo.attr('id'), true, "0");
        utils.fnActualizaSelect($selFrecuenciaPago.attr('id'), true, "0");
        utils.fnActualizaSelect($selAplicaDevolucion.attr('id'), true, "0");
        utils.fnActualizaSelect($selEstatus.attr('id'), true, "0");
    }


    return {
        fnMuestraDatos: MuestraDatos
    }

}(); 