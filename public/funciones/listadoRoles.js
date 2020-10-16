var datatableRol = null;
var token = $('[name="_token"]').val();
var idActual = null;

$(document).ready(function() {
    listadoRoles();
    iniciar();
});

function iniciar() {
    $("#actualizarDatos").on("click", function() {
        editarDatos(idActual);
    });
    $("#crearRol").on("click", function() {
        $("#nombreRolInput").val("");
        $("#descripcionRolInput").val("");
        $("#titulo").html("Crear Rol");
        $("#subtitulo").html("Ingrese la Información del Rol a crear");
        $("#actualizarDatos").addClass("oculto");
        $("#guardarDatos").removeClass("oculto");
        $("#editRolModal").modal("show");
    });
    $("#guardarDatos").on("click", function() {
        crearRol();
    });
}


function listadoRoles() {
    if (datatableRol === null) {
        datatableRol = $("#tableRoles").DataTable({
            ajax: {
                /*  url: "/Usuarios/listar", */
                url: $('#tableRoles').data('route'),
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
                            onclick: "eliminarRol(\"" + full.DT_RowId + "\")"

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
                            onclick: "editarRol(\"" + full.DT_RowId + "\")"
                        });
                        img.addClass("cursor-pointer icono-accion editar");
                        span.append(img);
                        return span.html();
                    }
                },
                { data: 'id_rol', width: "10%", class: "text-right w10" },
                { data: 'nombre', width: "45%", class: "text-right w10" },
                { data: 'description', width: "45%", class: "text-right w10" },

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
        datatableRol.ajax.reload(null, false);
    }
}

function eliminarRol(id) {
    var data = datatableRol.row("#" + id).data();
    console.log(data);
    Swal.fire({
        title: 'Eliminar',
        text: 'Esta seguro de eliminar el rol ' + data.nombre + '?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Eliminar',
        cancelButtonText: 'No, Mantener'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: "Roles/eliminar",
                dataType: 'json',
                type: "POST",
                data: { accion: 1, _token: token, idRol: data.id_rol },
                success: function(data) {
                    console.log(data.usado);
                    if (data.usado) {
                        Swal.fire(
                            'Error!',
                            'No se puede eliminar el Rol este esta siendo utilizado !',
                            'error'
                        )
                        datatableRol.ajax.reload(null, false);
                    } else {
                        datatableRol.ajax.reload(null, false);
                        Swal.fire(
                            'Eliminado!',
                            'Se ha eliminado el Rol correctamente !',
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

function editarRol(id) {
    var data = datatableRol.row("#" + id).data();
    console.log(data);
    $("#nombreRolInput").val(data.nombre);
    $("#descripcionRolInput").val(data.description);
    $("#actualizarDatos").removeClass("oculto");
    $("#guardarDatos").addClass("oculto");
    $("#titulo").html("Editar Rol " + "<span>" + data.nombre + "</span>");
    $("#subtitulo").html("Información a editar del Rol");
    $("#editRolModal").modal("show");
    idActual = id;
}

function editarDatos(id) {
    var data = datatableRol.row("#" + id).data();
    console.log(data);
    Swal.fire({
        title: 'Editar',
        text: 'Esta seguro de editar el Rol ' + data.nombre + '?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Editar',
        cancelButtonText: 'No, Mantener'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: "Roles/editar",
                dataType: 'json',
                type: "POST",
                data: {
                    accion: 1,
                    _token: token,
                    idRol: data.id_rol,
                    nombre: $("#nombreRolInput").val(),
                    description: $("#descripcionRolInput").val()

                },
                success: function(data) {
                    datatableRol.ajax.reload(null, false);
                    $("#editRolModal").modal("hide");
                    Swal.fire(
                        'Editado!',
                        'Se ha Editado el Rol correctamente !',
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

function crearRol() {
    var nombreRol = $("#nombreRolInput").val();
    var descriptionRol = $("#descripcionRolInput").val();
    var errores = [];
    if (/["']/gi.test(nombreRol)) {
        errores.push("- El nombre contiene caracteres no validos");
    }
    if (nombreRol.length < 0) {
        errores.push("-el nombre del usuario no puede quedar vacio");
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
        url: "Roles/crear",
        dataType: 'json',
        type: "POST",
        data: {
            accion: 1,
            _token: token,
            nombreRol: nombreRol,
            descriptionRol: descriptionRol
        },
        success: function(data) {
            datatableRol.ajax.reload(null, false);
            $("#editRolModal").modal("hide");
            Swal.fire(
                'Creado!',
                'Se ha Creado el Rol correctamente !',
                'success'
            )
        }
    });
    console.log("hola");
}