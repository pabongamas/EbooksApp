@extends('layout')
<script src="{{ asset('funciones/verMateriaCurso.js') }}" defer></script>
<link rel="stylesheet" type="text/css" href="{{ asset('css/verMateriaCurso.css') }}">
<link href="{{ asset('js/sweetalert2/dist/sweetalert2.css')}}" rel="stylesheet">
<script src="{{ asset('js/sweetalert2/dist/sweetalert2.all.min.js')}}"></script>
@php
$materia = session('idMateria');
$curso = session('idCurso');
$docente = session('idUserDocente');
@endphp
@section('title','Materia')
@section('content')
<div class="container">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h1 class="display-4 mb-0">Materia <span class="nombreMateria"></span> - curso <span class="nombreCurso"></span> </h1>
        <input id="nameUser" type="hidden" value="{{Auth::user()->name}}">
        <input id="idUser" type="hidden" value="{{Auth::user()->id}}">
        <input id="idMateria" type="hidden" value="{{$materia}}">
        <input id="idCurso" type="hidden" value="{{$curso}}">
        <input id="idDocente" type="hidden" value="{{$docente}}">
    </div>
    <p class="lead text-secondary">
        Materia <span class="nombreMateria"></span>
    </p>
    <div class="row" style="padding-top: 15px;">
        <div class="col-12 tableFixHead">
            <table id="tableActividades" data-route="{{Route('cursoDocente.showTableMateriasxCurso')}}" class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <td colspan="2">Acciones</td>
                        <td>Id</td>
                        <td>Nombre</td>
                        <td>Descripción</td>
                         <td>Actividades</td>
                    </tr>
                </thead>
            </table>
        </div>


    </div>
    
    @endsection
</div>