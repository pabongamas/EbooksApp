@extends('layout')
@section('title','Home')
@section('content')
<section class="sectionPrincipal">
        <div class="container">
    <div class="row">
        <div class="col-12 col-lg-12">
            <h1 class="display-4 text-light">Ebooks</h1>
            <p class="lead text-light">E-books como herramienta didáctica para la enseñanza de contenidos en Primaria</p>
                           {{--  <a class="btn btn-lg btn-block btn-primary" href="{{route('contact')}}">Contáctame</a>
                           <a class="btn btn-lg btn-block btn-outline-primary" href="{{route('projects.index')}}">Portafolio</a> --}}
                       </div>
               {{--  <div class="col-12 col-lg-6">
                        <img alt="Mi pagina" class="img-fluid mb-4" src="img/home.svg">
                    </div> --}}
                </div>
            </div>
        </section>

{{--     @auth
    {{auth()->user()->name}}
    @endauth --}}
    @endsection
    @include('partials/footer')
