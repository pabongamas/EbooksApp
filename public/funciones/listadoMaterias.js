var datatableMateria = null;
var token = $('[name="_token"]').val();
var idActual = null;


$(document).ready(function() {
    listadoMaterias();
    iniciar();
});

function iniciar() {
    $("#actualizarDatos").on("click", function() {
        editarDatos(idActual);
    });
    $("#crearCurso").on("click", function() {
        $("#user").html("");
        $("#nombreInput").val("");
        $("#descripcionInput").val("");
        $("#actualizarDatos").addClass("oculto");
        $("#guardarDatos").removeClass("oculto");
        $("#titulo").html("Crear Materia");
        $("#subtitulo").html("Ingrese la Información de la Materia a crear");
        $("#editMateriaModal").modal("show");
    });
    $("#guardarDatos").on("click", function() {
        crearMateria();
    });
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

function listadoMaterias() {
    spinner();
    if (datatableMateria === null) {
        spinner();
        datatableMateria = $("#tableMaterias").DataTable({
            ajax: {
                /*  url: "/Usuarios/listar", */
                url: $('#tableMaterias').data('route'),
                header: { 'X-CSRF-TOKEN': token },
                type: "POST",
                data: function(d) {
                    d.accion = 1;
                    d._token = token;
                },
                dataSrc: "data"
            },
            drawCallback: function(settings) {
                spinner(false);
            },
            serverSide: true,
            ordering: false,
            processing: false,
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
                            onclick: "eliminarMateria(\"" + full.DT_RowId + "\")"

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
                            onclick: "editarMateria(\"" + full.DT_RowId + "\")"
                        });
                        img.addClass("cursor-pointer icono-accion editar");
                        span.append(img);
                        return span.html();
                    }
                },
                { data: 'idMateria', width: "10%", class: "text-right w10" },
                { data: 'nombre', width: "40%", class: "text-right w10" },
                { data: 'description', width: "40%", class: "text-right w10" },
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
        datatableMateria.ajax.reload(null, false);
    }
}

function eliminarMateria(id) {
    var data = datatableMateria.row("#" + id).data();
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
                url: "Materias/eliminar",
                dataType: 'json',
                type: "POST",
                data: { accion: 1, _token: token, idMateria: data.idMateria },
                success: function(data) {
                    console.log(data.usado);
                    if (data.usado) {
                        Swal.fire(
                            'Error!',
                            'No se puede eliminar la materia , esta siendo utilizado !',
                            'error'
                        )
                        datatableMateria.ajax.reload(null, false);
                    } else {
                        datatableMateria.ajax.reload(null, false);
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

function editarMateria(id) {
    var data = datatableMateria.row("#" + id).data();
    console.log(data);
    $("#nombreInput").val(data.nombre);
    $("#descripcionInput").val(data.description);
    $("#actualizarDatos").removeClass("oculto");
    $("#guardarDatos").addClass("oculto");
    $("#titulo").html("Editar Materia " + "<span>" + data.nombre + "</span>");
    $("#subtitulo").html("Información a editar de la materia");
    $("#editMateriaModal").modal("show");
    idActual = id;
}

function editarDatos(id) {
    var data = datatableMateria.row("#" + id).data();
    console.log(data);
    Swal.fire({
        title: 'Editar',
        text: 'Esta seguro de editar la materia ' + data.nombre + '?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Editar',
        cancelButtonText: 'No, Mantener'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: "Materias/editar",
                dataType: 'json',
                type: "POST",
                data: {
                    accion: 1,
                    _token: token,
                    idMateria: data.idMateria,
                    nombre: $("#nombreInput").val(),
                    description: $("#descripcionInput").val()

                },
                success: function(data) {
                    datatableMateria.ajax.reload(null, false);
                    $("#editMateriaModal").modal("hide");
                    Swal.fire(
                        'Editado!',
                        'Se ha Editado la Materia correctamente !',
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

function crearMateria() {
    var nombre = $("#nombreInput").val();
    var descripcion = $("#descripcionInput").val();
    var errores = [];
    if (/["']/gi.test(nombre)) {
        errores.push("- El nombre contiene caracteres no validos");
    }
    if (nombre.length == "") {
        errores.push("-el nombre de la materia no puede quedar vacio");
    }
    if (descripcion.length == "") {
        errores.push("-La descripción de la materia no puede quedar vacia");
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
    spinner();
    $.ajax({
        url: "Materias/crear",
        dataType: 'json',
        type: "POST",
        data: {
            accion: 1,
            _token: token,
            nombre: $("#nombreInput").val(),
            description: $("#descripcionInput").val()
        },
        success: function(data) {
            spinner(false);
            datatableMateria.ajax.reload(null, false);
            $("#editMateriaModal").modal("hide");
            Swal.fire(
                'Creado!',
                'Se ha Creado La materia correctamente !',
                'success'
            )
        }
    });
    console.log("hola");
}