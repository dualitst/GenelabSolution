/*eslint eqeqeq:0*/
var ManageAccount = function () {

    function setGlobalVars() {

        var def = new $.Deferred();
        
        if (utils.fnLocalData.get(utils.fnGlobals("Sesion")) != null) {
            def.resolve(true);
        }
        else {
            var token = localStorage.getItem(utils.fnGlobals("Token"));

            var strToken = utils.fnGetJWTPayload(token);

            var objToken = jQuery.parseJSON(strToken.data);

            //console.log(objToken);

            var sRoles = '';
            for (var i = 0; i < objToken.Roles.filter(x => x.AplicacionId == utils.fnGlobals("AplicacionId")).length; i++) {
                sRoles += objToken.Roles.filter(x => x.AplicacionId == utils.fnGlobals("AplicacionId"))[i].NombreRol.substring(12);

                if (i != objToken.Roles.filter(x => x.AplicacionId == utils.fnGlobals("AplicacionId")).length - 1) {
                    sRoles += '|';
                }
            }


            //Si es el Core, toma los datos necesarios desde Originacion/Personas
            var SessionData = {};
            if (utils.fnGlobals("Core")) {
            try {
                var oUrl = 'UsuariosPersonas/Get';
                var oData = {
                    id_usuario: objToken.UsuarioId
                };
                var oProcessMessage = 'Procesando información, espere por favor...';
                var success = function (result) {
                    if (result.MessageType === 1) {
                        utils.fnShowErrorMessage(result.ErrorMessage);
                        return;
                    }
                    //debugger;
                    // crear controles
                    var id_oficina = 0;
                    var id_unidad_negocio = 0;
                    var unidad_negocio = '';


                    if (result.Data.id_plaza != null && result.Data.id_plaza > 0) {
                        id_oficina = result.Data.id_organigrama_area;

                        if (result.Data.area != null) {
                            id_unidad_negocio = result.Data.id_unidad_negocio;
                            unidad_negocio = result.Data.area;
                        }
                    }

                    SessionData = {
                        id_usuario: result.Data.id_persona,
                        nombre_completo: result.Data.nomPersona,
                        usuario: objToken.Usuario,
                        nombre: result.Data.nombre,
                        ap_paterno: result.Data.ap_paterno,
                        ap_materno: result.Data.ap_materno,
                        roles: sRoles,
                        id_unidad_negocio: id_unidad_negocio,
                        unidad_negocio: unidad_negocio,
                        id_oficina: id_oficina,
                        id_jefe: result.Data.id_empleado_jefe,
                        UsuarioId_jefe: result.Data.id_usuario_jefe,
                        nombre_jefe: result.Data.nomEmpleado_jefe
                    };

                    
                    utils.fnLocalData.set(utils.fnGlobals("Sesion"), SessionData);


                    $("#lblNombreSistema").html(utils.fnGlobals("NombreAplicacion"));
                    $("#lblNombreSistemaMenu").html(utils.fnGlobals("NombreAplicacion"));

                    $('#divMenuNombre').html(SessionData.nombre_completo);
                    $('#divRol').html(SessionData.roles);

                    $("#lblNombreUsuario").html(SessionData.nombre_completo);
                    $("#lblRolesUsuario").html(SessionData.roles);



                    // Carga fecha operacion
                    utils.fnGetAPIData("CajaControles/Get", { id_oficina: SessionData.id_oficina }, "Bancos", function (result) {
                        if (utils.fnValidResult(result)) {
                            utils.fnLocalData.set(utils.fnGlobals("FechaSistema"), result.Data.fecha_operacion);
                        }
                    });


                    def.resolve(true);

                    };
                    utils.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success, true, "Originacion");

                }
                catch (e) {
                    utils.fnShowErrorMessage(e.message);
                    def.reject("Error");
                }
            }
            else{ //Si no, toma lo indispensable de Security
                SessionData = {
                    id_usuario: objToken.UsuarioId,
                    nombre_completo: objToken.Personas.Nombre + " " + objToken.Personas.ApPaterno + (objToken.Personas.ApMaterno != null ? (" " + objToken.Personas.ApMaterno) : ""),
                    usuario: objToken.Usuario,
                    nombre: objToken.Personas.Nombre,
                    ap_paterno: objToken.Personas.ApPaterno,
                    ap_materno: objToken.Personas.ApMaterno,
                    roles: sRoles,
                    id_unidad_negocio: 1,
                    unidad_negocio: "CENTRAL",
                    id_oficina: 1,
                    id_jefe: 0,
                    UsuarioId_jefe: "",
                    nombre_jefe: ""
                };


                utils.fnLocalData.set(utils.fnGlobals("Sesion"), SessionData);


                $("#lblNombreSistema").html(utils.fnGlobals("NombreAplicacion"));
                $("#lblNombreSistemaMenu").html(utils.fnGlobals("NombreAplicacion"));

                $('#divMenuNombre').html(SessionData.nombre_completo);
                $('#divRol').html(SessionData.roles);

                $("#lblNombreUsuario").html(SessionData.nombre_completo);
                $("#lblRolesUsuario").html(SessionData.roles);

                def.resolve(true);
            }
        }

        return def.promise();
    }

    function SingOut() {
        localStorage.removeItem(utils.fnGlobals("Sesion"));
        localStorage.removeItem(utils.fnGlobals("Token"));
        localStorage.removeItem(utils.fnGlobals("Menu"));
        localStorage.removeItem(utils.fnGlobals("Caja"));
        localStorage.removeItem(utils.fnGlobals("FechaSistema"));
        localStorage.removeItem(utils.fnGlobals("WorkList"));

        //var root = utils.fnWebhost() + 'Account/Login';

        var root = utils.fnWebhost() + 'Home/index';

        window.location.replace(root);
    }

    return {
        SetGlobalVars: setGlobalVars,
        SingOut: SingOut
    };

}();