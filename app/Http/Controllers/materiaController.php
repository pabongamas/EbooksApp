<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\View;

class materiaController extends Controller
{
  public function __construct()
  {
    $this->middleware('auth');
  }
  public function index(Request $request)
  {
    $request->user()->authorizeRoles(['admin']);
    return view('materia.index');
  }
  public function indexMateriaDocente(Request $request)
  {
    $request->user()->authorizeRoles(['docente']);
    return view('materia.indexMateriaDocente');
  }
  public function indexMateriaEstudiante(Request $request)
  {
    $request->user()->authorizeRoles(['estudiante']);
    return view('materia.indexMateriaEstudiante');
  }
  public function listaMateria()
  {

    $start = $_POST['start'];
    $limit = $_POST["length"];
    $materia = DB::select('select materias.id as idMateria,materias.name as nameMateria,materias.description as descripcion from  materias order by nameMateria limit ' . $limit . ' offset ' . $start . '');
    $materiaTotal = DB::select('select materias.id as idMateria,materias.name as nameMateria,materias.description as descripcion from materias  order by nameMateria');
    $arRegistros = array();
    foreach ($materia as $value) {
      $obj = new \stdClass();
      $obj->idMateria = $value->idMateria;
      $obj->DT_RowId = $value->idMateria;
      $obj->nombre = $value->nameMateria;
      $obj->description = $value->descripcion;
      $arRegistros[] = $obj;
    }
    return response()->json([
      'data' => $arRegistros,
      'iTotalRecords' => count($materiaTotal),
      'iTotalDisplayRecords' => count($materiaTotal)
    ]);
  }
  public function eliminarMateria()
  {
    $idMateria = $_POST['idMateria'];
    $tablas = array('activity_materia', 'materia_curso');
    $cont = 0;
    foreach ($tablas as $tabla) {
      if ($tabla == "activity_materia") {
        $idCampo = 'materia_id';
      } else if ($tabla == "materia_curso") {
        $idCampo = 'materia_id';
      } else if ($tabla == "usuario_rol") {
        $idCampo = 'id_usuario';
      }
      $userUtilizado = DB::select('select * from ' . $tabla . ' where ' . $idCampo . '=' . $idMateria . ' limit 1');
      if (count($userUtilizado) > 0) {
        $cont++;
      } else {
      }
    }
    if ($cont == 0) {
      $esUsado = false;
      $usuario = DB::delete('delete from materias where id =' . $idMateria);
    } else {
      $esUsado = true;
    }
    return response()->json([
      'msg' => '',
      'successs' => true,
      'usado' => $esUsado
    ]);
  }
  public function editarMateria()
  {
    $idMateria = $_POST['idMateria'];
    $nombre = $_POST['nombre'];
    $description = $_POST['description'];
    $materiaSql = DB::table('materias')
      ->where('id', $idMateria)
      ->update(['name' => $nombre, 'description' => $description]);
    return response()->json([
      'msg' => '',
      'successs' => true
    ]);
  }
  public function crearMateria()
  {
    $nombre = $_POST['nombre'];
    $description = $_POST['description'];
    $id = DB::table('materias')->insertGetId(
      ['name' => $nombre, 'description' => $description]
    );
    return response()->json([
      'msg' => '',
      'successs' => true
    ]);
  }
  /* -----------------------------CONTROLADOR PARA DATAOS DE MATERIA PARA DOCENTE-------------------------- */
  public function listaMateriaDocente()
  {
    $start = $_POST['start'];
    $limit = $_POST["length"];
    $idUserDocente = $_POST["idUserDocente"];

    $materias = DB::select('SELECT materias.id,materias.name,materias.description,cursos.name as curso ,cursos.id as idCurso
    from materias join materia_curso on materia_curso.materia_id=materias.id 
    join cursos on cursos.id=materia_curso.curso_id 
    join curso_user on curso_user.curso_id=cursos.id 
    join users on users.id=curso_user.user_id 
    where users.id=' . $idUserDocente . '
    order by name limit ' . $limit . ' offset ' . $start . '');
    $materiasTotal = DB::select('SELECT materias.id,materias.name,materias.description 
    from materias join materia_curso on materia_curso.materia_id=materias.id 
    join cursos on cursos.id=materia_curso.curso_id 
    join curso_user on curso_user.curso_id=cursos.id 
    join users on users.id=curso_user.user_id 
    where users.id=' . $idUserDocente . ' order by name');
    $arRegistros = array();
    foreach ($materias as $value) {
      $obj = new \stdClass();
      $obj->id_materia = $value->id;
      $obj->DT_RowId = $value->id . "_" . $value->idCurso;
      $obj->curso = $value->curso;
      $obj->idCurso = $value->idCurso;
      $obj->nombre = $value->name;
      $obj->description = $value->description;
      $arRegistros[] = $obj;
    }
    return response()->json([
      'data' => $arRegistros,
      'iTotalRecords' => count($materiasTotal),
      'iTotalDisplayRecords' => count($materiasTotal)
    ]);
  }

  public function eliminarMateriaDocente()
  {
    $idMateria = $_POST['idMateria'];
    $idUserDocente = $_POST['idUserDocente'];
    $idCurso = $_POST['idCurso'];

    $tablas = array('activity_materia');
    $cont = 0;
    foreach ($tablas as $tabla) {

      if ($tabla == "activity_materia") {
        $idCampo = 'materia_id';
      } else if ($tabla == "materia_curso") {
        $idCampo = 'materia_id';
      }
      $userUtilizado = DB::select('select * from ' . $tabla . ' where ' . $idCampo . '=' . $idMateria . ' limit 1');
      if (count($userUtilizado) > 0) {
        $cont++;
      } else {
      }
    }
    if ($cont == 0) {
      $esUsado = false;
      $materia_curso = DB::delete('delete from materia_curso where materia_id=' . $idMateria . ' and curso_id=' . $idCurso . '');
      $materiaElim = DB::delete('delete from materias where id=' . $idMateria . '');
    } else {
      $esUsado = true;
    }

    return response()->json([
      'msg' => '',
      'successs' => true,
      'usado' => $esUsado
    ]);
  }
  public function editarMateriaDocente()
  {
    $idUserDocente = $_POST['idUserDocente'];
    $idMateria = $_POST['idMateria'];
    $idCurso = $_POST['idCurso'];
    $nombreMateria = $_POST['nombreInputMateria'];
    $descripcionMateria = $_POST['descripcionInputMateriaDocente'];
    $cursoMateria = $_POST['curso'];
    //edito informacion de la actividad
    $editActividad = DB::table('materias')
      ->where('id', $idMateria)
      ->update(['name' => $nombreMateria, 'description' => $descripcionMateria]);
    //desvinculo relacion de curso  con materia
    DB::delete('delete from materia_curso where materia_id=' . $idMateria . ' and curso_id=' . $idCurso . '');
    //asigno nueva relacion de curso con materia
    DB::table('materia_curso')->insert(
      ['materia_id' => $idMateria, 'curso_id' => $cursoMateria]
    );
    return response()->json([
      'msg' => '',
      'successs' => true
    ]);
  }

  public function AsignarActividad()
  {
    $idMateria = $_POST['idMateria'];
    $idCurso = $_POST['idCurso'];
    $start = $_POST['start'];
    $limit = $_POST["length"];
    $actividades = DB::select('select activities.id as id,UPPER(activities.name)as name,activities.description,
     (case when(select count(*) from activity_materia
      WHERE activity_materia.materia_id=' . $idMateria . ' and activity_materia.activity_id=activities.id)>0 then true else false end)
       as asignar from activities order by name limit ' . $limit . ' offset ' . $start . '');
    $actividadesTotal = DB::select('select activities.id as id,UPPER(activities.name)as name,activities.description,
     (case when(select count(*) from activity_materia
      WHERE activity_materia.materia_id=' . $idMateria . ' and activity_materia.activity_id=activities.id)>0 then true else
       false end) as asignar from activities order by name');
    $arRegistros = array();
    foreach ($actividades as $value) {
      $obj = new \stdClass();
      $obj->id_actividad = $value->id;
      $obj->DT_RowId = $value->id;
      $obj->nombre = $value->name;
      $obj->descripcion = $value->description;
      $obj->asignar = $value->asignar;
      $obj->actividad = $value->name . ", " . $value->description;
      $arRegistros[] = $obj;
    }
    return response()->json([
      'data' => $arRegistros,
      'iTotalRecords' => count($actividadesTotal),
      'iTotalDisplayRecords' => count($actividadesTotal)
    ]);
  }
  public function vincularActividad()
  {
    $idActividad = $_POST['idActividad'];
    $idMateria = $_POST['idMateria'];
    $opcion = $_POST["opcion"];
    if ($opcion === "Vincular") {
      DB::table('activity_materia')->insert(
        ['materia_id' => $idMateria, 'activity_id' => $idActividad]
      );
    } else if ($opcion === "Desvincular") {
      DB::delete('delete from activity_materia where materia_id=' . $idMateria . ' and activity_id=' . $idActividad . '');
    }
    return response()->json([
      'msg' => '',
      'successs' => true
    ]);
  }
  public function cargarCursoSelect()
  {
    $idUserDocente = $_POST['idDocente'];
    $cursoSelect = DB::select('SELECT cursos.id,cursos.name 
    FROM cursos LEFT JOIN curso_user on cursos.id=curso_user.curso_id where curso_user.user_id=' . $idUserDocente . ' group by id ORDER by cursos.name');
    $arRegistros = array();
    foreach ($cursoSelect as $value) {
      $obj = new \stdClass();
      $obj->idCurso = $value->id;
      $obj->nombre = $value->name;
      $arRegistros[] = $obj;
    }
    return response()->json([
      'data' => $arRegistros
    ]);
  }
  public function crearMateriaDocenteCurso()
  {
    $idUserDocente = $_POST['idDocente'];
    $nombreMateria = $_POST['nombreMateria'];
    $descripcionMateria = $_POST['descripcionMateria'];
    $idCurso = $_POST['cursoId'];
    $idMateria = DB::table('materias')->insertGetId(
      ['name' => $nombreMateria, 'description' => $descripcionMateria]
    );
    $idCursoMateria = DB::table('materia_curso')->insertGetId(
      ['materia_id' => $idMateria, 'curso_id' => $idCurso]
    );
    /*  $idCursoUser=DB::table('curso_user')->insertGetId(
      ['user_id' => $idUserDocente, 'curso_id' => $idCurso]
    ); */
    return response()->json([
      'msg' => '',
      'successs' => true
    ]);
  }
  /* -------------------------------------CONTROLADOR DE DATOS PARA MATERIA DE ESTUDIANTE------------------ */
  public function listaMateriaEstudiante()
  {
    $start = $_POST['start'];
    $limit = $_POST["length"];
    $idUserEstudiante = $_POST["idUserEstudiante"];

    $materias = DB::select('SELECT materias.id,materias.name,materias.description,cursos.name as curso,
    cursos.id as idCurso,
    (select users.name from users 
    join curso_user on users.id=curso_user.user_id 
    join role_user on role_user.user_id=users.id 
    where curso_user.curso_id=idCurso and role_user.role_id=2)AS docente 
    from materias join materia_curso on materia_curso.materia_id=materias.id 
    join cursos on cursos.id=materia_curso.curso_id 
    join curso_user on curso_user.curso_id=cursos.id 
    join users on users.id=curso_user.user_id 
    where users.id='.$idUserEstudiante.' order by name limit ' . $limit . ' offset ' . $start . '');
    $materiasTotal = DB::select('SELECT materias.id,materias.name,materias.description,cursos.name as curso,
    cursos.id as idCurso,
    (select users.name from users 
    join curso_user on users.id=curso_user.user_id 
    join role_user on role_user.user_id=users.id 
    where curso_user.curso_id=idCurso and role_user.role_id=2)AS docente 
    from materias join materia_curso on materia_curso.materia_id=materias.id 
    join cursos on cursos.id=materia_curso.curso_id 
    join curso_user on curso_user.curso_id=cursos.id 
    join users on users.id=curso_user.user_id 
    where users.id='.$idUserEstudiante.' order by name');
    $arRegistros = array();
    foreach ($materias as $value) {
      $obj = new \stdClass();
      $obj->id_materia = $value->id;
      $obj->DT_RowId = $value->id . "_" . $value->idCurso;
      $obj->curso = $value->curso;
      $obj->idCurso = $value->idCurso;
      $obj->nombre = $value->name;
      $obj->description = $value->description;
      $obj->docente = $value->docente;
      $arRegistros[] = $obj;
    }
    return response()->json([
      'data' => $arRegistros,
      'iTotalRecords' => count($materiasTotal),
      'iTotalDisplayRecords' => count($materiasTotal)
    ]);
  }
}
