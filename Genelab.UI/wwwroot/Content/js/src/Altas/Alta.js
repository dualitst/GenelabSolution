/*eslint eqeqeq:0*/
/// <summary>
/// Nombre: login
/// Descripcion: 
/// Fecha de creación: 180410
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
var login = function () {
    // Objetos
    var $btnSignIn = $('#btnSignIn');
    var $formSignIn = $('#sign_in');
   // var $oNombrecuenta = $('#NombreCuenta');
    //var $oMayor = $('#MayorE');
    var $nombre = $('#Nombre');
    var $apellidop = $('#ApellidoP');
    var $apellidom = $('#ApellidoM');
    var $titular = $('#Ntitular');
    var $parentezco = $('#Parentezco');
    var $catalogo = $('#Catalogo');
    //var $domicilio = $('#Domicilio');
    var $cp = $('#Cp');
    var $delegacion = $('#Delegacion');
    var $colonia = $('#Colonia');
    var $calle = $('#CDpN');
    var $calle1 = $('#CDN');
    //var $fact = $('#Fact');
    //var $used = $('#UseD');
    var $empresa = $('#Empresaf');
    var $cp1 = $('#Cpp');
    var $colonia1 = $('#Colonia1');
    var $delega = $('#Delega');
    
    







    $(function () {
        $('#sign_in').validate({
            highlight: function (input) {
                console.log(input);
                $(input).parents('.form-line').addClass('error');
            },
            unhighlight: function (input) {
                $(input).parents('.form-line').removeClass('error');
            },
            errorPlacement: function (error, element) {
                $(element).parents('.input-group').append(error);
            }
        });

       

       

    });

    $(function () {
        fnInit();
    });

    function fnInit() {
        // Asignamos los eventos de validación del form.
        $btnSignIn.click(fnAlta);
    };

    function fnAlta(e) {
        e.preventDefault();

        if ($formSignIn.valid()) {

            try {
                var oUrl = 'Altas/Alta';
                var urlIndex = '';

                var oData =
                {
                    "Nombre": $nombre.val(),
                    "ApellidoPaterno": $apellidop.val(),
                    "ApellidoMaterno": $apellidom.val(),
                    "Titular": $titular.val(),
                    "Parentesco": $parentezco.val(),
                    "Estudio": $catalogo.val(),

                    "CP": $cp.val(),
                    "Delegacion": $delegacion.val(),
                    "Colonia": $colonia.val(),
                    "Calle": $calle.val(),

                    "EmpresaFiscal": $empresa.val(),
                    "EmpresaFiscalCP": $cp1.val(),
                    "EmpresaFiscalDelegacion": $delega.val(),
                    "EmpresaFiscalColonia": $colonia1.val(),
                    "EmpresaFiscalCalle": $calle1.val(),
                };
                var oProcessMessage = 'Validando credenciales, espere por favor...';
                var success = function (result) {
                    

                    console.log(result);
                    if (utils.fnValidResult(result)) {

                        alert("exito");
                        
                      
                    }
                    else {
                        alert("error");
                    }
                };
                utils.fnExecuteWithResult(e, oUrl, oData, oProcessMessage, success, false, "Security");

            }
            catch (e) {
                utils.fnShowErrorMessage(e.message);
            }
        }
    };
}();