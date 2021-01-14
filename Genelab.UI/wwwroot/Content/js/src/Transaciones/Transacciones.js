/*eslint eqeqeq:0*/
/// <summary>
/// Nombre: Codigos
/// Descripcion: 
/// Fecha de creación: 2018-10-12
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


var Transacciones = function () {
    /// -------------------------------------------------------------------------
    /// Objetos
    /// -------------------------------------------------------------------------
    var grdOptions = {};
    var $grdDatos = document.querySelector('#grdDatos');
    var SessionData = utils.fnLocalData.get(utils.fnGlobals("Sesion"));

    var colDefs = [
        utils.fnAgGrid_ColumnBuilder({ header: "Nombre Transacion", field: "Nombre" }),
        utils.fnAgGrid_ColumnBuilder({ header: "API Inicial", field: "APIValidacionInicial" }),
        utils.fnAgGrid_ColumnBuilder({ header: "API Envio", field: "APIEnvio" }),
        utils.fnAgGrid_ColumnBuilder({ header: "Activo", field: "Activo" }),
        utils.fnAgGrid_ColumnBuilder({ header: "Acciones", noFilter: true, cellRenderer: cellRender_Acciones })
    ];
    var $frmDatos = $("#frmDatos");
    var $hdnIdDato = $("#hdnIdDato");
    var $txtNombre = $("#txtNombre");
    var $txtApiInicial = $("#txtApiInicial");
    var $txtApiEnvio = $("#txtApiEnvio");
    var $txtPlantilla = $("#txtPlantilla");
    var $rdbIngreso = $("#rdbIngreso");
    var $rdbEgreso = $("#rdbEgreso");
    var $chkActivo = $("#chkActivo");
    var $btnGuardar = $("#btnGuardar");



    /// -------------------------------------------------------------------------
    /// Init
    /// -------------------------------------------------------------------------
    $(document).ready(function () {
        fnInit();
    });



    /// -------------------------------------------------------------------------
    /// Funciones
    /// -------------------------------------------------------------------------
    function fnInit() {

        debugger;
        utils.fnGetAPIData("Status/IsAlive", { }, "Reporteria", function (result) {
            if (utils.fnValidResult(result)) {

                var alive = result.Data;
            }
        });


        //Inicializando página
        utils.fnPage_Init();

        //Parámetros
        var params = utils.fnGetURLParams();

        //Llena select Unidad de negocio
       // utils.fnLlenaSelect(null, $selCatalogo, "CatalogoCodigos/GetList", { }, "cve_catalogo", "descripcion", "", "Catálogo:", null, "Originacion");

        //Inicializando agGrid
        utils.fnAgGrid_Init(grdOptions, $grdDatos, colDefs, Datos)
            .done(function (res) {
                grdOptions = res;
            })

            .then(function () {
            //    //Alimentando agGrid
            //    llenaGrid();
                $('[data-toggle="tooltip"]').tooltip({
                    container: 'body'
                });
            });
    };



    // Funciones manejo Grid
    //----------------------
    function llenaGrid() {
        utils.fnAgGrid_SetRowsAPI(grdOptions, "TransacionesAdmin/ObtenerTransaciones", {}, false, "Originacion")
            .done(function (res) {
                grdOptions = res;
            })
            .done(function () {
                //Inicilizando Tooltips del grid
                $('[data-toggle="tooltip"]').tooltip({
                    container: 'body'
                });
            });
    }

    //Actualiza filtro
    function actualizaFiltro() {
        grdOptions.api.setQuickFilter(document.getElementById('txtFiltro').value);
    }

    // cellRender Acciones
    function cellRender_Acciones(params) {
        var content = "";
        content += "<a role='button' id='btnEditarControles_" + params.rowIndex + "' name='btnEditarControles" + params.rowIndex + "' class='btn btn-info btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Editar Controles' onclick='Transacciones.fnEditarControles(\"" + params.data.IdTransacion + "\")'><i class='material-icons'>line_style</i></a>&nbsp;&nbsp;&nbsp;&nbsp;";
        content += "<a role='button' id='btnEditar_" + params.rowIndex + "' name='btnEditar_" + params.rowIndex + "' class='btn btn-info btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Editar' onclick='Transacciones.fnModalRegistro(\"" + params.data.IdTransacion + "\")'><i class='material-icons'>mode_edit</i></a>&nbsp;&nbsp;&nbsp;&nbsp;";
        content += "<a role='button' id='btnEliminar_" + params.rowIndex + "' name='btnEliminar_" + params.rowIndex + "' class='btn btn-danger btn-circle btn-circle-sm' data-toggle='tooltip' data-placement='top' title='Eliminar' onclick='Transacciones.fnConfirmEliminarRegistro(\"" + params.data.IdTransacion + "\")'><i class='material-icons'>delete</i></a>&nbsp;&nbsp;&nbsp;&nbsp;";

        return content;
    }


    // Modal registro
    //---------------
    function modalRegistro(idTransaccion, cve_catalogo) {
        if (typeof (idTransaccion) == "undefined") {
            idTransaccion = "";
            $txtNombre.removeAttr("readonly");
        }
        else {
            $txtNombre.attr("readonly", true);
        }

        utils.fnLimpiaForm($frmDatos.attr('id'));
        $hdnIdDato.val(idTransaccion);

        if (idTransaccion != "") {

            $.ajax({
                url: "TransacionesAdmin/ObtenerTransaccion",
                type: "GET",
                timeout: 180000,
                data: {'idTransaccion' :  idTransaccion},
                cache: false,
                success: function (result) {
                    utils.fnActualizaInput($txtNombre.attr('id'), result.Nombre, "");
                    utils.fnActualizaInput($txtApiInicial.attr('id'), result.APIValidacionInicial, "");
                    utils.fnActualizaInput($txtApiEnvio.attr('id'), result.APIEnvio, "");
                    utils.fnActualizaInput($txtPlantilla.attr('id'), result.Plantilla, "");
                    if (result.TipoTransaccion==1) {
                        $("#rdbIngreso").prop("checked", true);
                        $("#rdbEgreso").prop("checked", false);
                        
                    }
                    else {
                        $("#rdbEgreso").prop("checked", true);
                        $("#rdbIngreso").prop("checked", false);
                        
                    }
                    $chkActivo.prop("checked", result.Activo);
                },
                error: function (error) {
                    alert(error);
                }

            });
        }




        $('#modalAgregar').modal('show');
    }


    // Confirm guardar registro
    //-------------------------
    function confirmGuardarRegistro() {
        //Validando
        $frmDatos.validate({
            rules: {
                SelectName: { valueNotEquals: "" }
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
        var DatosGuardados;
        var URlPost = "";
        var tipoTransaccion = 1;
        if ($rdbIngreso.is(":checked")) {
            tipoTransaccion = 1;
        }
        else  {
            tipoTransaccion = 2;
        }
        if ($hdnIdDato.val() == "") {
            DatosGuardados = {
                Nombre: $txtNombre.val(),
                APIValidacionInicial: $txtApiInicial.val(),
                APIEnvio: $txtApiEnvio.val(),
                Plantilla: window.btoa($txtPlantilla.val()),
                TipoTransaccion:tipoTransaccion,
                Activo: $chkActivo.prop('checked')
            };
            URlPost = "TransacionesAdmin/Guardar";
        }
        else {
            DatosGuardados = {
                Nombre: $txtNombre.val(),
                APIValidacionInicial: $txtApiInicial.val(),
                APIEnvio: $txtApiEnvio.val(),
                Plantilla: window.btoa( $txtPlantilla.val()),
                Activo: $chkActivo.prop('checked'),
                TipoTransaccion: tipoTransaccion,
                IdTransacion: $hdnIdDato.val()
            };
            URlPost = "TransacionesAdmin/ActualizarTransaccion";
        }
        

        

        if ($frmDatos.valid()) {

            utils.fnShowConfirmMessage("¿Está seguro que desea guardar los datos?",
                function () {
                    $.ajax({
                        url: URlPost,
                        type: "POST",
                        timeout: 180000,
                        data:  DatosGuardados,
                        cache: false,
                        success: function (result) {                            
                                utils.fnShowSuccessMessage("Datos guardados con éxito!");
                                //Alimentando Grid
                                //  llenaGrid();
                            $(".close-modal").click();  
                            location.reload();
                        },
                        error: function (error) {
                            alert(error);
                        }
                        
                    })
                },
                function () {
                    utils.fnShowInfoMessage("Se canceló la acción");
                });
        }
    }


    // Confirm eliminar registro
    //--------------------------
    function confirmEliminarRegistro(id_dato, cve_catalogo) {
        if (typeof (id_dato) == "undefined") {
            id_dato = 0;
        }

        utils.fnShowConfirmMessage("¿Está seguro que desea eliminar el registro: " + id_dato + "?",
            function () {
                utils.fnGetAPIData("Codigos/Delete", {
                    cve_codigo: id_dato,
                    cve_catalogo: cve_catalogo,
                    user_stamp: SessionData.id_usuario
                }, "Originacion", function (result) {
                        if (utils.fnValidResult(result)) {
                            utils.fnShowSuccessMessage("Registro eliminado con éxito!");

                            //Alimentando Grid
                            llenaGrid();
                        }
                    });
            },
            function () {
                utils.fnShowInfoMessage("Se canceló la acción");
            });
    }
    function editarControles(IdTransacion) {
        window.location.href += '/Editarcontroles?IdTransacion=' + IdTransacion;
    }



    /// -------------------------------------------------------------------------
    /// Objeto de regreso
    /// -------------------------------------------------------------------------
    return {
        fnActualizaFiltro: actualizaFiltro,
        fnModalRegistro: modalRegistro,
        fnConfirmGuardarRegistro: confirmGuardarRegistro,
        fnConfirmEliminarRegistro: confirmEliminarRegistro,
        fnEditarControles: editarControles
    }
}();