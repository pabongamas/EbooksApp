var datatableUsuario = null;
var datatableUserRoles = null;
var token = $('[name="_token"]').val();
var idActual = null;

$(document).ready(function() {
    listadoUsuarios();
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
    $("#crearUsuario").on("click", function() {
        $("#user").html("");
        $("#nombreInput").val("");
        $("#emailInput").val("");
        $("#usuarioInput").val("");
        $("#actualizarDatos").addClass("oculto");
        $("#guardarDatos").removeClass("oculto");
        $("#titulo").html("Crear usuario");
        $("#subtitulo").html("Ingrese la Información del usuario a crear");
        $("#editUsuarioModal").modal("show");
    });
    $("#guardarDatos").on("click", function() {
        crearUsuario();
    });
}

function listadoUsuarios() {
    /* var token=$('[name="_token"]').val();
    console.log(token); */
    spinner();
    if (datatableUsuario === null) {
        datatableUsuario = $("#tableUsuarios").DataTable({
            ajax: {
                /*  url: "/Usuarios/listar", */
                url: $('#tableUsuarios').data('route'),
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
                            onclick: "eliminarUsuario(\"" + full.DT_RowId + "\")"

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
                            onclick: "editarUsuario(\"" + full.DT_RowId + "\")"
                        });
                        img.addClass("cursor-pointer icono-accion editar");
                        span.append(img);
                        return span.html();
                    }
                },
                { data: 'id_usuario', width: "10%", class: "text-right w10" },
                { data: 'nombre', width: "35%", class: "text-right w10" },
                { data: 'email', width: "35%", class: "text-right w10" },
                {
                    data: '',
                    width: "10%",
                    class: "text-center w10",
                    render: function(data, type, full, meta) {
                        var span = $("<span/>");
                        var label = $("<label/>");
                        label.html(full.roles + "-");
                        var img = $("<i/>");
                        img.attr({
                            id: "mod_" + full.DT_RowId,
                            class: "fas fa-address-card",
                            title: "Ver Roles",
                            style: "width: 20px;cursor:pointer",
                            onclick: "verRoles(\"" + full.DT_RowId + "\")"
                        });
                        img.addClass("cursor-pointer icono-accion editar");
                        span.append(label, img);
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
        datatableUsuario.ajax.reload(null, false);
    }

}

function eliminarUsuario(id) {
    var data = datatableUsuario.row("#" + id).data();
    console.log(data);
    Swal.fire({
        title: 'Eliminar',
        text: 'Esta seguro de eliminar el usuario ' + data.nombre + '?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Eliminar',
        cancelButtonText: 'No, Mantener'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: "Usuarios/eliminar",
                dataType: 'json',
                type: "POST",
                data: { accion: 1, _token: token, idUsuario: data.id_usuario },
                success: function(data) {
                    console.log(data.usado);
                    if (data.usado) {
                        Swal.fire(
                            'Error!',
                            'No se puede eliminar el Usuario este esta siendo utilizado !',
                            'error'
                        )
                        datatableUsuario.ajax.reload(null, false);
                    } else {
                        datatableUsuario.ajax.reload(null, false);
                        Swal.fire(
                            'Eliminado!',
                            'Se ha eliminado el Usuario correctamente !',
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

function editarUsuario(id) {
    var data = datatableUsuario.row("#" + id).data();
    console.log(data);
    $("#nombreInput").val(data.nombre);
    $("#emailInput").val(data.email);
    $("#usuarioInput").val(data.usuario);
    $("#actualizarDatos").removeClass("oculto");
    $("#guardarDatos").addClass("oculto");
    $("#titulo").html("Editar usuario " + "<span>" + data.nombre + "</span>");
    $("#subtitulo").html("Información a editar del usuario");
    $("#editUsuarioModal").modal("show");
    idActual = id;
}

function editarDatos(id) {
    var data = datatableUsuario.row("#" + id).data();
    console.log(data);
    Swal.fire({
        title: 'Editar',
        text: 'Esta seguro de editar el usuario ' + data.nombre + '?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Editar',
        cancelButtonText: 'No, Mantener'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: "Usuarios/editar",
                dataType: 'json',
                type: "POST",
                data: {
                    accion: 1,
                    _token: token,
                    idUsuario: data.id_usuario,
                    nombre: $("#nombreInput").val(),
                    email: $("#emailInput").val(),
                    usuario: $("#usuarioInput").val()
                },
                success: function(data) {
                    datatableUsuario.ajax.reload(null, false);
                    $("#editUsuarioModal").modal("hide");
                    Swal.fire(
                        'Editado!',
                        'Se ha Editado el usuario correctamente !',
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

function crearUsuario() {
    var nombre = $("#nombreInput").val();
    var correo = $("#emailInput").val();
    var contraseña = $("#contraseñaInput").val();
    var errores = [];
    if (/["']/gi.test(nombre)) {
        errores.push("- El nombre contiene caracteres no validos");
    }
    if (/["']/gi.test(contraseña)) {
        errores.push("- el usuario  contiene caracteres no validos");
    }
    if (nombre.length < 0) {
        errores.push("-el nombre del usuario no puede quedar vacio");
    }
    if (contraseña.length < 0) {
        errores.push("-la contraseña no puede quedar vacio");
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
        url: "Usuarios/crear",
        dataType: 'json',
        type: "POST",
        data: {
            accion: 1,
            _token: token,
            nombre: $("#nombreInput").val(),
            email: $("#emailInput").val(),
            password: $("#contraseñaInput").val()
        },
        success: function(data) {
            datatableUsuario.ajax.reload(null, false);
            $("#editUsuarioModal").modal("hide");
            Swal.fire(
                'Creado!',
                'Se ha Creado el usuario correctamente !',
                'success'
            )
        }
    });
    console.log("hola");
}

function verRoles(id) {
    spinner();
    var data = datatableUsuario.row("#" + id).data();
    console.log(data);
    $("#tituloRoles").html("Asignación de roles.");
    $("#subtituloRoles").html("Asignar roles para el Usuario " + data.nombre);
    $("#verRolesUsuario").modal("show");
    datatableUserRoles = $("#tableRolesUsuarios").DataTable({
        ajax: {
            url: $('#tableRolesUsuarios').data('route'),
            header: { 'X-CSRF-TOKEN': token },
            type: "POST",
            data: function(d) {
                d.accion = 1;
                d._token = token;
                d.idUser = id;
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
                        return "<input checked class='toggle-demo' onchange='vincularRol(\"" + full.DT_RowId + "\",\"" + id + "\",\"Desvincular\")' data-toggle='toggle' data-onstyle='success' type='checkbox' data-on='Activo' data-size='mini' data-off='Inactivo' data-style='checkToggle'>";
                    } else {
                        return "<input class='toggle-demo' onchange='vincularRol(\"" + full.DT_RowId + "\",\"" + id + "\",\"Vincular\")' data-toggle='toggle' data-onstyle='success' type='checkbox' data-on='Activo' data-size='mini' data-off='Inactivo' data-style='checkToggle'>";
                    }
                }
            },
            {
                data: 'rol',
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

function vincularRol(idRol, idUsuario, opcion) {
    console.log(idRol, idUsuario, opcion);
    spinner();
    $.ajax({
        url: "Usuarios/vincularRol",
        dataType: 'json',
        type: "POST",
        data: {
            accion: 1,
            _token: token,
            idRol: idRol,
            idUsuario: idUsuario,
            opcion: opcion
        },
        success: function(data) {
            datatableUserRoles.draw(false);
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