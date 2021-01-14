/// <summary>
/// Nombre: iniciar
/// Descripcion: 
/// Fecha de creación: 180606
/// Autor: vgonzalez
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
var iniciar = function () {
    // Objetos
    var $btnIniciar = $('#btnIniciar');
    var $cmbEmpresa = $('#cmbEmpresa');
    var $cmbModulo = $('#cmbModulo');
    var $form_iniciar = $('#form_iniciar');

    var formValidation = function () {
        $form_iniciar.validate({
            rules: {
                'checkbox': {
                    required: true
                },
                'gender': {
                    required: true
                }
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
    }


    $(function () {
        fnInit();
    });

    function fnInit() {
        formValidation();

        $btnIniciar.click(fnIniciar);
    };

    function fnIniciar(e) {
        e.preventDefault();

        if ($form_iniciar.valid()) {
            var urlIndex = '/';
            window.location.replace(urlIndex);
        }
    };
}();
