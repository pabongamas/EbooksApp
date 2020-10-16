<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\View;

class cursoController extends Controller
{
  public function __construct()
  {
    $this->middleware('auth');
  }
  public function index(Request $request)
  {
    $request->user()->authorizeRoles(['admin']);
    return view('curso.index');
  }
  public function indexCursoDocente(Request $request)
  {
    $request->user()->authorizeRoles(['docente']);
    return view('curso.indexCursoDocente');
  }
  public function indexCursoEstudiante(Request $request)
  {
    $request->user()->authorizeRoles(['estudiante']);
    return view('curso.indexCursoEstudiante');
  }
  public function listaCurso()
  {

    $start = $_POST['start'];
    $limit = $_POST["length"];

    /*   $cursos = DB::select('select cursos.id as idCurso,cursos.name as nameCurso,cursos.description as descripcion,users.name as usuario from  cursos join curso_user on cursos.id=curso_user.curso_id join users on users.id=curso_user.user_id order by nameCurso limit ' . $limit . ' offset ' . $start . '');
    $cursosTotal = DB::select('select cursos.id as idCurso,cursos.name as nameCurso,cursos.description as descripcion,users.name as usuario from cursos  join curso_user on cursos.id=curso_user.curso_id join users on users.id=curso_user.user_id order by nameCurso'); */
    $cursos = DB::select('select cursos.id as idCurso,cursos.name as nameCurso,cursos.description as descripcion from  cursos order by nameCurso limit ' . $limit . ' offset ' . $start . '');
    $cursosTotal = DB::select('select cursos.id as idCurso,cursos.name as nameCurso,cursos.description as descripcion from cursos  order by nameCurso');
    $arRegistros = array();
    foreach ($cursos as $value) {
      $obj = new \stdClass();
      $obj->id_curso = $value->idCurso;
      $obj->DT_RowId = $value->idCurso;
      $obj->nombre = $value->nameCurso;
      $obj->description = $value->descripcion;
      /*  $obj->usuario = $value->usuario; */
      $arRegistros[] = $obj;
    }
    return response()->json([
      'data' => $arRegistros,
      'iTotalRecords' => count($cursosTotal),
      'iTotalDisplayRecords' => count($cursosTotal)
    ]);
  }
  public function eliminarCurso()
  {
    $idCurso = $_POST['idCurso'];
    $tablas = array('curso_user');
    $cont = 0;
    foreach ($tablas as $tabla) {
      if ($tabla == "curso_user") {
        $idCampo = 'curso_id';
      } else if ($tabla == "materia_curso") {
        $idCampo = 'curso_id';
      }
      /*   else if ($tabla == "usuario_rol") {
          $idCampo = 'id_usuario';
        } */
      
      $userUtilizado = DB::select('select * from ' . $tabla . ' where ' . $idCampo . '=' . $idCurso . ' limit 1');
      if (count($userUtilizado) > 0) {
        $cont++;
      } else {
      }
    }
    if ($cont == 0) {
      $esUsado = false;
      $usuario = DB::delete('delete from cursos where id =' . $idCurso);
    } else {
      $esUsado = true;
    }
    return response()->json([
      'msg' => '',
      'successs' => true,
      'usado' => $esUsado
    ]);
  }
  public function editarCurso()
  {
    $idCurso = $_POST['idCurso'];
    $nombre = $_POST['nombre'];
    $description = $_POST['description'];
    /*  $usuario = $_POST['usuario']; */
    $usuarioSql = DB::table('cursos')
      ->where('id', $idCurso)
      ->update(['name' => $nombre, 'description' => $description]);
    return response()->json([
      'msg' => '',
      'successs' => true
    ]);
  }
  public function crearCurso()
  {
    $nombre = $_POST['nombre'];
    $description = $_POST['description'];
    /* $usuario = $_POST['usuario']; */
    $id = DB::table('cursos')->insertGetId(
      ['name' => $nombre, 'description' => $description]
    );
    return response()->json([
      'msg' => '',
      'successs' => true
    ]);
  }

