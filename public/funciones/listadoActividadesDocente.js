var datatableActividadesDocente = null;
var token = $('[name="_token"]').val();
var idActividadActual = null;
var idMateriaActual = null;
var idCursoActual = null;

$(document).ready(function() {
    listadoActividadesDocente();
    iniciar();
});

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

function iniciar() {
    cargarMateriaSelect();
    $("#crearActividadDocente").on("click", function() {
        $("#tituloCrearM").text("Crear Actividad");
        $("#subtituloCrearM").text("Ingrese la información de la Actividad a crear");
        $("#crearActividadDocentes").modal("show");
    });
    $("#guardarDatos").on("click", function() {
        validarDatos();
    });
    $("#actualizarDatos").on("click", function() {
        editarDatos(idActividadActual, idMateriaActual, idCursoActual);
    });
}

function listadoActividadesDocente() {
    spinner();
    if (datatableActividadesDocente === null) {
        spinner();
        datatableActividadesDocente = $("#tableActividadesDocente").DataTable({
            ajax: {
                url: $('#tableActividadesDocente').data('route'),
                header: { 'X-CSRF-TOKEN': token },
                type: "POST",
                data: function(d) {
                    d.accion = 1;
                    d._token = token;
                    d.idUser = $("#idUser").val();
                },
                dataSrc: "data"
            },
            drawCallback: function(settings) {
                spinner(false);
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
                            class: "fas fa-user-times",
                            title: "Eliminar",
                            style: "width: 18px;cursor:pointer",
                            onclick: "eliminarActividad(\"" + full.idActividad + "\",\"" + full.idMateria + "\",\"" + full.idCurso + "\")"

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
                            class: "fas fa-pencil-alt",
                            title: "Editar",
                            style: "width: 20px;cursor:pointer",
                            onclick: "editarActividad(\"" + full.idActividad + "\",\"" + full.idMateria + "\",\"" + full.idCurso + "\")"
                        });
                        img.addClass("cursor-pointer icono-accion editar");
                        span.append(img);
                        return span.html();
                    }
                },
                /* { data: 'idActividad', width: "10%", class: "text-right w10" }, */
                { data: 'actividadName', width: "25%", class: "text-right w10" },
                { data: 'descripcionActividad', width: "25%", class: "text-right w10" },
                { data: 'materiaNombre', width: "20%", class: "text-right w10" },
                { data: 'cursoNombre', width: "20%", class: "text-right w10" },
                {
                    data: '',
                    width: "5%",
                    class: "text-center w10",
                    render: function(data, type, full, meta) {
                        var span = $("<span/>");
                        var img = $("<i/>");
                        img.attr({
                            id: "mod_" + full.DT_RowId,
                            class: "fas fa-user-graduate",
                            title: "Ver estudiantes de actividad " + full.actividadName,
                            style: "width: 40px;cursor:pointer;color:#a5dc64",
                            onclick: "verEstudiantesActividad(\"" + full.idActividad + "\",\"" + full.idMateria + "\",\"" + full.idCurso + "\")"
                        });
                        img.addClass("cursor-pointer icono-accion editar");
                        span.append(img);
                        return span.html();
                    }
                },

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
        datatableActividadesDocente.ajax.reload(null, false);
    }

}

function validarDatos() {
    var errores = new Array();
    var inputActividad = $("#nombreInput").val();
    var descripcionActividad = $("#descripcionInput").val();
    var materia = $("#materias").val();
    if (inputActividad == "") {
        errores.push("-- El nombre de la actividad  es obligatorio.");
    }
    if (descripcionActividad == "") {
        errores.push("-- La descripcion de la actividad  es obligatorio.");
    }
    if (materia == 0) {
        errores.push("-- Seleccione la materia , si no hay registradas creela en el modulo de listado de materias");
    }
    if (errores.length > 0) {
        Swal.fire(
            'Error!',
            'Se detectaron los siguientes errores:</b><br/><br/>' + errores.join("<br/>"),
            'error'
        )
        return;
    }
    crerActividadDocente();
}

function crerActividadDocente() {
    $.ajax({
        url: "ActividadesDocente/crearActividadDocente",
        dataType: 'json',
        type: "POST",
        data: {
            accion: 1,
            _token: token,
            idDocente: $("#idUser").val(),
            nombreActividad: $("#nombreInput").val(),
            descActividad: $("#descripcionInput").val(),
            idMateria: $("#materias").val(),
        },
        success: function(data) {
            $("#crearActividadDocentes").modal("hide");
            datatableActividadesDocente.ajax.reload(null, false);
            Swal.fire(
                'Materia Creada!',
                'Se ha creado la actividad correctamente !',
                'success'
            )
        }
    });
}

function eliminarActividad(idActividad, idMateria, idCurso) {
    var data = datatableActividadesDocente.row("#" + idActividad + "_" + idMateria + "_" + idCurso).data();
    console.log(data);
    Swal.fire({
        title: 'Eliminar',
        text: 'Esta seguro de eliminar la actividad ' + data.actividadName + '? , esta tambien se desvinculara de la materia ' + data.materiaNombre + '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Eliminar',
        cancelButtonText: 'No, Mantener'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: "ActividadesDocente/eliminarActividadDocente",
                dataType: 'json',
                type: "POST",
                data: { accion: 1, _token: token, idActividad: idActividad, idMateria: idMateria, idCurso: idCurso },
                success: function(data) {
                    console.log(data.usado);
                    if (data.usado) {
                        Swal.fire(
                            'Error!',
                            'No se puede eliminar la actividad  este esta siendo utilizada !',
                            'error'
                        )
                        datatableActividadesDocente.ajax.reload(null, false);
                    } else {
                        datatableActividadesDocente.ajax.reload(null, false);
                        Swal.fire(
                            'Eliminado!',
                            'Se ha eliminado la actividad y disvinculado la actividad de la materia  correctamente !',
                            'success'
                        )
                    }
                }
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'Cancelado',
                '',
                'error'
            )
        }
    })
}

