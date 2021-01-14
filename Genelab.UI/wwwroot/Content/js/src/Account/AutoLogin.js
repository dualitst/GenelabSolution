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
var AutoLogin = function () {
    // Objetos
    var params = {};


    $(function () {
        fnInit();
    });

    function fnInit() {
        utils.fnGetAPIData("Account/GetUsuario", { Usuario: "SYSADMIN@SANDBOX.COM", Contrasenia: "fin07BP!", Aplicacion: utils.fnGlobals("Aplicacion") }, "Security", function (result) {
            if (utils.fnValidResult(result)) {
                /*MZ: Guardando token en localStorage */
                localStorage.setItem(utils.fnGlobals("Token"), result.Data);

                params = utils.fnGetURLParamsSimple();

                ManageAccount.SetGlobalVars().done(function () {
                    utils.fnRedirect("Operation/ListadosCobro", params);
                });
            }
        });
    };

    function fnSingIn(e) {
        e.preventDefault();

        if ($formSignIn.valid()) {
            
            try {
                var oUrl = 'Account/GetUsuario';
                var urlIndex = '';
                var oData =
                {
                        "Usuario": $oUser.val().replace(/ +?/g, ""),
                    "Contrasenia": $oPass.val(),
                    "Aplicacion": utils.fnGlobals("Aplicacion")
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
