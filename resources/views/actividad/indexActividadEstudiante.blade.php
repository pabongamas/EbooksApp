@extends('layout')
<script src="{{ asset('funciones/listadoActividadesEstudiante.js') }}" defer></script>
<link rel="stylesheet" type="text/css" href="{{ asset('css/listadoActividadesEstudiante.css') }}">
<link href="js/sweetalert2/dist/sweetalert2.css" rel="stylesheet">
<script src="js/sweetalert2/dist/sweetalert2.all.min.js"></script>
@section('title','Listado de Actividades')
@section('content')
<div class="container">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h1 class="display-4 mb-0">Listado de Actividades</h1>
        <input id="nameUser" type="hidden" value="{{Auth::user()->name}}">
        <input id="idUser" type="hidden" value="{{Auth::user()->id}}">
    </div>
    <p class="lead text-secondary">
        Actividades
    </p>
    <div class="row" style="padding-top: 15px;">
        <div class="col-12 tableFixHead">
            <table id="tableActividadesEstudiante" data-route="{{Route('actividadEstudiante.showTable')}}" class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Nombre</td>
                        <td>Descripción</td>
                        <td>Materia</td>
                        <td>Curso</td>
                        <td>Ir a Actividad</td>
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