var token = $('[name="_token"]').val();
var tipoActividad = 0;
var contador = 0;

var arrayPreguntas = [];

$(document).ready(function() {
    iniciar();
});

function iniciar() {
    cargarDatosActividad();
    cargarTiposActividad();
    $("#cargarTipoActividad").on("click", function() {
        tipoActividad = parseInt($("#tipoActividad").val());
        if (contador > 0) {
            Swal.fire({
                title: 'Eliminar',
                text: 'Esta seguro de eliminar la información?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si, Eliminar',
                cancelButtonText: 'No, Mantener'
            }).then((result) => {
                if (result.value) {
                    $("#contenedorContenido").html("");
                    contador = 0;
                    $("#contenedorAggPregunta").addClass("oculto");
                    /* cargarContenidoTipoActividad(); */

                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire(
                        'Cancelado',
                        '',
                        'error'
                    )

                }
            })
        } else {
            cargarContenidoTipoActividad();
        }

    });
    $("#agregarPregunta").on("click", function() {
        cargarContenidoTipoActividad();
    });
    $("#guardarPreguntas").on("click", function() {
        guardarPreguntas();
    });
    $("#editarcontenido").on("click", function() {
        editarcontenido();
    });
    $('#embedimage').on('change', loadimage);

}

function cargarDatosActividad() {
    $.ajax({
        url: "/CursosDocente/cargarInformacionActividad",
        dataType: 'json',
        type: "POST",
        data: {
            accion: 1,
            _token: token,
            idMateria: $("#idMateria").val(),
            idCurso: $("#idCurso").val(),
            idDocente: $("#idDocente").val(),
            idActividad: $("#idActividad").val(),
        },
        success: function(data) {
            $(".nombreActividad").html(data.actividadResponse);
            $(".nombreMateria").html(data.materiaResponse);

        }
    });
}

function cargarTiposActividad() {
    $.ajax({
        url: "/CursosDocente/cargarTipoActividad",
        dataType: 'json',
        type: "POST",
        data: {
            accion: 1,
            _token: token,
            idMateria: $("#idMateria").val(),
            idCurso: $("#idCurso").val(),
            idDocente: $("#idDocente").val(),
            idActividad: $("#idActividad").val(),
        },
        success: function(data) {
            var codigo;
            var nombre;
            var tipoAplicaPer;
            $(data.data).each(function(indice, objeto) {
                codigo = objeto.idTipoActividad;
                nombre = objeto.nombre;
                var option = $("<option/>");
                option.val(codigo);
                option.html(nombre);
                $("#tipoActividad").append(option);
            });

        }
    });
    $.ajax({
        url: "/CursosDocente/verificarActividadCreada",
        dataType: 'json',
        type: "POST",
        data: {
            accion: 1,
            _token: token,
            idMateria: $("#idMateria").val(),
            idCurso: $("#idCurso").val(),
            idDocente: $("#idDocente").val(),
            idActividad: $("#idActividad").val(),
        },
        success: function(data) {
            if (data.contadorPreguntas > 0) {
                $(".rowPreguntas").addClass("oculto");
                $(".rowContenedorAlerta").removeClass("oculto");

            } else {
                $(".rowContenedorAlerta").addClass("oculto");
                $(".rowPreguntas").removeClass("oculto");
            }

        }
    });
}

