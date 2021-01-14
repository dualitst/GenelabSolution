/*eslint eqeqeq:0*/
var ImageGallery = function () {
    // Objetos
    //--------
    var documentSliderTextData = {};


    // Init
    //-----
    function init(id, id_persona, id_solicitud) {
        documentSliderTextData[id] = {};

        var _id = "#" + id;
        var dropId = id + "dropDocumentos";

        var $_btnGuardaDocumento = $(_id + "_btnGuardaDocumento");
        var $_selTipoDocumento = $(_id + "_selTipoDocumento");
        var $_hdnDocumentos_id_persona = $(_id + "_hdnDocumentos_id_persona");
        var $_hdnDocumentos_id_solicitud = $(_id + "_hdnDocumentos_id_solicitud");
        var $drop;

        //Guardando IDs
        $_hdnDocumentos_id_persona.val(id_persona);
        $_hdnDocumentos_id_solicitud.val(id_solicitud);


        //DropArea
        Dropzone.options[dropId] = {
            maxFiles: 1,
            maxFilesize: 500,
            acceptedFiles: "image/*",
            autoProcessQueue: false,
            url: utils.fnSiteUrl("Originacion") + "BandejaRecepcion/SavePictures",
            headers: {
                "Authorization": "Bearer " + utils.fnLocalData.get(utils.fnGlobals("Token"))
            },
            sending: function (file, xhr, formData) {
                formData.append("id_persona", $_hdnDocumentos_id_persona.val());
                formData.append("id_solicitud", $_hdnDocumentos_id_solicitud.val());
                formData.append("id_unidad_negocio", utils.fnLocalData.get(utils.fnGlobals("Sesion")).id_unidad_negocio);
                formData.append("id_oficina", utils.fnLocalData.get(utils.fnGlobals("Sesion")).id_oficina);
                formData.append("id_usuario", utils.fnLocalData.get(utils.fnGlobals("Sesion")).id_usuario);
                formData.append("cve_documento", $_selTipoDocumento.val());
            },
            init: function () {
                $drop = this;

                //this.on("success", function (file, serverResponse) {
                //    $drop.removeAllFiles();
                //});
            },
            success: function (file, result) {
                $drop = this;
                $drop.removeAllFiles();

                if (result.MessageType == '1') {
                    utils.fnShowErrorMessage(result.ErrorMessage);
                    return;
                }
                else {
                    utils.fnShowSuccessMessage("Imagen cargada con éxito");
                }
            },
            error: function (file, result) {
                $drop = this;
                $drop.removeAllFiles();

                utils.fnShowErrorMessage(result);
            }
        };


        //Asignando botón
        $_btnGuardaDocumento.on("click", function () {
            if ($_selTipoDocumento.val() != 0 && $_selTipoDocumento.val() != "" && $_selTipoDocumento.val() != null) { // || $_selTipoDocumento.val().length == 0) {
                $drop.processQueue();
            }
            else {
                utils.fnShowWarningMessage("Debe seleccionar el tipo de documento primero");
                return;
            }
        });
    }


    // Get images
    //-----------
    function GetImages(id_solicitud, id) {
        try {

            var _id = '#' + id;

            var oUrl = "PersonaDocumentos/GetList";
            var oData = {
                id_solicitud: id_solicitud
            };
            var oProcessMessage = 'Obteniendo información...';
            var success = function (result) {
                if (result.MessageType == '1') {
                    utils.fnShowErrorMessage(result.ErrorMessage);
                    return;
                }
            
                var $carousel = $(_id + '_imageContainer');

                $carousel.empty();
                for (var i = 0; i < result.Data.length; i++) {

                    var $content;
                    if (i === 0) {
                        $content = $('<div>').attr({ id: id + '_divContent_' + i }).addClass('item active');
                    }
                    else {
                        $content = $('<div>').attr({ id: id + '_divContent_' + i }).addClass('item');
                    }


                    var txtData = {};
                    if (result.Data[i].texto != null && result.Data[i].texto.length > 0) {
                        txtData = JSON.parse(result.Data[i].texto);

                        if (txtData.length > 0) {
                            txtData = txtData[0];
                            documentSliderTextData[id][i] = txtData.Description;
                        }
                    }
                    

                    var $caption = $('<div>').attr({ id: 'caption_' + i }).addClass('carousel-caption');
                    //var $text = $('<h3>').attr({ text: 'something_' + i });
                    var $textImage = "<br><div class='align-center'><input type='button' id='btnTexto_" + i + "' class='btn btn-primary' value='Mostrar Texto OCR' style='' onclick='ImageGallery.fnMostrarTexto(\"" + id + "\"," + i + ");' /></div>";


                    var $downloadingImage = $("<img class='elevateZoom'>").attr({ id: id + '_downloadingImage_' + i, src: result.Data[i].ruta + "?v=" + moment() });


                    //ingresar los elementos
                    $caption.prepend($textImage);
                    $content.prepend($caption);
                    $content.prepend($downloadingImage);
                    $carousel.prepend($content);
                
                }

                //Función que asigna Zoom despues de cargar todas las imágenes
                $(function () {
                    function imageLoaded() {
                        // function to invoke for loaded image
                        // decrement the counter
                        counter--;
                        if (counter === 0) {

                            //$('#zoomed img').removeData('elevateZoom');
                            //$('.zoomWrapper img.zoomed').unwrap();
                            //$('.zoomContainer').remove();


                            // counter is 0 which means the last one loaded, so do something else
                            $("#" + $carousel.attr('id') + " .elevateZoom").elevateZoom({ zoomType: "lens", scrollZoom: true, lensSize: 400 /*, containLensZoom: true*/ });
                            //$("#" + $carousel.attr('id') + " .elevateZoom").elevateZoom({ zoomType: "inner", cursor: "crosshair", scrollZoom: true });
                            //$("#" + $carousel.attr('id') + " .elevateZoom").elevateZoom({ zoomWindowPosition: 11, scrollZoom: true });
                            //$(".elevateZoom").elevateZoom({ zoomType: "inner", zoomLevel: 1, responsive: true, cursor: "crosshair", scrollZoom: true });


                            // Ligando click para abrir galería a las imágenes del slider
                            $("#" + $carousel.attr('id')).bind("click", function (e) {
                                //Fix para poder dar click a botones
                                if (e.target.tagName == "INPUT") {
                                    return;
                                }

                                var $imagen = $("#" + $(this).find(".active").find("img")[0].id);

                                var $imgList = [];

                                $imgList.push({ src: "#" + $imagen.attr("id") });

                                $('#' + id + '_imageContainer .elevateZoom').each(function () {
                                    var $img = $(this);

                                    if ($img.attr("id") != $imagen.attr("id")) {
                                        var obj = {
                                            src: "#" + $img.attr("id")
                                        }

                                        $imgList.push(obj);
                                    }
                                });


                                //zoomContainer fix
                                $(".zoomContainer").css("left", "-9500px");


                                //Habilitar galería
                                $.magnificPopup.open({
                                    items: $imgList,

                                    type: 'inline',

                                    gallery: {
                                        enabled: true,
                                        tPrev: 'Anterior',
                                        tNext: 'Siguiente'
                                    }
                                });

                                return false;
                            });
                        }
                    }

                    var imagenes = $("#" + $carousel.attr('id') + " img");
                    var counter = imagenes.length;  // initialize the counter

                    imagenes.each(function () {
                        if (this.complete) {
                            imageLoaded.call(this);
                        } else {
                            $(this).one('load', imageLoaded);
                        }
                    });
                });
            };
            utils.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success, true, "Originacion");
        }
        catch (e) {
            utils.fnShowErrorMessage(e.message);
        }
    }


    // Get images VF
    //--------------
    function GetImagesVF(id_solicitud, id) {
        try {
            var _id = '#' + id;

            var cve_tipo_verificacion = "";

            switch (id) {
                case "CASA":
                    cve_tipo_verificacion = "VCASA";
                    break;
                case "AVAL":
                    cve_tipo_verificacion = "VAVAL";
                    break;
                default:
            }


            var oUrl = "VfFichaFotos/GetList";
            var oData = {
                id_solicitud: id_solicitud,
                ExtendedProperties: {
                    cve_tipo_verificacion: cve_tipo_verificacion
                }
            };
            var oProcessMessage = 'Obteniendo información...';
            var success = function (result) {
                if (result.MessageType == '1') {
                    utils.fnShowErrorMessage(result.ErrorMessage);
                    return;
                }

                //console.log("----Slider " + id);
                //console.log(result.Data);
                
                var $carousel = $(_id + '_imageContainer');

                $carousel.empty();
                for (var i = 0; i < result.Data.length; i++) {

                    var $content;
                    if (i === 0) {
                        $content = $('<div>').attr({ id: id + 'divContent_' + i }).addClass('item active');
                    }
                    else {
                        $content = $('<div>').attr({ id: id + 'divContent_' + i }).addClass('item');
                    }

                    
                    var $downloadingImage = $("<img class='elevateZoom'>").attr({ id: id + 'downloadingImage_' + i, src: result.Data[i].ExtendedProperties["ruta"] + "?v=" + moment() });

                    //ingresar los elementos
                    $content.prepend($downloadingImage);
                    $content.prepend($("<a class='gallery-item'>").attr({ id: id + '_a_downloadingImage_' + i, href: result.Data[i].ruta + "?v=" + moment() }));
                    $carousel.prepend($content);
                }

                //Función que asigna Zoom despues de cargar todas las imágenes
                $(function () {
                    function imageLoaded() {
                        // function to invoke for loaded image
                        // decrement the counter
                        counter--;
                        if (counter === 0) {
                            // counter is 0 which means the last one loaded, so do something else

                            //$('#zoomed img').removeData('elevateZoom');
                            //$('.zoomWrapper img.zoomed').unwrap();
                            //$('.zoomContainer').remove();


                            $("#" + $carousel.attr('id') + " .elevateZoom").elevateZoom({ zoomType: "lens", scrollZoom: true, lensSize: 400 /*, containLensZoom: true*/ });
                            //$("#" + $carousel.attr('id') + " .elevateZoom").elevateZoom({ zoomType: "inner", cursor: "crosshair", scrollZoom: true });
                            //$("#" + $carousel.attr('id') + " .elevateZoom").elevateZoom({ zoomWindowPosition: 11, scrollZoom: true });
                            //$(".elevateZoom").elevateZoom({ zoomType: "inner", zoomLevel: 1, responsive: true, cursor: "crosshair", scrollZoom: true });


                            // Ligando click para abrir galería a las imágenes del slider
                            $("#" + $carousel.attr('id')).bind("click", function (e) {

                                var $imagen = $("#" + $(this).find(".active").find("img")[0].id);

                                var $imgList = [];

                                $imgList.push({ src: "#" + $imagen.attr("id") });

                                $('#' + id + '_imageContainer .elevateZoom').each(function () {
                                    var $img = $(this);

                                    if ($img.attr("id") != $imagen.attr("id")) {
                                        var obj = {
                                            src: "#" + $img.attr("id")
                                        }

                                        $imgList.push(obj);
                                    }
                                });


                                //zoomContainer fix
                                $(".zoomContainer").css("left", "-9500px");


                                //Habilitar galería
                                $.magnificPopup.open({
                                    items: $imgList,

                                    type: 'inline',

                                    gallery: {
                                        enabled: true,
                                        tPrev: 'Anterior',
                                        tNext: 'Siguiente'
                                    }
                                });

                                return false;
                            });
                        }
                    }

                    var imagenes = $("#" + $carousel.attr('id') + " img");
                    var counter = imagenes.length;  // initialize the counter


                    imagenes.each(function () {
                        if (this.complete) {
                            imageLoaded.call(this);
                        } else {
                            $(this).one('load', imageLoaded);
                        }
                    });
                });
            };
            utils.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success, true, "Originacion");
        }
        catch (e) {
            utils.fnShowErrorMessage(e.message);
        }
    }


    // Habilita captura de docs
    //-------------------------
    function habilitarCaptura(id, id_persona, id_solicitud) {
        init(id, id_persona, id_solicitud);

        $("#addContainer").show();
    }


    // btn siguiente
    //--------------
    function btnSiguiente(id) {
        $(".zoomContainer").css("left", "-9500px");

        var $rowTxt = $("#" + id + "_rowTextCarousel");
        $rowTxt.hide();
    }


    // btn anterior
    //-------------
    function btnAnterior(id) {
        $(".zoomContainer").css("left", "-9500px");

        var $rowTxt = $("#" + id + "_rowTextCarousel");
        $rowTxt.hide();
    }


    // mostrarTexto
    //-------------
    function mostrarTexto(id, idx) {
        //console.log(documentSliderTextData[id][idx]);

        var $rowTxt = $("#" + id + "_rowTextCarousel");
        $rowTxt.show();

        var $txtArea = $("#" + id + "_txtCarousel");
        $txtArea.val(documentSliderTextData[id][idx]);
    }



    return {
        fnInit: init,
        fnGetImages: GetImages,
        fnGetImagesVF: GetImagesVF,
        fnHabilitarCaptura: habilitarCaptura,
        fnSiguiente: btnSiguiente,
        fnAnterior: btnAnterior,
        fnMostrarTexto: mostrarTexto
    }
}();