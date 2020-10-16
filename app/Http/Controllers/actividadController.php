<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\View;

class actividadController extends Controller
{
  public function __construct()
  {
    $this->middleware('auth');
  }
  public function indexActividadDocente(Request $request)
  {
    $request->user()->authorizeRoles(['docente']);
    return view('actividad.indexActividadDocente');
  }
  public function indexActividadEstudiante(Request $request)
  {
    $request->user()->authorizeRoles(['estudiante']);
    return view('actividad.indexActividadEstudiante');
  }

  public function listaActividadDocente()
  {
    $start = $_POST['start'];
    $limit = $_POST["length"];
    $idUser = $_POST["idUser"];

    $actividadesTotal = DB::select('SELECT activities.id as idActividad,activities.name as actividadNombre,
    activities.description,materias.id as idMateria,materias.name as materiaNombre ,cursos.id as idCurso,
    cursos.name as cursoNombre FROM activities 
    JOIN activity_materia on activities.id=activity_materia.activity_id 
    join materias on materias.id=activity_materia.materia_id 
    join materia_curso on materias.id=materia_curso.materia_id 
    join cursos on cursos.id=materia_curso.curso_id 
    join curso_user on curso_user.curso_id=cursos.id 
    join users on users.id=curso_user.user_id where users.id=' . $idUser . ' GROUP by activities.id  order by activities.name limit ' . $limit . ' offset ' . $start . '');
    $actividades = DB::select('SELECT activities.id as idActividad,activities.name as actividadNombre,
    activities.description,materias.id as idMateria,materias.name as materiaNombre ,cursos.id as idCurso,
    cursos.name as cursoNombre FROM activities 
    JOIN activity_materia on activities.id=activity_materia.activity_id 
    join materias on materias.id=activity_materia.materia_id 
    join materia_curso on materias.id=materia_curso.materia_id 
    join cursos on cursos.id=materia_curso.curso_id 
    join curso_user on curso_user.curso_id=cursos.id 
    join users on users.id=curso_user.user_id where users.id=' . $idUser . '
     order by activities.name ');
    $arRegistros = array();
    foreach ($actividades as $value) {
      $obj = new \stdClass();
      $obj->idActividad = $value->idActividad;
      $obj->DT_RowId = $value->idActividad . "_" . $value->idMateria . "_" . $value->idCurso;
      $obj->actividadName = $value->actividadNombre;
      $obj->descripcionActividad = $value->description;
      $obj->idMateria = $value->idMateria;
      $obj->materiaNombre = $value->materiaNombre;
      $obj->idCurso = $value->idCurso;
      $obj->cursoNombre = $value->cursoNombre;
      $arRegistros[] = $obj;
    }
    return response()->json([
      'data' => $arRegistros,
      'iTotalRecords' => count($actividadesTotal),
      'iTotalDisplayRecords' => count($actividadesTotal)
    ]);
  }
  public function crearActividadDocente()
  {
    $idUserDocente = $_POST['idDocente'];
    $nombreActividad = $_POST['nombreActividad'];
    $descActividad = $_POST['descActividad'];
    $idMateria = $_POST['idMateria'];
    $idActividad = DB::table('activities')->insertGetId(
      ['name' => $nombreActividad, 'description' => $descActividad]
    );
    DB::table('activity_materia')->insert(
      ['materia_id' => $idMateria, 'activity_id' => $idActividad]
    );
    return response()->json([
      'msg' => '',
      'successs' => true
    ]);
  }
  public function eliminarActividadDocente()
  {
    $idActividad = $_POST['idActividad'];
    $idMateria = $_POST['idMateria'];
    $idCurso = $_POST['idCurso'];

    $tablas = array('preguntas', 'activity_materia');
    $cont = 0;
    foreach ($tablas as $tabla) {

      if ($tabla == "preguntas") {
        $idCampo = 'id_actividad';
      } else if ($tabla == "activity_materia") {
        $idCampo = 'activity_id';
      }
      $userUtilizado = DB::select('select * from ' . $tabla . ' where ' . $idCampo . '=' . $idActividad . ' limit 1');
      if (count($userUtilizado) > 0) {
        $cont++;
      } else {
      }
    }
    if ($cont == 0) {
      $esUsado = false;
      $actiMateria = DB::delete('delete from activity_materia where materia_id=' . $idMateria . ' and activity_id=' . $idActividad . '');
      $actividadEli = DB::delete('delete from activities where id=' . $idActividad . '');
    } else {
      $esUsado = true;
    }

    return response()->json([
      'msg' => '',
      'successs' => true,
      'usado' => $esUsado
    ]);
  }
  public function editarActividadDocente()
  {
    $idActividad = $_POST['idActividad'];
    $idMateria = $_POST['idMateria'];
    $idCurso = $_POST['idCurso'];
    $nombreActividad = $_POST['nombreActividad'];
    $descripcionActividad = $_POST['descripcionActividad'];
    $materiaActividad = $_POST['materiaActividad'];
    //edito informacion de la actividad
    $editActividad = DB::table('activities')
      ->where('id', $idActividad)
      ->update(['name' => $nombreActividad, 'description' => $descripcionActividad]);
    //desvinculo relacion de actividad con materia
    DB::delete('delete from activity_materia where materia_id=' . $idMateria . ' and activity_id=' . $idActividad . '');
    //asigno nueva relacion de actividad con materia
    DB::table('activity_materia')->insert(
      ['materia_id' => $materiaActividad, 'activity_id' => $idActividad]
    );
    return response()->json([
      'msg' => '',
      'successs' => true
    ]);
  }

  public function cargarMateriaActividadSelect()
  {
    $idUserDocente = $_POST['idDocente'];
    $cursoSelect = DB::select('select materias.id as idMateria,materias.name from materias
     join materia_curso on materias.id=materia_curso.materia_id
    join cursos on cursos.id=materia_curso.curso_id
     join curso_user on curso_user.curso_id=cursos.id where curso_user.user_id=' . $idUserDocente . ' GROUP by materias.id');
    $arRegistros = array();
    foreach ($cursoSelect as $value) {
      $obj = new \stdClass();
      $obj->idMateria = $value->idMateria;
      $obj->nombre = $value->name;
      $arRegistros[] = $obj;
    }
    return response()->json([
      'data' => $arRegistros
    ]);
  }

  public function guardarActividadPreguntas()
  {
    $dataPreguntas = $_POST['dataPreguntas'];
    $tipoActividad = $_POST['tipoActividad'];
    $idActividad = $_POST['idActividad'];
    $idCurso = $_POST['idCurso'];
    $idMateria = $_POST['idMateria'];
    $arrayPreguntas = json_decode($dataPreguntas);
    $correcta = 0;
    if ($tipoActividad == 1) {
      foreach ($arrayPreguntas as $value) {
        $pregunta = $value->pregunta;
        $i = 0;
        foreach ($value->respuestas as $key => $rta) {
          if ($rta->check == true) {
            $correcta = $key;
          }
        }
        $rtas = json_encode($value->respuestas);
        $id = DB::table('preguntas')->insertGetId(
          [
            'nombre' => $pregunta, 'contenido' => $rtas, 'rta_correcta' => $correcta, 'tipo_actividad_id' => $tipoActividad,
            'id_actividad' => $idActividad
          ]
        );
      }
    } else if ($tipoActividad == 2) {
      foreach ($arrayPreguntas as $value) {
        $pregunta = $value->pregunta;
        $id = DB::table('preguntas')->insertGetId(
          [
            'nombre' => $pregunta, 'contenido' => null, 'rta_correcta' => null, 'tipo_actividad_id' => $tipoActividad,
            'id_actividad' => $idActividad
          ]
        );
      }
    } else if ($tipoActividad == 3) {
      foreach ($arrayPreguntas as $value) {
        /*  $pregunta = $value->pregunta; */
        $id = DB::table('preguntas')->insertGetId(
          [
            'nombre' => null, 'contenido' => $value->textoEditor, 'rta_correcta' => null, 'tipo_actividad_id' => $tipoActividad,
            'id_actividad' => $idActividad
          ]
        );
      }
    }
    return response()->json([
      'msg' => '',
      'successs' => true
    ]);
  }
  public function listaActividadEstudiante()
  {
    $start = $_POST['start'];
    $limit = $_POST["length"];
    $idUser = $_POST["idUserEstudiante"];

    $actividadesTotal = DB::select('SELECT activities.id as idActividad,activities.name as actividadNombre,
    activities.description,materias.id as idMateria,materias.name as materiaNombre ,cursos.id as idCurso,
    cursos.name as cursoNombre FROM activities 
    JOIN activity_materia on activities.id=activity_materia.activity_id 
    join materias on materias.id=activity_materia.materia_id 
    join materia_curso on materias.id=materia_curso.materia_id 
    join cursos on cursos.id=materia_curso.curso_id 
    join curso_user on curso_user.curso_id=cursos.id 
    join users on users.id=curso_user.user_id where users.id=' . $idUser . ' GROUP by activities.id  order by cursoNombre limit ' . $limit . ' offset ' . $start . '');
    $actividades = DB::select('SELECT activities.id as idActividad,activities.name as actividadNombre,
    activities.description,materias.id as idMateria,materias.name as materiaNombre ,cursos.id as idCurso,
    cursos.name as cursoNombre FROM activities 
    JOIN activity_materia on activities.id=activity_materia.activity_id 
    join materias on materias.id=activity_materia.materia_id 
    join materia_curso on materias.id=materia_curso.materia_id 
    join cursos on cursos.id=materia_curso.curso_id 
    join curso_user on curso_user.curso_id=cursos.id 
    join users on users.id=curso_user.user_id where users.id=' . $idUser . '
     order by idActividad,cursoNombre ');
    $arRegistros = array();
    foreach ($actividades as $value) {
      $obj = new \stdClass();
      $obj->idActividad = $value->idActividad;
      $obj->DT_RowId = $value->idActividad . "_" . $value->idMateria . "_" . $value->idCurso;
      $obj->actividadName = $value->actividadNombre;
      $obj->descripcionActividad = $value->description;
      $obj->idMateria = $value->idMateria;
      $obj->materiaNombre = $value->materiaNombre;
      $obj->idCurso = $value->idCurso;
      $obj->cursoNombre = $value->cursoNombre;
      $arRegistros[] = $obj;
    }
    return response()->json([
      'data' => $arRegistros,
      'iTotalRecords' => count($actividadesTotal),
      'iTotalDisplayRecords' => count($actividadesTotal)
    ]);
  }
  /* function para cargar el tipo de actividad de una actividad ya sea pregunta encuesta o contenido libre */
  public function cargarTipoActividadEstudiante()
  {
    $idMateria = $_POST["idMateria"];
    $idCurso = $_POST["idCurso"];
    $idEstudiante = $_POST["idEstudiante"];
    $idActividad = $_POST["idActividad"];
    $selectPreguntas = DB::select('SELECT preguntas.id,preguntas.nombre,preguntas.contenido,
    preguntas.rta_correcta,preguntas.tipo_actividad_id,preguntas.id_actividad 
    from preguntas join activities on preguntas.id_actividad=activities.id 
    where preguntas.id_actividad=' . $idActividad . ' ORDER by preguntas.id');
    $arRegistros = array();
    if (isset($selectPreguntas[0]->tipo_actividad_id)) {
      $tipoActividad = $selectPreguntas[0]->tipo_actividad_id;
      $selectRtasRespondidas = DB::select('select * from respuestas where id_actividad=' . $idActividad . ' and id_user=' . $idEstudiante . ' order by id_pregunta');
      foreach ($selectPreguntas as $value) {
        $obj = new \stdClass();
        $obj->idActividad = $value->id_actividad;
        $obj->DT_RowId = $value->id . "_" . $value->id_actividad;
        $obj->nombreTipoActividad = $value->nombre;
        $obj->contenido = $value->contenido;
        $obj->tipoActividad = $value->tipo_actividad_id;
        $obj->idPregunta = $value->id;
        $arRegistros[] = $obj;
      }
      return response()->json([
        'data' => $arRegistros,
        'rtasRespondidas' => $selectRtasRespondidas,
        'tipoActividad' => $tipoActividad
      ]);
    } else {
      return response()->json([
        'data' => '',
        'rtasRespondidas' => '',
        'tipoActividad' =>''
      ]);
    }
  }
  public function guardarRespuestaActividadEstudiante()
  {
    $idMateria = $_POST["idMateria"];
    $idCurso = $_POST["idCurso"];
    $idEstudiante = $_POST["idEstudiante"];
    $idActividad = $_POST["idActividad"];
    $tipoActividad = $_POST["tipoActividad"];
    $dataRtas = $_POST["dataRtas"];
    $arrayRtas = json_decode($dataRtas);
    if ($tipoActividad == 1) {
      foreach ($arrayRtas as $value) {
        $idPregunta = $value->idPregunta;
        $idTipoActividad = $value->tipoActividad;
        $rtaSel = $value->rtaSel;
        $explodeRta = explode("_", $rtaSel);
        $seleccionada = $explodeRta[2];
        /*   var_dump($seleccionada); */
        $id = DB::table('respuestas')->insertGetId(
          [
            'respuesta_selec' => $seleccionada, 'id_pregunta' => $idPregunta, 'id_tipo_actividad' => $idTipoActividad, 'id_actividad' => $idActividad,
            'id_user' => $idEstudiante
          ]
        );
      }
    } else if ($tipoActividad == 2) {
      foreach ($arrayRtas as $value) {
        $rtaEncuesta = $value->rtaSel;
        $idPregunta = $value->idPregunta;
        $tipoActividad = $value->tipoActividad;
        /*   var_dump($seleccionada); */
        $id = DB::table('respuestas')->insertGetId(
          [
            'respuesta_selec' => $rtaEncuesta, 'id_pregunta' => $idPregunta, 'id_tipo_actividad' => $tipoActividad, 'id_actividad' => $idActividad,
            'id_user' => $idEstudiante
          ]
        );
      }
    } else if ($tipoActividad == 3) {
    }

    return response()->json([
      'msg' => '',
      'successs' => true
    ]);
  }
  /* el siguiente metodo es para verificar si la actividad tiene algun tipo de actividad ya creada ,
   si la tiene se carga esta actividad  si no se deja la opcion para crear   */
  public function verificarActividadCreada()
  {
    /* $tipoActividad = $_POST["tipoActividad"]; */
    $idActividad = $_POST["idActividad"];
    $idCurso = $_POST["idCurso"];
    $idMateria = $_POST["idMateria"];
    $preguntasCreadas = DB::select('select * from preguntas where  preguntas.id_actividad='.$idActividad.' order by id');
    $cont = 0;
    $arRegistros = array();
    foreach ($preguntasCreadas as $value) {
      $cont++;
      $obj = new \stdClass();
      $obj->id = $value->id;
      $obj->nombre = $value->nombre;
      $obj->contenido = $value->contenido;
      $obj->rta_correcta = $value->rta_correcta;
      $obj->tipo_actividad_id = $value->tipo_actividad_id;
      $obj->id_actividad = $value->id_actividad;
      $arRegistros[] = $obj;
    }
    return response()->json([
      'data' => $arRegistros,
      'contadorPreguntas' => $cont
    ]);
  }
  /* el siguiente metodo es para encargarse de editar el tipo de actividad que tenga una actividad creada */
  public function editarContenidoTipoActividad(){
    $texto = $_POST["texto"];
    $tipoActividad = $_POST["tipoActividad"];
    $idActividad = $_POST["idActividad"];
    $idCurso = $_POST["idCurso"];
    $idMateria = $_POST["idMateria"];
    $editPregunta = DB::table('preguntas')
    ->where(['tipo_actividad_id'=>$tipoActividad,'id_actividad'=>$idActividad])
    /* ->where('id', $idActividad) */
    ->update(['contenido' => $texto]);
  }


  /* el siguiente metodo es para cargar los estudiantes vinculados a una actividad  */
  public function verEstudiantesActividad(){
    $idActividad = $_POST["idActividad"];
    $idCurso = $_POST["idCurso"];
    $idMateria = $_POST["idMateria"];
    $limit = $_POST["length"];
    $start = $_POST["start"];
    $estudiantesActividad = DB::select('select users.name as user ,users.id as idUser,cursos.name as curso,
    cursos.id as idCurso,materias.name as materias ,materias.id as idMateria,
    activities.name as actividades , activities.id as idActividad
    from users join role_user on role_user.user_id=users.id 
    JOIN curso_user on curso_user.user_id=users.id 
    join cursos on cursos.id=curso_user.curso_id 
    join materia_curso on materia_curso.curso_id=cursos.id 
    join materias on materias.id=materia_curso.materia_id 
    join activity_materia on activity_materia.materia_id=materias.id 
    join activities on activities.id=activity_materia.activity_id 
    where activities.id='.$idActividad.' and materias.id='.$idMateria.' and cursos.id='.$idCurso.' and role_user.role_id=3 limit ' . $limit . ' offset ' . $start . '');
    $estudiantesActividadTotal = DB::select('select users.name as user ,users.id as idUser,cursos.name as curso,
    cursos.id as idCurso,materias.name as materias ,materias.id as idMateria,
    activities.name as actividades , activities.id as idActividad
    from users join role_user on role_user.user_id=users.id 
    JOIN curso_user on curso_user.user_id=users.id 
    join cursos on cursos.id=curso_user.curso_id 
    join materia_curso on materia_curso.curso_id=cursos.id 
    join materias on materias.id=materia_curso.materia_id 
    join activity_materia on activity_materia.materia_id=materias.id 
    join activities on activities.id=activity_materia.activity_id 
    where activities.id='.$idActividad.' and materias.id='.$idMateria.' and cursos.id='.$idCurso.' and role_user.role_id=3');
    $arRegistros = array();
    foreach ($estudiantesActividad as $value) {
      $obj = new \stdClass();
      $obj->user = $value->user;
      $obj->DT_RowId=$value->idUser . "_" . $value->idActividad. "_" . $value->idMateria. "_" . $value->idCurso;
      $obj->curso = $value->curso;
      $obj->materias = $value->materias;
      $obj->actividades = $value->actividades;
      $obj->idUser = $value->idUser;
      $obj->idCurso = $value->idCurso;
      $obj->idMateria = $value->idMateria;
      $obj->idActividad = $value->idActividad;
      $arRegistros[] = $obj;
    }
    return response()->json([
      'data' => $arRegistros,
      'iTotalRecords' => count($estudiantesActividadTotal),
      'iTotalDisplayRecords' => count($estudiantesActividadTotal)
    ]);

  }
  /* metodo en cargado que desde la vista de actividades del docente al seleccionar un estudiante de cierta actividad
  pueda ir a la vista para cargar el tipo de actividad que va a ser el siguiente metodo despues de este */
  public function verinfoEstudianteActividad(Request $request){
    $request->user()->authorizeRoles(['docente']);
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
  public function cargarInformacionActividadEstudiante(){
    $idEstudiante = $_POST['idEstudiante'];
    $idActividad = $_POST['idActividad'];
    $idCurso = $_POST['idCurso'];
    $idMateria = $_POST['idMateria'];
    $tipoActividadSql = DB::select('SELECT tipo_actividad.id,tipo_actividad.name as tipoActividad,activities.name as actividadName 
    FROM preguntas join tipo_actividad on tipo_actividad.id=preguntas.tipo_actividad_id 
    join activities on activities.id=preguntas.id_actividad 
    WHERE preguntas.id_actividad='.$idActividad.'');
    $tipoActividad='';
    $estudiante='';
    $consultaPreguntas='';
    $arRegistros = array();
    if(count($tipoActividadSql)>0){
      $tipoActividad=$tipoActividadSql[0]->id;
      $consultaPreguntas=DB::select('select * from preguntas where preguntas.tipo_actividad_id='.$tipoActividad.' and preguntas.id_actividad='.$idActividad.' order by id');
      foreach ($consultaPreguntas as $value) {
        $obj = new \stdClass();
        $obj->DT_RowId=$value->id;
        $obj->nombrePregunta=$value->nombre;
        $obj->contenidoPregunta=$value->contenido;
        $obj->rtaCorrecta=$value->rta_correcta;
        $obj->idTipoActividad=$value->tipo_actividad_id;
        $obj->idActividad=$value->id_actividad;
        $consultaRespuesta=DB::select('select * from respuestas where respuestas.id_pregunta='.$value->id.' and 
        respuestas.id_tipo_actividad='.$value->tipo_actividad_id.' and id_actividad='.$value->id_actividad.' and id_user='.$idEstudiante.' order by id');
        if(count($consultaRespuesta)>0){
          $obj->respondidaXestudiante=$consultaRespuesta[0]->respuesta_selec;
        }else{
          $obj->respondidaXestudiante='---';
        }
        $sqlEstudiante=DB::select('select * from users where users.id='.$idEstudiante.'');
        $obj->estudiante='Actividad vinculada a estudiante '.$sqlEstudiante[0]->name;

        $arRegistros[] = $obj;
      }
      /* $sqlEstudiante=DB::select('select users.name from respuestas join users on respuestas.id_user=users.id where respuestas.id_tipo_actividad='.$tipoActividad.' and id_actividad='.$idActividad.' and id_user='.$idEstudiante.' order by respuestas.id');
      if(count($sqlEstudiante)>0){
        $estudiante=$sqlEstudiante[0]->name;
      } */
    }
     return response()->json([
      'tipoActividad' => $tipoActividad,
      'tipoActividadSql'=>$tipoActividadSql,
      'dataPreguntas'=>$arRegistros
    ]);
  }
}