function cargarContenidoTipoActividad() {
    tipoActividad = parseInt($("#tipoActividad").val());

    switch (tipoActividad) {
        case 1:

            console.log('Preguntas');
            var cnt = $("<div/>").attr("id", "contenedor_" + contador);
            var pregunta = $("<input/>").attr("id", "pregunta_" + contador);
            var cantidadRespuestas = $("<input/>").attr("id", "cantidadRta_" + contador);
            pregunta.addClass("form-control inputBusqueda");
            cantidadRespuestas.addClass("form-control inputBusqueda").css("margin-right", "16px");
            var spanPregunta = $("<span/>").attr("id", "spanPregunta_" + contador);
            spanPregunta.text("Nombre pregunta");
            var divSpanX = $("<div/>").addClass("input-group");
            var eliX = $("<i/>").addClass("fas fa-times eliminarCont").attr({
                "onclick": "eliminarPregunta(" + contador + ")"
            });
            divSpanX.append(spanPregunta, eliX);
            var spanCantRta = $("<span/>").attr("id", "spancantidadRta_" + contador);
            spanCantRta.text("cantidad de respuestas");
            var cargaRta = $("<button/>").attr("id", "buttonCarga_" + contador);
            cargaRta.addClass("btn btn-primary").html("Cargar Respuestas").attr("onclick", "crearPreguntas(" + contador + ")");
            var divPreguntas = $("<div/>").addClass("input-group");
            divPreguntas.append(cantidadRespuestas, cargaRta);
            cnt.append(divSpanX, pregunta, spanCantRta, divPreguntas);
            $("#contenedorContenido").append(cnt);
            $("#contenedorContenidoGeneral").removeClass("oculto");
            $("#agregarPregunta").removeClass("oculto");
            $("#contenedorAggPregunta").removeClass("oculto");
            $("#guardarPreguntas").text("Guardar Pregunta");
            $("#editarcontenido").addClass("oculto");
            contador++;
            break;
        case 2:
            console.log('Encuestas');
            var cnt = $("<div/>").attr("id", "contenedor_" + contador);
            var pregunta = $("<input/>").attr("id", "preguntaEncuesta_" + contador);
            var Respuesta = $("<input/>").attr({
                "id": "respuesta_" + contador,
                "disabled": "disabled",
                "placeholder": "--Campo de respuesta--"
            });
            pregunta.addClass("form-control inputBusqueda");
            Respuesta.addClass("form-control inputBusqueda").css("margin-right", "16px");
            var spanPregunta = $("<span/>").attr("id", "spanPregunta_" + contador);
            spanPregunta.text("Nombre pregunta");
            var divSpanX = $("<div/>").addClass("input-group");
            var eliX = $("<i/>").addClass("fas fa-times eliminarCont").attr({
                "onclick": "eliminarPregunta(" + contador + ")"
            });
            divSpanX.append(spanPregunta, eliX);
            var spanRespuesta = $("<span/>").attr("id", "spanRespuesta_" + contador);
            spanRespuesta.text("Respuesta");

            var divPreguntas = $("<div/>").addClass("input-group");
            divPreguntas.append(Respuesta);
            cnt.append(divSpanX, pregunta, spanRespuesta, divPreguntas);
            $("#contenedorContenido").append(cnt);
            $("#contenedorContenidoGeneral").removeClass("oculto");
            $("#agregarPregunta").removeClass("oculto");
            $("#contenedorAggPregunta").removeClass("oculto");
            $("#guardarPreguntas").text("Guardar Pregunta");
            $("#editarcontenido").addClass("oculto");
            contador++;


            break;
        case 3:
            $.ajax({
                url: "/CursosDocente/verificarActividadCreada",
                dataType: 'json',
                type: "POST",
                data: {
                    accion: 1,
                    _token: token,
                    tipoActividad: tipoActividad,
                    idActividad: $("#idActividad").val(),
                    idCurso: $("#idCurso").val(),
                    idMateria: $("#idMateria").val()

                },
                success: function(data) {
                    if (data.contadorPreguntas > 0) {
                        var textArea = $("<textarea/>").attr("id", "editor");
                        $("#contenedorContenido").append(textArea);
                        cargarEditor();
                        $("#contenedorContenidoGeneral").removeClass("oculto");
                        $("#agregarPregunta").addClass("oculto");
                        $("#guardarPreguntas").addClass("oculto");
                        $("#contenedorAggPregunta").removeClass("oculto");
                        $("#editarcontenido").removeClass("oculto");
                        var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
                        /* var cont = data.data[0].contenido.replace(tags, function($0, $1) {

                            if ($0.indexOf("<img") > -1) {
                                var base64 = $($0).attr("alt");
                                return $0.replace(/src="([^"]+)"/gi, 'src="' + base64 + '"');
                            }
                            if ($0.indexOf("align") > -1) {
                                return $0.replace(/align="([^"]+)"/gi, '');
                            }
                            return $0;
                        });
                        cont = cont.replace(/<p[^>]*>/gi, "<span>");
                        cont = cont.replace(/<\/p[^>]*>/gi, "</span>"); */
                        setTimeout(function() {
                            tinymce.get('editor').setContent(data.data[0].contenido, { format: 'raw' });
                        }, 2500);

                    } else {
                        var textArea = $("<textarea/>").attr("id", "editor");
                        $("#contenedorContenido").append(textArea);
                        cargarEditor();
                        $("#contenedorContenidoGeneral").removeClass("oculto");
                        $("#agregarPregunta").addClass("oculto");
                        $("#contenedorAggPregunta").removeClass("oculto");
                        $("#guardarPreguntas").text("Guardar Contenido");
                        contador++;
                    }

                }
            });

            break;
        default:
            Swal.fire(
                'Error!',
                'Seleccione un tipo de actividad valida !',
                'error'
            )
    }


}

