var datatableMaterias = null;
var datatableAsignacionAct = null;
var token = $('[name="_token"]').val();
var idActual = null;
var idMateriaActual = null;
var idCursoActual = null;


$(document).ready(function() {
    listadoMaterias();
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
    /*  $("#actualizarDatos").on("click", function() {
         editarDatos(idActual);
     });
     $("#crearCurso").on("click", function() {
         $("#user").html("");
         $("#nombreInput").val("");
         $("#descripcionInput").val("");
         $("#actualizarDatos").addClass("oculto");
         $("#guardarDatos").removeClass("oculto");
         $("#titulo").html("Crear Curso");
         $("#subtitulo").html("Ingrese la Información del Curso a crear");
         $("#editCursoModal").modal("show");
     });
     $("#guardarDatos").on("click", function() {
         crearCurso();
     }); */
    $("#crearMateriaDocente").on("click", function() {
        $("#tituloCrearM").text("Crear materia");
        $("#subtituloCrearM").text("Ingrese la información de la materia a crear");
        $("#nombreInputMateria").val("");
        $("#descripcionInputMateriaDocente").val("");
        $("#selectCursosMateria").val(0);
        $("#crearMateriaCursoModal").modal("show");
    });
    cargarCursoSelect();
    $("#guardarDatosCrear").on("click", function() {
        validarDatos();
    });
    $("#actualizarDatosCrear").on("click", function() {
        editarDatos(idMateriaActual, idCursoActual);
    });
}

function listadoMaterias() {
    spinner();
    if (datatableMaterias === null) {
        spinner();
        datatableMaterias = $("#tableMaterias").DataTable({
            ajax: {
                url: $('#tableMaterias').data('route'),
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
                            onclick: "eliminarMateria(\"" + full.id_materia + "\",\"" + full.idCurso + "\")"

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
                            onclick: "editarMateria(\"" + full.id_materia + "\",\"" + full.idCurso + "\")"
                        });
                        img.addClass("cursor-pointer icono-accion editar");
                        span.append(img);
                        return span.html();
                    }
                },
                { data: 'id_materia', width: "10%", class: "text-right w10" },
                { data: 'nombre', width: "33%", class: "text-right w10" },
                { data: 'description', width: "33%", class: "text-right w10" },
                { data: 'curso', width: "33%", class: "text-right w10" },
                {
                    data: '',
                    width: "10%",
                    class: "text-center w10",
                    render: function(data, type, full, meta) {
                        var span = $("<span/>");
                        var img = $("<i/>");
                        img.attr({
                            id: "mod_" + full.DT_RowId,
                            class: "fas fa-address-card",
                            title: "Asignar actividades a materia",
                            style: "width: 20px;cursor:pointer",
                            onclick: "verActividadesAsignar(\"" + full.id_materia + "\",\"" + full.idCurso + "\")"
                        });
                        img.addClass("cursor-pointer icono-accion editar");
                        span.append(img);
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
        datatableMaterias.ajax.reload(null, false);
    }

}

function eliminarMateria(id, idCurso) {
    var data = datatableMaterias.row("#" + id + "_" + idCurso).data();
    console.log(data);
    Swal.fire({
        title: 'Eliminar',
        text: 'Esta seguro de eliminar la materia ' + data.nombre + '?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Eliminar',
        cancelButtonText: 'No, Mantener'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: "MateriasDocente/eliminar",
                dataType: 'json',
                type: "POST",
                data: { accion: 1, _token: token, idMateria: data.id_materia, idCurso: idCurso, idUserDocente: $("#idUser").val() },
                success: function(data) {
                    console.log(data.usado);
                    if (data.usado) {
                        Swal.fire(
                            'Error!',
                            'No se puede eliminar la materia  esta siendo utilizado !',
                            'error'
                        )
                        datatableMaterias.ajax.reload(null, false);
                    } else {
                        datatableMaterias.ajax.reload(null, false);
                        Swal.fire(
                            'Eliminado!',
                            'Se ha eliminado la materia correctamente !',
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

function editarMateria(idMateria, idCurso) {
    var data = datatableMaterias.row("#" + idMateria + "_" + idCurso).data();
    console.log(data);
    $("#nombreInputMateria").val(data.nombre);
    $("#descripcionInputMateriaDocente").val(data.description);
    $("#selectCursosMateria").val(data.idCurso);
    $("#actualizarDatosCrear").removeClass("oculto");
    $("#guardarDatosCrear").addClass("oculto");
    $("#tituloCrearM").html("Editar materia " + "<span>" + data.nombre + "</span>");
    $("#subtituloCrearM").html("Información a editar de la materia");
    $("#crearMateriaCursoModal").modal("show");
    idMateriaActual = idMateria;
    idCursoActual = idCurso;

}

function editarDatos(idMateria, idCurso) {
    console.log(idMateria, idCurso);
    var data = datatableMaterias.row("#" + idMateria + "_" + idCurso).data();
    console.log(data);
    Swal.fire({
        title: 'Editar',
        text: 'Esta seguro de editar la materia  ' + data.nombre + '?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Editar',
        cancelButtonText: 'No, Mantener'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: "MateriasDocente/editar",
                dataType: 'json',
                type: "POST",
                data: {
                    accion: 1,
                    _token: token,
                    idMateria: data.id_materia,
                    idCurso: idCurso,
                    idUserDocente: $("#idUser").val(),
                    nombreInputMateria: $("#nombreInputMateria").val(),
                    descripcionInputMateriaDocente: $("#descripcionInputMateriaDocente").val(),
                    curso: $("#selectCursosMateria").val()
                },
                success: function(data) {
                    datatableMaterias.ajax.reload(null, false);
                    $("#crearMateriaCursoModal").modal("hide");
                    Swal.fire(
                        'Editado!',
                        'Se ha Editado la materia correctamente !',
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

function verActividadesAsignar(id, idCurso) {
    spinner();
    var data = datatableMaterias.row("#" + id + "_" + idCurso).data();
    console.log(data);
    $("#tituloAsignacion").html("Asignación de actividades.");
    $("#subtituloAsignacion").html("Asignar actividades para la  Materia " + data.nombre);
    $("#asignacionActividades").modal("show");
    datatableAsignacionAct = $("#tableAsignacion").DataTable({
        ajax: {
            url: $('#tableAsignacion').data('route'),
            header: { 'X-CSRF-TOKEN': token },
            type: "POST",
            data: function(d) {
                d.accion = 1;
                d._token = token;
                d.idMateria = data.id_materia;
                d.idCurso = data.idCurso;
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
                data: 'asignar',
                width: "5%",
                class: "text-center w10",
                render: function(data, type, full, meta) {
                    if (data === 1) {
                        return "<input checked class='toggle-demo' onchange='vincularActividad(\"" + full.DT_RowId + "\",\"" + id + "\",\"Desvincular\")' data-toggle='toggle' data-onstyle='success' type='checkbox' data-on='Activo' data-size='mini' data-off='Inactivo' data-style='checkToggle'>";
                    } else {
                        return "<input class='toggle-demo' onchange='vincularActividad(\"" + full.DT_RowId + "\",\"" + id + "\",\"Vincular\")' data-toggle='toggle' data-onstyle='success' type='checkbox' data-on='Activo' data-size='mini' data-off='Inactivo' data-style='checkToggle'>";
                    }
                }
            },
            {
                data: 'actividad',
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

function vincularActividad(idActividad, idMateria, opcion) {
    console.log(idActividad, idMateria, opcion);
    spinner();
    $.ajax({
        url: "MateriasDocente/vincularActividad",
        dataType: 'json',
        type: "POST",
        data: {
            accion: 1,
            _token: token,
            idActividad: idActividad,
            idMateria: idMateria,
            opcion: opcion
        },
        success: function(data) {
            datatableAsignacionAct.draw(false);
            spinner(false);
            /*  $("#verRolesUsuario").modal("hide"); */
            /*    Swal.fire(
                   'Exito!',
                   'Se ha modificado el rol correctamente !',
                   'success'
               ) */
        }
    });
}

function cargarCursoSelect() {
    $.ajax({
        url: "MateriasDocente/cargarCursoSelect",
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
                codigo = objeto.idCurso;
                nombre = objeto.nombre;
                var option = $("<option/>");
                option.val(codigo);
                option.html(nombre);
                $("#selectCursosMateria").append(option);
            });
        }
    });
}

function validarDatos() {
    var errores = new Array();
    var inputMateria = $("#nombreInputMateria").val();
    var selectCurso = $("#selectCursosMateria").val();
    if (inputMateria == "") {
        errores.push("-- El nombre de la materia  es obligatorio.'");
    }
    if (selectCurso == 0) {
        errores.push("-- El curso  es obligatorio.'");
    }
    if (errores.length > 0) {
        Swal.fire(
            'Error!',
            'Se detectaron los siguientes errores:</b><br/><br/>' + errores.join("<br/>"),
            'error'
        )
        return;
    }
    crerMateriaCurso();



}

function crerMateriaCurso() {
    $.ajax({
        url: "MateriasDocente/crearMateriaDocenteCurso",
        dataType: 'json',
        type: "POST",
        data: {
            accion: 1,
            _token: token,
            idDocente: $("#idUser").val(),
            nombreMateria: $("#nombreInputMateria").val(),
            descripcionMateria: $("#descripcionInputMateriaDocente").val(),
            cursoId: $("#selectCursosMateria").val()
        },
        success: function(data) {
            $("#crearMateriaCursoModal").modal("hide");
            datatableMaterias.ajax.reload(null, false);
            Swal.fire(
                'Materia Creada!',
                'Se ha creado la materia correctamente !',
                'success'
            )
        }
    });
}