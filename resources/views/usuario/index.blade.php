@extends('layout')
<script src="{{ asset('funciones/listadoUsuarios.js') }}" defer></script>
<link rel="stylesheet" type="text/css" href="{{ asset('css/listadoUsuarios.css') }}">
<link href="js/sweetalert2/dist/sweetalert2.css" rel="stylesheet">
<script src="js/sweetalert2/dist/sweetalert2.all.min.js"></script>
<!-- <script src="js/bootstrap-toggle-master/js/bootstrap2-toggle.min.js"></script> -->

@section('title','Listado de usuarios')
@section('content')
<div class="container">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h1 class="display-4 mb-0">Listado de Usuarios</h1>

    </div>
    <p class="lead text-secondary">
        Usuarios
    </p>
    <div class="row">
        <div class="col-12">
            <button id="crearUsuario" class="btn btn-primary" style="height: 23px;padding-bottom: 23px;padding-top: 2px;">+Nuevo Usuario</button>
        </div>
    </div>
    <div class="row" style="padding-top: 15px;">
        <div class="col-12 tableFixHead">
            <table id="tableUsuarios" data-route="{{Route('usuario.showTable')}}" class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <td colspan="2">Acciones</td>
                        <td>Id</td>
                        <td>Nombre</td>
                        <td>Correo</td>
                        <td>Roles</td>
                    </tr>
                </thead>
            </table>
        </div>


    </div>
    <div class="modal fade" id="editUsuarioModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div id="tituloModal">
                        <h3 id="titulo"><span id="user"></span></h3>
                        <p id="subtitulo" class="text-justify"></p>
                    </div>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row" style="padding: 0;margin-right: 0; margin-left: 0;">
                        <!--  <div class="col-12"> -->
                        <div class="col-lg-4 col-12  separadosDiv">
                            <div class="col-12 divFondo paddingDiv">
                                <label>Nombre</label>
                            </div>
                            <div class="col-12" style="display: flex; align-items: center; margin-top: 3px; padding: 2px;">
                                <input id="nombreInput" type="text" class="form-control inputNoBorde">
                            </div>
                        </div>
                        <div class="col-lg-4 col-12 separadosDiv">
                            <div class="col-12 divFondo paddingDiv">
                                <label>Correo</label>
                            </div>
                            <div class="col-12" style="display: flex; align-items: center; margin-top: 3px; padding: 2px;">
                                <input id="emailInput" type="text" class="form-control inputNoBorde">
                            </div>
                        </div>
                        <div class="col-lg-4 col-12 separadosDiv">
                            <div class="col-12 divFondo paddingDiv">
                                <label>Contraseña</label>
                            </div>
                            <div class="col-12" style="display: flex; align-items: center; margin-top: 3px; padding: 2px;">
                                <input id="contraseñaInput" type="password" class="form-control inputNoBorde">
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


    <div class="modal fade" id="verRolesUsuario" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div id="tituloModal">
                        <h3 id="tituloRoles"><span id="userRoles"></span></h3>
                        <p id="subtituloRoles" class="text-justify"></p>
                    </div>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row" style="padding-top: 15px;">
                        <div class="col-12 tableFixHead">
                            <table id="tableRolesUsuarios" data-route="{{Route('usuario.AsignarUsuarioRol')}}" class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <td>Asignar</td>
                                        <td>Rol</td>

                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">

                </div>
            </div>
        </div>
    </div>
    <div id="spinner" class="spinner">
        <div class="spinner-border text-success spinnerEbook" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>


    @endsection
</div>