@extends('layout')
<script src="{{ asset('funciones/listadoRoles.js') }}" defer></script>
<link rel="stylesheet" type="text/css" href="{{ asset('css/listadoRoles.css') }}">
<link href="js/sweetalert2/dist/sweetalert2.css" rel="stylesheet">
<script src="js/sweetalert2/dist/sweetalert2.all.min.js"></script>
@section('title','Listado de Roles')
@section('content')
<div class="container">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h1 class="display-4 mb-0">Listado de Roles</h1>

    </div>
    <p class="lead text-secondary">
        Roles
    </p>
    <div class="row">
        <div class="col-12">
            <button id="crearRol" class="btn btn-primary" style="height: 23px;padding-bottom: 23px;padding-top: 2px;">+Nuevo Rol</button>
        </div>
    </div>
    <div class="row" style="padding-top: 15px;">
        <div class="col-12 tableFixHead">
            <table id="tableRoles" data-route="{{Route('rol.showTable')}}" class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <td colspan="2">Acciones</td>
                        <td>Id</td>
                        <td>Nombre</td>
                        <td>Descripción</td>
                    </tr>
                </thead>
            </table>
        </div>


    </div>
    <div class="modal fade" id="editRolModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div id="tituloModal">
                        <h3 id="titulo"><span id="rol"></span></h3>
                        <p id="subtitulo" class="text-justify"></p>
                    </div>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row" style="padding: 0;margin-right: 0; margin-left: 0;">
                        <!--  <div class="col-12"> -->
                        <div class="col-lg-6 col-12  separadosDiv">
                            <div class="col-12 divFondo paddingDiv">
                                <label>Rol</label>
                            </div>
                            <div class="col-12" style="display: flex; align-items: center; margin-top: 3px; padding: 2px;">
                                <input id="nombreRolInput" type="text" class="form-control inputNoBorde">
                            </div>
                        </div>
                        <div class="col-lg-6 col-12 separadosDiv">
                            <div class="col-12 divFondo paddingDiv">
                                <label>Descripcion</label>
                            </div>
                            <div class="col-12" style="display: flex; align-items: center; margin-top: 3px; padding: 2px;">
                                <input id="descripcionRolInput" type="text" class="form-control inputNoBorde">
                            </div>
                        </div>

                        <!-- </div> -->
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="guardarDatos" type="button" class="btn btn-primary">Guardar</button>
                    <button id="actualizarDatos" type="button" class="btn btn-primary oculto">Actualizar</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

    @endsection
</div>