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
    var $oForm = $('#sign_in');
    var $oUser = $('#usuario');
    var $oPass = $('#contrasenia');
    var $formSignIn = $('#sign_in');

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

        //funcion para recordar datos de acceso
        if (localStorage.chkbx && localStorage.chkbx != '') {
            $('#rememberme').attr('checked', 'checked');
            $('#usuario').val(localStorage.usrname);
            $('#contrasenia').val(localStorage.pass);
        } else {
            $('#rememberme').removeAttr('checked');
            $('#usuario').val('');
            $('#contrasenia').val('');
        }

        $('#rememberme').click(function () {

            if ($('#rememberme').is(':checked')) {
                // save username and password
                localStorage.usrname = $('#usuario').val();
                localStorage.pass = $('#contrasenia').val();
                localStorage.chkbx = $('#rememberme').val();
            } else {
                localStorage.usrname = '';
                localStorage.pass = '';
                localStorage.chkbx = '';
            }
        });
        
    });

    $(function () {
        fnInit();
    });

    function fnInit() {
        // Asignamos los eventos de validación del form.
        $btnSignIn.click(fnSingIn);
    };

    function fnSingIn(e) {
        e.preventDefault();

        if ($formSignIn.valid()) {
            
            try {
                var oUrl = 'Account/Login';
                var urlIndex = '';
                var oData =
                {
                    "Usuario": $oUser.val().replace(/ +?/g, ""),
                    "Contrasenia": $oPass.val()
                };

                var oProcessMessage = 'Validando credenciales, espere por favor...';
                var success = function (result) {

                    console.log(result);
                    if (utils.fnValidResult(result)) {
                        /*MZ: Guardando token en localStorage */
                        localStorage.setItem(utils.fnGlobals("Token"), result.Data);


                        /*VG: Para llevarlo al mismo lugar desde donde vino*/
                        urlIndex = '../Home';
                        window.location.replace(urlIndex);
                    }
                    else {
                        localStorage.removeItem(utils.fnGlobals("Token"));
                        return;
                    }
                };
                utils.fnExecuteWithResult(e, oUrl, oData, oProcessMessage, success, false, "Security");

            }
            catch (e) {
                utils.fnShowErrorMessage(e.message);
            }
        }

    };

    function fnClear() {

        $oUser.val('');
        $oPass.val('');
        $oUser.focus();

    };
}();
