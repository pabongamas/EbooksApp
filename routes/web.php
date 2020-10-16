<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/* Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
 */
Route::view('/','index')->name('index');
Route::view('/Curso/verMateriaCurso','curso/verMateriaCurso')->name('irMateria');
Route::view('/Curso/verActividadMateria','curso/verActividadMateria')->name('verActividadMateria');
Route::view('/Actividad/verActividadEstudiante','actividad/verActividadEstudiante')->name('verActividadEstudiante');
Route::view('/Actividad/verInfoActividadEstudiante','actividad/verInfoActividadEstudiante')->name('verInfoActividadEstudiante');
Auth::routes(['register'=>false]);
Route::get('/Usuarios','usuarioController@index')->name('usuario.index')->middleware(['auth', 'password.confirm']);
Route::post('/Usuarios/listar','usuarioController@listaUsuario')->name('usuario.showTable');
Route::post('/Usuarios/eliminar','usuarioController@eliminarUsuario')->name('usuario.eliminar');
Route::post('/Usuarios/editar','usuarioController@editarUsuario')->name('usuario.editar');
Route::post('/Usuarios/crear','usuarioController@crearUsuario')->name('usuario.crear');
Route::post('/Usuarios/AsignarUsuarioRol','usuarioController@AsignarUsuarioRol')->name('usuario.AsignarUsuarioRol');
Route::post('/Usuarios/vincularRol','usuarioController@vincularRol')->name('usuario.vincularRol');



Route::get('/Roles','rolController@index')->name('rol.index');
Route::post('/Roles/listar','rolController@listaRoles')->name('rol.showTable');
Route::post('/Roles/eliminar','rolController@eliminarRol')->name('rol.eliminar');
Route::post('/Roles/editar','rolController@editarRol')->name('rol.editar');
Route::post('/Roles/crear','rolController@crearRol')->name('rol.crear');


Route::get('/Perfiles','perfilController@index')->name('perfil.index');
Route::post('/Perfiles/listar','perfilController@listaPerfiles')->name('perfil.showTable');
Route::post('/Perfiles/eliminar','perfilController@eliminarPerfil')->name('perfil.eliminar');


Route::get('/Cursos','cursoController@index')->name('curso.index');
Route::post('/Cursos/listar','cursoController@listaCurso')->name('curso.showTable');
Route::post('/Cursos/eliminar','cursoController@eliminarCurso')->name('curso.eliminar');
Route::post('/Cursos/editar','cursoController@editarCurso')->name('curso.editar');
Route::post('/Cursos/crear','cursoController@crearCurso')->name('curso.crear');
Route::post('/Cursos/listarDocentes','cursoController@listarDocentes')->name('curso.ShowDocentes');
Route::post('/Cursos/listarEstudiantes','cursoController@listarEstudiantes')->name('curso.ShowEstudiantes');
Route::post('/Cursos/vincularUser','cursoController@vincularUser')->name('usuario.vincularUser');

Route::get('/CursosDocente','cursoController@indexCursoDocente')->name('cursoDocente.index');
Route::post('/CursosDocente/listar','cursoController@listaCursoDocente')->name('cursoDocente.showTable');
Route::post('/CursosDocente/editar','cursoController@editarCursoDocente')->name('cursoDocente.editar');
Route::post('/CursosDocente/eliminar','cursoController@eliminarCursoDocente')->name('cursoDocente.eliminar');
Route::post('/CursosDocente/verMateria','cursoController@verMateriaDocente')->name('cursoDocente.verMateriaDocente');
Route::post('/CursosDocente/irMateria','cursoController@irMateria')->name('cursoDocente.irMateria');
Route::post('/CursosDocente/cargarInformacionMateria','cursoController@cargarInformacionMateria')->name('cursoDocente.cargarInformacionMateria');
Route::post('/CursosDocente/cargarInformacionActividad','cursoController@cargarInformacionActividad')->name('cursoDocente.cargarInformacionActividad');
Route::post('/CursosDocente/crear','cursoController@crearCursoDocente')->name('cursoDocente.crear');
Route::post('/CursosDocente/ActividadesCurso','cursoController@listaActividadesxCurso')->name('cursoDocente.showTableMateriasxCurso');
Route::post('/CursosDocente/irActividadMateria','cursoController@irActividadMateria')->name('cursoDocente.irActividadMateria');
Route::post('/CursosDocente/asignarMateriasCursoDocente','cursoController@asignarMateriasCursoDocente')->name('cursoDocente.asignarMateriasCursoDocente');
Route::post('/CursosDocente/vincularMateriaCurso','cursoController@vincularMateriaCurso')->name('cursoDocente.vincularMateriaCurso');
Route::post('/CursosDocente/ListarEstudiantes','cursoController@ListarEstudiantes')->name('cursoDocente.ListarEstudiantes');
Route::post('/CursosDocente/cargarTipoActividad','cursoController@cargarTipoActividad')->name('cursoDocente.cargarTipoActividad');
Route::post('/CursosDocente/tipoActiPreguntas','actividadController@guardarActividadPreguntas')->name('cursoDocente.tipoActiPreguntas');
Route::post('/CursosDocente/verificarActividadCreada','actividadController@verificarActividadCreada')->name('cursoDocente.verificarActividadCreada');
Route::post('/CursosDocente/editarContenidoTipoActividad','actividadController@editarContenidoTipoActividad')->name('cursoDocente.editarContenidoTipoActividad');
Route::post('/CursosDocente/verEstudiantesActividad','actividadController@verEstudiantesActividad')->name('cursoDocente.verEstudiantesAcividad');
Route::post('/CursosDocente/verinfoEstudianteActividad','actividadController@verinfoEstudianteActividad')->name('cursoDocente.verinfoEstudianteActividad');
Route::post('/CursosDocente/cargarInformacionActividadEstudiante','actividadController@cargarInformacionActividadEstudiante')->name('cursoDocente.cargarInformacionActividadEstudiante');

