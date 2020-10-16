var datatableCurso = null;
var token = $('[name="_token"]').val();
var idActual = null;


$(document).ready(function() {
    listadoCursos();
    iniciar();
});

function iniciar() {

}

function listadoCursos() {
    if (datatableCurso === null) {
        datatableCurso = $("#tableCursos").DataTable({
            ajax: {
                url: $('#tableCursos').data('route'),
                header: { 'X-CSRF-TOKEN': token },
                type: "POST",
                data: function(d) {
                    d.accion = 1;
                    d._token = token;
                    d.idUserEstudiante = $("#idUser").val();
                },
                dataSrc: "data"
            },
            drawCallback: function(settings) {

            },
            serverSide: true,
            ordering: false,
            processing: true,
            dom: '<"fondoGris"<"row"<"col-1"><"col-8 paginateTop paginateCenter"ip><"col-3 lengthTop"l>>>tr<"fondoGrisAbajo"<"row"<"col-1"><"col-8 paginateTop paginateCenter"ip><"col-3">>>',
            autoWidth: false,
            columns: [{
                    data: '',
                    width: "5%",
                    class: "text-center w10",
                    render: function(data, type, full, meta) {
                        var span = $("<span/>");
                        var img2 = $("<i/>");
                        img2.attr({
                            id: "eli_" + full.DT_RowId,
                            class: "far fa-eye",
                            title: "Ver información del curso",
                            style: "width: 18px;cursor:pointer",
                            onclick: "verInfoCurso(\"" + full.DT_RowId + "\")"

                        });
                        img2.addClass("cursor-pointer icono-accion eliminar");
                        span.append(img2);
                        return span.html();
                    }
                },
                {
                    data: '',
                    width: "5%",
                    class: "text-center w10",
                    render: function(data, type, full, meta) {
                        var span = $("<span/>");
                        var img = $("<i/>");
                        img.attr({
                            id: "mod_" + full.DT_RowId,
                            class: "fas fa-location-arrow",
                            title: "Ir al curso",
                            style: "width: 20px;cursor:pointer;transform: rotate(45deg)",
                            onclick: "irCurso(\"" + full.DT_RowId + "\")"
                        });
                        img.addClass("cursor-pointer icono-accion editar");
                        span.append(img);
                        return span.html();
                    }
                },
                { data: 'id_curso', width: "10%", class: "text-right w10" },
                { data: 'nombre', width: "40%", class: "text-right w10" },
                { data: 'description', width: "40%", class: "text-right w10" }

            ],
            language: {
                sProcessing: "Procesando...",
                sLengthMenu: "<label style='margin:5px 5px 0 5px;'>Ver</label>" + '<select style="width:45px;height: 25px;">' +
                    '<option value="10">10</option>' +
                    '<option value="20">20</option>' +
                    '<option value="50">50</option>' +
                    '</select>',
                sZeroRecord: "No se encontraron resultados",
                sEmptyTable: "No se encontraron registros",
                sInfo: "_TOTAL_ registros encontrados",
                sInfoEmpty: "No se encontraron registros",
                sInfoFiltered: "(Filtrado de un total de _MAX_ registros)",
                sInfoPostFix: "",
                sSearch: "Buscar:",
                sUrl: "",
                sInfoThousands: ",",
                sLoadingRecords: "Cargando...",
                oPaginate: {
                    sFirst: "Primero",
                    sLast: "Ãšltimo",
                    sNext: "Siguiente",
                    sPrevious: "Anterior"
                },
                oAria: {
                    sSortAscending: ": Activar para ordenar la columna de manera ascendente",
                    sSortDescending: ": Activar para ordenar la columna de manera descendente"
                }
            },
            lengthMenu: [
                [10, 20, 50],
                [10, 20, 50]
            ]
        });
    } else {
        datatableCurso.ajax.reload(null, false);
    }

}

function verInfoCurso(id) {
    $("#textCardMaterias").html("");
    $("#textCardActividades").html("");
    $("#textCardDocente").html("");
    $("#textCardParticipantes").html("");
    var data = datatableCurso.row("#" + id).data();
    console.log(data);
    $("#modalInfoCurso").modal("show");
    $("#titulo").html("Informacion del curso " + "<span>" + data.nombre + "</span>");
    $.ajax({
        url: "CursosEstudiante/verInfo",
        dataType: 'json',
        type: "POST",
        data: {
            accion: 1,
            _token: token,
            idCurso: data.id_curso

        },
        success: function(data) {
            /* textCardMaterias */
            var x = $("<div/>");
            var ulMaterias = $("<ul/>");
            var materiasArray = [];
            if (data.data.length === 0) {
                $("#textCardMaterias").append("<span>Sin materias asignadas al momento.</span>");
            } else {
                $(data.data).each(function(i, o) {
                    var li = $("<li/>");
                    li.append("<span id='materia_" + o.idMateria + "'>" + o.nombre + "</span>");
                    ulMaterias.append(li);
                });
                x.append(ulMaterias);
                $("#textCardMaterias").append(x);
            }
            var xAct = $("<div/>");
            var ulActivi = $("<ul/>");
            if (data.dataActividades.length === 0) {
                $("#textCardActividades").append("<span>Sin actividades asignadas al momento.</span>");
            } else {
                $(data.dataActividades).each(function(i, o) {
                    var li = $("<li/>");
                    li.append("<span id='actividad_" + o.idActividad + "'>" + o.nombreActividad + " pertenece a Materia " + o.nombreMateria + " </span>");
                    ulActivi.append(li);
                });
                xAct.append(ulActivi);
                $("#textCardActividades").append(xAct);
            }


            var xDoce = $("<div/>");
            var ulDoce = $("<ul/>");
            if (data.dataDocente.length === 0) {
                $("#textCardDocente").append("<span>Sin docente asignado al momento.</span>");
            } else {
                $(data.dataDocente).each(function(i, o) {
                    var li = $("<li/>");
                    li.append("<span id='docente_" + o.idUser + "'>" + o.nameUser + "</span>");
                    ulDoce.append(li);
                });
                xDoce.append(ulDoce);
                $("#textCardDocente").append(xDoce);
            }


            var xEst = $("<div/>");
            var ulEst = $("<ul/>");
            if (data.dataEstudiante.length === 0) {
                $("#textCardParticipantes").append("<span>Sin participantes asignado al momento.</span>");
            } else {
                $(data.dataEstudiante).each(function(i, o) {
                    var li = $("<li/>");
                    li.append("<span id='estudiante" + o.idUser + "'>" + o.nameUser + "</span>");
                    ulEst.append(li);
                });
                xEst.append(ulEst);
                $("#textCardParticipantes").append(xEst);
            }


        }
    });

}