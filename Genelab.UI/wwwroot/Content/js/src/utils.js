/*eslint eqeqeq:0*/
var utils = function () {
    var lockedUrl = '/Account/Locked';
    var loginUrl = "/Account/Login?ReturlUrl=";
    var logOffUrl = "/Account/Logoff";
    var logoutMessage = 'Su sesi\u00F3n expir\u00F3. Por favor, vuelva a ingresar sus credenciales';
    var idleSeconds = 600;
    
    var webhost = 'http://localhost/FinSoft.WebSites.UI/';//URL SANDBOX - Conservando puerto

    

    
    
    /// -----------------------------------------------------------------------------
    /// Variables Globales
    /// -----------------------------------------------------------------------------
    var GlobalVars = {};
    GlobalVars["Core"] = false; //Define si se toman datos de la BD Fiinsoft(true) o sólo de Seguridad(false)
    GlobalVars["AplicacionId"] = 4; //Fiinsoft Core
    GlobalVars["AplicacionIdMobile"] = 5; //Fiinsoft Core Mobile
    GlobalVars["Aplicacion"] = "FiinSoftWebSandbox";
    GlobalVars["NombreAplicacion"] = "Fiinsoft Sandbox";
    GlobalVars["Token"] = "Sandbox_Token";
    GlobalVars["Sesion"] = "Sandbox_SessionData";
    GlobalVars["Menu"] = "Sandbox_Menu";
    GlobalVars["Caja"] = "Sandbox_Caja";
    GlobalVars["FechaSistema"] = "Sandbox_Fecha_Sistema";
    GlobalVars["WorkList"] = "Sandbox_WorkList";



    /// -----------------------------------------------------------------------------
    /// APIs
    /// -----------------------------------------------------------------------------
    var sites = {};
    //SERVER SANDBOX - CLIENTES
    sites["Security"] = "http://localhost:57537/api/"; //TEMPORAL SITE API FABIAN
    sites["Originacion"] = "http://localhost:57537/api/";//TEMPORAL SITE API FABIAN
    sites["Bancos"] = "http://localhost/Finsoft.WebAPI.Bancos/fiinsoftapi/";
    sites["Reportes"] ="http://localhost/Finsoft.WebAPI.Reportes/api/Reports";
    sites["Cobranza"] = "http://localhost/Finsoft.WebAPI.Cobranza/fiinsoftapi/";
    sites["Bitacora"] = "http://localhost/Finsoft.WebAPI.Bitacora/fiinsoftapi/";
    sites["Administracion"] = "http://localhost/Finsoft.WebAPI.Administracion/fiinsoftapi/";

    sites["Reporteria"] = "http://localhost/Finsoft.WebAPI.Reporteria/fiinsoftapi/";

    var loginShowed = false;
    var error500Message = "Ocurrió un error de sistema: ";
    var error404Message = "El recurso que intenta accesar, no existe!";
    var waitingDialog = null;
    var oldIE;
    var tableIdentifier = $('#detail-table');
    var configuracion = null;
    tablaConfiguracion = [];
    arregloNombreColumnas = [];
    
    /// -----------------------------------------------------------------------------
    /// manejo de url
    /// -----------------------------------------------------------------------------

    function enableNavigation(e) {

        $('a').on('click', function (e) {
            if ($(this).data('hash')) {
                var hash = $(this).attr('href');
                navigateRoute(e, hash);
            }
        });

    }

    function navigateRoute(e, url, option) {
        //debugger;
        var urlComplete = webhost + url;

        urlComplete = urlComplete.replace('#', '');
        window.location.replace(urlComplete)
    };
    
    
    /*---------------------------------------------------------------------*/
    // manejo de agGrid
    /*---------------------------------------------------------------------*/

    var gridOptions;


    var createButton = function (sButtonType, sController, sParams, callBackFn) {
        ////debugger;
        if (typeof sParams !== 'undefined' && sParams !== null) {
            sParams = btoa(sParams);
            sParams = '?' + sParams
        }

        var href = webhost + sController + sParams;
        var sButton;

        if (sButtonType == "Editar") {

            sButton = `<button type="button" class="btn btn-info btn-circle btn-circle-sm" data-toggle="tooltip" data-placement="top" title="Editar" onclick="window.location='${href}'"><i class="material-icons md-18">create</i></button>`;
        }

        return sButton;
    };

    var fnInitAgGrid = function (oTable, columnDefs, rowData) {
        gridOptions = {
            animateRows: true,
            columnDefs: columnDefs,
            rowData: rowData,
            enableColResize: true,
            enableSorting: true,
            enableFilter: true,
            rowSelection: 'multiple',
            enableStatusBar: true,
            enableRangeSelection: true,
            groupSelectsChildren: true,
            rowHeight: 50,
            localeText: {
                // for filter panel
                page: 'Página',
                more: 'Más',
                to: 'Para',
                of: 'De',
                next: 'Siguiente',
                last: 'Ultimo',
                first: 'Primero',
                previous: 'Anterior',
                loadingOoo: 'Cargando...',
                loading: 'Cargando',
                // for set filter
                selectAll: 'Seleccionar Todo',
                searchOoo: 'Buscar...',
                blanks: 'Vacío',
                // for number filter and text filter
                filterOoo: 'Filtrar...',
                applyFilter: 'Aplicar Filtro...',
                // for number filter
                equals: 'Igual a',
                notEqual: 'Diferente de',
                lessThan: 'Menor que',
                lessThanOrEqual: 'Menor Igual que',
                greaterThan: 'Mayor que',
                greaterThanOrEqual: 'Mayor Igual que',
                // for text filter
                contains: 'Contiene',
                notEquals: 'Diferente de',
                startsWith: 'Inicia con',
                endsWith: 'Termina con',
                // the header of the default group column
                group: 'Grupo',
                // tool panel
                columns: 'Columnas',
                rowGroupColumns: 'Columnas Pivot',
                rowGroupColumnsEmptyMessage: 'Arrastre columnas para agrupar',
                valueColumns: 'Columnas Valor',
                pivotMode: 'Modo Pivot',
                groups: 'Grupos',
                values: 'Valores',
                pivots: 'Pivots',
                valueColumnsEmptyMessage: 'Arrastre columnas para agregar',
                pivotColumnsEmptyMessage: 'Arrastre aquí para usar como Pivot',
                // other
                noRowsToShow: 'No hay renglones para mostrar',
                // enterprise menu
                pinColumn: 'Inmovilizar columna',
                valueAggregation: 'Agregación de valores',
                autosizeThiscolumn: 'Autoajustar',
                autosizeAllColumns: 'Autoajustar todas',
                groupBy: 'Agrupar por',
                ungroupBy: 'Desagrupar por',
                resetColumns: 'Reestablecer columnas',
                expandAll: 'Abrir todo',
                collapseAll: 'Cerrar todo',
                toolPanel: 'Panel de herramientas',
                export: 'Exportar',
                excelExport: 'Exportar a Excel',
                csvExport: 'Exportar a CSV',
                // enterprise menu pinning
                pinLeft: 'Inmovilizar <<',
                pinRight: 'Inmovilizar >>',
                noPin: 'Movilizar <>',
                // enterprise menu aggregation and status panel
                sum: 'Sum',
                min: 'Min',
                max: 'Max',
                none: 'Ninguno',
                count: 'Cont',
                average: 'Prom',
                avg: 'Prom',
                // standard menu
                copy: 'Copiar',
                copyWithHeaders: 'Copiar con encabezados',
                ctrlC: 'Ctrl + C',
                paste: 'Pegar',
                ctrlV: 'Ctrl + V'
            },

            onGridReady: function (event) {
                gridOptions.api.refreshCells();
                gridOptions.api.sizeColumnsToFit();
            }
        };

        // create the grid passing in the div to use together with the columns & data we want to use
        new agGrid.Grid(oTable, gridOptions);
    };

    function fnClearDataAgGrid(rows) {
        gridOptions.api.setRowData(rows);
    }

    function setMessagesSelect2() {
        //"use strict";

        (function ($) {
            $.extend($.fn.select2.defaults, {
                formatNoMatches: function () { return "No se encontraron resultados"; },
                formatInputTooShort: function (input, min) { var n = min - input.length; return "Por favor adicione " + n + " caracter" + (n == 1 ? "" : "es"); },
                formatInputTooLong: function (input, max) { var n = input.length - max; return "Por favor elimine " + n + " caracter" + (n == 1 ? "" : "es"); },
                formatSelectionTooBig: function (limit) { return "Solo puede seleccionar " + limit + " elemento" + (limit == 1 ? "" : "s"); },
                formatLoadMore: function (pageNumber) { return "Cargando más resultados..."; },
                formatSearching: function () { return "Buscando..."; }
            });
        })(jQuery);
    };

    function setDatePicker() {
        /* Inicialización en español para la extensión 'UI date picker' para jQuery. */
        /* Traducido por Vester (xvester [en] gmail [punto] com). */

        jQuery(function ($) {
            $.datepicker.regional['es'] = {
                closeText: 'Limpiar',
                prevText: '<i class="fa fa-chevron-left"></i>',
                nextText: '<i class="fa fa-chevron-right"></i>',
                currentText: 'Hoy',
                monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado'],
                dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sab'],
                dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
                weekHeader: 'Sm',
                dateFormat: 'dd/mm/yy',
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: false,
                showButtonPanel: true,
                //showOn: "button",
                buttonImage: "Content/img/calendar.gif",
                buttonText: "Ver calendario",
                onClose: function () {
                    var event = arguments.callee.caller.caller.arguments[0];
                    // If "Clear" gets clicked, then really clear it
                    if ($(event.delegateTarget).hasClass('ui-datepicker-close')) {
                        $(this).val('');
                    }
                },
                maxDate: '0',
                autoclose: true
            };
            $.datepicker.setDefaults($.datepicker.regional['es']);

        });
    };

    function getDate(date) {
        return $.datepicker.parseDate('dd/mm/yy', date);
    };

    function setValidationMessages() {
        $.extend(jQuery.validator.messages, {
            required: "Valor requerido",
            remote: "Corrija este valor",
            email: "Ingrese un email valido",
            url: "Ingrese una url v&aacute;lida",
            date: "Ingrese una fecha v&aacute;lida",
            dateISO: "Ingrese una fecha ISO v&aacute;lida",
            number: "Ingrese un n&uacute;mero v&aacute;lido",
            digits: "Ingrese solo d&iacute;gitos",
            creditcard: "Ingrese un n&uacute;mero de tarjeta v&aacute;lida",
            equalTo: "Ingrese el mismo valor",
            accept: "Ingrese una extensi&oacute;n v&aacute;lida",
            maxlength: jQuery.validator.format("Ingres&oacute; m&aacute;s de {0} caracteres"),
            minlength: jQuery.validator.format("Ingrese por lo menos {0} caracteres"),
            rangelength: jQuery.validator.format("Ingrese un valor con {0} a {1} caracteres"),
            range: jQuery.validator.format("Ingrese un valor entre {0} y {1}"),
            max: jQuery.validator.format("Ingrese un valor menor o igual a {0}"),
            min: jQuery.validator.format("Ingrese un valor mayor o igual a {0}"),
            notEqual: jQuery.validator.format("Ingrese un valor difenre a {0}")
        });
    }

    function setValidatorAddMethod() {
        jQuery.validator.addMethod("notEqual", function (value, element, param) {
            return this.optional(element) || value != $(param).val();
        }, "This has to be different...");
    };

    var switchTheme = function () {
        $('.theme-style-wrapper').click(function () {
            $('#main-wrapper').attr('class', '');
            var themeValue = $(this).data('theme');
            $('#main-wrapper').addClass(themeValue);
        });
    };

    var navToggleRight = function () {
        $('#toggle-right').on('click', function () {
            $('#sidebar-right').toggleClass('sidebar-right-open');
            $("#toggle-right .fa").toggleClass("fa-indent fa-dedent");

        });
    };

    var customCheckbox = function () {
        $('input.icheck').iCheck({
            checkboxClass: 'icheckbox_flat-grey',
            radioClass: 'iradio_flat-grey'
        });
    }

    var navToggleLeft = function () {
        $('#toggle-left').on('click', function () {
            var bodyEl = $('#main-wrapper');
            ($(window).width() > 767) ? $(bodyEl).toggleClass('sidebar-mini') : $(bodyEl).toggleClass('sidebar-opened');
        });
    };

    var navToggleSub = function () {
        var subMenu = $('.sidebar .nav');
        $(subMenu).navgoco({
            caretHtml: false,
            accordion: true
        });

    };

    var profileToggle = function () {
        $('#toggle-profile').click(function () {
            $('.sidebar-profile').slideToggle();
        });
    };

    var widgetToggle = function () {
        $(".actions > .fa-chevron-down").click(function () {
            $(this).parent().parent().next().slideToggle("fast"), $(this).toggleClass("fa-chevron-down fa-chevron-up")
        });
    };

    var widgetClose = function () {
        $(".actions > .fa-times").click(function () {
            $(this).parent().parent().parent().fadeOut()
        });
    };

    var widgetFlip = function () {
        $(".actions > .fa-cog").click(function () {
            $(this).closest('.flip-wrapper').toggleClass('flipped')
        });
    };

    var dateRangePicker = function () {
        $('.reportdate').daterangepicker({
            format: 'YYYY-MM-DD',
            startDate: '2014-01-01',
            endDate: '2014-06-30'
        });
    };

    var tooltips = function () {
        $('.tooltip-wrapper').tooltip({
            selector: "[data-toggle=tooltip]",
            container: "body"
        })
    };

    var sliders = function () {
        $('.slider-span').slider()
    };

    var formValidation = function () {
        $('#form').validate({
            rules: {
                input1: {
                    required: true
                },
                input2: {
                    minlength: 5,
                    required: true
                },
                input3: {
                    maxlength: 5,
                    required: true
                },
                input4: {
                    required: true,
                    minlength: 4,
                    maxlength: 8
                },
                input5: {
                    required: true,
                    min: 5
                },
                input6: {
                    required: true,
                    range: [5, 50]
                },
                input7: {
                    minlength: 5
                },
                input8: {
                    required: true,
                    minlength: 5,
                    equalTo: "#input7"
                },
                input9: {
                    required: true,
                    email: true
                },
                input10: {
                    required: true,
                    url: true
                },
                input11: {
                    required: true,
                    digits: true
                },
                input12: {
                    required: true,
                    phoneUS: true
                },
                input13: {
                    required: true,
                    minlength: 5
                }
            },
            highlight: function (element) {
                $(element).closest('.form-group').removeClass('success').addClass('error');
            },
            success: function (element) {
                element.text('OK!').addClass('valid')
                    .closest('.form-group').removeClass('error').addClass('success');
            }
        });
    }

    function isLoginShown() {
        return loginShowed;
    }

    function logOffNavigate() {
        window.location.replace(webhost + logOffUrl);
        //navigateAjax(null, logOffUrl, 1);
    }

    function doLogout() {
        //showInfoMessage(logoutMessage);
        showLockedScreen();
        //navigateAjax(null, loginUrl, 1);
    }

    function showLockedScreen() {
        loginShowed = true;
        $('#password').val('');
        $('#password').css({ 'display': 'block' });
        $('#popupLockedScreen').modal('show');
    }

    function hideLockedScreen() {
        loginShowed = false;
        $('#password').val('');
        $('#password').css({ 'display': 'none' });
        $('#popupLockedScreen').modal('hide');
    }
    var expireSesionUserInactve = function (/*e*/) {
        $.idle(idleSeconds, function () {
            var urlLocked = lockedUrl;
            showLockedScreen();
        });
    };

    var initMessage = function () {
        var loc = ['top', 'right'];
        var style = 'flat';

        var $output = $('.controls output');
        var $lsel = $('.location-selector');
        var $tsel = $('.theme-selector');

        var update = function () {
            var classes = 'messenger-fixed';

            for (var i = 0; i < loc.length; i++)
                classes += ' messenger-on-' + loc[i];

            $.globalMessenger({ extraClasses: classes, theme: style });
            Messenger.options = { extraClasses: classes, theme: style };

            $output.text("Messenger.options = {\n    extraClasses: '" + classes + "',\n    theme: '" + style + "'\n}");
        };

        update();
    }

    function handleAjaxError(request, status, error) {
        if (request.status == 401) {
            doLogout();
        }
        else if (request.status == 404) {
            showErrorMessage(error404Message, request);
        }
        else if (request.status == 500) {
            showErrorMessage(error500Message + error, request);
        }

    }

    function FSAsyncJSON(url, args, resultFunction, API) {
        if (typeof API == 'undefined')
            API = 'Security';

        if (typeof url != "undefined" && url != null && url.contains("http")) {
            this.Url = url;
        }
        else {
            this.Url = sites[API] + url;
        }

        this.ResultFunction = resultFunction;
        this.Args = args;
        this.CallBackEjecutado = false;
    }

    function FSAsyncHtml(url, resultFunction) {
        this.Url = site + url;
        this.ResultFunction = resultFunction;
        this.CallBackEjecutado = false;
    }

    function fnExecute(e, oUrl, oData, oProcessMessage, oInfoMessage, oErrorMessage) {
        e.preventDefault();
        var success = function (data) {
            if (data.hasOwnProperty('ErrorMessage')) {
                utils.showErrorMessage(oErrorMessage, oUrl);

                return false;
            }

            utils.showSuccessMessage(oInfoMessage);

            return true;
        };

        try {

            var calls = [new utils.FSAsyncJSON(oUrl, JSON.stringify(oData), success)];

            utils.doJsonAsyncPostBack(oProcessMessage, calls, null, utils.standarErrorHandler);

        }
        catch (e) {
            utils.showErrorMessage(e.message, oUrl);
        }
    };

    function fnExecuteWithResult(e, oUrl, oData, oProcessMessage, success, JWTAuth, API) {
        if (e !== null)
            e.preventDefault();

        try {

            var calls = [new FSAsyncJSON(oUrl, JSON.stringify(oData), success, API)];
            //console.log(calls);
            doJsonAsyncPostBack(oProcessMessage, calls, null, utils.standarErrorHandler, JWTAuth);

        }
        catch (e) {
            showErrorMessage(e.message, oUrl);
        }
    };

    /// -----------------------------------------------------------------------------
    /// SweetAlert Error
    /// -----------------------------------------------------------------------------
    var showErrorMessage = function (msg, oUrl) {
        swal({
            title: '&#161;Error!<br/> Avise a su administrador de sistema ',
            text: msg,
            type: 'error',
            html: true
        });
    };

    /// -----------------------------------------------------------------------------
    /// SweetAlert Info
    /// -----------------------------------------------------------------------------
    var showInfoMessage = function (msg) {
        //fix para problemas con tab de SweetAlert
        window.onkeydown = window.onfocus = null;

        swal({
            title: '&#161;Atenci&oacute;n!',
            text: msg,
            type: 'info',
            html: true
        });
    };

    /// -----------------------------------------------------------------------------
    /// SweetAlert Success
    /// -----------------------------------------------------------------------------
    var showSuccessMessage = function (msg) {
        //fix para problemas con tab de SweetAlert
        window.onkeydown = window.onfocus = null;

        swal({
            title: '&#161;&Eacute;xito!',
            text: msg,
            type: 'success',
            html: true
        });
    };

    /// -----------------------------------------------------------------------------
    /// SweetAlert Warning
    /// -----------------------------------------------------------------------------
    var showWarningMessage = function (msg) {
        //fix para problemas con tab de SweetAlert
        window.onkeydown = window.onfocus = null;

        swal({
            title: '&#161;Advertencia!',
            text: msg,
            type: 'warning',
            html: true
        });
    };

    /// -----------------------------------------------------------------------------
    /// SweetAlert Confirm
    /// -----------------------------------------------------------------------------
    var showConfirmMessage = function (msg, confirmFunc, cancelFunc) {
        //fix para problemas con tab de SweetAlert
        window.onkeydown = window.onfocus = null;

        return swal({
            title: '&#161;Advertencia!',
            text: msg,
            type: 'warning',
            html: true,
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
            closeOnConfirm: true,
            closeOnCancel: true
        }, function (isConfirm) {
            if (isConfirm) {
                if (typeof confirmFunc != "undefined")
                    confirmFunc();
            } else {
                if (typeof cancelFunc != "undefined")
                    cancelFunc();
            }
        });
    };

    /// -----------------------------------------------------------------------------
    /// Obtener payload de Token JWT
    /// -----------------------------------------------------------------------------
    var getJWTPayload = function (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    };

    /// -----------------------------------------------------------------------------
    /// Obtener Edad a partir de fecha de nacimiento
    /// -----------------------------------------------------------------------------
    var getEdad = function (dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    /// -----------------------------------------------------------------------------
    /// Llenar un Select a partir de una lista proporcionada por una webAPI
    /// -----------------------------------------------------------------------------
    var llenaSelect = function (e, $select, dataUrl, postData, key, value, defaultValue, defaultItem, level, API, lv2key, lv2value, allValues, allValuesItem, emptyMsg, sortBy, sort) {
        //console.log("-----------------------------------------------------------");
        if (typeof sort == "undefined") {
            sort = "ASC";
        }

        if (typeof sortBy == "undefined") {
            sortBy = typeof lv2key == "undefined" ? value : lv2value;
        }


        try {
            var oUrl = dataUrl;
            var oData = postData;
            var oProcessMessage = 'Obteniendo información...';
            var success = function (result) {

                if (result.MessageType == '1') {
                    utils.fnShowErrorMessage(result.ErrorMessage);
                    return;
                }

                var selItems = '';


                $.each(result.Data.sort(utils.fnCompare(sortBy, sort)), function (k, v) {
                    if (typeof lv2key == 'undefined') {
                        selItems += '<option value="' + v[key].toString().trim() + '">' + ((typeof level == "undefined" || level == null) ? "" : "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".repeat(v[level] - 1)) + v[value] + '</option>';
                    }
                    else {
                        selItems += '<option value="' + v[key][lv2key].toString().trim() + '">' + ((typeof level == "undefined" || level == null) ? "" : "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".repeat(v[level] - 1)) + v[key][lv2value] + '</option>';
                    }
                });


                //Se cambiaron las asignaciones a Pure JS por problemas con el formwizard
                var oSelect = document.getElementById($select.selector.substr(1));

                if (oSelect == null) {
                    oSelect = document.getElementById($select.getId());
                }


                if (oSelect != null) {
                    oSelect.innerHTML = selItems;


                    //$("#" + oSelect.id).html($("#" + oSelect.id + " option").sort(function (a, b) {
                    //    return a.text == b.text ? 0 : a.text < b.text ? -1 : 1;
                    //}));


                    if (typeof allValues == 'undefined') {
                        oSelect.innerHTML = '<option selected disabled="disabled" value="' + defaultValue + '">' + defaultItem + '</option>' + oSelect.innerHTML;
                    }
                    else {
                        oSelect.innerHTML = '<option selected disabled="disabled" value="' + defaultValue + '">' + defaultItem + '</option>' + '<option value="' + allValues + '">' + allValuesItem + '</option>' + oSelect.innerHTML;
                    }
                    
                }
                else {
                    console.log("***** No se encontró ******");
                    console.log(selItems);
                }
                

                $select.selectpicker('refresh');


                if (typeof ($select.data("valor")) != 'undefined' && $select.data("valor") != null && $select.data("valor") != "") {
                    utils.fnActualizaSelect($select.attr('id'), true, $select.data("valor"), false);
                }
                else {
                    utils.fnActualizaSelect($select.attr('id'), false, defaultValue, true);
                }


                if (typeof emptyMsg != 'undefined') {
                    if (result.Data.length == 0) {
                        showWarningMessage(emptyMsg);
                    }
                }


                //console.log("-----------------------------------------------------------");
            };
            utils.fnExecuteWithResult(e, oUrl, oData, oProcessMessage, success, true, API);
        }
        catch (e) {
            def.reject("Error");
            //utils.fnShowErrorMessage(e.message);
        }
    };


    /// -----------------------------------------------------------------------------
    /// Llenar un Select a partir de un array de objetos proporcionado por parametro
    /// -----------------------------------------------------------------------------
    var llenaSelectArray = function (e, $select, objList, key, value, defaultValue, defaultItem, level, lv2key, lv2value, allValues, allValuesItem, emptyMsg, adicionalHtml, orden) {
        //console.log("-----------------------------------------------------------");

        if (typeof orden == "undefined"){
            orden = "ASC";
        }


        var selItems = '';


        $.each(objList, function (k, v) {
                if (typeof lv2key == 'undefined') {
                    selItems += '<option value="' + v[key].toString().trim() + '">' + ((typeof level == "undefined" || level == null) ? "" : "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".repeat(v[level] - 1)) + v[value] + '</option>';
                }
                else {
                    selItems += '<option value="' + v[key][lv2key].toString().trim() + '">' + ((typeof level == "undefined" || level == null) ? "" : "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".repeat(v[level] - 1)) + v[key][lv2value] + '</option>';
                }
            });

        
        //Se cambiaron las asignaciones a Pure JS por problemas con el formwizard
        var oSelect = document.getElementById($select.selector.substr(1));

        if (oSelect == null) {
            oSelect = document.getElementById($select.getId());
        }


        if (oSelect != null) {
            oSelect.innerHTML = selItems;

            if (orden == "ASC") {
                $("#" + oSelect.id).html($("#" + oSelect.id + " option").sort(function (a, b) {
                    return a.text == b.text ? 0 : a.text < b.text ? -1 : 1;
                }));
            }
            else {
                $("#" + oSelect.id).html($("#" + oSelect.id + " option").sort(function (a, b) {
                    return a.text == b.text ? 0 : a.text > b.text ? -1 : 1;
                }));
            }


            if (typeof allValues == 'undefined') {
                oSelect.innerHTML = '<option selected disabled="disabled" value="' + defaultValue + '">' + defaultItem + '</option>' + oSelect.innerHTML;
            }
            else {
                oSelect.innerHTML = '<option selected disabled="disabled" value="' + defaultValue + '">' + defaultItem + '</option>' + '<option value="' + allValues + '">' + allValuesItem + '</option>' + oSelect.innerHTML;
            }


            //Opciones adicionales por html
            if (typeof adicionalHtml != 'undefined') {
                oSelect.innerHTML += adicionalHtml;
            }
        }
        else {
            console.log("***** No se encontró ******");
            console.log(selItems);
        }


        $select.selectpicker('refresh');


        if (typeof ($select.data("valor")) != 'undefined' && $select.data("valor") != null && $select.data("valor") != "") {
            utils.fnActualizaSelect($select.attr('id'), true, $select.data("valor"), false);
        }
        else {
            utils.fnActualizaSelect($select.attr('id'), false, defaultValue, true);
        }


        if (typeof emptyMsg != 'undefined') {
            if (result.Data.length == 0) {
                showWarningMessage(emptyMsg);
            }
        }


        //console.log("-----------------------------------------------------------");
    };
    

    /// -----------------------------------------------------------------------------
    /// Llenar un Div de Tags a partir de una lista proporcionada por una webAPI
    /// -----------------------------------------------------------------------------
    var llenaTagList = function (e, $TagList, dataUrl, postData, key, value, delFunc, lv2key, lv2value, JWTAuth, API, cols, imagen, imagenCtrl, validaImagen, editable, editFunc) {
        try {
            if (typeof JWTAuth == 'undefined')
                JWTAuth = true;

            if (typeof API == 'undefined')
                API = 'Security';

            if (typeof cols == 'undefined')
                cols = 3;

            if (typeof imagen == 'undefined')
                imagen = "";

            if (typeof validaImagen == 'undefined')
                validaImagen = "";

            if (typeof editable == 'undefined')
                editable = false;

            

            var colClasses = "";
            switch (cols) {
                case 1:
                    colClasses = "col-lg-12 col-md-12 col-sm-12 col-xs-12";
                    break;

                case 2:
                    colClasses = "col-lg-6 col-md-6 col-sm-12 col-xs-12";
                    break;
                default:
                    colClasses = "col-lg-3 col-md-4 col-sm-4 col-xs-6";
            }

            var oUrl = dataUrl;
            var oData = postData;
            var oProcessMessage = 'Obteniendo información...';
            var success = function (result) {
                if (result.MessageType == '1') {
                    utils.fnShowErrorMessage(result.ErrorMessage);
                }

                var tags = '';
                var imagenHTML = '';
                if (typeof lv2key == 'undefined') {
                    $.each(result.Data, function (k, v) {
                        if (imagen != "") {
                            if (v[validaImagen] != null && v[validaImagen] != "") {
                                imagenHTML = '&nbsp;<a class="tagList-imagen" onclick="utils.fnGetAPIFile(\'' + API + '\', \'' + imagenCtrl + '\',{' + imagen + ':' + v[imagen] + '});"><i class="material-icons md-18">photo</i></a>';
                            }
                            else {
                                imagenHTML = '&nbsp;';
                            }
                        }

                        tags += '<div class="' + colClasses + '"><span>' + v[value] + imagenHTML;

                        if (editable)
                            tags += '&nbsp;<span class="span-edit" value="' + v[key] + '"><i class="material-icons md-18">mode_edit</i></span>';

                        tags += '&nbsp;<span class="span-delete" value="' + v[key] + '"><i class="material-icons md-18">clear</i></span></span></div>';
                    });
                }
                else {
                    $.each(result.Data, function (k, v) {
                        if (imagen != "") {
                            if (v[validaImagen] != null && v[validaImagen] != "") {
                                imagenHTML = '&nbsp;<a class="tagList-imagen" onclick="utils.fnGetAPIFile(\'' + API + '\', \'' + imagenCtrl + '\',{' + imagen + ':' + v[imagen] + '});"><i class="material-icons md-18">photo</i></a>';
                            }
                            else {
                                imagenHTML = '&nbsp;';
                            }
                        }

                        tags += '<div class="' + colClasses + '"><span>' + v[value][lv2value] + imagenHTML;

                        if (editable)
                            tags += '&nbsp;<span class="span-edit" value="' + v[key][lv2key] + '"><i class="material-icons md-18">mode_edit</i></span>';

                        tags += '&nbsp;<span class="span-delete" value="' + v[key][lv2key] + '"><i class="material-icons md-18">clear</i></span></span></div>';
                    });
                }


                //Se cambiaron las asignaciones a Pure JS por problemas con el formwizard
                var oTagList = document.getElementById($TagList.attr('id'));
                oTagList.innerHTML = tags;


                //Eliminar
                var spanDelete = document.getElementById($TagList.attr('id')).querySelectorAll(".span-delete");

                for (var i = 0; i < spanDelete.length; i++) {
                    spanDelete[i].onclick = delFunc;
                }


                //Editar
                if (editable) {
                    var spanEdit = document.getElementById($TagList.attr('id')).querySelectorAll(".span-edit");

                    for (var i = 0; i < spanEdit.length; i++) {
                        spanEdit[i].onclick = editFunc;
                    }
                }


                //Si es consulta, no deja guardar nada
                if (typeof utils.fnGetURLParams().consulta != 'undefined') {
                    if (utils.fnGetURLParams().consulta) {
                        $(".span-edit").hide();
                        $(".span-delete").hide();
                    }
                }
            };
            utils.fnExecuteWithResult(e, oUrl, oData, oProcessMessage, success, true, API);

        }
        catch (e) {
            //utils.fnShowErrorMessage(e.message)
        }
    };
        

    /// -----------------------------------------------------------------------------
    /// Llenar un Div de Tags a partir de una lista proporcionada en un Array
    /// -----------------------------------------------------------------------------
    var llenaTagListArray = function ($TagList, arrayData, key, value, delFunc, lv2key, lv2value, cols, editable, editFunc) {
        try {
            if (typeof cols == 'undefined')
                cols = 3;

            if (typeof editable == 'undefined')
                editable = false;

            

            var colClasses = "";
            switch (cols) {
                case 1:
                    colClasses = "col-lg-12 col-md-12 col-sm-12 col-xs-12";
                    break;

                case 2:
                    colClasses = "col-lg-6 col-md-6 col-sm-12 col-xs-12";
                    break;
                default:
                    colClasses = "col-lg-3 col-md-4 col-sm-4 col-xs-6";
            }


                var tags = '';
                var imagenHTML = '';
                if (typeof lv2key == 'undefined') {
                    $.each(arrayData, function (k, v) {
                        tags += '<div class="' + colClasses + '"><span>' + v[value];

                        if (editable)
                            tags += '&nbsp;<span class="span-edit" value="' + v[key] + '"><i class="material-icons md-18">mode_edit</i></span>';

                        tags += '&nbsp;<span class="span-delete" value="' + v[key] + '"><i class="material-icons md-18">clear</i></span></span></div>';
                    });
                }
                else {
                    $.each(arrayData, function (k, v) {
                        tags += '<div class="' + colClasses + '"><span>' + v[value][lv2value];

                        if (editable)
                            tags += '&nbsp;<span class="span-edit" value="' + v[key][lv2key] + '"><i class="material-icons md-18">mode_edit</i></span>';

                        tags += '&nbsp;<span class="span-delete" value="' + v[key][lv2key] + '"><i class="material-icons md-18">clear</i></span></span></div>';
                    });
                }


                //Se cambiaron las asignaciones a Pure JS por problemas con el formwizard
                var oTagList = document.getElementById($TagList.attr('id'));
                oTagList.innerHTML = tags;


                //Eliminar
                var spanDelete = document.getElementById($TagList.attr('id')).querySelectorAll(".span-delete");

                for (var i = 0; i < spanDelete.length; i++) {
                    spanDelete[i].onclick = delFunc;
                }


                //Editar
                if (editable) {
                    var spanEdit = document.getElementById($TagList.attr('id')).querySelectorAll(".span-edit");

                    for (var i = 0; i < spanEdit.length; i++) {
                        spanEdit[i].onclick = editFunc;
                    }
                }


                //Si es consulta, no deja guardar nada
                if (typeof utils.fnGetURLParams().consulta != 'undefined') {
                    if (utils.fnGetURLParams().consulta) {
                        $(".span-edit").hide();
                        $(".span-delete").hide();
                    }
                }
        }
        catch (e) {
            //utils.fnShowErrorMessage(e.message)
        }
    };

    /// -----------------------------------------------------------------------------
    /// Actualiza el valor de un Select junto con el estilo (focused)
    /// -----------------------------------------------------------------------------
    var actualizaSelect = function (id, activo, valor, init, ifnull) {
        //console.log("id: " + id + " | val:" + valor);
        //console.log(init);

        if (typeof (id) == 'undefined' || id == null || id == "") {
            return;
        }

        var newVal = valor;

        if (typeof (valor) == 'undefined' || valor == null) {
            newVal = ifnull;
            activo = false;
        }

        if (typeof init == 'undefined') {
            init = false;
        }

        var _id = "#" + id.replace('#', '');

        //Asigna valor y refresca Select-Picker
        if (!init) {
            $(_id).val(newVal);
            $(_id).selectpicker('refresh');
        }
        else {
            //console.log("init select");
            //$(_id).on('focus', function () {
            //    $(_id).css('background-color', 'red');
            //    console.log("red");
            //});

            //$(_id).closest('.btn-group').on('focus', function () {
            //    $(_id).closest('.btn-group').css('background-color', 'green');
            //    console.log("green");
            //});
            
            //$(_id).closest('.form-line').on('focus', function () {
            //    $(_id).closest('.form-line').css('background-color', 'blue');
            //    console.log("blue");
            //});

            //$(_id).closest('.form-group').on('focus', function () {
            //    $(_id).closest('.form-group').css('background-color', 'yellow');
            //    console.log("yellow");
            //});
        }

        if (activo) {
            //Guarda el valor seleccionado
            $(_id).data("valor", newVal);
            
            //Quita el color de desactivado (opción default) de .select-placeholder
            $(_id).closest('.form-line').removeClass('select-placeholder');

            //Pone la línea azul
            $(_id).closest('.form-line').removeClass('disable-focused');
            $(_id).closest('.form-line').addClass('enable-focused');

            //Quita la etiqueta de error
            $(_id + '-error').css({ 'display': 'none' });
        }
        else {
            $(_id).data("valor", "");
            //Pone el color de desactivado (opción default) de .select-placeholder
            $(_id).closest('.form-line').addClass('select-placeholder');

            //Quita la línea azul
            $(_id).closest('.form-line').addClass('disable-focused');
            $(_id).closest('.form-line').removeClass('enable-focused');

            //Pone la etiqueta de error si esta existía
            $(_id + '-error').css({ 'display': 'block' });
        }

        //console.log("--------------------------------------------------------------");
    };

    /// -----------------------------------------------------------------------------
    /// Actualiza el valor de un input junto con el estilo (focused)
    /// -----------------------------------------------------------------------------
    var actualizaInput = function (id, valor, ifnull) {
        //console.log("id: " + id + " | val:" + valor);

        if (typeof (id) == 'undefined' || id == null || id == "") {
            return;
        }

        var newVal = valor;

        if (typeof (valor) == 'undefined' || valor == null) {
            newVal = ifnull;
        }

        var _id = "#" + id.replace('#', '');

        $(_id).closest('.form-line').addClass('focused');
        $(_id).val(newVal).trigger('input');
        //$(_id).focus();
        $(_id).blur();

        if (newVal == "") {
            $(_id).closest('.form-line').removeClass('focused');
        }

        //console.log("--------------------------------------------------------------");
    };

    /// -----------------------------------------------------------------------------
    /// Regresa la diferencia entre dos fechas en la unidad especificada
    /// -----------------------------------------------------------------------------
    var DateDiff = function (fechaIni, fechaFin, unidad) {
        return moment(fechaIni).diff(fechaFin, unidad);
    };

    /// -----------------------------------------------------------------------------
    /// Descarga un archivo a traves de una API y una ruta proporcionada
    /// -----------------------------------------------------------------------------
    var getAPIFile = function (API, Ctrl, params) {
        try {
            var path = sites[API] + Ctrl + '?';

            for (var attr in params) {
                path = path + attr + '=' + params[attr] + '&';
            }

            path = path.slice(0, -1);

            window.open(path, '_blank', '');
        }
        catch (e) {
            utils.fnShowErrorMessage(e.message)
        }
    };


    var createLink = function (sController, sParams, callBackFn) {
        ////debugger;
        if (typeof sParams !== 'undefined' && sParams !== null) {
            sParams = btoa(sParams);
            sParams += '?' + sParams
        }

        var href = webhost + sController + sParams;

        return href;
    };

    /// -----------------------------------------------------------------------------
    /// Arma un menu vertical (ul li) en base a un JSON
    /// -----------------------------------------------------------------------------
    function getMenuJson(idMenu, opciones) {
        var def = new $.Deferred();

        //try {
        //    idMenu = 'menuContainer';
        //    opciones = "";
            
        //    var token = localStorage.getItem(utils.fnGlobals("Token"));
        //    var strToken = utils.fnGetJWTPayload(token);
        //    var objToken = jQuery.parseJSON(strToken.data);

        //    var sRoles = '';
        //    for (var i = 0; i < objToken.Roles.filter(x => x.AplicacionId == utils.fnGlobals("AplicacionId")).length; i++) {
        //        sRoles += objToken.Roles.filter(x => x.AplicacionId == utils.fnGlobals("AplicacionId"))[i].NombreRol;
        //        if (i != objToken.Roles.filter(x => x.AplicacionId == utils.fnGlobals("AplicacionId")).length - 1) {
        //            sRoles += '|';
        //        }
        //    }

        //    var oUrl = 'Controles/GetMenu';
        //    var oData = {
        //        roles: sRoles,//obtener roles del objeto de seguridad
        //        tipo: 'PANTA',
        //        id_control_padre: 17
        //    };
        //    var oProcessMessage = 'Procesando información, espere por favor...';
        //    var success = function (result) {
        //        if (result.MessageType === 1) {
        //            utils.fnShowErrorMessage(result.ErrorMessage);
        //            return;
        //        }
        //        else {
        //            var str = '<li class="header">Men&uacute;</li>';

        //            //Guardando menu en LocalStorage
        //            utils.fnLocalData.set(utils.fnGlobals("Menu"), result.Data);

        //            str += getMenuJsonRec(result.Data);

        //            $('#' + idMenu).html(str);

        //            //Habilita la navegación del menú
        //            $.AdminBSB.leftSideBar.activate();
        //        }

        //        def.resolve(true);
        //    };
        //    utils.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success, true, "Originacion");
        //}
        //catch (e) {
        //    utils.fnShowErrorMessage(e.message);
        //    def.reject("Error");
        //}
        return def.promise();
    };

    /// -----------------------------------------------------------------------------
    /// Arma un menu vertical (ul li) en base a un JSON
    /// -----------------------------------------------------------------------------
    function setMenuJson(idMenu) {
        var def = new $.Deferred();

        idMenu = 'menuContainer';

        var str = '<li class="header">Men&uacute;</li>';

        //Obteniendo menu de LocalStorage
        var resultData = utils.fnLocalData.get(utils.fnGlobals("Menu"));

        str += getMenuJsonRec(resultData);

        $('#' + idMenu).html(str);
        
        def.resolve(true);

        return def.promise();
    };

    /// -----------------------------------------------------------------------------
    /// Arma un menu vertical (ul li) en base a un JSON Recursivamente
    /// -----------------------------------------------------------------------------
    var getMenuJsonRec = function (oMenu) {

        var str = "";
        try {
            $.each(oMenu, function (index, value) {
                if (value.submenu.length > 0) {
                    str += '<li><a href="javascript:void(0);" class="menu-toggle"><i class="material-icons">' + value.icon + '</i><span>' + value.text + '</span></a><ul class="ml-menu">';
                    str += getMenuJsonRec(value.submenu);
                    str += '</ul></li>';
                }
                else {
                    str += '<li><a href="#' + value.url + '" data-hash="' + value.url + '">' + value.text + '</a></li>';
                }

            });

            return str;
        }
        catch (e) {
            utils.fnShowErrorMessage(e.message);
        }
    };

    
    /// -----------------------------------------------------------------------------
    /// Limpia un form
    /// -----------------------------------------------------------------------------
    var limpiaForm = function (idForm) {

        var id = null;
        $("form#" + idForm + " input[type=text].form-control, form#" + idForm + " input[type=number].form-control, form#" + idForm + " input[type=date].form-control, form#" + idForm + " input[type=datetime].form-control, form#" + idForm + " input[type=datetime-local].form-control, form#" + idForm + " input[type=time].form-control, form#" + idForm + " input[type=password].form-control, form#" + idForm + " input[type=hidden], form#" + idForm + " textarea").each(function () {
            id = this.id;

            if (!$("#" + this.id).hasClass("no-limpiar")) {
                if (typeof id != 'undefined' && id != null && id != "") {
                    utils.fnActualizaInput(id, "");
                }

                id = null;
            }
        });


        $("form#" + idForm + " select.form-control").each(function () {
            id = this.id;

            if (!$("#" + this.id).hasClass("no-limpiar")) {
                if (typeof id != 'undefined' && id != null && id != "") {
                    utils.fnActualizaSelect(id, false, "");
                }

                id = null;
            }
        });


        $("form#" + idForm + " input[type=checkbox]").each(function () {
            id = this.id;

            if (!$("#" + this.id).hasClass("no-limpiar")) {
                if (typeof id != 'undefined' && id != null && id != "") {
                    if ($("#" + this.id).hasClass("default-checked")) {
                        $('#' + id).prop('checked', true);
                    }
                    else {
                        $('#' + id).prop('checked', false);
                    }
                }

                id = null;
            }
        });
    };


    /// -----------------------------------------------------------------------------
    /// Revisa si un Form es válido con jquery-validate
    /// -----------------------------------------------------------------------------
    var isValidForm = function ($frm) {
        //Validando
        $frm.validate({
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

        return $frm.valid();
    };


    /// -----------------------------------------------------------------------------
    /// Regresa un objeto con los parámetros de la URL
    /// -----------------------------------------------------------------------------
    var getURLParams = function (ruta) {
        var USP = new URLSearchParams(atob(window.location.search.replace('?', '')));

        var params = {};

        USP.forEach(function (val, idx, arr) {
            if (idx == "_previousFilters") {
                var USPf = new URLSearchParams(atob(val));

                var PF = {};
                USPf.forEach(function (valPF, idxPF, arrPF) {
                    PF[idxPF] = valPF;
                });

                params[idx] = PF;
            }

            else if (idx == "_setFilters") {
                var USPsf = new URLSearchParams(atob(val));

                var SF = {};
                USPsf.forEach(function (valSF, idxSF, arrSF) {
                    SF[idxSF] = valSF;
                });

                params[idx] = SF;
            }

            else {
                params[idx] = val;
            }
        });


        //Reasignando filtros
        if (params._setFilters != null && typeof params._setFilters != 'undefined' && Object.getOwnPropertyNames(params._setFilters).length > 0) {
            for (var key in params._setFilters) {
                if (params._setFilters.hasOwnProperty(key)) {
                    var $filtro = $("#" + key);

                    if ($filtro.prop('tagName') == "INPUT") {
                        utils.fnActualizaInput(key, params._setFilters[key], "");
                    }
                    else if ($filtro.prop('tagName') == "SELECT"){
                        utils.fnActualizaSelect(key, true, params._setFilters[key], false, "");
                    }
                }
            }
        }


        return params;
    };


    /// -----------------------------------------------------------------------------
    /// Regresa un objeto con los parámetros de la URL
    /// -----------------------------------------------------------------------------
    var getURLParamsSimple = function (ruta) {
        var USP = new URLSearchParams(window.location.search.replace('?', ''));

        var params = {};

        USP.forEach(function (val, idx, arr) {
            if (idx == "_previousFilters") {
                var USPf = new URLSearchParams(atob(val));

                var PF = {};
                USPf.forEach(function (valPF, idxPF, arrPF) {
                    PF[idxPF] = valPF;
                });

                params[idx] = PF;
            }

            else if (idx == "_setFilters") {
                var USPsf = new URLSearchParams(atob(val));

                var SF = {};
                USPsf.forEach(function (valSF, idxSF, arrSF) {
                    SF[idxSF] = valSF;
                });

                params[idx] = SF;
            }

            else {
                params[idx] = val;
            }
        });


        //Reasignando filtros
        if (params._setFilters != null && typeof params._setFilters != 'undefined' && Object.getOwnPropertyNames(params._setFilters).length > 0) {
            for (var key in params._setFilters) {
                if (params._setFilters.hasOwnProperty(key)) {
                    var $filtro = $("#" + key);

                    if ($filtro.prop('tagName') == "INPUT") {
                        utils.fnActualizaInput(key, params._setFilters[key], "");
                    }
                    else if ($filtro.prop('tagName') == "SELECT"){
                        utils.fnActualizaSelect(key, true, params._setFilters[key], false, "");
                    }
                }
            }
        }


        return params;
    };


    /// -----------------------------------------------------------------------------
    /// Regresa un string con formato de dinero
    /// -----------------------------------------------------------------------------
    var moneyFormat = function (num, ifnull) {
        if (typeof ifnull == 'undefined') {
            ifnull = null;
        }

        if (num != null) {
            return (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        }
        else {
            return ifnull;
        }
    };


    /// -----------------------------------------------------------------------------
    /// Regresa un string con formato de teléfono
    /// -----------------------------------------------------------------------------
    var phoneFormat = function (num, ifnull) {
        if (typeof ifnull == 'undefined') {
            ifnull = null;
        }

        if (num != null) {
            switch (num.length) {
                case 10:
                    return "(" + num.substr(0, 3) + ") " + num.substr(3, 1) + "-" + num.substr(4, 2) + "-" + num.substr(6, 2) + "-" + num.substr(8, 2);
                    break;
                case 7:
                    return num.substr(0, 1) + "-" + num.substr(1, 2) + "-" + num.substr(3, 2) + "-" + num.substr(5, 2);
                    break;
                default:
                    return num;
            }
        }
        else {
            return ifnull;
        }
    };


    /// -----------------------------------------------------------------------------
    /// Regresa un string con formato de teléfono
    /// -----------------------------------------------------------------------------
    var getNumbers = function (num) {
        if (num != null) {
            return num.replace(/[^0-9]/g, '');
        }
        else {
            return null;
        }
    };


    /// -----------------------------------------------------------------------------
    /// Regresa un objeto con los parámetros (separados por pipes) solicitados
    /// -----------------------------------------------------------------------------
    var getParams_Sist = function (params, id_unidadNegocio, API) {
        var deferred = new $.Deferred();

        try {
            var oUrl = "SistemaConfiguracion/GetMultiple";
            var oData = {
                id_unidad_negocio: id_unidadNegocio,
                ExtendedProperties: {
                    params: params
                }
            };
            var oProcessMessage = 'Obteniendo información...';
            var success = function (result) {
                if (result.MessageType == '1') {
                    utils.fnShowErrorMessage(result.ErrorMessage);
                    deferred.reject("Error");
                    return deferred.promise();
                }
                else {
                    var resParams = {};

                    $.each(result.Data, function (idx, obj) {
                        resParams[obj["clave"]] = obj["valor"];
                    });
                    
                    deferred.resolve(resParams);
                }
            };
            utils.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success, true, API);
        }
        catch (e) {
            utils.fnShowErrorMessage(e.message);
            deferred.reject("Error");
        }

        return deferred.promise();
    };

    /// -----------------------------------------------------------------------------
    /// Llena un Check List a partir de una lista proporcionada por una webAPI
    /// -----------------------------------------------------------------------------
    var llenaCheckList = function ($CheckList, dataUrl, postData, key, value, JWTAuth, API) {
        try {
            if (typeof JWTAuth == 'undefined')
                JWTAuth = true;

            if (typeof API == 'undefined')
                API = 'Security';


            var oUrl = dataUrl;
            var oData = postData;
            var oProcessMessage = 'Obteniendo información...';
            var success = function (result) {
                ////debugger;

                if (result.MessageType == '1') {
                    utils.fnShowErrorMessage(result.ErrorMessage);
                    return;
                }

                var list = '';
                $.each(result.Data, function (k, v) {
                    list += '<input type="checkbox" id="chk_' + v[key] + '" name="chk_' + v[key] + '" value="' + v[key] + '" /><label for="chk_' + v[key] + '">&nbsp;' + v[value] + '</label><br />';
                });

                //Se cambiaron las asignaciones a Pure JS por problemas con el formwizard
                var oCheckList = document.getElementById($CheckList.attr('id'));
                oCheckList.innerHTML = list;
            };
            utils.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success, true, API);
        }
        catch (e) {
            utils.fnShowErrorMessage(e.message)
        }
    };
    

    /// -----------------------------------------------------------------------------
    /// Llena un Check List a partir de un array de objetos
    /// -----------------------------------------------------------------------------
    var llenaCheckListArray = function ($CheckList, objList, key, value, changeFunction) {
        if (typeof changeFunction == 'undefined')
            changeFunction = null;

        var list = '';
        $.each(objList, function (k, v) {
            list += '<input type="checkbox" id="chk_' + v[key] + '" name="chk_' + v[key] + '" value="' + v[key] + '" ' + (changeFunction != null ? ('onchange="' + changeFunction + '"') : '') + '" /><label for="chk_' + v[key] + '">&nbsp;' + v[value] + '</label><br />';
        });

        //Se cambiaron las asignaciones a Pure JS por problemas con el formwizard
        var oCheckList = document.getElementById($CheckList.attr('id'));
        oCheckList.innerHTML = list;
    };


    /// -----------------------------------------------------------------------------
    /// Llena un Switch List a partir de un array de objetos
    /// -----------------------------------------------------------------------------
    var llenaSwitchListArray = function ($SwitchList, objList, key, value, changeFunction, cols, defaultChecked) {
        if (typeof changeFunction == 'undefined')
            changeFunction = null;

        if (typeof cols == 'undefined')
            cols = 3;
        
        if (typeof defaultChecked == 'undefined')
            defaultChecked = false;


        var colClasses = "";
        switch (cols) {
            case 1:
                colClasses = "col-lg-12 col-md-12 col-sm-12 col-xs-12";
                break;

            case 2:
                colClasses = "col-lg-6 col-md-6 col-sm-12 col-xs-12";
                break;
            
            case 3:
                colClasses = "col-lg-4 col-md-4 col-sm-12 col-xs-12";
                break;

            case 4:
                colClasses = "col-lg-3 col-md-3 col-sm-12 col-xs-12";
                break;

            default:
                colClasses = "col-lg-3 col-md-4 col-sm-4 col-xs-6";
        }


        var list = '';
        $.each(objList, function (k, v) {
            list += '<div class="' + colClasses + ' align-right">';
            list += '<div class="switch">';
            list += '<label>' + v[key] + '<input type="checkbox" id="chk' + v[key] + '" name="chk' + v[key] + '" tabindex="-1" ' + (defaultChecked ? ' class="default-checked"' : '') + ' ' + (v[value] ? ' checked' : '') + ' ' + (changeFunction != null ? (' onchange="' + changeFunction + '"') : '') + '><span class="lever"></span></label>';
            list += '</div>';
            list += '</div>';
        });

        //Se cambiaron las asignaciones a Pure JS por problemas con el formwizard
        var oSwitchList = document.getElementById($SwitchList.attr('id'));
        oSwitchList.innerHTML = list;
    };

    /// -----------------------------------------------------------------------------
    /// Inicializa una instancia de AgGrid
    /// -----------------------------------------------------------------------------
    var agGrid_Init = function (grdOptions, $table, colDefs, rows, topRows, bottomRows, groupColDef, filters) {
        var def = new $.Deferred();

        try {
            if (typeof rows == 'undefined')
                rows = [];

            if (typeof topRows == 'undefined')
                topRows = [];
            
            if (typeof bottomRows == 'undefined')
                bottomRows = [];
            
            if (typeof groupColDef == 'undefined')
                groupColDef = {};       
            
            if (typeof filters == 'undefined')
                filters = true;

            grdOptions = {
                animateRows: true,
                columnDefs: colDefs,
                autoGroupColumnDef: groupColDef,
                rowData: rows,
                groupHideOpenParents: true,
                pinnedTopRowData: topRows,
                pinnedBottomRowData: bottomRows,
                enableColResize: true,
                enableSorting: true,
                enableFilter: filters,
                floatingFilter: filters,
                cacheQuickFilter: filters,
                rowSelection: 'multiple',//rowSelection: "single", 
                enableStatusBar: true,
                enableRangeSelection: true,
                groupSelectsChildren: false, //groupSelectsChildren: true,
                headerHeight: 35,
                groupHeaderHeight: 35,
                floatingFiltersHeight: 35,
                pivotHeaderHeight: 35,
                pivotGroupHeaderHeight: 35,
                rowHeight: 30,
                localeText: {
                    // for filter panel
                    page: 'Página',
                    more: 'Más',
                    to: 'Para',
                    of: 'De',
                    next: 'Siguiente',
                    last: 'Último',
                    first: 'Primero',
                    previous: 'Anterior',
                    loadingOoo: 'Cargando...',
                    loading: 'Cargando',
                    // for set filter
                    selectAll: 'Seleccionar Todo',
                    searchOoo: 'Buscar...',
                    blanks: 'Vacío',
                    // for number filter and text filter
                    filterOoo: 'Filtrar...',
                    applyFilter: 'Aplicar Filtro...',
                    // for number filter
                    equals: 'Igual a',
                    notEqual: 'Diferente de',
                    lessThan: 'Menor que',
                    lessThanOrEqual: 'Menor Igual que',
                    greaterThan: 'Mayor que',
                    greaterThanOrEqual: 'Mayor Igual que',
                    // for text filter
                    contains: 'Contiene',
                    notContains: 'No Contiene',
                    notEquals: 'Diferente de',
                    startsWith: 'Inicia con',
                    endsWith: 'Termina con',
                    // the header of the default group column
                    group: 'Grupo',
                    // tool panel
                    columns: 'Columnas',
                    rowGroupColumns: 'Columnas Pivot',
                    rowGroupColumnsEmptyMessage: 'Arrastre columnas para agrupar',
                    valueColumns: 'Columnas Valor',
                    pivotMode: 'Modo Pivot',
                    groups: 'Grupos',
                    values: 'Valores',
                    pivots: 'Pivots',
                    valueColumnsEmptyMessage: 'Arrastre columnas para agregar',
                    pivotColumnsEmptyMessage: 'Arrastre aquí para usar como Pivot',
                    // other
                    noRowsToShow: 'No hay renglones para mostrar',
                    // enterprise menu
                    pinColumn: 'Inmovilizar columna',
                    valueAggregation: 'Agregación de valores',
                    autosizeThiscolumn: 'Autoajustar',
                    autosizeAllColumns: 'Autoajustar todas',
                    groupBy: 'Agrupar por',
                    ungroupBy: 'Desagrupar por',
                    resetColumns: 'Reestablecer columnas',
                    expandAll: 'Abrir todo',
                    collapseAll: 'Cerrar todo',
                    toolPanel: 'Panel de herramientas',
                    export: 'Exportar',
                    excelExport: 'Exportar a Excel',
                    csvExport: 'Exportar a CSV',
                    // enterprise menu pinning
                    pinLeft: 'Inmovilizar <<',
                    pinRight: 'Inmovilizar >>',
                    noPin: 'Movilizar <>',
                    // enterprise menu aggregation and status panel
                    sum: 'Sum',
                    min: 'Min',
                    max: 'Max',
                    none: 'Ninguno',
                    count: 'Cont',
                    average: 'Prom',
                    // standard menu
                    copy: 'Copiar',
                    copyWithHeaders: 'Copiar con encabezados',
                    ctrlC: 'Ctrl + C',
                    paste: 'Pegar',
                    ctrlV: 'Ctrl + V'
                },
                excelStyles: [
                    {
                        id: "header",
                        interior: {
                            color: '#b0c4de',
                            pattern: 'Solid'
                        },
                        font: {
                            bold: true,
                            color: '#000000',
                            fontName: 'Arial',
                            size: 9
                        }
                    },
                    {
                        id: "ExcelDate",
                        dataType: "dateTime",
                        numberFormat: { format: "dd/mm/yyyy;;;" }
                    },
                    {
                        id: "ExcelDateTime",
                        dataType: "dateTime",
                        numberFormat: { format: "dd/mm/yyyy hh:mm:ss;;;" }
                    },
                    {
                        id: "ExcelDecimal",
                        dataType: "number",
                        numberFormat: { format: "#,##0.00" }
                    },
                    {
                        id: "ExcelString",
                        dataType: "string"
                    }
                ],

                onGridReady: function (event) {
                    grdOptions.api.refreshCells();
                },

                onViewportChanged: function () {
                    //Inicilizando Tooltips del grid
                    $('[data-toggle="tooltip"]').tooltip({
                        container: 'body'
                    });
                },

                onGridSizeChanged: function () {
                    //Ajustando Columnas
                    setTimeout(function () {
                        agGrid_sizeColsToFit(grdOptions);

                        setTimeout(function () {
                            agGrid_autoSizeCols(grdOptions);
                        }, 50);
                    }, 50);
                }
            };

            // create the grid passing in the div to use together with the columns & data we want to use
            new agGrid.Grid($table, grdOptions);


            //Ajustando columnas
            grdOptions.firstDataRendered = function (event) {
                //Ajustando Columnas
                setTimeout(function () {
                    agGrid_sizeColsToFit(grdOptions);

                    setTimeout(function () {
                        agGrid_autoSizeCols(grdOptions);
                    }, 50);
                }, 50);
            };


            def.resolve(grdOptions);
        }
        catch (e) {
            utils.fnShowErrorMessage(e.message);
            def.reject("Error");
        }

        return def.promise();
    };

    /// ------------------------------------------------------------------------------------
    /// Inicializa y carga datos desde una WebAPI en una instancia de AgGrid en una línea
    /// ------------------------------------------------------------------------------------
    var agGrid_InitLite = function (grdOptions, $table, colDefs, rows, topRows, bottomRows, groupColDef, dataUrl, postData, JWTAuth, API, filters) {
        var def = new $.Deferred();

        try {
            agGrid_Init(grdOptions, $table, colDefs, rows, topRows, bottomRows, groupColDef, filters)
                .done(function (res) {
                    $.each(res, function (k, v) {
                        grdOptions[k] = v;
                    });
                })
                .then(function () {
                    if (typeof dataUrl != "undefined") {
                        //Alimentando agGrid
                        agGrid_LlenarGrid(grdOptions, dataUrl, postData, JWTAuth, API)
                            .done(function (res2) {
                                $.each(res2, function (k, v) {
                                    grdOptions[k] = v;
                                });

                                //Resolve
                                def.resolve(grdOptions);
                            });
                    }
                    else {
                        def.resolve(grdOptions);
                    }
                });
        }
        catch (e) {
            console.log(e);
            utils.fnShowErrorMessage(e.message);
            def.reject("Error");
        }

        return def.promise();
    };

    /// -----------------------------------------------------------------------------
    /// Carga los renglones de una instnacia de AgGrid
    /// -----------------------------------------------------------------------------
    function agGrid_SetRows(grdOptions, rows) {
        grdOptions.firstDataRendered = function (event) {
            grdOptions.sizeColumnsToFit();
            agGrid_autoSizeCols(grdOptions);
        };


        grdOptions.api.setRowData(rows);

        agGrid_autoSizeCols(grdOptions);


        return grdOptions;
    }

    /// -----------------------------------------------------------------------------
    /// Carga los renglones de una instnacia de AgGrid desde una WebAPI
    /// -----------------------------------------------------------------------------
    function agGrid_SetRowsAPI(grdOptions, dataUrl, postData, JWTAuth, API) {
        var def = new $.Deferred();

        try {
            if (typeof JWTAuth == 'undefined')
                JWTAuth = true;

            if (typeof API == 'undefined')
                API = 'Security';


            var oUrl = dataUrl;
            var oData = postData;
            var oProcessMessage = 'Obteniendo información...';
            var success = function (result) {
                ////debugger;

                if (result.MessageType == '1') {
                    def.reject("Error");
                    utils.fnShowErrorMessage(result.ErrorMessage);
                }
                else {
                    //En caso de éxito
                    console.log(result.Data);

                    //grdOptions.firstDataRendered = function (event) {
                    //    grdOptions.sizeColumnsToFit();
                    //    agGrid_autoSizeCols(grdOptions);
                    //};

                    grdOptions.api.setRowData(result.Data);

                    //agGrid_autoSizeCols(grdOptions);

                    def.resolve(grdOptions);
                }
            };
            utils.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success, true, API);
        }
        catch (e) {
            def.reject("Error");
            utils.fnShowErrorMessage(e.message);
        }

        return def.promise();
    }

    /// -----------------------------------------------------------------------------
    /// Carga los renglones de una instnacia de AgGrid desde una WebAPI
    /// -----------------------------------------------------------------------------
    function agGrid_LlenarGrid(grdOptions, dataUrl, postData, JWTAuth, API) {
        var def = new $.Deferred();

        try {
            agGrid_SetRowsAPI(grdOptions, dataUrl, postData, JWTAuth, API)
                .done(function (res) {
                    $.each(res, function (k, v) {
                        grdOptions[k] = v;
                    });
                })
                .done(function () {
                    //Inicilizando Tooltips del grid
                    tooltips_Init();

                    def.resolve(grdOptions);
                });
        }
        catch (e) {
            def.reject("Error");
            utils.fnShowErrorMessage(e.message);
        }

        return def.promise();
    }

    /// -----------------------------------------------------------------------------
    /// Reajusta el tamaño de las columnas con base a los datos
    /// -----------------------------------------------------------------------------
    function agGrid_autoSizeCols(grdOptions) {
        var allColumnIds = [];

        grdOptions.columnApi.getAllColumns().forEach(function (column) {
            allColumnIds.push(column.colId);
        });

        grdOptions.columnApi.autoSizeColumns(allColumnIds);
    }

    /// -----------------------------------------------------------------------------
    /// Reajusta el tamaño de las columnas para que quepan en la pantalla
    /// -----------------------------------------------------------------------------
    function agGrid_sizeColsToFit(grdOptions) {
        grdOptions.api.sizeColumnsToFit();
    }

    /// -----------------------------------------------------------------------------
    /// getQuickFilterText Fechas
    /// -----------------------------------------------------------------------------
    function agGrid_getQuickFilterText_dateToString(params) {
        return params.value != null ? moment(params.value).format('DD/MM/YYYY') : "";
    }

    /// -----------------------------------------------------------------------------
    /// filterValueGetter Fechas
    /// -----------------------------------------------------------------------------
    function agGrid_filterValueGetter_dateToString(params) {
        return params.data[params.colDef.field] != null ? moment(params.data[params.colDef.field]).format('DD/MM/YYYY') : "";
    }

    /// -----------------------------------------------------------------------------
    /// valueFormatter Fechas
    /// -----------------------------------------------------------------------------
    function agGrid_valueFormatter_dateToString(params) {
        return params.value != null ? moment(params.value).format('DD/MM/YYYY') : "";
    }

    /// -----------------------------------------------------------------------------
    /// getQuickFilterText Hora
    /// -----------------------------------------------------------------------------
    function agGrid_getQuickFilterText_dateToTimeString(params) {
        return params.value != null ? moment(params.value).format('hh:mm A') : "";
    }

    /// -----------------------------------------------------------------------------
    /// filterValueGetter Hora
    /// -----------------------------------------------------------------------------
    function agGrid_filterValueGetter_dateToTimeString(params) {
        return params.data[params.colDef.field] != null ? moment(params.data[params.colDef.field]).format('hh:mm A') : "";
    }

    /// -----------------------------------------------------------------------------
    /// valueFormatter Hora
    /// -----------------------------------------------------------------------------
    function agGrid_valueFormatter_dateToTimeString(params) {
        return params.value != null ? moment(params.value).format('hh:mm A') : "";
    }

    /// -----------------------------------------------------------------------------
    /// getQuickFilterText Porcentaje
    /// -----------------------------------------------------------------------------
    function agGrid_getQuickFilterText_decimalToPercentage(params) {
        return params.value != null ? ((params.value * 100).toFixed(2) + "%") : "";
    }

    /// -----------------------------------------------------------------------------
    /// filterValueGetter Porcentaje
    /// -----------------------------------------------------------------------------
    function agGrid_filterValueGetter_decimalToPercentage(params) {
        return params.data[params.colDef.field] != null ? ((params.data[params.colDef.field] * 100).toFixed(2) + "%") : "";
    }

    /// -----------------------------------------------------------------------------
    /// valueFormatter Porcentaje
    /// -----------------------------------------------------------------------------
    function agGrid_valueFormatter_decimalToPercentage(params) {
        return params.value != null ? ((params.value * 100).toFixed(2) + "%") : "";
    }

    /// -----------------------------------------------------------------------------
    /// getQuickFilterText Fecha Hora
    /// -----------------------------------------------------------------------------
    function agGrid_getQuickFilterText_dateToDateTimeString(params) {
        return params.value != null ? moment(params.value).format('DD/MM/YYYY hh:mm A') : "";
    }

    /// -----------------------------------------------------------------------------
    /// filterValueGetter Fecha Hora
    /// -----------------------------------------------------------------------------
    function agGrid_filterValueGetter_dateToDateTimeString(params) {
        return params.data[params.colDef.field] != null ? moment(params.data[params.colDef.field]).format('DD/MM/YYYY hh:mm A') : "";
    }

    /// -----------------------------------------------------------------------------
    /// valueFormatter Fecha Hora
    /// -----------------------------------------------------------------------------
    function agGrid_valueFormatter_dateToDateTimeString(params) {
        return params.value != null ? moment(params.value).format('DD/MM/YYYY hh:mm A') : "";
    }
    
    /// -----------------------------------------------------------------------------
    /// cellRender Fecha Hora
    /// -----------------------------------------------------------------------------
    function agGrid_cellRender_dateToDateTimeString(params) {
        var content = null;
        var renderData = null;

        if (typeof params.data == 'undefined') {
            renderData = params.node.allLeafChildren[0].data;

            return renderData[params.colDef.field] != null ? moment(renderData[params.colDef.field]).format('DD/MM/YYYY hh:mm A') : "";
        }
        else {
            return params.value != null ? moment(params.value).format('DD/MM/YYYY hh:mm A') : "";
        }
    }

    /// -----------------------------------------------------------------------------
    /// valueFormatter Money
    /// -----------------------------------------------------------------------------
    function agGrid_valueFormatter_Money(params) {
        return utils.fnMoneyFormat(params.value);
    }

    /// -----------------------------------------------------------------------------
    /// cellRender Grouped Row
    /// -----------------------------------------------------------------------------
    function agGrid_cellRender_GroupedRows(params) {
        var renderData = null;

        if (typeof params.data == 'undefined') {
            renderData = params.node.allLeafChildren[0].data;

            return renderData[params.colDef.field];
        }
        else {
            return params.value;
        }
    }

    
    /// -----------------------------------------------------------------------------
    /// cellRender Grouped Row Grupo
    /// -----------------------------------------------------------------------------
    function agGrid_cellRender_GroupedRows_Grupo(params) {
        var renderData = null;

        if (typeof params.data == 'undefined') {
            if (params.node.allLeafChildren.filter(x => x.data.id_cliente == 0)[0] != null) {
                renderData = params.node.allLeafChildren.filter(x => x.data.id_cliente == 0)[0].data;

                return renderData[params.colDef.field];
            }
            else {
                return null;
            }

        }
        else {
            return params.value;
        }
    }
    

    /// -----------------------------------------------------------------------------
    /// Col Builder
    /// -----------------------------------------------------------------------------
    function agGrid_ColumnBuilder(params) {

        if (typeof params.type         == 'undefined') { params.type         = "text"; }
        if (typeof params.header       == 'undefined') { params.header       = "";     }
        if (typeof params.field        == 'undefined') { params.field        = "";     }
        if (typeof params.sort         == 'undefined') { params.sort         = null;   }
        if (typeof params.pinned       == 'undefined') { params.pinned       = null;   }
        if (typeof params.cellRenderer == 'undefined') { params.cellRenderer = null;   }
        if (typeof params.valueGetter  == 'undefined') { params.valueGetter  = null;   }
        if (typeof params.menuTabs     == 'undefined') { params.menuTabs     = null;   }
        if (typeof params.noFilter     == 'undefined') { params.noFilter     = null;   }
        if (typeof params.hide         == 'undefined') { params.hide         = null;   }
        if (typeof params.headerClass  == 'undefined') { params.headerClass  = null;   }
        if (typeof params.cellClass    == 'undefined') { params.cellClass    = null;   }
        if (typeof params.rowGroup     == 'undefined') { params.rowGroup     = null;   }
        if (typeof params.width        == 'undefined') { params.width        = null;   }
        if (typeof params.minWidth     == 'undefined') { params.minWidth     = null;   }
        if (typeof params.maxWidth     == 'undefined') { params.maxWidth     = null;   }
        if (typeof params.colId        == 'undefined') { params.colId        = null;   }



        var col = {
            headerName: params.header,
            field: params.field,
            enableRowGroup: true,
            enablePivot: true,
            enableValue: true,
            filter: 'agTextColumnFilter'
        }

        switch (params.type) {
            case "money":
                col.valueFormatter = agGrid_valueFormatter_Money;
                col.cellClass = "ExcelDecimal";
                col.type = "numericColumn";
                col.filter = "agTextColumnFilter";
                break;
            case "date":
                col.valueFormatter = agGrid_valueFormatter_dateToString;
                col.getQuickFilterText = agGrid_getQuickFilterText_dateToString;
                col.filterValueGetter = agGrid_filterValueGetter_dateToString;
                col.cellClass = "ExcelDate";
                break;
            case "time":
                col.valueFormatter = agGrid_valueFormatter_dateToTimeString;
                col.getQuickFilterText = agGrid_getQuickFilterText_dateToTimeString;
                col.filterValueGetter = agGrid_filterValueGetter_dateToTimeString;
                col.cellClass = "ExcelDate";
                break;
            case "datetime":
                col.valueFormatter = agGrid_valueFormatter_dateToDateTimeString;
                col.getQuickFilterText = agGrid_getQuickFilterText_dateToDateTimeString;
                col.filterValueGetter = agGrid_filterValueGetter_dateToDateTimeString;

                if (params.valueGetter == null && params.cellRenderer == null) { col.cellRenderer = agGrid_cellRender_dateToDateTimeString; }
                col.cellClass = "ExcelDate";
                break;
            case "number":
                col.type = "numericColumn";
                col.filter = "agTextColumnFilter";
                break;
            case "percentage":
                col.valueFormatter = agGrid_valueFormatter_decimalToPercentage;
                col.getQuickFilterText = agGrid_getQuickFilterText_decimalToPercentage;
                col.filterValueGetter = agGrid_filterValueGetter_decimalToPercentage;
                break;
            default:
                break;
        }


        if(params.field         != null){ col.field        = params.field;        }
        if(params.sort          != null){ col.sort         = params.sort;         }
        if(params.pinned        != null){ col.pinned       = params.pinned;       }
        if(params.cellRenderer  != null){ col.cellRenderer = params.cellRenderer; }
        if(params.valueGetter   != null){ col.valueGetter  = params.valueGetter;  }
        if(params.menuTabs      != null){ col.menuTabs     = params.menuTabs;     }            
        if(params.hide          != null){ col.hide         = params.hide;         }            
        if(params.headerClass   != null){ col.headerClass  = params.headerClass;  }    
        if(params.cellClass     != null){ col.cellClass    = params.cellClass;    }
        if(params.rowGroup      != null){ col.rowGroup     = params.rowGroup;     }
        if(params.width         != null){ col.width        = params.width;        }
        if(params.minWidth      != null){ col.minWidth     = params.minWidth;     }
        if(params.maxWidth      != null){ col.maxWidth     = params.maxWidth;     }
        if(params.colId         != null){ col.colId        = params.colId;        }


        if (params.noFilter != null) {
            col.enableRowGroup = false;
            col.enablePivot = false;
            col.enableValue = false;
            col.suppressToolPanel = true;
            col.suppressFilter = true;
            col.getQuickFilterText = function (params) { return ""; };
        }


        return col;
    }



    /// -----------------------------------------------------------------------------
    /// Col Builder Array
    /// -----------------------------------------------------------------------------
    function agGrid_ColumnBuilderArray(cols) {
        var agCols = [];
        $.each(cols, function (k,v) {
            agCols.push(utils.fnAgGrid_ColumnBuilder(v));
        });

        return agCols;
    }



    /// -----------------------------------------------------------------------------
    /// Redirect
    /// -----------------------------------------------------------------------------
    function redirect(route, params, returnTo) {
        //Detiene todos los request actuales
        window.stop();


        if (typeof (params) == 'undefined' || params == null) {
            params = {};
        }

        if (typeof (returnTo) == 'undefined' || returnTo == null) {
            returnTo = null;
        }
        

        var filtrosRegresar = {};

        //Guardando filtros input
        $.each($("input.filtros-regresar"), function (k, v) {
            var $v = $("#" + v.id);

            if ($v.val() != null && $v.val() != "") {
                filtrosRegresar[$v.attr('id')] = $v.val();
            }
        });

        //Guardando filtros select
        $.each($("select.filtros-regresar"), function (k, v) {
            var $v = $("#" + v.id);

            if ($v.val() != null && $v.val() != "") {
                filtrosRegresar[$v.attr('id')] = $v.val();
            }
        });


        //Atributos para boton regresar
        if (returnTo != null) {
            params._previousPage = returnTo._previousPage;
            params._previousFilters = btoa($.param(returnTo._previousFilters));
        }
        else {
            params._previousPage = window.location.href;
            params._previousFilters = btoa($.param(filtrosRegresar));
        }


        //Ocultando parámetros
        var newParams = "?" + btoa($.param(params));


        //Redireccionando
        window.location.replace(webhost + route + newParams);
    }


    /// -----------------------------------------------------------------------------
    /// Redirect New Tab
    /// -----------------------------------------------------------------------------
    function openWindow(route, params) {
        if (typeof (params) != 'undefined' && params != null) {
            params = "?" + btoa($.param(params));
        }
        else {
            params = "";
        }

        window.open(webhost + route + params);
    }


    /// -----------------------------------------------------------------------------
    /// Regresar
    /// -----------------------------------------------------------------------------
    function regresar() {
        //Parámetros actuales
        var params = getURLParams();
        

        //Obteniendo parámetros para añadir setFilter
        var route = "";
        var prevParams = {};
        if (params != null && typeof params != 'undefined' && params._previousPage != null && typeof params._previousPage != 'undefined') {
            if (params._previousPage.contains('?')) {
                route = params._previousPage.split('?')[0];

                var USP = new URLSearchParams(atob(params._previousPage.split('?')[1]));

                USP.forEach(function (val, idx, arr) {
                    if (!idx.contains("_previousFilters") && !idx.contains("_setFilters")) {
                        prevParams[idx] = val;
                    }
                });
            }
            else {
                route = params._previousPage;
            }

        }
        else {
            window.history.back();
            return;
        }


        //Asignando filtros de la pantalla anterior
        prevParams._setFilters = btoa($.param((params._previousFilters != null && typeof params._previousFilters != 'undefined') ? params._previousFilters : {}));


        //Ocultando parámetros
        var newParams = "?" + btoa($.param(prevParams));
        

        //Redireccionando
        window.location.replace(route + newParams);
    }


    ///// -----------------------------------------------------------------------------
    ///// Check For Error
    ///// -----------------------------------------------------------------------------
    //function checkForError(result) {
    //    if (result.MessageType == 1) {
    //        utils.fnShowErrorMessage(result.ErrorMessage);
    //        return;
    //    }
    //    if (result.MessageType == 2) {
    //        utils.fnShowWarningMessage(result.ErrorMessage);
    //        return;
    //    }
    //}


    /// -----------------------------------------------------------------------------
    /// Valid Result
    /// -----------------------------------------------------------------------------
    function validResult(result) {
        if (result.MessageType == 1) {
            utils.fnShowErrorMessage(result.ErrorMessage);
            return false;
        }

        if (result.MessageType == 2) {
            utils.fnShowWarningMessage(result.ErrorMessage);
            return false;
        }

        if (result.Data == null) {
            return false;
        }

        return true;
    }


    /// -----------------------------------------------------------------------------
    /// Masked-Input Init
    /// -----------------------------------------------------------------------------
    function maskedInput_Init(parent) {

        if (typeof parent == 'undefined') {
            parent = "";
        }
        else {
            parent = "#" + parent + " ";
        }

        // Masked Input Global
        var $MaskedInput = $(parent + '.masked-input');


        //Celular
        $MaskedInput.find('.masked-celular').inputmask('(999) 9-99-99-99', { jitMasking: true, placeholder: '(___) _-__-__-__' });
        //Money
        $MaskedInput.find('.masked-money').inputmask('currency', { jitMasking: true });
        //Email
        $MaskedInput.find('.masked-email').inputmask({ alias: "email" });
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
    }



    /// -----------------------------------------------------------------------------
    /// Selects Init
    /// -----------------------------------------------------------------------------
    function selects_Init(parent) {

        if (typeof parent == 'undefined') {
            parent = "";
        }
        else {
            parent = "#" + parent + " ";
        }

        //Inicializando selects
        $(parent + 'select.form-control').each(function () {
            utils.fnActualizaSelect(this.id, false, "", true);

            $(this).on('change', function () {
                utils.fnActualizaSelect(this.id, true, this.value);
            });
        });
    }


    /// -----------------------------------------------------------------------------
    /// Tooltips Init
    /// -----------------------------------------------------------------------------
    function tooltips_Init(parent) {

        if (typeof parent == 'undefined') {
            parent = "";
        }
        else {
            parent = "#" + parent + " ";
        }

        //Inicilizando Tooltips
        $(parent + '[data-toggle="tooltip"]').tooltip({
            container: 'body',
            html: true
        });
    }


    /// -----------------------------------------------------------------------------
    /// Textareas Init
    /// -----------------------------------------------------------------------------
    function textareas_Init(parent) {

        if (typeof parent == 'undefined') {
            parent = "";
        }
        else {
            parent = "#" + parent + " ";
        }

        //Inicilizando Tooltips
        $(parent + '.form-control.no-resize.auto-growth').each(function () {
            autosize($(this));
        });
    }


    /// -----------------------------------------------------------------------------
    /// Page Init
    /// -----------------------------------------------------------------------------
    function page_Init(parent, params, $objects) {

        //Inicializando selects
        selects_Init(parent);

        //Inicilizando Tooltips
        tooltips_Init(parent);

        //Masked Input Global
        maskedInput_Init(parent);

        //Textareas Init 
        textareas_Init(parent);

        //Parámetros
        if (typeof params != "undefined") {
            paramsAux = getURLParams();
            $.each(paramsAux, function (k,v) {
                params[k] = v;
            });
        }

        //Objetos
        if (typeof $objects != "undefined") {
            $objectsAux = getAllElements(parent);
            $.each($objectsAux, function (k, v) {
                $objects[k] = v;
            });
        }
    }


    /// -----------------------------------------------------------------------------
    /// Object Array Sort
    /// -----------------------------------------------------------------------------
    function objectArraySort(sort, array, key, date) {
        if (typeof date == 'undefined') {
            date = false;
        }

        if (date) {
            switch (sort) {
                case "desc":
                    return array.sort(function (a, b) {
                        var x = moment(a[key]); var y = moment(b[key]);
                        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                    });
                case "asc":
                    return array.sort(function (a, b) {
                        var x = moment(a[key]); var y = moment(b[key]);
                        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                    });
                default:
            }
        }
        else {
            switch (sort) {
                case "desc":
                    return array.sort(function (a, b) {
                        var x = a[key]; var y = b[key];
                        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                    });
                case "asc":
                    return array.sort(function (a, b) {
                        var x = a[key]; var y = b[key];
                        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                    });
                default:
            }
        }
    }


    /// -----------------------------------------------------------------------------
    /// Get API Data
    /// -----------------------------------------------------------------------------
    function getAPIData(url, postData, API, successFunction, JWTAuth) {
        if (typeof JWTAuth == 'undefined') {
            JWTAuth = true;
        }

        try {
            utils.fnExecuteWithResult(null, url, postData, 'Procesando...', successFunction, JWTAuth, API);
        }
        catch (e) {
            utils.fnShowErrorMessage(e.message);
        }
    }


    /// -----------------------------------------------------------------------------
    /// setWorkList
    /// -----------------------------------------------------------------------------
    function setWorkList(grdOptions, properties, sotrageName) {
        try {
            //Quitando workList en caso de que la haya
            localStorage.removeItem(sotrageName);

            var wl = [];
            var rowData;
            var N = 0;
            grdOptions.api.forEachNodeAfterFilterAndSort(function (node, idx) {
                rowData = {};

                //Para tomar como si el grupo estuviera cerrado (el primer hijo)
                if (node.group == false && node.firstChild == true) {
                    for (var key in node.data) {
                        if (node.data.hasOwnProperty(key)) {
                            if (properties.includes(key)) {
                                rowData[key] = node.data[key];
                            }
                        }
                    }

                    rowData["_rowIndex"] = N;

                    wl.push(rowData);
                    N++;
                }
            });

            utils.fnLocalData.set(sotrageName, wl);
        }
        catch (e) {
            utils.fnShowErrorMessage(e.message);
        }
    }



    /// -----------------------------------------------------------------------------
    /// getAllElements
    /// -----------------------------------------------------------------------------
    function getAllElements(parent) {
        if (typeof parent == 'undefined') {
            parent = "bodyContainer";
        }


        var oElements = {};
        console.log("-- Elements");
        console.log("-------------------------------------");
        $("#" + parent + " input, #" + parent + " select, #" + parent + " textarea, #" + parent + " form, #" + parent + " a.btn, #" + parent + " label, #" + parent + " h1, #" + parent + " h2, #" + parent + " h3, #" + parent + " h4, #" + parent + " h5, #" + parent + " h6, #" + parent + " div, #" + parent + " span, #" + parent + " ul, #" + parent + " li").each(function (index) {

            var $el = $(this);
            if ($el.attr("id") != null && $el.attr("id") != "" && typeof($el.attr("id")) != "undefined") {
                var $ext = $.extend($el, {
                    set: function (val) {
                        var $element = this;

                        switch ($element.prop("tagName").toLowerCase()) {
                            case "input": case "textarea":
                                if ($element.attr("type").toLowerCase() == "checkbox") {
                                    $element.prop("checked", val);
                                }
                                else {
                                    utils.fnActualizaInput($element.attr('id'), val, "");
                                }
                                break;

                            case "select":
                                utils.fnActualizaSelect($element.attr('id'), true, val, false, "");
                                break;

                            case "label": case "h1": case "h2": case "h3": case "h4": case "h5": case "h6": case "div": case "span": case "ul":
                                $element.html(val);
                                break;

                            default:
                                utils.fnActualizaInput($element.attr('id'), val, "");
                                break;
                        }
                    },

                    get: function () {
                        var $element = this;

                        switch ($element.prop("tagName").toLowerCase()) {
                            case "input":
                                if ($element.attr("type").toLowerCase() == "checkbox") {
                                    return $element.prop("checked");
                                }
                                else {
                                    return $element.val();
                                }
                                break;

                            case "label": case "h1": case "h2": case "h3": case "h4": case "h5": case "h6": case "div": case "span": case "ul":
                                return $element.html();
                                break;

                            default:
                                return $element.val();
                                break;
                        }
                    },

                    getDate: function () {
                        var $element = this;

                        return moment($element.val());
                    },

                    getDateDB: function () {
                        var $element = this;

                        return moment($element.val()).format("YYYY-MM-DD");
                    },

                    getNumbers: function () {
                        var $element = this;

                        if ($element.val() != "" && $element.val() != null) {
                            return $element.val().replace(/[^0-9]/g, '');
                        }
                        else {
                            return null;
                        }
                    },

                    getDecimal: function () {
                        var $element = this;

                        if ($element.val() != "" && $element.val() != null) {
                            return parseFloat($element.val().replace(/[^0-9.]/g, ''));
                        }
                        else {
                            return 0;
                        }
                    },

                    getMoney: function () {
                        var $element = this;

                        if ($element.val() != "" && $element.val() != null) {
                            return utils.fnMoneyFormat(parseFloat($element.val().replace(/[^0-9.]/g, '')));
                        }
                        else {
                            return utils.fnMoneyFormat(0);
                        }
                    },

                    log: function () {
                        var $element = this;

                        console.log($element.val());
                    },

                    getId: function () {
                        var $element = this;

                        return $element.attr("id");
                    }
                });

                oElements[$el.attr("id")] = $ext;
                console.log("$o." + $el.attr("id"));
            }
        });


        console.log("-------------------------------------");

        return oElements;
    }



    /// -----------------------------------------------------------------------------
    /// DropoZone Init
    /// -----------------------------------------------------------------------------
    function Dropzone_Init(id, acceptedFiles, maxFiles, maxFilesize, url, dataUrl, API, JWT, data, fnSuccess) {
        Dropzone.options[id] = {
            acceptedFiles: acceptedFiles,
            maxFiles: maxFiles,
            maxFilesize: maxFilesize,
            url: typeof url != "undefined" ? url : (utils.fnSiteUrl(API) + dataUrl),
            headers: typeof JWT == "undefined" ? {} : {
                "Authorization": "Bearer " + utils.fnLocalData.get(utils.fnGlobals("Token"))
            },
            sending: function (file, xhr, formData) {
                $.each(data, function (k,v) {
                    formData.append(k, v);
                });
            },
            init: function () {
                this.on("success", function (file, result) {
                    this.removeAllFiles();

                    if (utils.fnValidResult(result)) {
                        fnSuccess(result);
                    }
                });
            }
        };
    }



    /// -----------------------------------------------------------------------------
    /// Compare  -  Se usa para ordenar Arrrays de Objetos
    /// -----------------------------------------------------------------------------
    function compare(key, order = "asc") {
        return function innerSort(a, b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                return 0;
            }

            const varA = (typeof a[key] === "string") ? a[key].toLowerCase() : a[key];
            const varB = (typeof b[key] === "string") ? b[key].toLowerCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            }
            else if (varA < varB) {
                comparison = -1;
            }

            return (
                (order.toLowerCase() == "desc") ? (comparison * -1) : comparison
            );
        };
    }



    /// -----------------------------------------------------------------------------
    /// Detiene back de navegador (regresar)
    /// -----------------------------------------------------------------------------
    $(window).load(function () {
        $('body').backDetect(function () {
            event.preventDefault();
            regresar();

            return false;
        });
    });


    /// -----------------------------------------------------------------------------
    /// Detiene backspace (regresar)
    /// -----------------------------------------------------------------------------
    $(document).unbind('keydown').bind('keydown', function (event) {
        if (event.keyCode === 8) { // 8 - backspace
            var doPrevent = true;
            var d = $(event.srcElement || event.target);

            var disabled = d.prop("readonly") || d.prop("disabled");
            if (!disabled) {
                if (d[0].isContentEditable) {
                    doPrevent = false;
                }

                else if (d.is("input")) {
                    //Se agregó porque ag-grid no le pone type a sus input
                    doPrevent = false;
                }

                else if (d.is("textarea")) {
                    doPrevent = false;
                }

                else if (d.is("select")) {
                    doPrevent = false;
                }
            }

            if (doPrevent) {
                event.preventDefault();
                regresar();

                return false;
            }
            else {
                //Debería hacer la opción por default, que en teoría es borrar
            }
        }
    });


    /// -----------------------------------------------------------------------------
    /// Agrega funcion contains a Chrome
    /// -----------------------------------------------------------------------------
    if (!String.prototype.contains) {
        String.prototype.contains = function (s) {
            return this.indexOf(s) > -1;
        };
    }


    /// -----------------------------------------------------------------------------
    /// Fix para problema que SweetAlert causa a tabs (Como el caso de las VT) - No funcionó
    /// -----------------------------------------------------------------------------
    //(function () {
    //    var close = window.swal.close;
    //    var previousWindowKeyDown = window.onkeydown;
    //    window.swal.close = function () {
    //        close();
    //        window.onkeydown = previousWindowKeyDown;
    //    };
    //})();




    /// -----------------------------------------------------------------------------
    /// Snippets
    /// -----------------------------------------------------------------------------

    // Obtener un subconjunto de las propiedades de un objeto
    //-------------------------------------------------------
    //const object = { a: 5, b: 6, c: 7 };
    //const picked = (({ a, c }) => ({ a, c }))(object);


    // For each
    //---------
    //$.each(list, function (k, v) {

    //});


    // Simple array Distinct / Unique
    //-------------------------------
    //var tablas = new Set(result.Data.map(x => x.id_contrato)); //Hace un distinct de la propiedad id_contrato


    // Object array Filter
    //--------------------
    //var tabla = result.Data.filter(x => x.id_contrato == v);


    // Simple array Sort
    //------------------
    //numArray.sort((a, b) => a - b); // For ascending sort
    //numArray.sort((a, b) => b - a); // For descending sort


    // Object array Sort
    //------------------
    //singers.sort(utils.fnCompare("band", "desc"));


    // Where X in List
    //----------------
    //var types = ["text", "password", "file", "search", "email", "number", "date", "color", "datetime", "datetime-local", "month", "range", "search", "tel", "time", "url", "week"];

    //if (types.contains(type)) {
    //    console.log("Encontrado!");
    //}



    /// -----------------------------------------------------------------------------
    /// -----------------------------------------------------------------------------


    var showWaitingDialog = function (msg) {

        waitingDialog = new ajaxLoader(document.body, { classOveride: 'blue-loader', bgColor: '#2196F3;', width: '100%', height: '1000%', opacity: '0.3' });
    }

    var showHideDialog = function (msg) {
        waitingDialog.remove();
    }

    var standarErrorHandler = function (error) {
        if (error !== undefined) {
            if (error instanceof Error)
                utils.showErrorMessage(error.message);
            else {
                utils.showErrorMessage(JSON.stringify(error));
            }
        }
    };

    var doJsonAsyncPostBack = function (waitMessage, calls, postThenCall, errorCall, JWTAuth) {
        if (typeof JWTAuth == "undefined")
            JWTAuth = true;

        if (window.navigator.onLine == false) {
            if (errorCall !== undefined)
                errorCall(new Error('No hay conexión a internet en este momento'));
            else
                showErrorMessage('No hay conexión a internet en este momento', calls);
            return;
        }

        utils.fnShowWaitingDialog();

        var whenCalls = [];
        $.each(calls, function (i, call) {
            var isAsyncHtml = call instanceof FSAsyncHtml;
            if (isAsyncHtml === true) {
                whenCalls.push(
                    $.get(call.Url, null, 'html')
                );
            }
            else {
                if (call.Args && call.Args != null && call.Args.replace("null", "") != "")
                    whenCalls.push(
                        $.ajax({
                            url: call.Url,
                            type: "POST",
                            async: true,
                            timeout: 180000,
                            dataType: 'json',
                            data: call.Args,
                            contentType: 'application/json; charset=utf-8',
                            beforeSend: function (jqXHR) {   //Si existe algún token, lo incluye
                                if (localStorage.getItem(utils.fnGlobals("Token")) != "" && JWTAuth)
                                    jqXHR.setRequestHeader("Authorization", 'Bearer ' + localStorage.getItem(utils.fnGlobals("Token")));
                            },
                            success: function (data, textStatus, jqXHR) {
                                if (jqXHR.getResponseHeader("X-Responded-Json") != undefined) {
                                    if (JSON.parse(jqXHR.getResponseHeader("X-Responded-Json")).status == 401) {
                                        doLogout();
                                        return;
                                    }

                                }
                                else if (jqXHR.statusCode().status == 401) { //Error
                                    {
                                        doLogout();
                                        return;
                                    }
                                }
                                if (data.Resultado != undefined)//Error
                                {
                                    showErrorMessage(data.Mensaje, calls[0].Url);
                                    return;
                                }


                                //MZ 13/12/2019 - Fix para minusculas por Docker/.Net Core
                                if (typeof data.Data == 'undefined' && typeof data.data != 'undefined') {
                                    data.Data = data.data;
                                    data.MessageType = data.messageType;
                                    data.InfoMessage = data.infoMessage;
                                    data.ErrorMessage = data.errorMessage;
                                }


                                call.ResultFunction(data);
                            },
                            error: function (request, status, error) {
                                handleAjaxError(request, status, error, calls[0].Url);
                            }
                        })
                    );
                else
                    whenCalls.push(
                        $.ajax({
                            url: call.Url,
                            type: "POST",
                            async: true,
                            timeout: 180000,
                            dataType: 'json',
                            contentType: 'application/json; charset=utf-8',
                            beforeSend: function (jqXHR) {   //Si existe algún token, lo incluye
                                if (localStorage.getItem(utils.fnGlobals("Token")) != "" && JWTAuth)
                                    jqXHR.setRequestHeader("Authorization", 'Bearer ' + localStorage.getItem(utils.fnGlobals("Token")));
                            },
                            success: function (data, textStatus, jqXHR) {
                                if (jqXHR.getResponseHeader("X-Responded-Json") != undefined) {
                                    if (JSON.parse(jqXHR.getResponseHeader("X-Responded-Json")).status == 401) {
                                        doLogout();
                                        return;
                                    }

                                }
                                else if (jqXHR.statusCode().status == 401) { //Error
                                    {
                                        doLogout();
                                        return;
                                    }
                                }
                                if (data.Resultado != undefined)//Error
                                {
                                    showErrorMessage(data.Mensaje, calls[0].Url);
                                    return;
                                }
                                call.ResultFunction(data);
                            },
                            error: function (request, status, error) {
                                handleAjaxError(request, status, error, calls[0].Url);
                            }
                        })
                    );
            }
        });

        $.when.apply($, whenCalls).then(function () {
            utils.fnShowHideDialog();

            if (postThenCall && postThenCall != null)
                postThenCall();
        }).fail(function (ex) {

            utils.fnShowHideDialog();

            if (errorCall !== undefined) {
                errorCall(ex);
            }
        });
    }


    //function handleAjaxError(request, status, error, oUrl) {
    //    if (request.status == 401) {
    //        doLogout();
    //    }
    //    else if (request.status == 404) {
    //        showErrorMessage(error404Message, oUrl);
    //    }
    //    else if (request.status == 500) {
    //        showErrorMessage(error500Message + error, oUrl);
    //    }

    //}

    //function handleAjaxError(request, status, error) {
    //    if (request.status == 401) {
    //        doLogout();
    //    }
    //    else if (request.status == 404) {
    //        showErrorMessage(error404Message, request);
    //    }
    //    else if (request.status == 500) {
    //        showErrorMessage(error500Message + error, request);
    //    }

    //}

    //function FSAsyncJSON(url, args, resultFunction, API) {
    //    if (typeof API == 'undefined')
    //        API = 'Security';

    //    this.Url = sites[API] + url;
    //    this.ResultFunction = resultFunction;
    //    this.Args = args;
    //    this.CallBackEjecutado = false;
    //}

    //function FSAsyncHtml(url, resultFunction) {
    //    this.Url = site + url;
    //    this.ResultFunction = resultFunction;
    //    this.CallBackEjecutado = false;
    //}

    //function fnExecute(e, oUrl, oData, oProcessMessage, oInfoMessage, oErrorMessage) {
    //    e.preventDefault();
    //    var success = function (data) {
    //        if (data.hasOwnProperty('ErrorMessage')) {
    //            utils.showErrorMessage(oErrorMessage);

    //            return false;
    //        }

    //        utils.showSuccessMessage(oInfoMessage);

    //        return true;
    //    };

    //    try {

    //        var calls = [new utils.FSAsyncJSON(oUrl, JSON.stringify(oData), success)];

    //        utils.doJsonAsyncPostBack(oProcessMessage, calls, null, utils.standarErrorHandler);

    //    }
    //    catch (e) {
    //        utils.showErrorMessage(e.message);
    //    }
    //};

    //function fnExecuteWithResult(e, oUrl, oData, oProcessMessage, success, JWTAuth, API) {
    //    if (e !== null)
    //        e.preventDefault();

    //    try {
    //        var calls = [new FSAsyncJSON(oUrl, JSON.stringify(oData), success, API)];
    //        doJsonAsyncPostBack(oProcessMessage, calls, null, utils.standarErrorHandler, JWTAuth);
    //    }
    //    catch (e) {
    //        showErrorMessage(e.message, oUrl);
    //    }
    //};

    function fnJsonArray(data) {
        return $.map(data, function (el) { return el; })
    }

    function getQueryStringItem(name, queryString) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(queryString);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    function oldBrowser() {
        return oldIE;
    }

    this.GetParameterByName = function (name) {
        var location = window.location.hash.split("?");
        if (location.length > 1)
            return getQueryStringItem(name.toLowerCase(), '?' + location[1].toLowerCase());
        else
            return "";
    }

    var mostrarModal = function (modal, configuracion) {
        configuracion.encabezado.text(configuracion.encabezadoMensaje);
        configuracion.cuerpo.text(configuracion.cuerpoMensaje);
        modal.modal('show');
    };

    var formatoFechaJson = function (fecha) {

        var parsedDate = new Date(parseInt(fecha.substr(6)));
        var jsDate = new Date(parsedDate); //Date object
        var dia = jsDate.getDate();
        var mes = (jsDate.getMonth() + 1);
        var anno = jsDate.getFullYear();
        fecha = dia + '/' + mes + '/' + anno;
        return fecha;
    };

    var fechaActual = function () {
        var fullDate = new Date();
        var twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : '0' + (fullDate.getMonth() + 1);
        var currentDate = fullDate.getDate() + "/" + twoDigitMonth + "/" + fullDate.getFullYear();
        return currentDate;
    };

    //validate configuration from BD
    var cargarConfiguracion = function (nombrePantalla) {
        try {
            var oUrl = 'Cotizador/Home/CargarConfiguracion';
            var oData =
                {
                    NombrePantalla: nombrePantalla
                };
            var oProcessMessage = 'Cargando configuracion, espere por favor...';
            fnExecuteWithResult(null, oUrl, oData, oProcessMessage, cargarConfiguracionFinalizada);
        }
        catch (e) {
            fnShowErrorMessage(e.message);
        }
    };

    var cargarConfiguracionFinalizada = function (result) {
        configuracion = result.Data;
        utils.fnValidarEstadoControles("Entrada");
    };

    var validarEstadoControles = function (estado) {

        var controles = $.grep(configuracion, function (e) {
            return e.NombreEstado == estado;
        });

        $.each(controles, function (index, value) {
            if (!$(value.Selector).data('select2'))
                $(value.Selector).prop('disabled', value.ValorEstado);
            else
                $(value.Selector).select2('enable', (!value.ValorEstado));
        });
    };

    var formatNumber = {

        separador: ",", // separador para los miles
        sepDecimal: '.', // separador para los decimales
        formatear: function (num) {
            num += '';
            var splitStr = num.split('.');
            var splitLeft = splitStr[0];
            var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1].substring(0, 2) : '';
            var regx = /(\d+)(\d{3})/;
            while (regx.test(splitLeft)) {
                splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
            }

            if (splitRight == '')
                splitRight = '.00'
            return this.simbol + splitLeft + splitRight;
        },
        new: function (num, simbol) {
            this.simbol = simbol || '';
            return this.formatear(num);
        }
    };

    //Funcion que obtiene el row de una tabla segun valor deseado
    var fnObtenerRow = function (table_id, arg1) {
        return false;
    };

    // $row = getRow('table_id', 'foo', 'bar');

    var init = function (args) {
        return false;
    };

    var obtenerSimboloMonetario = function () {
        return false;
    };

    function fnCrearElemento(tag, options) {
        let elemento = document.createElement(tag);

        if (typeof options !== 'undefined' && options !== null) {
            if (options.hasOwnProperty('text'))
                $(elemento).text(options.text);

            if (options.hasOwnProperty('attrs'))
                options.attrs.forEach(function (val, index, arr) {
                    $(elemento).attr(val.name, val.value);
                });

            if (options.hasOwnProperty('classes'))
                options.classes.forEach(function (val, index, arr) {
                    $(elemento).addClass(val);
                });

            if (options.hasOwnProperty('props'))
                options.props.forEach(function (val, index, arr) {
                    $(elemento).prop(val.name, val.value);
                });

            if (options.hasOwnProperty('value'))
                $(elemento).val(options.value);
        }

        return elemento;
    };


    function fnLoadLables(params, callback) {
        return false;
    };

    function fnCapitalize(text) {
        let arr = text.split(' '),
            capitalized = '';

        if (typeof arr !== 'undefined' && arr !== null)
            arr.forEach(function (val, index, arr) {
                capitalized += val.substring(0, 1).toUpperCase() + val.substring(1).toLowerCase();

                if (index < arr.length)
                    capitalized += ' ';
            });

        else
            capitalized = text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();

        return capitalized;
    };

    /*
    *
    * Este metodo se encarga de obtener un arreglo con todos los datos que contiene el select.
    *
    * @param select
    *           Es el elemento al que se le extraeran los datos.
    *
    * @params onlySelected
    *           Este paramentro es opcional e indica si solo se desea traer los datos de los elementos 'option' seleccionados.
    *
    * @return
    *      Retorna un arreglo con la siguiente estructura:
    *      arrData= [
    *           {
    *               id: contiene el valor del atributo: 'value' de la etiqueta 'option',
    *               text: contiene el texto de la etiqueta 'option',
    *               selected: contiene un true o false si la etiqueta option posee este atributo,
    *               options: es un arreglo y es opcional, contendra todos los valores personalizados (data-*)
    *                        que el usuario haya agergado, en la etiqueta 'option'.
    *           }
    *      ];
    */
    function fnGetDataSelect(select, onlySelected) {
        let arrData = [];

        if (typeof onlySelected === 'undefined' || onlySelected === null)
            onlySelected = false;

        if (select.is('select')) {
            let options = select.find('option');

            for (var i = 0; i < options.length; i++) {
                let valOpt = options[i];

                if (!valOpt.hasAttribute('disabled')) {
                    let obj = {
                        id: $(valOpt).attr('value'),
                        text: $(valOpt).text(),
                        selected: valOpt.hasAttribute('selected') || $(valOpt).attr('value') == select.val()
                    };

                    let filter = fnFilterAttributes(valOpt.attributes, function (val) {
                        return val.name.toLowerCase().startsWith('data-') && val.name.toLowerCase() !== 'disabled';
                    });

                    if (typeof filter !== 'undefined' || filter !== null) {
                        let options = {};

                        filter.forEach(function (val, index, arr) {
                            let data = val.name.substring('data-'.length);

                            options[data] = $(valOpt).attr(val.name);
                        });

                        obj.options = options;
                    }

                    if (onlySelected && obj.selected)
                        arrData.push(obj);

                    else if (!onlySelected)
                        arrData.push(obj);
                }
            }
        }

        return arrData;
    };

    function fnFilterAttributes(attrs, criteria) {
        let filter = [];

        if (typeof attrs !== 'undefined' && attrs !== null && attrs.length > 0) {
            for (var i = 0; i < attrs.length; i++)
                if (criteria(attrs[i]))
                    filter.push(attrs[i]);
        }

        return filter;
    };

    /*
    * Este metodo se encarga de eliminar o limpiar todas las opciones que contenega una etiqueta tipo: 'select'
    *
    * @param select
    *           Reperesenta la etiqueta 'select' que se desea limpiar
    */
    function fnDestroySelect(select) {
        if (typeof select !== 'undefined' && select !== null && select.is('select')) {
            let options = select.find('option');

            if (typeof options !== 'undefined' && options !== null)
                options.remove();

            try {
                select.select2('destroy');
            } catch (err) { }
        }
    };

    /*
    * Este metodo se encarga de aplicar el lineamiento a la izquierda a los textos que poseen gran cantidad de caracteres,
    * dentro de un dataTable.
    *
    * @param table
    *           Elemento de tipo dataTable al que se le aplicara el lineamiento a las columnas que poseean un texto mayor a los 60 caracteres.
    */
    function fnApplyLeftAligment(table) {
        try {
            if (table.is('table')) {
                const MAX_SIZE = 60;

                table.find('tbody tr td').
                    each(function (index, val) {
                        let text = $(val).text();

                        if (typeof text !== 'undefiend' || text !== null) {
                            if (text.length >= MAX_SIZE)
                                $(val).addClass('text-left');
                        }
                    });
            }
        } catch (err) {
            console.error('Ocurrio un error en el metodo: %s. %nMensaje: %s. %nparams: %o',
                'fnApplyLeftAligment', err.message, table);
        }
    };

    function fnApplyHeaderStyleDataTable(config) {
        if (typeof config !== 'undefined' && config !== null) {
            let header = config.header;

            if (typeof header !== 'undefined' && header !== null) {
                let arrTh = $(header).find('thead tr th');

                if (typeof arrTh !== 'undefied' && arrTh !== null) {
                    arrTh.forEach(function (index, val, arr) {
                        $(val).addClass(config.className);
                    });
                }
            }
        }
    };


    var LocalData = {
        set: function (key, value) {
            if (!key || !value) { return; }

            if (typeof value === "object") {
                value = JSON.stringify(value);
            }
            localStorage.setItem(key, value);
        },
        get: function (key) {
            var value = localStorage.getItem(key);

            if (!value) { return; }

            // assume it is an object that has been stringified
            if (value[0] === "{" || value[0] === "[") {
                value = JSON.parse(value);
            }

            return value;
        },
        remove: function (key) {
            localStorage.removeItem(key);
        }
    };



    return {
        fnInitDatatables: fnInitAgGrid,
        fnClearDataAgGrid: fnClearDataAgGrid,
        fnShowErrorMessage: showErrorMessage,
        fnFormatNumber: formatNumber,
        fnObtenerSimboloMonetario: obtenerSimboloMonetario,
        //MZ ini
        fnShowSuccessMessage: showSuccessMessage,
        fnShowInfoMessage: showInfoMessage,
        fnShowWarningMessage: showWarningMessage,
        fnShowConfirmMessage: showConfirmMessage,
        fnGetJWTPayload: getJWTPayload,
        fnGetEdad: getEdad,
        fnLlenaSelect: llenaSelect,
        fnLlenaSelectArray: llenaSelectArray,
        fnLlenaTagList: llenaTagList,
        fnLlenaTagListArray: llenaTagListArray,
        fnActualizaSelect: actualizaSelect,
        fnActualizaInput: actualizaInput,
        fnDateDiff: DateDiff,
        fnGetAPIFile: getAPIFile,
        fnGetMenuJson: getMenuJson,
        fnSetMenuJson: setMenuJson,
        fnLimpiaForm: limpiaForm,
        fnIsValidForm: isValidForm,
        fnGetURLParams: getURLParams,
        fnGetURLParamsSimple: getURLParamsSimple,
        fnMoneyFormat: moneyFormat,
        fnPhoneFormat: phoneFormat,
        fnGetNumbers: getNumbers,
        fnGetParams_Sist: getParams_Sist,
        fnLlenaCheckList: llenaCheckList,
        fnLlenaCheckListArray: llenaCheckListArray,
        fnLlenaSwitchListArray: llenaSwitchListArray,
        fnAgGrid_Init: agGrid_Init,
        fnAgGrid_InitLite: agGrid_InitLite,
        fnAgGrid_SetRows: agGrid_SetRows,
        fnAgGrid_SetRowsAPI: agGrid_SetRowsAPI,
        fnAgGrid_LlenarGrid: agGrid_LlenarGrid,
        fnAgGrid_autoSizeCols: agGrid_autoSizeCols,
        fnAgGrid_sizeColsToFit: agGrid_sizeColsToFit,
        fnAgGrid_GetQuickFilterText_dateToString: agGrid_getQuickFilterText_dateToString,
        fnAgGrid_FilterValueGetter_dateToString: agGrid_filterValueGetter_dateToString,
        fnAgGrid_ValueFormatter_dateToString: agGrid_valueFormatter_dateToString,
        fnagGrid_getQuickFilterText_dateToTimeString: agGrid_getQuickFilterText_dateToTimeString,
        fnagGrid_filterValueGetter_dateToTimeString: agGrid_filterValueGetter_dateToTimeString,
        fnagGrid_valueFormatter_dateToTimeString: agGrid_valueFormatter_dateToTimeString,
        fnagGrid_getQuickFilterText_dateToDateTimeString: agGrid_getQuickFilterText_dateToDateTimeString,
        fnagGrid_filterValueGetter_dateToDateTimeString: agGrid_filterValueGetter_dateToDateTimeString,
        fnagGrid_valueFormatter_dateToDateTimeString: agGrid_valueFormatter_dateToDateTimeString,
        fnAgGrid_ValueFormatter_Money: agGrid_valueFormatter_Money,
        fnAgGrid_cellRender_GroupedRows: agGrid_cellRender_GroupedRows,
        fnAgGrid_cellRender_GroupedRows_Grupo: agGrid_cellRender_GroupedRows_Grupo,
        fnAgGrid_ColumnBuilder: agGrid_ColumnBuilder,
        fnAgGrid_ColumnBuilderArray: agGrid_ColumnBuilderArray,
        fnRedirect: redirect,
        fnRegresar: regresar,
        fnOpenWindow: openWindow,
        //fnCheckForError: checkForError,
        fnValidResult: validResult,
        fnMaskedInput_Init: maskedInput_Init,
        fnSelects_Init: selects_Init,
        fnTooltips_Init: tooltips_Init,
        fnPage_Init: page_Init,
        fnObjectArraySort: objectArraySort,
        fnGetAPIData: getAPIData,
        fnSetWorkList: setWorkList,
        fnGetAllElements: getAllElements,
        fnDropzone_Init: Dropzone_Init,
        fnCompare: compare,
        fnGlobals: function (variable) { return GlobalVars[variable]; },
        //MZ fin
        fnShowWaitingDialog: showWaitingDialog,
        fnShowHideDialog: showHideDialog,
        fnExpireSesionUserInactve: expireSesionUserInactve,
        fnExecuteAsyncPostBack: fnExecute,
        fnExecuteWithResult: fnExecuteWithResult,
        fnHideLockedScreen: hideLockedScreen,
        fnDoLogOff: logOffNavigate,
        fnJsonArray: fnJsonArray,
        GetParameterByName: GetParameterByName,
        fnInitMessagesSelect2: setMessagesSelect2,
        fnsetDatePicker: setDatePicker,
        fnGetDate: getDate,
        fnFechaJson: formatoFechaJson,
        fnObtenerFecha: fechaActual,
        fnOldBrowser: oldBrowser,
        MostrarModal: mostrarModal,
        fnCargarConfiguracion: cargarConfiguracion,
        fnValidarEstadoControles: validarEstadoControles,
        fnIdleSeconds: function () { return idleSeconds; },
        fnSiteUrl: function (API) { return sites[API]; },
        fnWebhost: function () { return webhost; },
        fnObtenerRow: fnObtenerRow,
        crearElemento: fnCrearElemento,
        loadLables: fnLoadLables,
        capitalize: fnCapitalize,
        getDataSelect: fnGetDataSelect,
        fnApplyLeftAligment: fnApplyLeftAligment,
        destroySelect: fnDestroySelect,
        fnLocalData: LocalData,
        fnCreateButton: createButton,
        fnEnableNavigation: enableNavigation
    };

}();


