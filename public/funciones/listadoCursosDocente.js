var datatableCurso = null;
var datatableMateria = null;
var datatableAsignacionMateriaCurso = null;
var token = $('[name="_token"]').val();
var idActual = null;


$(document).ready(function() {
    listadoCursos();
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
    $("#actualizarDatos").on("click", function() {
        editarDatos(idActual);
    });
    $("#crearCurso").on("click", function() {
        $("#user").html("");
        $("#nombreInput").val("");
        $("#descripcionInput").val("");
        /*    $("#usuarioInput").val(""); */
        $("#actualizarDatos").addClass("oculto");
        $("#guardarDatos").removeClass("oculto");
        $("#titulo").html("Crear Curso");
        $("#subtitulo").html("Ingrese la Información del Curso a crear");
        $("#editCursoModal").modal("show");
    });
    $("#guardarDatos").on("click", function() {
        crearCurso();
    });
}

function listadoCursos() {
    spinner();
    if (datatableCurso === null) {
        datatableCurso = $("#tableCursos").DataTable({
            ajax: {
                url: $('#tableCursos').data('route'),
                header: { 'X-CSRF-TOKEN': token },
                type: "POST",
                data: function(d) {
                    d.accion = 1;
                    d._token = token;
                    d.idUserDocente = $("#idUser").val();
                },
                dataSrc: "data"
            },
            drawCallback: function(settings) {
                spinner(false);
            },
            preDrawCallback: function(settings) {
                spinner();
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
                            onclick: "eliminarCurso(\"" + full.DT_RowId + "\")"

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
                            onclick: "editarCurso(\"" + full.DT_RowId + "\")"
                        });
                        img.addClass("cursor-pointer icono-accion editar");
                        span.append(img);
                        return span.html();
                    }
                },
                { data: 'id_curso', width: "5%", class: "text-right w10" },
                { data: 'nombre', width: "20%", class: "text-right w10" },
                { data: 'description', width: "20%", class: "text-right w10" },
                {
                    data: '',
                    width: "15%",
                    class: "text-center w10",
                    render: function(data, type, full, meta) {
                        var span = $("<span/>");
                        var boton = $("<button/>");
                        boton.html("Asignar Materias");
                        boton.attr({
                            id: "materias" + full.DT_RowId,
                            class: "btn btn-primary",
                            title: "Asignar materias a curso",
                            style: "cursor:pointer",
                            onclick: "asignarMaterias(\"" + full.DT_RowId + "\")"
                        });
                        span.append(boton);
                        return span.html();

                    }
                },
                {
                    data: '',
                    width: "15%",
                    class: "text-center w10",
                    render: function(data, type, full, meta) {
                        var span = $("<span/>");
                        var boton = $("<button/>");
                        boton.html("Ver Materias");
                        boton.attr({
                            id: "materias" + full.DT_RowId,
                            class: "btn btn-primary",
                            title: "Ver materias",
                            style: "cursor:pointer",
                            onclick: "verMaterias(\"" + full.DT_RowId + "\")"
                        });
                        span.append(boton);
                        return span.html();

                    }
                },
                {
                    data: '',
                    width: "20%",
                    class: "text-center w10",
                    render: function(data, type, full, meta) {
                        var span = $("<span/>");
                        var boton = $("<button/>");
                        boton.html("Asignar Estudiantes");
                        boton.attr({
                            id: "materias" + full.DT_RowId,
                            class: "btn btn-primary",
                            title: "Asignar Estudiantes a curso",
                            style: "cursor:pointer",
                            onclick: "asignarParticipantes(\"" + full.DT_RowId + "\")"
                        });
                        span.append(boton);
                        return span.html();

                    }
                }


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

function eliminarCurso(id) {
    var data = datatableCurso.row("#" + id).data();
    console.log(data);
    Swal.fire({
        title: 'Eliminar',
        text: 'Esta seguro de eliminar el curso ' + data.nombre + '?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Eliminar',
        cancelButtonText: 'No, Mantener'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: "CursosDocente/eliminar",
                dataType: 'json',
                type: "POST",
                data: { accion: 1, _token: token, idCurso: data.id_curso, idUserDocente: $("#idUser").val() },
                success: function(data) {
                    console.log(data.usado);
                    if (data.usado) {
                        Swal.fire(
                            'Error!',
                            'No se puede eliminar el curso este esta siendo utilizado !',
                            'error'
                        )
                        datatableCurso.ajax.reload(null, false);
                    } else {
                        Swal.fire(
                            'Eliminado!',
                            'Se ha eliminado el Usuario correctamente !',
                            'success'
                        )
                        datatableCurso.ajax.reload(null, false);
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

function editarCurso(id) {
    var data = datatableCurso.row("#" + id).data();
    console.log(data);
    $("#nombreInput").val(data.nombre);
    $("#descripcionInput").val(data.description);
    /*  $("#usuarioInput").val(data.usuario); */
    $("#actualizarDatos").removeClass("oculto");
    $("#guardarDatos").addClass("oculto");
    $("#titulo").html("Editar Curso " + "<span>" + data.nombre + "</span>");
    $("#subtitulo").html("Información a editar del curso");
    $("#editCursoModal").modal("show");
    idActual = id;
}

function editarDatos(id) {
    var data = datatableCurso.row("#" + id).data();
    console.log(data);
    Swal.fire({
        title: 'Editar',
        text: 'Esta seguro de editar el Curso ' + data.nombre + '?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Editar',
        cancelButtonText: 'No, Mantener'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: "CursosDocente/editar",
                dataType: 'json',
                type: "POST",
                data: {
                    accion: 1,
                    _token: token,
                    idCurso: data.id_curso,
                    idUserDocente: $("#idUser").val(),
                    nombre: $("#nombreInput").val(),
                    description: $("#descripcionInput").val()

                },
                success: function(data) {
                    datatableCurso.ajax.reload(null, false);
                    $("#editCursoModal").modal("hide");
                    Swal.fire(
                        'Editado!',
                        'Se ha Editado el Curso correctamente !',
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

function crearCurso() {
    var nombre = $("#nombreInput").val();
    var descripcion = $("#descripcionInput").val();
    /*   var usuario = $("#usuarioInput").val(); */
    var errores = [];
    if (/["']/gi.test(nombre)) {
        errores.push("- El nombre contiene caracteres no validos");
    }
    /* if (/["']/gi.test(usuario)) {
        errores.push("- el usuario  contiene caracteres no validos");
    } */
    if (nombre.length < 0) {
        errores.push("-el nombre del curso no puede quedar vacio");
    }
    /* if (usuario.length < 0) {
        errores.push("-la usuario no puede quedar vacio");
    } */
    console.log(errores);
    if (errores.length > 0) {
        Swal.fire(
            'Error',
            "El registro no se pudo realizar. Se detectaron los siguientes errores:<br/><br/>" + errores.join("<br/>"),
            'error'
        )
        return;
    }
    $.ajax({
        url: "CursosDocente/crear",
        dataType: 'json',
        type: "POST",
        data: {
            accion: 1,
            _token: token,
            nombre: $("#nombreInput").val(),
            description: $("#descripcionInput").val(),
            idUserDocente: $("#idUser").val(),
        },
        success: function(data) {
            datatableCurso.ajax.reload(null, false);
            $("#editCursoModal").modal("hide");
            Swal.fire(
                'Creado!',
                'Se ha Creado el Curso correctamente !',
                'success'
            )
        }
    });
    console.log("hola");
}

function verMaterias(id) {
    spinner();
    var dataCurso = datatableCurso.row("#" + id).data();
    $("#tituloModalMateria").html("Materias del curso " + "<span>" + dataCurso.nombre + "</span>");
    $("#verMaterias").modal("show");
    datatableMateria = $("#tableMaterias").DataTable({
        ajax: {
            url: $('#tableMaterias').data('route'),
            header: { 'X-CSRF-TOKEN': token },
            type: "POST",
            data: function(d) {
                d.accion = 1;
                d._token = token;
                d.idUserDocente = $("#idUser").val();
                d.idCurso = dataCurso.id_curso
            },
            dataSrc: "data"
        },
        drawCallback: function(settings) {
            spinner(false);
        },
        preDrawCallback: function(settings) {
            spinner();
        },
        serverSide: true,
        ordering: false,
        processing: true,
        destroy: true,
        dom: '<"fondoGris"<"row"<"col-1"><"col-8 paginateTop paginateCenter"ip><"col-3 lengthTop"l>>>tr<"fondoGrisAbajo"<"row"<"col-1"><"col-8 paginateTop paginateCenter"ip><"col-3">>>',
        autoWidth: false,
        columns: [
            { data: 'id_materia', width: "5%", class: "text-center w10" },
            { data: 'nombreMateria', width: "5%", class: "text-center w10" },
            {
                data: '',
                width: "5%",
                class: "text-center w10",
                render: function(data, type, full, meta) {
                    var span = $("<span/>");
                    var boton = $("<button/>");
                    boton.html("Ir a Materia");
                    boton.attr({
                        id: "materia" + full.DT_RowId,
                        class: "btn btn-primary",
                        title: "Ir a materia",
                        style: "cursor:pointer",
                        onclick: "irMateria (" + full.DT_RowId + "," + dataCurso.id_curso + ")"
                    });
                    span.append(boton);
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

}

function irMateria(idMateria, id_curso) {
    $.ajax({
        url: "CursosDocente/irMateria",
        dataType: 'json',
        type: "POST",
        data: {
            accion: 1,
            _token: token,
            nombre: $("#nombreInput").val(),
            idMateria: idMateria,
            idCurso: id_curso,
            idUserDocente: $("#idUser").val(),
        },
        success: function(data) {
            window.location.href = "/Curso/verMateriaCurso";
        }
    });
}

function asignarMaterias(idCurso) {
    spinner();
    var data = datatableCurso.row("#" + idCurso).data();
    console.log(data);
    $("#tituloModalAsignacion").html("Asignación de Materias.");
    $("#subtituloModalAsignacion").html("Asignar Materias para el curso " + data.nombre);
    $("#asignarMateriasCurso").modal("show");

    datatableAsignacionMateriaCurso = $("#tableAsignacionMaterias").DataTable({
        ajax: {
            url: $('#tableAsignacionMaterias').data('route'),
            header: { 'X-CSRF-TOKEN': token },
            type: "POST",
            data: function(d) {
                d.accion = 1;
                d._token = token;
                d.idCurso = idCurso;
                d.idUser = $("#idUser").val();
            },
            dataSrc: "data"
        },
        drawCallback: function(settings) {
            spinner(false);
        },
        preDrawCallback: function(settings) {
            spinner();
        },
        serverSide: true,
        ordering: false,
        processing: false,
        destroy: true,
        dom: '<"fondoGris"<"row"<"col-1"><"col-8 paginateTop paginateCenter"ip><"col-3 lengthTop"l>>>tr<"fondoGrisAbajo"<"row"<"col-1"><"col-8 paginateTop paginateCenter"ip><"col-3">>>',
        autoWidth: false,
        columns: [{
                data: 'asignar',
                width: "5%",
                class: "text-center w10",
                render: function(data, type, full, meta) {
                    if (data === 1) {
                        return "<input checked class='toggle-demo' onchange='vincularMateriaCurso(\"" + full.DT_RowId + "\",\"" + idCurso + "\",\"Desvincular\")' data-toggle='toggle' data-onstyle='success' type='checkbox' data-on='Activo' data-size='mini' data-off='Inactivo' data-style='checkToggle'>";
                    } else {
                        return "<input class='toggle-demo' onchange='vincularMateriaCurso(\"" + full.DT_RowId + "\",\"" + idCurso + "\",\"Vincular\")' data-toggle='toggle' data-onstyle='success' type='checkbox' data-on='Activo' data-size='mini' data-off='Inactivo' data-style='checkToggle'>";
                    }
                }
            },
            {
                data: 'materia',
                width: "5%",
                class: "text-left w10",
                render: function(data, type, full, meta) {

                    return data;
                }
            },
        ],
        fnDrawCallback: function() {
            $('.toggle-demo').bootstrapToggle();
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

function vincularMateriaCurso(idMateria, idCurso, opcion) {
    console.log(idMateria, idCurso, opcion);
    spinner();
    $.ajax({
        url: "CursosDocente/vincularMateriaCurso",
        dataType: 'json',
        type: "POST",
        data: {
            accion: 1,
            _token: token,
            idMateria: idMateria,
            idCurso: idCurso,
            opcion: opcion
        },
        success: function(data) {
            datatableAsignacionMateriaCurso.draw(false);
            spinner(false);
            /*  $("#verRolesUsuario").modal("hide"); */
            Swal.fire(
                'Exito!',
                'Se ha actualizado  correctamente !',
                'success'
            )
        }
    });
}
/* siguiente codigo es para asignar estudiantes a un curso , este proceso lo hace un docente  */
function asignarParticipantes(idCurso) {
    var data = datatableCurso.row("#" + idCurso).data();
    $("#modalAsignarParticipantesEstu").modal("show");
    $("#tituloAsignarEstu").text("Asignar participantes al curso " + data.nombre);
    $("#subtituloAsignarEstu").text("Asignar estudiantes al curso");
    spinner();
    datatableEstudiantes = $("#tableEstudiantes").DataTable({
        ajax: {
            /*  url: "/Usuarios/listar", */
            url: $('#tableEstudiantes').data('route'),
            header: { 'X-CSRF-TOKEN': token },
            type: "POST",
            data: function(d) {
                d.accion = 1;
                d._token = token;
                d.idCurso = idCurso;
            },
            dataSrc: "data"
        },
        drawCallback: function(settings) {
            spinner(false);
        },
        serverSide: true,
        ordering: false,
        processing: true,
        destroy: true,
        dom: '<"fondoGris"<"row"<"col-1"><"col-8 paginateTop paginateCenter"ip><"col-3 lengthTop"l>>>tr<"fondoGrisAbajo"<"row"<"col-1"><"col-8 paginateTop paginateCenter"ip><"col-3">>>',
        autoWidth: false,
        columns: [{
                data: 'asignar',
                width: "20%",
                class: "text-center w10",
                render: function(data, type, full, meta) {
                    if (data === 1) {
                        return "<input checked class='toggle-demo' onchange='vincularUserEst(\"" + full.DT_RowId + "\",\"" + idCurso + "\",\"Desvincular\")' data-toggle='toggle' data-onstyle='success' type='checkbox' data-on='Activo' data-size='mini' data-off='Inactivo' data-style='checkToggle'>";
                    } else {
                        return "<input class='toggle-demo' onchange='vincularUserEst(\"" + full.DT_RowId + "\",\"" + idCurso + "\",\"Vincular\")' data-toggle='toggle' data-onstyle='success' type='checkbox' data-on='Activo' data-size='mini' data-off='Inactivo' data-style='checkToggle'>";
                    }
                }
            },
            {
                data: 'usuario',
                width: "80%",
                class: "text-center w10",
                render: function(data, type, full, meta) {

                    return data;
                }
            }
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
}

function vincularUserEst(idUser, idCurso, opcion) {
    console.log(idUser, idCurso, opcion);
    spinner();
    $.ajax({
        url: "Cursos/vincularUser",
        dataType: 'json',
        type: "POST",
        data: {
            accion: 1,
            _token: token,
            idUser: idUser,
            idCurso: idCurso,
            opcion: opcion
        },
        success: function(data) {
            datatableEstudiantes.draw(false);
            spinner(false);
            /*  $("#verRolesUsuario").modal("hide"); */
            Swal.fire(
                'Exito!',
                'Se ha modificado correctamente !',
                'success'
            )
        }
    });
}