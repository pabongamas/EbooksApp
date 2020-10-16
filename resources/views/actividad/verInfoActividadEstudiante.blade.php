<!DOCTYPE html>
@extends('layout')
<script src="{{ asset('funciones/verInfoActividadEstudiante.js') }}" defer></script>
<link rel="stylesheet" type="text/css" href="{{ asset('css/verInfoActividadEstudiante.css') }}">
<link href="{{ asset('js/sweetalert2/dist/sweetalert2.css')}}" rel="stylesheet">
<script src="{{ asset('js/sweetalert2/dist/sweetalert2.all.min.js')}}"></script>
<script src="{{ asset('js/tinymce/tinymce.min.js') }}"></script>
@php
$materia = session('idMateriaEstudiante');
$curso = session('idCursoEstudiante');
$estudiante = session('idUserEstudiante');
$actividad = session('idActividadEstudiante');
@endphp
@section('title','Actividad')
@section('content')
<div class="container" style="overflow: auto;/* height: calc(100vh - -27px); */height: 850px;">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h1 class="display-4 mb-0">Actividad <span class="actividadVal"></span> - Tipo actividad <span class="tipoVal"></span> </h1>
        <input id="nameUser" type="hidden" value="{{Auth::user()->name}}">
        <input id="idUser" type="hidden" value="{{Auth::user()->id}}">
        <input id="idMateria" type="hidden" value="{{$materia}}">
        <input id="idCurso" type="hidden" value="{{$curso}}">
        <input id="idEstudiante" type="hidden" value="{{$estudiante}}">
        <input id="idActividad" type="hidden" value="{{$actividad}}">
    </div>
    <p class="lead text-secondary">
     <span class="estudianteAsignado"></span>
    </p>
    <div class="row"> 
            <div class="col-12 form-group oculto card text-justify containerDiv" id="contenedorContenidoGeneral">
                <div id="contenedorContenido" class="card-body bg-transparent">

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