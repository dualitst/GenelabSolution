/*eslint eqeqeq:0*/
/// <summary>
/// Nombre: login
/// Descripcion: 
/// Fecha de creación: 2018-06-21
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


var _Layout = function () {
    /// -------------------------------------------------------------------------
    /// Objetos
    /// -------------------------------------------------------------------------
    var $divMenuNombre = $('#divMenuNombre');
    var $divRol = $('#divRol');
    

    /// -------------------------------------------------------------------------
    /// Init
    /// -------------------------------------------------------------------------
    $(document).ready(function () {
        if (localStorage[utils.fnGlobals("Token")] != null && localStorage[utils.fnGlobals("Token")] != "" && localStorage[utils.fnGlobals("Token")].trim() != "") {
            fnInit();
        }
        else {
            localStorage.removeItem(utils.fnGlobals("Sesion"));
            localStorage.removeItem(utils.fnGlobals("Token"));
            localStorage.removeItem(utils.fnGlobals("Menu"));
            localStorage.removeItem(utils.fnGlobals("Caja"));
            localStorage.removeItem(utils.fnGlobals("FechaSistema"));

            //window.location.replace(utils.fnWebhost() + "Account/Login");
        }
    });


    /// -------------------------------------------------------------------------
    /// Funciones
    /// -------------------------------------------------------------------------
    function fnInit() {
        // Masked Input Global
        var $MaskedInput = $('.masked-input');

        //Date
        $MaskedInput.find('.masked-date').inputmask('dd/mm/yyyy', { jitMasking: true, placeholder: '__/__/____' });

        //Time
        $MaskedInput.find('.masked-time12').inputmask('hh:mm t', { placeholder: '__:__ _m', alias: 'time12', hourFormat: '12' });
        $MaskedInput.find('.masked-time24').inputmask('hh:mm', { placeholder: '__:__ _m', alias: 'time24', hourFormat: '24' });

        //Date Time
        $MaskedInput.find('.masked-datetime').inputmask('d/m/y h:s', { placeholder: '__/__/____ __:__', alias: "datetime", hourFormat: '24' });

        //Mobile Phone Number
        $MaskedInput.find('.masked-celular').inputmask('(999) 9-99-99-99', { jitMasking: true, placeholder: '(___) _-__-__-__' });

        //Phone Number
        $MaskedInput.find('.masked-telefono').inputmask('9-99-99-99', { placeholder: '_-__-__-__' });

        //Money
        $MaskedInput.find('.masked-money').inputmask('currency', { jitMasking: true });

        //Dollar Money
        $MaskedInput.find('.masked-money-dollar').inputmask('99,99 $', { placeholder: '__,__ $' });

        //Euro Money
        $MaskedInput.find('.masked-money-euro').inputmask('99,99 €', { placeholder: '__,__ €' });

        //IP Address
        $MaskedInput.find('.masked-ip').inputmask('999.999.999.999', { placeholder: '___.___.___.___' });

        //Credit Card
        $MaskedInput.find('.masked-credit-card').inputmask('9999 9999 9999 9999', { placeholder: '____ ____ ____ ____' });

        //Email
        $MaskedInput.find('.masked-email').inputmask({ alias: "email" });

        //Serial Key
        $MaskedInput.find('.masked-key').inputmask('****-****-****-****', { placeholder: '____-____-____-____' });

        //CURP
        $MaskedInput.find('.masked-curp').inputmask('aaaa999999aaaaaa99', { placeholder: '__________________' });

        //RFC
        $MaskedInput.find('.masked-rfc').inputmask('aaaa999999***', { placeholder: '_____________' });

        //CP
        $MaskedInput.find('.masked-cp').inputmask('9999[9]', { placeholder: '_____' });

        //Numero casa
        $MaskedInput.find('.masked-num-casa').inputmask('[*][*][*][*][*]', { placeholder: '_____' });

        //Extension
        $MaskedInput.find('.masked-extension').inputmask('[9][9][9][9][9]', { placeholder: '_____' });


        ManageAccount.SetGlobalVars().done(function () {
            //No los actualiza con las declaraciones en objetos, sólo directo

            $("#lblNombreSistema").html(utils.fnGlobals("NombreAplicacion"));
            $("#lblNombreSistemaMenu").html(utils.fnGlobals("NombreAplicacion"));

            $('#divMenuNombre').html(utils.fnLocalData.get(utils.fnGlobals("Sesion")).nombre_completo);
            $('#divRol').html(utils.fnLocalData.get(utils.fnGlobals("Sesion")).roles);

            $("#lblNombreUsuario").html(utils.fnLocalData.get(utils.fnGlobals("Sesion")).nombre_completo);
            $("#lblRolesUsuario").html(utils.fnLocalData.get(utils.fnGlobals("Sesion")).roles);
        });

        
        //Modal Fix - Cuando se abre un modal sobre otro, respeta la scrollbar del padre
        $('.modal').on("hidden.bs.modal", function (e) {
            if ($('.modal:visible').length > 0) {
                $('body').addClass('modal-open');
            }
        });


        //Guardando Menu
        if (utils.fnLocalData.get(utils.fnGlobals("Menu")) == null) {
            //cargar menu
            utils.fnGetMenuJson().done(function () {
                utils.fnEnableNavigation();
            });
        }
        else {
            utils.fnSetMenuJson().done(function () {
                //Habilita la navegación del menú
                utils.fnEnableNavigation();
            });
        }



        var isIE = "X";
        var isChrome = "X";
        var isFirefox = "X";
        var isSafari = "X";
        var isOepra = "X";
        var isEdge = "X";

        //Check if browser is IE
        if (navigator.userAgent.search("MSIE") >= 0) {
            // insert conditional IE code here
            isIE = 1;
        }

        if (window.navigator.userAgent.indexOf("Edge") > -1) {
            // insert conditional EDGE code here
            isEdge = 1;
        }

        //Check if browser is Chrome
        if (navigator.userAgent.search("Chrome") >= 0 && isEdge == "X") {
            // insert conditional Chrome code here
            isChrome = 1;
        }

        //Check if browser is Firefox 
        if (navigator.userAgent.search("Firefox") >= 0) {
            // insert conditional Firefox Code here
            isFirefox = 1;
        }

        //Check if browser is Safari
        if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
            // insert conditional Safari code here
            isSafari = 1;
        }

        //Check if browser is Opera
        if (navigator.userAgent.search("Opera") >= 0) {
            // insert conditional Opera code here
            isOepra = 1;
        }


        if (isChrome != 1) {
            //console.log("No es Chrome");
            utils.fnShowWarningMessage("Oops.. Hemos detectado que no estás usando Google Chrome y éste es necesario para el correcto funcionamiento de FiinSoft.");
        }
        else {
            //console.log("Es Chrome");
        }


        //console.log("isIE");
        //console.log(isIE);
        //console.log("isChrome");
        //console.log(isChrome);
        //console.log("isFirefox");
        //console.log(isFirefox);
        //console.log("isSafari");
        //console.log(isSafari);
        //console.log("isOepra");
        //console.log(isOepra);

    };


    
    /// -------------------------------------------------------------------------
    /// Objeto de regreso
    /// -------------------------------------------------------------------------
    return {}
}();