$(window).resize(function () {
    //utils.chartJs();
});


String.format = function () {
    var theString = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
        theString = theString.replace(regEx, arguments[i]);
    }
    return theString;
}


$.extend({
    getUrlVars: function () {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function (name) {
        return $.getUrlVars()[name];
    }
});

if (!(window.console && console.log)) {
    console = {
        log: function () { },
        debug: function () { },
        info: function () { },
        warn: function () { },
        error: function () { }
    };
}

var cargarSelect2 = function (elemento, configuracion) {
    let opts = {
        cacheDataSource: [],
        placeholder: configuracion.PlaceHolder,
        multiple: configuracion.Multiple,
        initSelection: configuracion.InitSelection,
        dropdownCssClass: "bigdrop", // apply css that makes the dropdown taller
        escapeMarkup: function (m) { return m; } // we do not want to escape markup since we are displaying html in results
    };

    if (elemento.is('input')) {
        opts.query = function (query) {
            self = this;
            var key = query.term;
            var cachedData = self.cacheDataSource[key];
            if (cachedData) {
                query.callback({ results: cachedData });
                return;
            } else {
                $.ajax({
                    url: configuracion.Url,
                    data: configuracion.Data,
                    dataType: 'json',
                    type: 'POST',
                    success: function (serverData) {
                        if (configuracion.SuccessFunction) {
                            configuracion.SuccessFunction(serverData);
                        }
                        var data = { results: [] };
                        $.each(serverData.Data, function () {
                            data.results.push({ id: this[configuracion.Id], text: this[configuracion.Text] });
                        });
                        self.cacheDataSource[key] = data.results;
                        results = data.results;
                        query.callback(data);
                    }
                })
            }
        };

    } else if (elemento.is('select') && !$.isEmptyObject(configuracion)) {
        utils.fnExecuteWithResult(null, configuracion.Url, configuracion.Data, '', function (result) {
            if (result.MessageType == 0) {
                let optionDefault = utils.crearElemento('option', {
                    text: '',
                    attrs: [
                        { name: 'selected', value: 'selected' },
                        { name: 'value', value: -1 }
                    ],
                    props: [{ name: 'disabled', value: 'disabled' }]
                });

                elemento.prepend(optionDefault);

                result.Data.forEach(function (val, index, arr) {
                    let option = utils.crearElemento('option');

                    $(option).attr('value', val[configuracion.Id]).
                        text(val[configuracion.Text]);

                    if (val.hasOwnProperty('options') || val.hasOwnProperty('Options')) {
                        let keys = Object.keys(val.options) || Object.keys(val.Options);

                        for (var i = 0; i < keys.length; i++) {
                            let attribute = 'data-' + keys[i].toLowerCase();

                            $(option).attr(attribute, val.options[keys[i]]);
                        }
                    }

                    elemento.append(option);
                });

                if (typeof configuracion.SuccessFunction === 'function')
                    configuracion.SuccessFunction(result);
            } else
                msjApp.fnShowErrorMessage(result.ErrorMessage, "cargarSelect2", configuracion.Url);

        });
    }

    elemento.select2(opts);
};


var cargarSelect2multiple = function (elemento, configuracion) {

    elemento.select2({
        cacheDataSource: [],
        placeholder: configuracion.PlaceHolder,
        multiple: configuracion.Multiple,
        query: function (query) {
            self = this;
            var key = query.term;
            var cachedData = self.cacheDataSource[key];
            if (cachedData) {
                query.callback({ results: cachedData });
                return;
            } else {
                $.ajax({
                    url: configuracion.Url,
                    data: configuracion.Data,
                    dataType: 'json',
                    type: 'POST',
                    success: function (serverData) {
                        if (configuracion.SuccessFunction) {
                            configuracion.SuccessFunction(serverData);
                        }
                        var data = { results: [] };
                        $.each(serverData.Data, function () {
                            data.results.push({ id: this[configuracion.Id], text: this[configuracion.Text] });
                        });
                        self.cacheDataSource[key] = data.results;
                        results = data.results;
                        query.callback(data);
                    }
                })
            }
        },

        initSelection: configuracion.InitSelection,
        dropdownCssClass: "bigdrop", // apply css that makes the dropdown taller
        escapeMarkup: function (m) { return m; } // we do not want to escape markup since we are displaying html in results
    });



};

