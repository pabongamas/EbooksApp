var datatableCurso = null;
var datatableDocentes = null;
var datatableEstudiantes = null;
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
    if (datatableCurso === null) {
        datatableCurso = $("#tableCursos").DataTable({
            ajax: {
                /*  url: "/Usuarios/listar", */
                url: $('#tableCursos').data('route'),
                header: { 'X-CSRF-TOKEN': token },
                type: "POST",
                data: function(d) {
                    d.accion = 1;
                    d._token = token;
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
                { data: 'id_curso', width: "10%", class: "text-right w10" },
                { data: 'nombre', width: "40%", class: "text-right w10" },
                { data: 'description', width: "40%", class: "text-right w10" },
                {
                    data: '',
                    width: "5%",
                    class: "text-center w10",
                    render: function(data, type, full, meta) {
                        var span = $("<span/>");
                        var img = $("<i/>");
                        img.attr({
                            id: "asignar_" + full.DT_RowId,
                            class: "fas fa-sign-out-alt",
                            title: "Asignar participantes",
                            style: "width: 20px;cursor:pointer",
                            onclick: "asignarParticipantes(\"" + full.DT_RowId + "\")"
                        });
                        img.addClass("cursor-pointer icono-accion editar");
                        span.append(img);
                        return span.html();
                    }
                },
                /*  { data: 'usuario', width: "28%", class: "text-right w10" } */

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
                url: "Cursos/eliminar",
                dataType: 'json',
                type: "POST",
                data: { accion: 1, _token: token, idCurso: data.id_curso },
                success: function(data) {
                    console.log(data.usado);
                    if (data.usado) {
                        Swal.fire(
                            'Error!',
                            'No se puede eliminar el Curso este esta siendo utilizado !',
                            'error'
                        )
                        datatableCurso.ajax.reload(null, false);
                    } else {
                        datatableCurso.ajax.reload(null, false);
                        Swal.fire(
                            'Eliminado!',
                            'Se ha eliminado el Curso correctamente !',
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
                url: "Cursos/editar",
                dataType: 'json',
                type: "POST",
                data: {
                    accion: 1,
                    _token: token,
                    idCurso: data.id_curso,
                    nombre: $("#nombreInput").val(),
                    description: $("#descripcionInput").val()
                        /* usuario: $("#usuarioInput").val() */
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

    if (nombre.length == "") {
        errores.push("-el nombre del usuario no puede quedar vacio");
    }

    if (descripcion.length == "") {
        errores.push("-La descripcion del usuario no puede quedar vacio");
    }
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
        url: "Cursos/crear",
        dataType: 'json',
        type: "POST",
        data: {
            accion: 1,
            _token: token,
            nombre: $("#nombreInput").val(),
            description: $("#descripcionInput").val()
                /*    usuario: $("#usuarioInput").val() */
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

function asignarParticipantes(idCurso) {
    var data = datatableCurso.row("#" + idCurso).data();
    $("#modalAsignarParticipantes").modal("show");
    $("#tituloAsignar").text("Asignar participantes al curso " + data.nombre);
    $("#subtituloAsignar").text("Asignar docentes y estudiantes al curso");
    spinner();
    datatableDocentes = $("#tableDocentes").DataTable({
        ajax: {
            /*  url: "/Usuarios/listar", */
            url: $('#tableDocentes').data('route'),
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
                        return "<input checked class='toggle-demo' onchange='vincularUser(\"" + full.DT_RowId + "\",\"" + idCurso + "\",\"Desvincular\")' data-toggle='toggle' data-onstyle='success' type='checkbox' data-on='Activo' data-size='mini' data-off='Inactivo' data-style='checkToggle'>";
                    } else {
                        return "<input class='toggle-demo' onchange='vincularUser(\"" + full.DT_RowId + "\",\"" + idCurso + "\",\"Vincular\")' data-toggle='toggle' data-onstyle='success' type='checkbox' data-on='Activo' data-size='mini' data-off='Inactivo' data-style='checkToggle'>";
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
                        return "<input checked class='toggle-demo' onchange='vincularUser(\"" + full.DT_RowId + "\",\"" + idCurso + "\",\"Desvincular\")' data-toggle='toggle' data-onstyle='success' type='checkbox' data-on='Activo' data-size='mini' data-off='Inactivo' data-style='checkToggle'>";
                    } else {
                        return "<input class='toggle-demo' onchange='vincularUser(\"" + full.DT_RowId + "\",\"" + idCurso + "\",\"Vincular\")' data-toggle='toggle' data-onstyle='success' type='checkbox' data-on='Activo' data-size='mini' data-off='Inactivo' data-style='checkToggle'>";
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

function vincularUser(idUser, idCurso, opcion) {
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