  public function listaCursoDocente()
  {
    $start = $_POST['start'];
    $limit = $_POST["length"];
    $idUserDocente = $_POST["idUserDocente"];

    //$cursos = DB::select('select * from cursos join curso_user on cursos.id=curso_user.curso_id where curso_user.user_id=' . $idUserDocente . ' GROUP by cursos.id order by name limit ' . $limit . ' offset ' . $start . '');
    //$cursosTotal = DB::select('select * from cursos join curso_user on cursos.id=curso_user.curso_id where curso_user.user_id=' . $idUserDocente . ' GROUP by cursos.id order by name');
    $cursos = DB::select('select * from cursos join curso_user on cursos.id=curso_user.curso_id where curso_user.user_id=' . $idUserDocente . ' order by name limit ' . $limit . ' offset ' . $start . '');
    $cursosTotal = DB::select('select * from cursos join curso_user on cursos.id=curso_user.curso_id where curso_user.user_id=' . $idUserDocente . '  order by name');
    $arRegistros = array();
    foreach ($cursos as $value) {
      $obj = new \stdClass();
      $obj->id_curso = $value->id;
      $obj->DT_RowId = $value->id;
      $obj->nombre = $value->name;
      $obj->description = $value->description;
      $arRegistros[] = $obj;
    }
    return response()->json([
      'data' => $arRegistros,
      'iTotalRecords' => count($cursosTotal),
      'iTotalDisplayRecords' => count($cursosTotal)
    ]);
  }

  public function editarCursoDocente()
  {
    $idCurso = $_POST['idCurso'];
    $idUserDocente = $_POST['idUserDocente'];
    $nombre = $_POST['nombre'];
    $description = $_POST['description'];
    /*  $usuario = $_POST['usuario']; */
    $usuarioSql = DB::table('cursos')
      ->where('id', $idCurso)
      ->update(['name' => $nombre, 'description' => $description]);
    return response()->json([
      'msg' => '',
      'successs' => true
    ]);
  }
  public function eliminarCursoDocente()
  {
    $idCurso = $_POST['idCurso'];
    $idUserDocente = $_POST['idUserDocente'];

    $tablas = array('curso_user');
    $cont = 0;
    foreach ($tablas as $tabla) {
      if ($tabla == "curso_user") {
        $idCampo = 'curso_id';
      } else if ($tabla == "materia_curso") {
        $idCampo = 'curso_id';
      }
      $Utilizado = DB::select('select * from ' . $tabla . ' where ' . $idCampo . '=' . $idCurso . ' limit 1');
      if (count($Utilizado) > 0) {
        $cont++;
      } else {
      }
    }
    if ($cont == 0) {
      $esUsado = false;
      $curso_user = DB::delete('delete from curso_user where user_id=' . $idUserDocente . ' and curso_id=' . $idCurso . '');
      $usuario = DB::delete('delete from cursos where id =' . $idCurso);
    } else {
      $esUsado = true;
    }
    return response()->json([
      'msg' => '',
      'successs' => true,
      'usado' => $esUsado
    ]);
  }
  public function crearCursoDocente()
  {
    $nombre = $_POST['nombre'];
    $description = $_POST['description'];
    $idUserDocente = $_POST['idUserDocente'];
    $idCurso = DB::table('cursos')->insertGetId(
      ['name' => $nombre, 'description' => $description]
    );
    $cursoUser = DB::table('curso_user')->insertGetId(
      ['user_id' => $idUserDocente, 'curso_id' => $idCurso]
    );
    return response()->json([
      'msg' => '',
      'successs' => true
    ]);
  }

