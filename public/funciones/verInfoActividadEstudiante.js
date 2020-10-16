var token = $('[name="_token"]').val();
var tipoActividad = 0;
var contador = 0;

var arrayPreguntas = [];

$(document).ready(function() {
    iniciar();

});

function iniciar() {
    cargarDatosActividadEstudiante();

}

function cargarDatosActividadEstudiante() {
    $.ajax({
        url: "/CursosDocente/cargarInformacionActividadEstudiante",
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

            if (data.tipoActividadSql.length > 0) {
                $(".actividadVal").html(data.tipoActividadSql[0].actividadName);
                $(".tipoVal").html(data.tipoActividadSql[0].tipoActividad);
                if (data.tipoActividad !== '') {
                    console.log("entro");
                    if (data.tipoActividad === 1) {
                        var row1 = $("<div/>").addClass("row");
                        row1.attr({
                            "style": "margin: 0;"
                        });
                        var button = $("<span/>").html("<div class='divCorrect'></div><label class='labelCorrect'>Respuesta correcta</label><div style='margin-left: 10px;' class='divSelect'></div><label class='labelSelect'>Respuesta seleccionada por estudiante</label>").attr("style", "display: flex;");
                        row1.append(button);
                        $("#contenedorContenido").append(row1);
                        var contadorRtaCorrectas = 0;
                        $(".estudianteAsignado").html(data.dataPreguntas[0].estudiante);
                        $(data.dataPreguntas).each(function(indice, objeto) {
                            contador++;
                            var indiceActual = indice + 1;
                            var tablePreguntas = $("<table/>").addClass("table");
                            var tbodyPreguntas = $("<tbody/>");
                            var trPreguntas = $("<tr/>");
                            var tdPreguntas = $("<td/>");
                            var h4Pregunta = $("<h4/>");
                            h4Pregunta.html(indiceActual + ")  " + objeto.nombrePregunta);
                            tdPreguntas.append(h4Pregunta);
                            trPreguntas.append(tdPreguntas);
                            tbodyPreguntas.append(trPreguntas);
                            tablePreguntas.append(tbodyPreguntas);

                            var contenedor = $("<div/>").addClass("contenedor");
                            contenedor.attr("id", "contenedor_" + indice);

                            var spanPregunta = "<span class='spanPregunta' id='spanpregunta_" + indice + "'>Pregunta N." + indiceActual + " </span><br>";
                            var pregunta = "<span id='pregunta_" + indice + "'>" + objeto.nombrePregunta + "</span>";
                            contenedor.append(tablePreguntas);
                            var respuestas = JSON.parse(objeto.contenidoPregunta);
                            var ulRtas = $("<ul/>");
                            var tableRtas = $("<table/>").addClass("table  tableRespuesta_" + indice).attr("id", "tableRespuesta_" + indice);
                            var tbodyRtas = $("<tbody/>");
                            if (objeto.rtaCorrecta === parseInt(objeto.respondidaXestudiante)) {
                                contadorRtaCorrectas++;
                            }
                            $(respuestas).each(function(i, o) {
                                var rtaActual = i + 1;
                                var tr = $("<tr/>");
                                tr.attr({
                                    "id": "respuesta_" + indice + "_" + i,
                                    "idPregunta": objeto.idPregunta,
                                    "tipoActividad": objeto.tipoActividad
                                });
                                if (objeto.rtaCorrecta === i) {
                                    console.log("entro en el indice " + i);
                                    tr.addClass("correct");
                                }
                                if (parseInt(objeto.respondidaXestudiante) === i) {
                                    console.log("entro en el indice de rta estud " + i);
                                    tr.addClass("respondida");
                                }


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
                        });
                        var row = $("<div/>").addClass("row");
                        row.attr({
                            "style": "margin: 0;margin-bottom: 59px;"
                        });
                        console.log(contadorRtaCorrectas);
                        if (contadorRtaCorrectas === 1) {
                            var button = $("<span/>").html(contadorRtaCorrectas + " Respuesta correcta de " + contador + " Preguntas").attr("id", "rtasCorrectasSpan");
                        } else if (contadorRtaCorrectas > 1) {
                            var button = $("<span/>").html(contadorRtaCorrectas + " Respuestas correctas de " + contador + " Preguntas").attr("id", "rtasCorrectasSpan");
                        } else if (contadorRtaCorrectas === 0) {
                            var button = $("<span/>").html(contadorRtaCorrectas + " Respuestas correctas de " + contador + " Preguntas").attr("id", "rtasCorrectasSpan");
                        }

                        row.append(button);
                        $("#contenedorContenido").append(row);
                        $("#contenedorContenidoGeneral").removeClass("oculto");
                    } else if (data.tipoActividad === 2) {
                        $(".estudianteAsignado").html(data.dataPreguntas[0].estudiante);
                        $(data.dataPreguntas).each(function(indice, objeto) {
                            contador++;
                            var indiceActual = indice + 1;
                            var tablePreguntas = $("<table/>").addClass("table");
                            tablePreguntas.attr("style", "margin:0");
                            var tbodyPreguntas = $("<tbody/>");
                            var trPreguntas = $("<tr/>");
                            var tdPreguntas = $("<td/>");
                            var h4Pregunta = $("<h4/>");
                            h4Pregunta.html(indiceActual + ")  " + objeto.nombrePregunta);
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
                                "class": "form-control",
                                "disabled": "disabled"
                            });
                            console.log(objeto.respondidaXestudiante);
                            inputRespuestaEncuesta.val(objeto.respondidaXestudiante);

                            tdRespuestaEncuesta.append(inputRespuestaEncuesta);
                            trRespuestaEncuesta.append(tdRespuestaEncuesta);
                            tbodyPreguntas.append(trRespuestaEncuesta);
                            tablePreguntas.append(tbodyPreguntas);

                            contenedor.append(tablePreguntas);
                            $("#contenedorContenido").append(contenedor);
                        });
                        $("#contenedorContenidoGeneral").removeClass("oculto");
                    } else if (data.tipoActividad === 3) {
                        $(".estudianteAsignado").html(data.dataPreguntas[0].estudiante);
                        $(data.dataPreguntas).each(function(indice, objeto) {
                            var div = $("<div/>");
                            div.attr({
                                "id": "documento",
                                "style": "width:100%; height: 100%"
                            });
                            setTimeout(function() {
                                div.html(objeto.contenidoPregunta);
                            }, 2500);

                            $("#contenedorContenido").append(div);
                        });
                        $("#contenedorContenidoGeneral").removeClass("oculto");
                    }
                }
            }
            if (data.dataPreguntas.length === 0) {
                var danger = "<div class='alert alert-warning' role='alert'>No se encuentra registrado hasta el momento algun tipo de actividad -> asignelo en el modulo de mis cursos  en materias  seleccionando la actividad y creando el tipo de actividad.</div>";
                $("#contenedorContenido").append(danger);
                $("#contenedorContenidoGeneral").removeClass("oculto");
            }


        }
    });
}