function crearPreguntas(idPregunta) {
    if ($("#cantidadRta_" + idPregunta).val() === "" || $("#cantidadRta_" + idPregunta).val() === "0") {
        Swal.fire(
            'Error!',
            'Ingrese el numero de respuestas que tendra la pregunta !',
            'error'
        )
        return;
    }

    $("#contenedor_" + idPregunta).append("<label class='textRta'>Posibles respuestas</label>");
    var cant = $("#cantidadRta_" + idPregunta).val();
    for (var i = 0; i < cant; i++) {
        var cont = i + 1;
        var divContPreguntas = $("<div/>").addClass("input-group");
        var respuesta = $("<input/>").attr("id", "respuesta_" + idPregunta + "_" + cont);
        var check = $("<input/>").attr("id", "check_" + idPregunta + "_" + cont);
        check.attr({
            "type": "radio",
            "name": "check_" + idPregunta
        }).addClass("form-group checkRta");
        respuesta.addClass("form-control inputBusqueda padPreguntas");
        divContPreguntas.append(respuesta, check);
        $("#contenedor_" + idPregunta).append(divContPreguntas);
    }
    $("#cantidadRta_" + idPregunta).addClass("oculto");
    $("#buttonCarga_" + idPregunta).remove();
    $("#spancantidadRta_" + idPregunta).remove();
}

function eliminarPregunta(idPregunta) {
    $("#contenedor_" + idPregunta).remove();

}

function guardarPreguntas() {
    var errores = [];
    if (tipoActividad === 1) {
        arrayPreguntas = [];
        for (var i = 0; i < contador; i++) {
            if ($("#pregunta_" + i).val() === "") {
                errores.push("-El campo pregunta no puede quedar vacio, es obligatorio");
            }
            var jsonPreguntas = {};
            jsonPreguntas.pregunta = $("#pregunta_" + i).val();
            var numeroRtas = $("#cantidadRta_" + i).val();
            var arrayRtas = [];
            for (var j = 1; j <= numeroRtas; j++) {
                if ($("#respuesta_" + i + "_" + j).val() === "") {
                    errores.push("-El campo respuesta no puede quedar vacio, es obligatorio");
                }
                var jsonRtas = {};
                jsonRtas.rtas = $("#respuesta_" + i + "_" + j).val();
                jsonRtas.check = $("#check_" + i + "_" + j).prop("checked");
                console.log($("#respuesta_" + i + "_" + j).val());
                arrayRtas.push(jsonRtas);

            }
            jsonPreguntas.respuestas = arrayRtas
            arrayPreguntas.push(jsonPreguntas);

        }
    } else if (tipoActividad === 2) {
        arrayPreguntas = [];
        for (var i = 0; i < contador; i++) {
            if ($("#preguntaEncuesta_" + i).val() === "") {
                errores.push("-El campo pregunta no puede quedar vacio, es obligatorio");
            }
            var jsonPreguntas = {};
            jsonPreguntas.pregunta = $("#preguntaEncuesta_" + i).val();
            arrayPreguntas.push(jsonPreguntas);

        }
    } else if (tipoActividad === 3) {
        arrayPreguntas = [];
        var jsonPreguntas = {};
        var textoEditor = tinymce.get('editor').getContent({ format: 'raw' });
        /*  var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
         var textoEditorR = textoEditor.replace(tags, function($0, $1) {
             if ($0.indexOf("<img") > -1) {
                 var base64 = $($0).attr("alt");
                 return $0.replace(/src="([^"]+)"/gi, 'src="' + base64 + '"');
             }
             if ($0.indexOf("align") > -1) {
                 return $0.replace(/align="([^"]+)"/gi, '');
             }
             return $0;
         });
         var textoFinal = strip_tags(textoEditorR, "<i><u><b><seccion><div><img><a><table><strong><em><p><tr><td><tbody><h1><h2><h3><h4><h5><h6><hr><span><blockquote>"); */
        /*  jsonPreguntas.textoEditor = textoFinal; */
        jsonPreguntas.textoEditor = textoEditor;
        arrayPreguntas.push(jsonPreguntas);
    }
    if (errores.length > 0) {
        Swal.fire(
            'Error',
            "El registro no se pudo realizar. Se detectaron los siguientes errores:<br/><br/>" + errores.join("<br/>"),
            'error'
        )
        return;
    }
    $.ajax({
        url: "/CursosDocente/tipoActiPreguntas",
        dataType: 'json',
        type: "POST",
        data: {
            accion: 1,
            _token: token,
            dataPreguntas: JSON.stringify(arrayPreguntas),
            tipoActividad: tipoActividad,
            idActividad: $("#idActividad").val(),
            idCurso: $("#idCurso").val(),
            idMateria: $("#idMateria").val()

        },
        success: function(data) {
            Swal.fire(
                'Creado!',
                'Se ha Creado el tipo de actividad correctamente !',
                'success'
            )
            setTimeout(function() {}, 2500);
            location.reload();
        }
    });

}

