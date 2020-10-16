var datatableMaterias = null;
var token = $('[name="_token"]').val();


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
                    d.idUserEstudiante = $("#idUser").val();
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
            columns: [
                { data: 'id_materia', width: "5%", class: "text-right w10" },
                { data: 'nombre', width: "22%", class: "text-right w10" },
                { data: 'description', width: "22%", class: "text-right w10" },
                { data: 'curso', width: "22%", class: "text-right w10" },
                {
                    data: '',
                    width: "22%",
                    class: "text-left w10",
                    render: function(data, type, full, meta) {
                        /*  var span = $("<span/>");
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
                         return span.html(); */
                        return full.docente;

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