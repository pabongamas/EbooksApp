<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class rolController extends Controller
{
  public function __construct()
  {
    $this->middleware('auth');
  }
  public function index(Request $request)
  {
    $request->user()->authorizeRoles(['admin']);
    return view('rol.index');
  }
  public function listaRoles()
  {
    $start = $_POST['start'];
    $limit = $_POST["length"];

    $rol = DB::select('select * from roles order by name limit ' . $limit . ' offset ' . $start . '');
    $rolTotal = DB::select('select * from roles order by name');
    $arRegistros = array();
    foreach ($rol as $value) {
      $obj = new \stdClass();
      $obj->id_rol = $value->id;
      $obj->DT_RowId = $value->id;
      $obj->nombre = $value->name;
      $obj->description = $value->description;
      $arRegistros[] = $obj;
    }
    return response()->json([
      'data' => $arRegistros,
      'iTotalRecords' => count($rolTotal),
      'iTotalDisplayRecords' => count($rolTotal)
    ]);
  }
  public function eliminarRol()
  {
    $cont = 0;
    $idRol = $_POST['idRol'];
    $tablas = array('role_user');
    foreach ($tablas as $tabla) {
      if ($tabla == "role_user") {
        $idCampo = 'role_id';
      }
      $rolUtilizado = DB::select('select * from ' . $tabla . ' where '.$idCampo.'=' . $idRol . ' limit 1');
      if (count($rolUtilizado) > 0) {
        $cont++;
      } else {
      }
    }
    if ($cont == 0) {
      $esUsado = false;
      $usuario = DB::delete('delete from roles where id =' . $idRol);
    } else {
      $esUsado = true;
    }
    return response()->json([
      'msg' => '',
      'successs' => true,
      'usado' => $esUsado
    ]);
  }
  public function editarRol()
  {
    $idRol = $_POST['idRol'];
    $nombre = $_POST['nombre'];
    $description = $_POST['description'];
    $rolSql = DB::table('roles')
      ->where('id', $idRol)
      ->update(['name' => $nombre, 'description' => $description]);
    return response()->json([
      'msg' => '',
      'successs' => true
    ]);
  }
  public function crearRol()
  {
    $nombreRol = $_POST['nombreRol'];
    $descriptionRol = $_POST['descriptionRol'];
    $id = DB::table('roles')->insertGetId(
      ['name' => $nombreRol, 'description' => $descriptionRol]
    );
    return response()->json([
      'msg' => '',
      'successs' => true
    ]);
  }
}
