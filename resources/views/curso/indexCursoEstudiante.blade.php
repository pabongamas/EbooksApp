@extends('layout')
<script src="{{ asset('funciones/listadoCursosEstudiante.js') }}" defer></script>
<link rel="stylesheet" type="text/css" href="{{ asset('css/listadoCursosEstudiante.css') }}">
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
    <div class="row" style="padding-top: 15px;">
        <div class="col-12 tableFixHead">
            <table id="tableCursos" data-route="{{Route('cursoEstudiante.showTable')}}" class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <td colspan="2">Acciones</td>
                        <td>Id</td>
                        <td>Nombre</td>
                        <td>Descripción</td>
                        <!--  <td>Usuario</td> -->
                    </tr>
                </thead>
            </table>
        </div>


    </div>
    <div class="modal fade bd-example-modal-lg" id="modalInfoCurso" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
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
                    <div class="row">
                        <div class="col-12">
                        <div class="card mb-3" style="">
                            <div class="row no-gutters">
                                <div class="col-md-4">
                                    <img src="img/Docente.jpg" class="card-img" alt="...">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">Docente Encargado</h5>
                                        <p class="card-text" id="textCardDocente"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card mb-3" style="">
                            <div class="row no-gutters">
                                <div class="col-md-4">
                                    <img src="img/Estudiantes.jpg" class="card-img" alt="...">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">Otros participantes</h5>
                                        <p class="card-text" id="textCardParticipantes"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card mb-3" style="">
                            <div class="row no-gutters">
                                <div class="col-md-4">
                                    <img src="img/Materias.jpg" class="card-img" alt="...">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">Materias</h5>
                                        <p class="card-text" id="textCardMaterias"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card mb-3" style="">
                            <div class="row no-gutters">
                                <div class="col-md-4">
                                    <img src="img/Actividades.jpg" class="card-img" alt="...">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">Actividades</h5>
                                        <p class="card-text" id="textCardActividades"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                       
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    @endsection
</div>