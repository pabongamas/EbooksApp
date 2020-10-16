@extends('layout')
<script src="{{ asset('funciones/listadoMateriasEstudiante.js') }}" defer></script>
<link rel="stylesheet" type="text/css" href="{{ asset('css/listadoMateriasEstudiante.css') }}">
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
        Materias
    </p>
    <div class="row" style="padding-top: 15px;">
        <div class="col-12 tableFixHead">
            <table id="tableMaterias" data-route="{{Route('materiaEstudiante.showTable')}}" class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Nombre</td>
                        <td>Descripción</td>
                        <td>Curso</td>
                        <td>Docente</td>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
    <div id="spinner" class="spinner">
        <div class="spinner-border text-success spinnerEbook" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    @endsection
</div>