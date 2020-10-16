<div id="mySidenav" class="sidenav">
  @guest
  <span class="nombreNavUser">Invitado</span>
  @else
  <span class="nombreNavUser">{{ Auth::user()->name }}</span>
  @endguest
  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
  <ul class="ulStyle inicioSideBar" style="margin-bottom: 0rem;">
    @guest
    <li class="nav-item ">
      <a class="nav-link" style="padding-left: 17px;" href="{{route('index')}}">{{__('Inicio')}}</a>
    </li>
    @else
    <li class="nav-item ">
      <a class="nav-link" style="padding-left: 17px;" href="{{route('index')}}">{{__('Inicio')}}</a>
    </li>
  </ul>
  @if(Auth::user()->hasRole('admin'))
  <ul class="ulStyle">
    <button class="dropdown-btn">Usuario
      <!-- <i class="fa fa-caret-down"></i> -->
    </button>
    <div class="dropdown-container oculto">
      <a class="nav-link aInterno" href="{{route('usuario.index')}}">Listado Usuarios</a>
    </div>
    <button class="dropdown-btn">Roles
      <!-- <i class="fa fa-caret-down"></i> -->
    </button>
    <div class="dropdown-container oculto">
      <a class="nav-link aInterno" href="{{route('rol.index')}}">Listado Roles</a>
    </div>
    <button class="dropdown-btn ">Perfiles
      <!-- <i class="fa fa-caret-down"></i> -->
    </button>
    <div class="dropdown-container oculto">
      <a class="nav-link aInterno" href="{{route('perfil.index')}}">Listado Perfiles</a>
    </div>
    <button class="dropdown-btn">Cursos
    </button>
    <div class="dropdown-container oculto">
      <a class="nav-link aInterno" href="{{route('curso.index')}}">Listado Cursos</a>
    </div>
    <button class="dropdown-btn nobrB">Materias
    </button>
    <div class="dropdown-container nobrB oculto">
      <a class="nav-link aInterno" href="{{route('materia.index')}}">Listado Materias</a>
    </div>
  </ul>
  @elseif(Auth::user()->hasRole('docente'))
  <ul class="ulStyle">
    <button class="dropdown-btn">Mis Cursos
      <!-- <i class="fa fa-caret-down"></i> -->
    </button>
    <div class="dropdown-container oculto">
      <a class="nav-link aInterno" href="{{route('cursoDocente.index')}}">Listado cursos</a>
    </div>
    <button class="dropdown-btn ">Mis Materias
      <!-- <i class="fa fa-caret-down"></i> -->
    </button>
    <div class="dropdown-container  oculto">
      <a class="nav-link aInterno" href="{{route('materiaDocente.index')}}">Listado Materias</a>
    </div>
    <button class="dropdown-btn nobrB">Mis Actividades
      <!-- <i class="fa fa-caret-down"></i> -->
    </button>
    <div class="dropdown-container nobrB oculto">
      <a class="nav-link aInterno" href="{{route('actividadesDocente.index')}}">Listado Actividades</a>
    </div>
  </ul>
  @elseif(Auth::user()->hasRole('estudiante'))
  <ul class="ulStyle">
    <button class="dropdown-btn ">Mis Cursos
      <!-- <i class="fa fa-caret-down"></i> -->
    </button>
    <div class="dropdown-container  oculto">
      <a class="nav-link aInterno" href="{{route('cursoEstudiante.index')}}">Listado cursos</a>
    </div>
    <button class="dropdown-btn ">Mis Materias
      <!-- <i class="fa fa-caret-down"></i> -->
    </button>
    <div class="dropdown-container  oculto">
      <a class="nav-link aInterno" href="{{route('materiaEstudiante.index')}}">Listado Materias</a>
    </div>
    <button class="dropdown-btn nobrB">Mis Actividades
      <!-- <i class="fa fa-caret-down"></i> -->
    </button>
    <div class="dropdown-container nobrB oculto">
      <a class="nav-link aInterno" href="{{route('actividadEstudiante.index')}}">Listado Actividades</a>
    </div>
  </ul>
  @endif
  @endguest
  @guest
  <li class="nav-item">
    <a class="nav-link " href="{{route('login')}}">Iniciar Sesión</a>
  </li>
  @endguest
</div>


<nav class="navbar navbar-expand-lg bg-white shadow-sm">
  <div class="container">
    <span style="font-size:30px;cursor:pointer;color: #a5dc64;" onclick="openNav()">&#9776;
      <a class="navbar-brand" href="{{route('index')}}">
        {{config('app.name')}}
      </a>
    </span>

    <button class="navbar-toggler navbar-light oculto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="nav nav-pills flotanteUserDerecha">
    
        @guest
        <li class="nav-item">
          <a class="nav-link " href="{{route('login')}}">Iniciar Sesión</a>
        </li>
        @else
        <li class="nav-item dropdown">
          <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
            {{ Auth::user()->name }} <span class="caret"></span>
          </a>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="{{ route('logout') }}" onclick="event.preventDefault();
                  document.getElementById('logout-form').submit();">
              {{ __('Logout') }}
            </a>
            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
              @csrf
            </form>
          </div>
        </li>
        @endguest
      </ul>
    </div>
  </div>
</nav>
<form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
  @csrf
</form>