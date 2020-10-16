var datatableActividades = null;
var token = $('[name="_token"]').val();

$(document).ready(function() {
    iniciar();
    listadoActividadesCurso();
});

function iniciar() {
    cargarDatosMateria();
}

function cargarDatosMateria() {
    $.ajax({
        url: "/CursosDocente/cargarInformacionMateria",
        dataType: 'json',
        type: "POST",
        data: {
            accion: 1,
            _token: token,
            idMateria: $("#idMateria").val(),
            idCurso: $("#idCurso").val(),
            idDocente: $("#idDocente").val(),
        },
        success: function(data) {
            $(".nombreMateria").html(data.materiaResponse);
            $(".nombreCurso").html(data.cursoResponse);

        }
    });
}

function listadoActividadesCurso() {
    if (datatableActividades === null) {
        datatableActividades = $("#tableActividades").DataTable({
            ajax: {
                url: $('#tableActividades').data('route'),
                header: { 'X-CSRF-TOKEN': token },
                type: "POST",
                data: function(d) {
                    d.accion = 1;
                    d._token = token;
                    d.idMateria = $("#idMateria").val();
                    d.idCurso = $("#idCurso").val();
                    d.idDocente = $("#idDocente").val();
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
                            onclick: "eliminarActividad(\"" + full.DT_RowId + "\")"

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
                            onclick: "editarActividad(\"" + full.DT_RowId + "\")"
                        });
                        img.addClass("cursor-pointer icono-accion editar");
                        span.append(img);
                        return span.html();
                    }
                },
                { data: 'id_actividad', width: "10%", class: "text-right w10" },
                { data: 'nombre', width: "27%", class: "text-right w10" },
                { data: 'description', width: "27%", class: "text-right w10" },
                {
                    data: '',
                    width: "26%",
                    class: "text-center w10",
                    render: function(data, type, full, meta) {
                        var span = $("<span/>");
                        var boton = $("<button/>");
                        boton.html("Ir a Actividad");
                        boton.attr({
                            id: "activity" + full.DT_RowId,
                            class: "btn btn-primary",
                            title: "Ver materias",
                            style: "cursor:pointer",
                            onclick: "irActividad(\"" + full.DT_RowId + "\")"
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
        datatableActividades.ajax.reload(null, false);
    }

}

function irActividad(idActividad) {
    $.ajax({
        url: "/CursosDocente/irActividadMateria",
        dataType: 'json',
        type: "POST",
        data: {
            accion: 1,
            _token: token,
            idActividad: idActividad,
            idMateria: $("#idMateria").val(),
            idCurso: $("#idCurso").val(),
            idDocente: $("#idDocente").val(),
        },
        success: function(data) {
            window.location.href = "/Curso/verActividadMateria";
        }
    });
}

function eliminarActividad(idActividad) {

}

function editarActividad(idActividad) {

}