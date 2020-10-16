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

}

function spinner(texto) {
    if (texto === "") {
        texto = "Cargando...";
    }
    if (texto === false) {
        $("#spinner").hide();
        return;
    }
    $("#textLoad").html(texto);
    $("#spinner").show();
}

function cargarDatosActividad() {
    spinner();
    $.ajax({
        url: "/CursosEstudiante/cargarInformacionActividadEstudiante",
        dataType: 'json',
        type: "POST",
        data: {
            accion: 1,
            _token: token,
            idMateria: $("#idMateria").val(),
            idCurso: $("#idCurso").val(),
            idEstudiante: $("#idEstudiante").val(),
            idActividad: $("#idActividad").val(),
        },
        success: function(data) {
            $(".nombreActividad").html(data.actividadResponse);
            $(".nombreMateria").html(data.materiaResponse);
            spinner(false);

        }
    });
}

function cargarTiposActividad() {
    spinner();
    $("#contenedorContenidoGeneral").removeClass('oculto');
    $.ajax({
        url: "/ActividadesEstudiante/cargarTipoActividad",
        dataType: 'json',
        type: "POST",
        data: {
            accion: 1,
            _token: token,
            idMateria: $("#idMateria").val(),
            idCurso: $("#idCurso").val(),
            idEstudiante: $("#idEstudiante").val(),
            idActividad: $("#idActividad").val(),
        },
        success: function(data) {
            if (data.data.length > 0) {
                tipoActividad = data.tipoActividad;
                if (data.tipoActividad === 1) {
                    if (data.rtasRespondidas.length > 0) {
                        var danger = "<div class='alert alert-primary' role='alert'>La actividad actual ya se ha desarrollado.</div>";
                        $("#contenedorContenido").append(danger);
                        spinner(false);
                    } else {
                        $(data.data).each(function(indice, objeto) {
                            contador++;
                            var indiceActual = indice + 1;
                            var tablePreguntas = $("<table/>").addClass("table");
                            var tbodyPreguntas = $("<tbody/>");
                            var trPreguntas = $("<tr/>");
                            var tdPreguntas = $("<td/>");
                            var h4Pregunta = $("<h4/>");
                            h4Pregunta.html(indiceActual + ")  " + objeto.nombreTipoActividad);
                            tdPreguntas.append(h4Pregunta);
                            trPreguntas.append(tdPreguntas);
                            tbodyPreguntas.append(trPreguntas);
                            tablePreguntas.append(tbodyPreguntas);

                            var contenedor = $("<div/>").addClass("contenedor");
                            contenedor.attr("id", "contenedor_" + indice);

                            var spanPregunta = "<span class='spanPregunta' id='spanpregunta_" + indice + "'>Pregunta N." + indiceActual + " </span><br>";
                            var pregunta = "<span id='pregunta_" + indice + "'>" + objeto.nombreTipoActividad + "</span>";
                            contenedor.append(tablePreguntas);
                            var respuestas = JSON.parse(objeto.contenido);
                            var ulRtas = $("<ul/>");
                            var tableRtas = $("<table/>").addClass("table table-hover tableRespuesta_" + indice).attr("id", "tableRespuesta_" + indice);
                            var tbodyRtas = $("<tbody/>");
                            $(respuestas).each(function(i, o) {
                                var rtaActual = i + 1;
                                var tr = $("<tr/>");
                                tr.attr({
                                    "id": "respuesta_" + indice + "_" + i,
                                    "idPregunta": objeto.idPregunta,
                                    "tipoActividad": objeto.tipoActividad
                                });
                                var td = $("<td/>");
                                var strong = $("<strong/>");
                                strong.html(o.rtas);
                                td.append(strong);
                                tr.append(td);
                                tbodyRtas.append(tr);
                                tableRtas.append(tbodyRtas);
                                contenedor.append(tableRtas);
                            });


                            $("#contenedorContenido").append(contenedor);
                            $("#tableRespuesta_" + indice + " tbody tr").on('click', function() {
                                $("#tableRespuesta_" + indice + " .SelectedRta").removeClass('SelectedRta');
                                $(this).addClass('SelectedRta');
                            });
                        });
                        $("#rowResponderPreguntas").removeClass("oculto");
                        var row = $("<div/>").addClass("row");
                        var button = $("<button/>").addClass("btn btn-primary").html("Responder Preguntas").attr("id", "responderPreguntas");
                        row.append(button);
                        $("#contenedorContenido").append(row);
                        $("#responderPreguntas").on("click", function() {
                            responderPreguntas();
                        });
                        spinner(false);
                    }
                } else if (data.tipoActividad === 2) {
                    if (data.rtasRespondidas.length > 0) {
                        var danger = "<div class='alert alert-primary' role='alert'>La actividad actual ya se ha desarrollado.</div>";
                        $("#contenedorContenido").append(danger);
                        spinner(false);
                    } else {
                        $(data.data).each(function(indice, objeto) {
                            contador++;
                            var indiceActual = indice + 1;
                            var tablePreguntas = $("<table/>").addClass("table");
                            tablePreguntas.attr("style", "margin:0");
                            var tbodyPreguntas = $("<tbody/>");
                            var trPreguntas = $("<tr/>");
                            var tdPreguntas = $("<td/>");
                            var h4Pregunta = $("<h4/>");
                            h4Pregunta.html(indiceActual + ")  " + objeto.nombreTipoActividad);
                            tdPreguntas.append(h4Pregunta);
                            trPreguntas.append(tdPreguntas);
                            tbodyPreguntas.append(trPreguntas);
                            tablePreguntas.append(tbodyPreguntas);

                            var contenedor = $("<div/>").addClass("contenedor");
                            contenedor.attr("id", "contenedor_" + indice);
                            var trRespuestaEncuesta = $("<tr/>");
                            var tdRespuestaEncuesta = $("<td/>");
                            var inputRespuestaEncuesta = $("<input/>");
                            inputRespuestaEncuesta.attr({
                                "id": "respuesta_" + indice,
                                "idPregunta": objeto.idPregunta,
                                "tipoActividad": objeto.tipoActividad,
                                "placeholder": "-- Espacio para texto --",
                                "class": "form-control"
                            });
                            tdRespuestaEncuesta.append(inputRespuestaEncuesta);
                            trRespuestaEncuesta.append(tdRespuestaEncuesta);
                            tbodyPreguntas.append(trRespuestaEncuesta);
                            tablePreguntas.append(tbodyPreguntas);

                            contenedor.append(tablePreguntas);
                            $("#contenedorContenido").append(contenedor);
                            $("#tableRespuesta_" + indice + " tbody tr").on('click', function() {
                                $("#tableRespuesta_" + indice + " .SelectedRta").removeClass('SelectedRta');
                                $(this).addClass('SelectedRta');
                            });
                        });
                        $("#rowResponderPreguntas").removeClass("oculto");
                        var row = $("<div/>").addClass("row");
                        var button = $("<button/>").addClass("btn btn-primary").html("Responder Preguntas").attr("id", "responderPreguntas");
                        row.append(button);
                        $("#contenedorContenido").append(row);
                        spinner(false);
                        $("#responderPreguntas").on("click", function() {
                            responderPreguntas();
                        });
                    }
                } else if (data.tipoActividad === 3) {
                    $(data.data).each(function(indice, objeto) {
                        var div = $("<div/>");
                        div.attr({
                            "id": "documento",
                            "style": "width:100%; height: 100%"
                        });
                        setTimeout(function() {
                            div.html(objeto.contenido);
                        }, 2500);
                        spinner(false);

                        $("#contenedorContenido").append(div);
                    });
                }
            } else {
                var danger = "<div class='alert alert-warning' role='alert'>No se encuentra registrado un tipo de actividad hasta el momento.</div>";
                $("#contenedorContenido").append(danger);
            }

        }
    });
}

