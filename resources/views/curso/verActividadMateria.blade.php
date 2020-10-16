<!DOCTYPE html>
@extends('layout')
<script src="{{ asset('funciones/verActividadMateria.js') }}" defer></script>
<link rel="stylesheet" type="text/css" href="{{ asset('css/verActividadMateria.css') }}">
<link href="{{ asset('js/sweetalert2/dist/sweetalert2.css')}}" rel="stylesheet">
<script src="{{ asset('js/sweetalert2/dist/sweetalert2.all.min.js')}}"></script>
<script src="{{ asset('js/tinymce/tinymce.min.js') }}"></script>
@php
$materia = session('idMateria');
$curso = session('idCurso');
$docente = session('idUserDocente');
$actividad = session('idActividad');
@endphp
@section('title','Actividad')
@section('content')
<div class="container">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h1 class="display-4 mb-0">Actividad <span class="nombreActividad"></span> - Materia <span class="nombreMateria"></span> </h1>
        <input id="nameUser" type="hidden" value="{{Auth::user()->name}}">
        <input id="idUser" type="hidden" value="{{Auth::user()->id}}">
        <input id="idMateria" type="hidden" value="{{$materia}}">
        <input id="idCurso" type="hidden" value="{{$curso}}">
        <input id="idDocente" type="hidden" value="{{$docente}}">
        <input id="idActividad" type="hidden" value="{{$actividad}}">
    </div>
    <p class="lead text-secondary">
        Actividad <span class="nombreActividad"></span>
    </p>
    <div class="row rowPreguntas oculto">
        <div class="col-6">
            <div class="form-group">
                <span style="font-size: 10px;">Tipo Actividad:</span>
                <select id="tipoActividad" class="form-control inputBusqueda" style="width: 100%">
                    <option value="0" selected="">Todos</option>
                </select>
            </div>
            <div class="row form-group">
                <div class="col-6">
                    <button id="cargarTipoActividad" class="btn btn-primary">Cargar</button>
                </div>
            </div>
            <div class="row oculto" style="height: 300px;" id="contenedorAggPregunta">
                <div class="col-12">
                    <button id="agregarPregunta" class="btn btn-primary">Agregar Pregunta</button>
                    <button id="guardarPreguntas" class="btn btn-primary">Guardar Pregunta</button>
                    <button id="editarcontenido" class="btn btn-primary">Editar contenido</button>
                </div>
            </div>
        </div>


        <div class="col-6 form-group oculto" id="contenedorContenidoGeneral">
            <div id="contenedorContenido">

            </div>

        </div>
        <input type="file" id="embedimage" style="display:none">
    </div>
    <div class="row rowContenedorAlerta oculto">
        <div class="col-12 form-group card text-justify containerDiv" id="contenedorContenidoAlert">
            <div id="contenedorContenidoDivAlert" class="card-body bg-transparent">

                <div class="alert alert-primary" role="alert">La actividad actual ya se ha creado ,puede ver la actividad en el modulo de mis actividades.</div>
            </div>

        </div>
    </div>

    @endsection
</div>