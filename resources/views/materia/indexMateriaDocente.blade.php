@extends('layout')
<script src="{{ asset('funciones/listadoMateriasDocente.js') }}" defer></script>
<link rel="stylesheet" type="text/css" href="{{ asset('css/listadoMateriasDocente.css') }}">
<link href="js/sweetalert2/dist/sweetalert2.css" rel="stylesheet">
<script src="js/sweetalert2/dist/sweetalert2.all.min.js"></script>
@section('title','Listado de Materias')
@section('content')
<div class="container">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h1 class="display-4 mb-0">Listado de Materias</h1>
        <input id="nameUser" type="hidden" value="{{Auth::user()->name}}">
        <input id="idUser" type="hidden" value="{{Auth::user()->id}}">
    </div>
    <p class="lead text-secondary">
        Cursos
    </p>
    <div class="row">
        <div class="col-12">
            <button id="crearMateriaDocente" class="btn btn-primary" style="height: 23px;padding-bottom: 23px;padding-top: 2px;">+Nueva Materia</button>
        </div>
    </div>
    <div class="row" style="padding-top: 15px;">
        <div class="col-12 tableFixHead">
            <table id="tableMaterias" data-route="{{Route('materiaDocente.showTable')}}" class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <td colspan="2">Acciones</td>
                        <td>Id</td>
                        <td>Nombre</td>
                        <td>Descripción</td>
                        <td>Curso</td>
                        <td>Asignar Actividades</td>
                    </tr>
                </thead>
            </table>
        </div>


    </div>
    <div class="modal fade" id="editMateriaModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                        <div class="col-lg-6 col-12  separadosDiv">
                            <div class="col-12 divFondo paddingDiv">
                                <label>Nombre</label>
                            </div>
                            <div class="col-12" style="display: flex; align-items: center; margin-top: 3px; padding: 2px;">
                                <input id="nombreInput" type="text" class="form-control inputNoBorde">
                            </div>
                        </div>
                        <div class="col-lg-6 col-12 separadosDiv">
                            <div class="col-12 divFondo paddingDiv">
                                <label>Descripción</label>
                            </div>
                            <div class="col-12" style="display: flex; align-items: center; margin-top: 3px; padding: 2px;">
                                <input id="descripcionInput" type="text" class="form-control inputNoBorde">
                            </div>
                        </div>

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

    <div class="modal fade" id="asignacionActividades" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div>
                        <h3 id="tituloAsignacion"><span id="user"></span></h3>
                        <p id="subtituloAsignacion" class="text-justify"></p>
                    </div>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row" style="padding-top: 15px;">
                        <div class="col-12 tableFixHead">
                            <table id="tableAsignacion" data-route="{{Route('materiaDocente.AsignarActividad')}}" class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <td>Asignar</td>
                                        <td>Actividad</td>
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
    <!-- crear materia por curso y usuario  -->
    <div class="modal fade" id="crearMateriaCursoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div id="tituloModal">
                        <h3 id="tituloCrearM"><span id="user"></span></h3>
                        <p id="subtituloCrearM" class="text-justify"></p>
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
                                <label>Nombre Materia</label>
                            </div>
                            <div class="col-12" style="display: flex; align-items: center; margin-top: 3px; padding: 2px;">
                                <input id="nombreInputMateria" placeholder="-- Nombre materia --" type="text" class="form-control inputNoBorde">
                            </div>
                        </div>
                        <div class="col-lg-6 col-12 separadosDiv">
                            <div class="col-12 divFondo paddingDiv">
                                <label>Descripción materia</label>
                            </div>
                            <div class="col-12" style="display: flex; align-items: center; margin-top: 3px; padding: 2px;">
                                <input id="descripcionInputMateriaDocente" placeholder="-- Descripcion --" type="text" class="form-control inputNoBorde">
                              <!--  <select id="selectCursosMateria">
                                    <option value="0" selected>Listado cursos</option>
                               </select> -->
                            </div>
                        </div>
                        <div class="col-lg-12 col-12 separadosDiv">
                            <div class="col-12 divFondo paddingDiv">
                                <label>Curso</label>
                            </div>
                            <div class="col-12" style="display: flex; align-items: center; margin-top: 3px; padding: 2px;">
                               <select id="selectCursosMateria">
                                    <option value="0" selected>Listado cursos</option>
                               </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="guardarDatosCrear" type="button" class="btn btn-primary">Guardar</button>
                    <button id="actualizarDatosCrear" type="button" class="btn btn-primary oculto">Actualizar</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
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