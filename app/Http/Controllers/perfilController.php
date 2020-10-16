<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class perfilController extends Controller
{
  public function __construct()
  {
    $this->middleware('auth');
  }
  public function index(Request $request)
  {
    $request->user()->authorizeRoles(['admin']);
    return view('perfil.index');
  }

  public function listaPerfiles()
  {
    $start = $_POST['start'];
    $limit = $_POST["length"];

    $perfil = DB::select('select * from perfil order by nombre limit ' . $limit . ' offset ' . $start . '');
    $perfilTotal = DB::select('select * from perfil order by nombre');
    $arRegistros = array();
    foreach ($perfil as $value) {
      $obj = new \stdClass();
      $obj->id_perfil = $value->id_perfil;
      $obj->DT_RowId = $value->id_perfil;
      $obj->nombre = $value->nombre;
      $obj->estado = $value->estado;
      $arRegistros[] = $obj;
    }
    return response()->json([
      'data' => $arRegistros,
      'iTotalRecords' => count($perfilTotal),
      'iTotalDisplayRecords' => count($perfilTotal)
    ]);
  }
  public function eliminarPerfil()
  {
    $idPerfil = $_POST['idPerfil'];
    $tablas = array('rol_perfil', 'permiso_perfil');
    $cont = 0;
    foreach ($tablas as $tabla) {
      if ($tabla == "rol_perfil") {
        $idCampo = 'id_perfil';
      } else if ($tabla == "permiso_perfil") {
        $idCampo = 'p_id_perfil';
      }
      $perfilUtilizado = DB::select('select * from ' . $tabla . ' where ' . $idCampo . '=' . $idPerfil . ' limit 1');
      if (count($perfilUtilizado) > 0) {
        $cont++;
      } else {
      }
    }
    if ($cont == 0) {
      $esUsado = false;
      $usuario = DB::delete('delete from perfil where id_perfil =' . $idPerfil);
    } else {
      $esUsado = true;
    }

    return response()->json([
      'msg' => '',
      'successs' => true,
      'usado' => $esUsado
    ]);
  }
}
