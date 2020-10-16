<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class usuarioController extends Controller
{
  public function __construct()
  {
    $this->middleware('auth');
  }
  public function index(Request $request)
  {
    $request->user()->authorizeRoles(['admin']);
    return view('usuario.index');
  }
  public function listaUsuario()
  {

    $start = $_POST['start'];
    $limit = $_POST["length"];

    $usuario = DB::select('select users.id as id,users.name as name,users.email as email,
     (select count(*) from role_user
     where role_user.user_id=users.id) as roles from users
      order by name limit ' . $limit . ' offset ' . $start . '');
    $usuarioTotal = DB::select('select users.id as id,users.name as name,users.email as email,
     (select count(*) from role_user
     where role_user.user_id=users.id) as roles from users order by name');
    $arRegistros = array();
    foreach ($usuario as $value) {
      $obj = new \stdClass();
      $obj->id_usuario = $value->id;
      $obj->DT_RowId = $value->id;
      /*  $obj->usuario = $value->usuario; */
      $obj->nombre = $value->name;
      $obj->email = $value->email;
      $obj->roles = $value->roles;
      $arRegistros[] = $obj;
    }
    return response()->json([
      'data' => $arRegistros,
      'iTotalRecords' => count($usuarioTotal),
      'iTotalDisplayRecords' => count($usuarioTotal)
    ]);
    /*   return \Response::json($usuario); */
  }
  public function eliminarUsuario()
  {
    $idUsuario = $_POST['idUsuario'];
    $tablas = array('role_user','curso_user');
    $cont = 0;
    foreach ($tablas as $tabla) {
      if ($tabla == "role_user") {
        $idCampo = 'role_id';
      }else if("curso_user"){
        $idCampo='user_id';
      }
      /*   else if ($tabla == "usuario_rol") {
        $idCampo = 'id_usuario';
      } */
      $userUtilizado = DB::select('select * from ' . $tabla . ' where ' . $idCampo . '=' . $idUsuario . ' limit 1');
      if (count($userUtilizado) > 0) {
        $cont++;
      } else {
      }
    }
    if ($cont == 0) {
      $esUsado = false;
      $usuario = DB::delete('delete from users where id =' . $idUsuario);
    } else {
      $esUsado = true;
    }
    return response()->json([
      'msg' => '',
      'successs' => true,
      'usado' => $esUsado
    ]);
  }
  public function editarUsuario()
  {
    $idUsuario = $_POST['idUsuario'];
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    /*  $usuario = $_POST['usuario']; */
    $usuarioSql = DB::table('users')
      ->where('id', $idUsuario)
      ->update(['name' => $nombre, 'email' => $email]);
    return response()->json([
      'msg' => '',
      'successs' => true
    ]);
  }
  public function crearUsuario()
  {
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $pass = $_POST['password'];
    $password = bcrypt($pass);
    $id = DB::table('users')->insertGetId(
      ['name' => $nombre, 'email' => $email,  'password' => $password]
    );
    return response()->json([
      'msg' => '',
      'successs' => true
    ]);
  }
  public function asignarUsuarioRol(){
    $idUser = $_POST['idUser'];
    $start = $_POST['start'];
    $limit = $_POST["length"];

    $roles = DB::select('select roles.id as id,UPPER(roles.name) as name,roles.description as descripcion,
     (case when( select count(*) from role_user
     where role_user.user_id='.$idUser.' and role_id=roles.id)> 0 then true else false end) as asignar from roles
      order by name limit ' . $limit . ' offset ' . $start . '');
    $rolesTotal = DB::select('select roles.id as id,UPPER(roles.name) as name,roles.description as descripcion,
    (case when( select count(*) from role_user
    where role_user.user_id='.$idUser.' and role_id=roles.id)> 0 then true else false end) as asignar from roles
     order by name');
    $arRegistros = array();
    foreach ($roles as $value) {
      $obj = new \stdClass();
      $obj->id_usuario = $value->id;
      $obj->DT_RowId = $value->id;
      $obj->nombre = $value->name;
      $obj->descripcion = $value->descripcion;
      $obj->asignar = $value->asignar;
      $obj->rol = $value->name.", ".$value->descripcion;
      $arRegistros[] = $obj;
    }
    return response()->json([
      'data' => $arRegistros,
      'iTotalRecords' => count($rolesTotal),
      'iTotalDisplayRecords' => count($rolesTotal)
    ]);
  }
  public function vincularRol(){
    $idRol = $_POST['idRol'];
    $idUsuario = $_POST['idUsuario'];
    $opcion = $_POST["opcion"];
    if($opcion==="Vincular"){
      DB::table('role_user')->insert(
        ['user_id' => $idUsuario, 'role_id' => $idRol]
    );
    }else if($opcion==="Desvincular"){
      DB::delete('delete from role_user where user_id='.$idUsuario.' and role_id='.$idRol.'');
    }
    return response()->json([
      'msg' => '',
      'successs' => true
    ]);
  }
}