function cargarEditor() {
    tinymce.init({
        selector: '#editor',
        schema: 'html5',
        theme: 'silver',
        mobile: {
            theme: 'mobile',
            // plugins: [ 'autosave', 'lists', 'autolink' ],
            // toolbar: [ 'undo', 'bold', 'italic', 'styleselect' ]
        },
        /* skin: 'writer', */
        /*  language: 'es', */
        width: 770,
        height: 500,
        max_height: 500,
        max_width: 770,
        min_height: 100,
        min_width: 400,
        /*  content_css: 'css/content.css', */
        statusbar: true,
        inline: false,
        plugins: ['table paste code fullscreen hr imagetools textcolor colorpicker bdesk_photo'],
        /* plugins: 'code ', */
        /* toolbar: [
            'newdocument | bold | italic underline strikethrough alignleft aligncenter alignright alignjustify styleselect formatselect fontselect fontsizeselect cut copy paste bullist numlist outdent indent blockquote undo redo removeformat subscript superscript',
            'code'
        ], */
        toolbar: "undo redo | styleselect  | editmenu | sizeselect bold italic fontsizeselect | alignleft aligncenter alignright alignjustify | table format removeformat | fullscreen saltolinea guardar | link  bdesk_photo forecolor | lineheightselect ",
        menubar: true,
        browser_spellcheck: true,
        contextmenu: false,
        entity_encoding: 'named',
        entities: '160,nbsp',
        forced_root_block: 'div',
        nonbreaking_force_tab: true,
        mode: "specific_textareas",
        paste_data_images: true,
        images_upload_handler: function(blobInfo, success, failure) {
            // no upload, just return the blobInfo.blob() as base64 data
            success("data:" + blobInfo.blob().type + ";base64," + blobInfo.base64());
        },
        /*   invalid_elements: 'img[class|src]', */
        fontsize_formats: "8pt 9pt 10pt 11pt 12pt 13pt 14pt 15pt 16pt 17pt 18pt 19pt 20pt 21pt 22pt 23pt 24p 25ptt 36pt",
        table_default_styles: {
            width: '100%'
        },
        setup: function(editor) {
            editorGlobal = editor;
            editor.on('FullscreenStateChanged', function(e) {
                if (e.state) {
                    $('#tools').addClass("tools-expand");
                } else {
                    $('#tools').removeClass("tools-expand");
                }
            });
            editor.ui.registry.addButton('image', {
                text: "Imagen",
                title: 'Añadir Imagen a editor',
                /*  icon: false, */
                tooltip: "Agregar imagen",
                onAction: function() {
                    $('#embedimage').click();
                }

            });
            tinymce.PluginManager.add("bdesk_photo", function(editor, f) {
                editor.addCommand("bdesk_photo", function() {
                    editor.windowManager.open({
                        title: "Agregar Imagen a editor",
                        body: {
                            type: 'panel', // The root body type - a Panel or TabPanel
                            items: [ // A list of panel components
                                {
                                    type: 'htmlpanel', // A HTML panel component
                                    html: '<input type="file" class="input" name="single-image" style="font-size:14px;padding:30px;" accept="image/png, image/gif, image/jpeg, image/jpg"/>',
                                }
                            ]
                        },
                        /* width: 450,
                        height: 80, */

                        buttons: [{
                            text: "Ok",
                            type: 'custom',
                            name: '	submitButton',
                            primary: true

                        }, {
                            text: "Cerrar",
                            type: 'cancel',
                            name: '	close'

                        }],
                        onAction: function() {
                            if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
                                alert("This feature needs a modern browser.");
                                return;
                            }

                            var imagefile = document.getElementsByName("single-image")[0].files;

                            if (imagefile.length <= 0) {
                                // do nothing
                                (this).parent().parent().close();
                                return;
                            }

                            /*  if (imagefile[0].size > 512 * 1024) {
                                 alert("The image cannot be larger than 500KB.");
                                 return;
                             } */

                            var thisOne = this;

                            var classFilereader = new FileReader();
                            classFilereader.onload = function(base64) {
                                var imgData = base64.target.result;
                                var img = new Image();
                                img.src = imgData;
                                editor.execCommand("mceInsertContent", false, "<img src='" + imgData + "' />");

                            };

                            classFilereader.onerror = function(err) {
                                alert("Error reading file - " + err.getMessage());
                            };

                            classFilereader.readAsDataURL(imagefile[0]);
                            parent.tinyMCE.activeEditor.windowManager.close(window);
                        },
                        onCancel: function() {

                        }
                    });

                });

                editor.ui.registry.addButton("bdesk_photo", {
                    icon: "image",
                    context: "insert",
                    title: "Insert embedded image",
                    cmd: "bdesk_photo",
                    onAction: function() {
                        tinymce.execCommand('bdesk_photo');
                        return false;
                    }

                });

                editor.ui.registry.addMenuItem("bdesk_photo", {
                    cmd: "bdesk_photo",
                    context: "insert",
                    text: "Insert embedded image",
                    icon: "image",
                    prependToContext: true
                });
            });
        }


    });


}