function editarActividad(idActividad, idMateria, idCurso) {
    var data = datatableActividadesDocente.row("#" + idActividad + "_" + idMateria + "_" + idCurso).data();
    console.log(data);
    $("#nombreInput").val(data.actividadName);
    $("#descripcionInput").val(data.descripcionActividad);
    $("#materias").val(data.idMateria);
    $("#actualizarDatos").removeClass("oculto");
    $("#guardarDatos").addClass("oculto");
    $("#tituloCrearM").html("Editar actividad " + "<span>" + data.actividadName + "</span>");
    $("#subtituloCrearM").html("Información a editar de la actividad");
    $("#crearActividadDocentes").modal("show");
    idActividadActual = idActividad;
    idMateriaActual = idMateria;
    idCursoActual = idCurso;

}

function editarDatos(idActividad, idMateria, idCurso) {
    console.log(idActividad, idMateria, idCurso);
    var data = datatableActividadesDocente.row("#" + idActividad + "_" + idMateria + "_" + idCurso).data();
    console.log(data);
    Swal.fire({
        title: 'Editar',
        text: 'Esta seguro de editar la actividad  ' + data.actividadName + '?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Editar',
        cancelButtonText: 'No, Mantener'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: "ActividadesDocente/editarActividadDocente",
                dataType: 'json',
                type: "POST",
                data: {
                    accion: 1,
                    _token: token,
                    idActividad: data.idActividad,
                    idMateria: data.idMateria,
                    idCurso: data.idCurso,
                    nombreActividad: $("#nombreInput").val(),
                    descripcionActividad: $("#descripcionInput").val(),
                    materiaActividad: $("#materias").val()
                },
                success: function(data) {
                    datatableActividadesDocente.ajax.reload(null, false);
                    $("#crearActividadDocentes").modal("hide");
                    Swal.fire(
                        'Editado!',
                        'Se ha Editado la actividad correctamente !',
                        'success'
                    )
                }
            });

        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'Cancelado',
                '',
                'error'
            )
        }
    })
}

function cargarMateriaSelect() {
    $.ajax({
        url: "ActividadesDocente/cargarMateriaSelect",
        dataType: 'json',
        type: "POST",
        data: {
            accion: 1,
            _token: token,
            idDocente: $("#idUser").val(),
        },
        success: function(data) {
            var codigo;
            var nombre;
            var tipoAplicaPer;
            $(data.data).each(function(indice, objeto) {
                codigo = objeto.idMateria;
                nombre = objeto.nombre;
                var option = $("<option/>");
                option.val(codigo);
                option.html(nombre);
                $("#materias").append(option);
            });
        }
    });

}
/* el siguiente metodo es para cargar los estudiantes vinculados a una actividad */
function verEstudiantesActividad(idActividad, idMateria, idCurso) {
    spinner();
    var data = datatableActividadesDocente.row("#" + idActividad + "_" + idMateria + "_" + idCurso).data();
    console.log(data);
    $("#tituloestudianteActi").html("Estudiantes asociados a la actividad " + data.actividadName);
    $("#subTituloestudianteActi").html("Opcion para visualizar los estudiantes asociados a la actividad.");
    $("#verEstudianteActividad").modal("show");
    datatableEstudianteActividad = $("#tableActividadEstudiante").DataTable({
        ajax: {
            url: $('#tableActividadEstudiante').data('route'),
            header: { 'X-CSRF-TOKEN': token },
            type: "POST",
            data: function(d) {
                d.accion = 1;
                d._token = token;
                d.idActividad = idActividad;
                d.idMateria = idMateria;
                d.idCurso = idCurso;
            },
            dataSrc: "data"
        },
        drawCallback: function(settings) {
            spinner(false);
        },
        serverSide: true,
        ordering: false,
        processing: false,
        destroy: true,
        dom: '<"fondoGris"<"row"<"col-1"><"col-8 paginateTop paginateCenter"ip><"col-3 lengthTop"l>>>tr<"fondoGrisAbajo"<"row"<"col-1"><"col-8 paginateTop paginateCenter"ip><"col-3">>>',
        autoWidth: false,
        columns: [{
                data: '',
                width: "60%",
                class: "text-center w10",
                render: function(data, type, full, meta) {
                    return full.user
                }
            },
            {
                data: '',
                width: "40%",
                class: "text-center w10",
                render: function(data, type, full, meta) {
                    var span = $("<span/>");
                    var boton = $("<button/>");
                    boton.html("Ver info");
                    boton.attr({
                        id: "actividad_" + full.DT_RowId,
                        class: "btn btn-primary",
                        title: "Ver informacion actividad de " + full.user,
                        style: "cursor:pointer",
                        onclick: "verInfoEstudiante(\"" + full.idUser + "\",\"" + full.idActividad + "\",\"" + full.idMateria + "\",\"" + full.idCurso + "\")"
                    });
                    span.append(boton);
                    return span.html();

                }
            }
        ],
        fnDrawCallback: function() {
            spinner(false);
        },
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
}

function verInfoEstudiante(idUser, idActividad, idMateria, idCurso) {
    $.ajax({
        url: "/CursosDocente/verinfoEstudianteActividad",
        dataType: 'json',
        type: "POST",
        data: {
            accion: 1,
            _token: token,
            idActividad: idActividad,
            idMateria: idMateria,
            idCurso: idCurso,
            idUser: idUser
        },
        success: function(data) {
            window.location.href = "/Actividad/verInfoActividadEstudiante";
        }
    });
}