  public function asignarMateriasCursoDocente()
  {
    $idUser = $_POST['idUser'];
    $idCurso = $_POST['idCurso'];
    $start = $_POST['start'];
    $limit = $_POST["length"];


    $materias = DB::select('select materias.id as id,UPPER(materias.name) as name,materias.description,
    (case when(select count(*) from materia_curso
    where materia_curso.curso_id=' . $idCurso . ' and materia_curso.materia_id=materias.id )>0 then true else false end) as 
    asignar from materias
    /* join materia_curso on materias.id=materia_curso.materia_id 
    join cursos on cursos.id=materia_curso.curso_id 
    join curso_user on cursos.id=curso_user.curso_id
     where curso_user.user_id='.$idUser.' group by materias.id  */
     order by name  limit ' . $limit . ' offset ' . $start . '');

    $materiasTotal = DB::select('select materias.id as id,UPPER(materias.name) as name,materias.description,
    (case when(select count(*) from materia_curso
    where materia_curso.curso_id=' . $idCurso . ' and materia_curso.materia_id=materias.id )>0 then true else false end) as 
    asignar from materias
    /* join materia_curso on materias.id=materia_curso.materia_id 
    join cursos on cursos.id=materia_curso.curso_id 
    join curso_user on cursos.id=curso_user.curso_id
     where curso_user.user_id='.$idUser.' group by materias.id */
      order by name');

    $arRegistros = array();
    foreach ($materias as $value) {
      $obj = new \stdClass();
      $obj->id_materia = $value->id;
      $obj->DT_RowId = $value->id;
      $obj->nombre = $value->name;
      $obj->description = $value->description;
      $obj->asignar = $value->asignar;
      $obj->materia = $value->name . ", " . $value->description;
      $arRegistros[] = $obj;
    }
    return response()->json([
      'data' => $arRegistros,
      'iTotalRecords' => count($materiasTotal),
      'iTotalDisplayRecords' => count($materiasTotal)
    ]);
  }

  public function vincularMateriaCurso()
  {
    $idCurso = $_POST['idCurso'];
    $idMateria = $_POST['idMateria'];
    $opcion = $_POST["opcion"];
    if ($opcion === "Vincular") {
      DB::table('materia_curso')->insert(
        ['materia_id' => $idMateria, 'curso_id' => $idCurso]
      );
    } else if ($opcion === "Desvincular") {
      DB::delete('delete from materia_curso where materia_id=' . $idMateria . ' and curso_id=' . $idCurso . '');
    }
    return response()->json([
      'msg' => '',
      'successs' => true
    ]);
  }

  public function verMateriaDocente()
  {
    $idUserDocente = $_POST['idUserDocente'];
    $idCurso = $_POST['idCurso'];
    $start = $_POST['start'];
    $limit = $_POST["length"];
    $materias = DB::select('select materias.name,materias.id from cursos join materia_curso on materia_curso.curso_id=cursos.id join materias on materia_curso.materia_id=materias.id where cursos.id=' . $idCurso . ' order by name limit ' . $limit . ' offset ' . $start . '');
    $materiasTotal = DB::select('select materias.name,materias.id from cursos join materia_curso on materia_curso.curso_id=cursos.id join materias on materia_curso.materia_id=materias.id where cursos.id=' . $idCurso . '');
    $arRegistros = array();
    foreach ($materias as $value) {
      $obj = new \stdClass();
      $obj->id_materia = $value->id;
      $obj->DT_RowId = $value->id;
      $obj->nombreMateria = $value->name;
      $arRegistros[] = $obj;
    }
    return response()->json([
      'data' => $arRegistros,
      'iTotalRecords' => count($materiasTotal),
      'iTotalDisplayRecords' => count($materiasTotal)
    ]);
  }
  public function irMateria(Request $request)
  {
    $request->user()->authorizeRoles(['docente']);
    $idMateria = $_POST['idMateria'];
    $idCurso = $_POST['idCurso'];
    $idUserDocente = $_POST['idUserDocente'];
    session(['idMateria' => $idMateria]);
    session(['idCurso' => $idCurso]);
    session(['idUserDocente' => $idUserDocente]);
    return response()->json(['msg' => '']);
  }
  public function cargarInformacionMateria()
  {
    $idMateria = $_POST['idMateria'];
    $idCurso = $_POST['idCurso'];
    $idUserDocente = $_POST['idDocente'];
    $infoMateria = DB::select('select materias.name as materia,cursos.name as curso from materias join materia_curso ON materia_curso.materia_id=materias.id join cursos on cursos.id=materia_curso.curso_id where materias.id=' . $idMateria . ' and cursos.id=' . $idCurso . '');
    return response()->json([
      'materiaResponse' => $infoMateria[0]->materia,
      'cursoResponse' => $infoMateria[0]->curso

    ]);
  }
  public function cargarInformacionActividad()
  {
    $idMateria = $_POST['idMateria'];
    $idActividad = $_POST['idActividad'];
    $idCurso = $_POST['idCurso'];
    $idUserDocente = $_POST['idDocente'];
    $infoActividad = DB::select('select activities.name as actividad,materias.name as materia 
    from activities join activity_materia  on activity_id=activities.id 
    join materias on activity_materia.materia_id =materias.id
    where materias.id=' . $idMateria . ' and activities.id=' . $idActividad . '');
    return response()->json([
      'materiaResponse' => $infoActividad[0]->materia,
      'actividadResponse' => $infoActividad[0]->actividad

    ]);
  }
  public function cargarInformacionActividadEstudiante(){
    $idMateria = $_POST['idMateria'];
    $idActividad = $_POST['idActividad'];
    $idCurso = $_POST['idCurso'];
    $idEstudiante = $_POST['idEstudiante'];
    $infoActividad = DB::select('select activities.name as actividad,materias.name as materia 
    from activities join activity_materia  on activity_id=activities.id 
    join materias on activity_materia.materia_id =materias.id
    where materias.id=' . $idMateria . ' and activities.id=' . $idActividad . '');
    return response()->json([
      'materiaResponse' => $infoActividad[0]->materia,
      'actividadResponse' => $infoActividad[0]->actividad

    ]);
  }
  public function listaCursoEstudiante()
  {
    $start = $_POST['start'];
    $limit = $_POST["length"];
    $idUserEstudiante = $_POST["idUserEstudiante"];

    $cursos = DB::select('select * from cursos join curso_user on cursos.id=curso_user.curso_id where curso_user.user_id=' . $idUserEstudiante . ' order by name limit ' . $limit . ' offset ' . $start . '');
    $cursosTotal = DB::select('select * from cursos join curso_user on cursos.id=curso_user.curso_id where curso_user.user_id=' . $idUserEstudiante . ' order by name');
    $arRegistros = array();
    foreach ($cursos as $value) {
      $obj = new \stdClass();
      $obj->id_curso = $value->id;
      $obj->DT_RowId = $value->id;
      $obj->nombre = $value->name;
      $obj->description = $value->description;
      $arRegistros[] = $obj;
    }
    return response()->json([
      'data' => $arRegistros,
      'iTotalRecords' => count($cursosTotal),
      'iTotalDisplayRecords' => count($cursosTotal)
    ]);
  }
  public function VerInfoCurso()
  {
    $idCurso = $_POST['idCurso'];
    $cursos = DB::select('select  cursos.name as cursoNombre,cursos.id as idCurso,materias.id as idMateria,
    materias.name,materias.description
     from cursos join materia_curso on materia_curso.curso_id=cursos.id
    join materias on materia_curso.materia_id=materias.id
     where cursos.id=' . $idCurso . ' order by name');
     $activities=DB::select('select activities.id as idActividad,activities.name as nombreActividad,
     activities.description as  descActividades,materias.name as nombreMateria  from activities
      join activity_materia on activity_materia.activity_id=activities.id 
      join materias on materias.id=activity_materia.materia_id 
      join materia_curso on materia_curso.materia_id=materias.id 
      join cursos on cursos.id=materia_curso.curso_id where cursos.id='.$idCurso.' order by nombreActividad');
      $docentes=DB::select('select users.id as idUser,users.name as nameUser from users join curso_user on users.id=curso_user.user_id join role_user on users.id=role_user.user_id where curso_user.curso_id='.$idCurso.' and role_user.role_id=2 order by nameUser');
      $estudiantes=DB::select('select users.id as idUser,users.name as nameUser from users join curso_user on users.id=curso_user.user_id join role_user on users.id=role_user.user_id where curso_user.curso_id='.$idCurso.' and role_user.role_id=3 order by nameUser');
    $arRegistros = array();
    $arRegistrosAct=array();
    $arRegistrosDoc=array();
    $arRegistrosEst=array();
    foreach ($cursos as $value) {
      $obj = new \stdClass();
      $obj->cursoNombre = $value->cursoNombre;
      $obj->idCurso = $value->idCurso;
      $obj->idMateria = $value->idMateria;
      $obj->nombre = $value->name;
      $obj->descripcion = $value->description;
      $arRegistros[] = $obj;
    }
    foreach ($activities as $value) {
      $obj = new \stdClass();
      $obj->idActividad = $value->idActividad;
      $obj->nombreActividad = $value->nombreActividad;
      $obj->descActividades = $value->descActividades;
      $obj->nombreMateria = $value->nombreMateria;
      $arRegistrosAct[] = $obj;
    }
    foreach ($docentes as $value) {
      $obj = new \stdClass();
      $obj->idUser = $value->idUser;
      $obj->nameUser = $value->nameUser;
      $arRegistrosDoc[] = $obj;
    }
    foreach ($estudiantes as $value) {
      $obj = new \stdClass();
      $obj->idUser = $value->idUser;
      $obj->nameUser = $value->nameUser;
      $arRegistrosEst[] = $obj;
    }

    return response()->json([
      'msg' => '',
      'successs' => true,
      'data' => $arRegistros,
      'dataActividades' => $arRegistrosAct,
      'dataDocente' => $arRegistrosDoc,
      'dataEstudiante' => $arRegistrosEst
    ]);
  }
  /* ESTE SISGUIENTE METODO ES PARA MOSTRAR LAS ACTIVIDADES ASOCIADAS A UN CURSO DE UN DOCENTE */
  public function listaActividadesxCurso()
  {
    $start = $_POST['start'];
    $limit = $_POST["length"];
    $idCurso = $_POST['idCurso'];
    $idMateria = $_POST['idMateria'];
    $idDocente = $_POST['idDocente'];
    $actividades = DB::select('select activities.id,activities.name,activities.description
     from cursos join materia_curso on cursos.id=materia_curso.curso_id
    join materias ON materias.id=materia_curso.materia_id 
    JOIN activity_materia ON activity_materia.materia_id=materias.id 
    join activities on activity_materia.activity_id=activities.id 
    where cursos.id=' . $idCurso . ' and materias.id=' . $idMateria . ' order by name limit ' . $limit . ' offset ' . $start . '');
    $actividadesTotal = DB::select('select activities.id,activities.name,activities.description
    from cursos join materia_curso on cursos.id=materia_curso.curso_id
   join materias ON materias.id=materia_curso.materia_id 
   JOIN activity_materia ON activity_materia.materia_id=materias.id 
   join activities on activity_materia.activity_id=activities.id 
   where cursos.id=' . $idCurso . ' and materias.id=' . $idMateria . ' order by name');
    $arRegistros = array();
    foreach ($actividades as $value) {
      $obj = new \stdClass();
      $obj->id_actividad = $value->id;
      $obj->DT_RowId = $value->id;
      $obj->nombre = $value->name;
      $obj->description = $value->description;
      $arRegistros[] = $obj;
    }
    return response()->json([
      'data' => $arRegistros,
      'iTotalRecords' => count($actividadesTotal),
      'iTotalDisplayRecords' => count($actividadesTotal)
    ]);
  }
  /* EL SIGUIENTE METODO ES PARA REDIRECCIONAR A UNA VISTA PARA VER LA ACTIVIDAD ACTUAL RELACIONADA
  AL CURSO DEL DOCENTE */
  public function irActividadMateria(Request $request)
  {
    $request->user()->authorizeRoles(['docente']);
    $idMateria = $_POST['idMateria'];
    $idActividad = $_POST['idActividad'];
    $idCurso = $_POST['idCurso'];
    $idUserDocente = $_POST['idDocente'];
    session(['idMateria' => $idMateria]);
    session(['idCurso' => $idCurso]);
    session(['idUserDocente' => $idUserDocente]);
    session(['idActividad' => $idActividad]);
    return response()->json(['msg' => '']);
  }
  public function irActividadEstudiante(Request $request){
    $request->user()->authorizeRoles(['estudiante']);
    $idMateria = $_POST['idMateria'];
    $idActividad = $_POST['idActividad'];
    $idCurso = $_POST['idCurso'];
    $idUserEstudiante = $_POST['idUser'];
    session(['idMateriaEstudiante' => $idMateria]);
    session(['idCursoEstudiante' => $idCurso]);
    session(['idUserEstudiante' => $idUserEstudiante]);
    session(['idActividadEstudiante' => $idActividad]);
    return response()->json(['msg' => '']);
  }

  //el sigueinte metodo es para cargar los docentes asignados al curso  o no 

  public function listarDocentes()
  {
    $idCurso = $_POST['idCurso'];
    $start = $_POST['start'];
    $limit = $_POST["length"];

    $docentes = DB::select('select users.id as id,UPPER(users.name) as name,(case when(select count(*) from curso_user 
    where curso_user.curso_id=' . $idCurso . ' and curso_user.user_id=users.id)> 0 then true else false end) as asignar
     from users join role_user on users.id=role_user.user_id where role_user.role_id=2 order by users.name limit ' . $limit . ' offset ' . $start . '');

    $docentesTotal = DB::select('select users.id as id,UPPER(users.name) as name,(case when(select count(*) from curso_user 
     where curso_user.curso_id=' . $idCurso . ' and curso_user.user_id=users.id)> 0 then true else false end) as asignar
      from users join role_user on users.id=role_user.user_id where role_user.role_id=2 order by users.name');

    $arRegistros = array();
    foreach ($docentes as $value) {
      $obj = new \stdClass();
      $obj->id_usuario = $value->id;
      $obj->DT_RowId = $value->id;
      $obj->usuario = $value->name;
      $obj->asignar = $value->asignar;
      $arRegistros[] = $obj;
    }
    return response()->json([
      'data' => $arRegistros,
      'iTotalRecords' => count($docentesTotal),
      'iTotalDisplayRecords' => count($docentesTotal)
    ]);
  }
  //el sigueinte metodo es para cargar los estudiantes asignados al curso  o no 
  public function listarEstudiantes()
  {
    $idCurso = $_POST['idCurso'];
    $start = $_POST['start'];
    $limit = $_POST["length"];

    $docentes = DB::select('select users.id as id,UPPER(users.name) as name,(case when(select count(*) from curso_user 
    where curso_user.curso_id=' . $idCurso . ' and curso_user.user_id=users.id)> 0 then true else false end) as asignar
     from users join role_user on users.id=role_user.user_id where role_user.role_id=3 order by users.name limit ' . $limit . ' offset ' . $start . '');

    $docentesTotal = DB::select('select users.id as id,UPPER(users.name) as name,(case when(select count(*) from curso_user 
     where curso_user.curso_id=' . $idCurso . ' and curso_user.user_id=users.id)> 0 then true else false end) as asignar
      from users join role_user on users.id=role_user.user_id where role_user.role_id=3 order by users.name');

    $arRegistros = array();
    foreach ($docentes as $value) {
      $obj = new \stdClass();
      $obj->id_usuario = $value->id;
      $obj->DT_RowId = $value->id;
      $obj->usuario = $value->name;
      $obj->asignar = $value->asignar;
      $arRegistros[] = $obj;
    }
    return response()->json([
      'data' => $arRegistros,
      'iTotalRecords' => count($docentesTotal),
      'iTotalDisplayRecords' => count($docentesTotal)
    ]);
  }
  public function vincularUser(){
    $idUser = $_POST['idUser'];
    $idCurso = $_POST['idCurso'];
    $opcion = $_POST["opcion"];
    if($opcion==="Vincular"){
      DB::table('curso_user')->insert(
        ['user_id' => $idUser, 'curso_id' => $idCurso]
    );
    }else if($opcion==="Desvincular"){
      DB::delete('delete from curso_user where user_id='.$idUser.' and curso_id='.$idCurso.'');
    }
    return response()->json([
      'msg' => '',
      'successs' => true
    ]);
  }
  public function cargarTipoActividad(){
    $idMateria = $_POST['idMateria'];
    $idCurso = $_POST['idCurso'];
    $idDocente = $_POST["idDocente"];
    $idActividad = $_POST["idActividad"];
    $cursoSelect = DB::select('SELECT * 
    FROM tipo_Actividad');
     $arRegistros = array();
     foreach ($cursoSelect as $value) {
      $obj = new \stdClass();
      $obj->idTipoActividad = $value->id;
      $obj->nombre = $value->name;
      $obj->description = $value->description;
      $arRegistros[] = $obj;
    }
    return response()->json([
      'data' => $arRegistros
    ]);

  }
  
}