function strip_tags(input, allowed) {
    allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return input.replace(commentsAndPhpTags, '').replace(tags, function($0, $1) {
        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
}

function loadimage() {
    if (this.files.length > 0) {
        var embedimage = this.files[0];
        if (embedimage.type.indexOf("image/") !== -1) {
            var reader = new FileReader();
            reader.onload = function() {
                var urlbase64 = reader.result;
                editorGlobal.execCommand('mceInsertContent', true, "<img src='" + urlbase64 + "' alt='" + urlbase64 + "' title='logo'>");
            };
            reader.readAsDataURL(embedimage);
        }
    }
}

function editarcontenido() {
    var texto = tinymce.get('editor').getContent({ format: 'raw' });
    /*   var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
      var textoEditor = texto.replace(tags, function($0, $1) {
          if ($0.indexOf("<img") > -1) {
              var base64 = $($0).attr("alt");
              return $0.replace(/src="([^"]+)"/gi, 'src="' + base64 + '"');
          }
          if ($0.indexOf("align") > -1) {
              return $0.replace(/align="([^"]+)"/gi, '');
          }
          return $0;
      }); */
    $.ajax({
        url: "/CursosDocente/editarContenidoTipoActividad",
        dataType: 'json',
        type: "POST",
        data: {
            accion: 1,
            _token: token,
            texto: texto,
            tipoActividad: tipoActividad,
            idActividad: $("#idActividad").val(),
            idCurso: $("#idCurso").val(),
            idMateria: $("#idMateria").val()

        },
        success: function(data) {

        }
    });
}