var lefSideNav = function () {

    var strMenu = "";

    $(function () {
        //menuAdministracion();    
    });

    function menuAdministracion() {


        //var oUrl = 'Account/GetUsuario';
        //var urlIndex = '';
        //var oData =
        //    {
        //        "roles":"R0-CRED-Administrador"
        //    };
        //var oProcessMessage = 'Validando credenciales, espere por favor...';
        //var success = function (result) {
        //    //debugger;
        //    console.log(result);
        //    if (result.MessageType == '1') {
        //        utils.fnShowErrorMessage(result.ErrorMessage);
        //    }

        //    localStorage.setItem("userSiteMap", result.Data);


        //};
        //utils.fnExecuteWithResult(e, oUrl, oData, oProcessMessage, success, false);
        
        //strMenu += "<li>'<a href=\" javascript: lefSideNav.linkClick(this); \">Alta de personas</a >'</li>";
        strMenu += strHeader("Administracion");
        strMenu += strElement("/Security/AltaUsuarios_Layout/", "Alta de Personas");
        strMenu += strCloseHeader();

        strMenu += strHeader("Seguridad");
        strMenu += strElement("", "Usuarios y Permisos");
        strMenu += strCloseHeader();

        strMenu += strHeader("Prospección");
        strMenu += strElement("", "Cotización");
        strMenu += strElement("/Prospeccion/Index/", "Captura de Prospectos");
        strMenu += strElement("","Gestión de Prospectos");
        strMenu += strElement("","Renovaciones");
        strMenu += strCloseHeader();

        strMenu += strHeader("Originación");
        strMenu += strElement("","Listas de Trabajo");
        strMenu += strElement("", "Captura Solicitudes");
        strMenu += strElement("", "Digitalización");
        strMenu += strElement("", "Analisis Documental");
        strMenu += strElement("", "Evaluación Crediticia");
        strMenu += strElement("", "Verificación Telefónica");
        strMenu += strElement("", "Verificación Presencial");
        strMenu += strElement("", "Autorización");
        strMenu += strElement("", "Paquetes de Disposición");
        strMenu += strElement("", "Dispersión");
        strMenu += strCloseHeader();

        $('#leftSide').append(strMenu);   
    }

    function menuCredito() {
        strMenu += strHeader("Prospección");
        strMenu += strElement("", "", "Cotización");
        strMenu += strElement("", "", "Captura de Prospectos");
        strMenu += strElement("", "", "Gestión de Prospectos");
        strMenu += strElement("", "", "Renovaciones");
        strMenu += strCloseHeader();

        strMenu += strHeader("Originación");
        strMenu += strElement("", "", "Listas de Trabajo");
        strMenu += strElement("", "", "Captura Solicitudes");
        strMenu += strElement("", "", "Digitalización");
        strMenu += strElement("", "", "Analisis Documental");
        strMenu += strElement("", "", "Evaluación Crediticia");
        strMenu += strElement("", "", "Verificación Telefónica");
        strMenu += strElement("", "", "Verificación Presencial");
        strMenu += strElement("", "", "Autorización");
        strMenu += strElement("", "", "Paquetes de Disposición");
        strMenu += strElement("", "", "Dispersión");
        strMenu += strCloseHeader();

        $('#leftSide').append(strMenu);   
    }

    function fnLinkClick(url) {
        window.location = url;
    }

    function strHeader(titulo) {
        return "<li><a href=\"javascript: void (0); \" class=\"menu-toggle\"><i class=\"material-icons\">assignment</i><span>" + titulo + "</span></a><ul class=\"ml-menu\">";
        //return "<li><a href=\"javascript: void (0); \" class=\"menu-toggle\"><i class=\"material-icons\">assignment</i><span>" + titulo + "</span></a><ul class=\"ml-menu\">";
    }

    function strElement(controller, label) {
        return "<li>'<a href=\"javascript: lefSideNav.linkClick('" + controller + "'); \">" + label + "</a >'</li>";
    }

    function strCloseHeader() {
        return "</ul></li>";
    }
    
    function fnMenuSeleccionado(opcion) {

        $('#leftSide').empty();

        switch (opcion) {
            case (0):
                menuAdministracion();
                break;
            case (1):
                menuCredito();
                break;
            case (2):
                menuBanco();
                break;
            case (3):
                menuCobranza();
                break;
        }
        

    };

    return {
        menuSeleccionado: fnMenuSeleccionado,
        linkClick: fnLinkClick
    };


}();
