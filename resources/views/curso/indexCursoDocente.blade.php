@extends('layout')
<script src="{{ asset('funciones/listadoCursosDocente.js') }}" defer></script>
<link rel="stylesheet" type="text/css" href="{{ asset('css/listadoCursosDocente.css') }}">
<link href="js/sweetalert2/dist/sweetalert2.css" rel="stylesheet">
<script src="js/sweetalert2/dist/sweetalert2.all.min.js"></script>
@section('title','Listado de cursos')
@section('content')
<div class="container">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h1 class="display-4 mb-0">Listado de Cursos</h1>
        <input id="nameUser" type="hidden" value="{{Auth::user()->name}}">
        <input id="idUser" type="hidden" value="{{Auth::user()->id}}">
    </div>
    <p class="lead text-secondary">
        Cursos
    </p>
    <div class="row">
        <div class="col-12">
            <button id="crearCurso" class="btn btn-primary" style="height: 23px;padding-bottom: 23px;padding-top: 2px;">+Nuevo Curso</button>
        </div>
    </div>
    <div class="row" style="padding-top: 15px;">
        <div class="col-12 tableFixHead">
            <table id="tableCursos" data-route="{{Route('cursoDocente.showTable')}}" class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <td colspan="2">Acciones</td>
                        <td>Id</td>
                        <td>Nombre</td>
                        <td>Descripción</td>
                        <td>Asignar Materia</td>
                        <td>Materias</td>
                        <td>Asignar participantes</td>
                        <!--  <td>Usuario</td> -->
                    </tr>
                </thead>
            </table>
        </div>


    </div>
    <div class="modal fade" id="editCursoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                        <!-- <div class="col-lg-4 col-12 separadosDiv">
                            <div class="col-12 divFondo paddingDiv">
                                <label>Usuario</label>
                            </div>
                            <div class="col-12" style="display: flex; align-items: center; margin-top: 3px; padding: 2px;">
                                <input id="usuarioInput" type="text" class="form-control inputNoBorde">
                            </div>
                        </div> -->

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

    <div class="modal fade" id="verMaterias" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div>
                        <h3 id="tituloModalMateria"><span id="user"></span></h3>
                        <p id="subtituloModalMateria" class="text-justify"></p>
                    </div>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row" style="padding-top: 15px;">
                        <div class="col-12 tableFixHead">
                            <table id="tableMaterias" data-route="{{Route('cursoDocente.verMateriaDocente')}}" class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <!--  <td colspan="2">Acciones</td> -->
                                        <td>Id</td>
                                        <td>Nombre</td>
                                        <td>Ir a materia</td>
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

    <!-- Asignacion de materias a curso  -->
    <div class="modal fade" id="asignarMateriasCurso" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div>
                        <h3 id="tituloModalAsignacion"><span id="user"></span></h3>
                        <p id="subtituloModalAsignacion" class="text-justify"></p>
                    </div>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row" style="padding-top: 15px;">
                        <div class="col-12 tableFixHead">
                            <table id="tableAsignacionMaterias" data-route="{{Route('cursoDocente.asignarMateriasCursoDocente')}}" class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <td>Asignar</td>
                                        <td>Materia</td>
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
    <!-- asignar participantes al curso 'estudiantes' -->
    <div class="modal fade" id="modalAsignarParticipantesEstu" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div id="tituloModalAsignaEstu">
                        <h3 id="tituloAsignarEstu"></h3>
                        <p id="subtituloAsignarEstu" class="text-justify"></p>
                    </div>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="tableFixHead">
                        <div class="row" style="padding: 0;margin-right: 0; margin-left: 0;padding-top: 40px;">
                            <div class="col-12">
                                <h3>Listado Estudiantes</h3>
                            </div>
                        </div>
                        <div class="row" style="padding: 0;margin-right: 0; margin-left: 0;">
                            <div class="col-12 ">
                                <table id="tableEstudiantes" data-route="{{Route('curso.ShowEstudiantes')}}" class="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Asignar</th>
                                            <th>Estudiante</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
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