function responderPreguntas() {
    if (tipoActividad === 1) {
        var errores = [];
        arrayRespuestas = [];
        for (var i = 0; i < contador; i++) {
            var indiceActual = i + 1;
            if ($("#tableRespuesta_" + i + " tbody tr").hasClass("SelectedRta")) {} else {
                errores.push("-No se ha respondido la pregunta " + indiceActual);
            }
            var jsonRta = {};
            jsonRta.rtaSel = $("#tableRespuesta_" + i + " tbody .SelectedRta").attr("id");
            jsonRta.idPregunta = $("#tableRespuesta_" + i + " tbody .SelectedRta").attr("idpregunta");
            jsonRta.tipoActividad = $("#tableRespuesta_" + i + " tbody .SelectedRta").attr("tipoactividad");
            arrayRespuestas.push(jsonRta);
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
            url: "/ActividadesEstudiante/guardarRespuestaActividadEstudiante",
            dataType: 'json',
            type: "POST",
            data: {
                accion: 1,
                _token: token,
                dataRtas: JSON.stringify(arrayRespuestas),
                tipoActividad: tipoActividad,
                idActividad: $("#idActividad").val(),
                idCurso: $("#idCurso").val(),
                idMateria: $("#idMateria").val(),
                idEstudiante: $("#idUser").val(),

            },
            success: function(data) {
                location.reload();
            }
        });
    } else if (tipoActividad === 2) {
        var errores = [];
        arrayRespuestas = [];
        for (var i = 0; i < contador; i++) {
            var indiceActual = i + 1;
            if ($("#respuesta_" + i).val() == "") {
                errores.push("-No se ha respondido la pregunta " + indiceActual);
            }
            var jsonRta = {};
            jsonRta.rtaSel = $("#respuesta_" + i).val();
            jsonRta.idPregunta = $("#respuesta_" + i).attr("idpregunta");
            jsonRta.tipoActividad = $("#respuesta_" + i).attr("tipoactividad");
            arrayRespuestas.push(jsonRta);
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
            url: "/ActividadesEstudiante/guardarRespuestaActividadEstudiante",
            dataType: 'json',
            type: "POST",
            data: {
                accion: 1,
                _token: token,
                dataRtas: JSON.stringify(arrayRespuestas),
                tipoActividad: tipoActividad,
                idActividad: $("#idActividad").val(),
                idCurso: $("#idCurso").val(),
                idMateria: $("#idMateria").val(),
                idEstudiante: $("#idUser").val(),

            },
            success: function(data) {
                location.reload();
            }
        });
    }

}