Route::get('/CursosEstudiante','cursoController@indexCursoEstudiante')->name('cursoEstudiante.index');
Route::post('/CursosEstudiante/listar','cursoController@listaCursoEstudiante')->name('cursoEstudiante.showTable');
Route::post('/CursosEstudiante/verInfo','cursoController@VerInfoCurso')->name('cursoEstudiante.VerInfoCurso');
Route::post('/CursosEstudiante/irActividadEstudiante','cursoController@irActividadEstudiante')->name('cursoEstudiante.irActividadEstudiante');
Route::post('/CursosEstudiante/cargarInformacionActividadEstudiante','cursoController@cargarInformacionActividadEstudiante')->name('cursoDocente.cargarInformacionActividadEstudiante');

Route::get('/Materias','materiaController@index')->name('materia.index');
Route::post('/Materias/listar','materiaController@listaMateria')->name('materia.showTable');
Route::post('/Materias/eliminar','materiaController@eliminarMateria')->name('materia.eliminar');
Route::post('/Materias/editar','materiaController@editarMateria')->name('materia.editar');
Route::post('/Materias/crear','materiaController@crearMateria')->name('materia.crear');


Route::get('/MateriasDocente','materiaController@indexMateriaDocente')->name('materiaDocente.index');
Route::post('/MateriasDocente/listar','materiaController@listaMateriaDocente')->name('materiaDocente.showTable');
Route::post('/MateriasDocente/eliminar','materiaController@eliminarMateriaDocente')->name('materiaDocente.eliminar');
Route::post('/MateriasDocente/editar','materiaController@editarMateriaDocente')->name('materiaDocente.editar');
Route::post('/MateriasDocente/AsignarActividad','materiaController@AsignarActividad')->name('materiaDocente.AsignarActividad');
Route::post('/MateriasDocente/vincularActividad','materiaController@vincularActividad')->name('materiaDocente.vincularActividad');
Route::post('/MateriasDocente/cargarCursoSelect','materiaController@cargarCursoSelect')->name('materiaDocente.cargarCursoSelect');
Route::post('/MateriasDocente/crearMateriaDocenteCurso','materiaController@crearMateriaDocenteCurso')->name('materiaDocente.crearMateriaDocenteCurso');


Route::get('/ActividadesDocente','actividadController@indexActividadDocente')->name('actividadesDocente.index');
Route::post('/ActividadesDocente/listar','actividadController@listaActividadDocente')->name('actividadesDocente.showTable');
Route::post('/ActividadesDocente/crearActividadDocente','actividadController@crearActividadDocente')->name('actividadesDocente.crearActividadDocente');
Route::post('/ActividadesDocente/cargarMateriaSelect','actividadController@cargarMateriaActividadSelect')->name('actividadesDocente.cargarMateriaActividadSelect');
Route::post('/ActividadesDocente/eliminarActividadDocente','actividadController@eliminarActividadDocente')->name('actividadesDocente.eliminarActividadDocente');
Route::post('/ActividadesDocente/editarActividadDocente','actividadController@editarActividadDocente')->name('actividadesDocente.editarActividadDocente');

Route::get('/MateriasEstudiante','materiaController@indexMateriaEstudiante')->name('materiaEstudiante.index');
Route::post('/MateriasEstudiante/listar','materiaController@listaMateriaEstudiante')->name('materiaEstudiante.showTable');


Route::get('/ActividadesEstudiante','actividadController@indexActividadEstudiante')->name('actividadEstudiante.index');
Route::post('/ActividadesEstudiante/listar','actividadController@listaActividadEstudiante')->name('actividadEstudiante.showTable');
Route::post('/ActividadesEstudiante/cargarTipoActividad','actividadController@cargarTipoActividadEstudiante')->name('actividadesEstudiante.cargarTipoActividadEstudiante');
Route::post('/ActividadesEstudiante/guardarRespuestaActividadEstudiante','actividadController@guardarRespuestaActividadEstudiante')->name('actividadesEstudiante.guardarRespuestaActividadEstudiante');

Route::get('/home', 'HomeController@index')->name('home');
