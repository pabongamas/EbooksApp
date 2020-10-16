<?php

use Illuminate\Database\Seeder;
use App\TipoActividadModel;

class TipoActividad extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tipoActividad = new TipoActividadModel();
        $tipoActividad->name = 'Preguntas';
        $tipoActividad->description = 'Actividad para realizar preguntas';
        $tipoActividad->save();

        $tipoActividad = new TipoActividadModel();
        $tipoActividad->name = 'Encuestas';
        $tipoActividad->description = 'Actividad para realizar Encuestas';
        $tipoActividad->save();

        $tipoActividad = new TipoActividadModel();
        $tipoActividad->name = 'Contenido libre';
        $tipoActividad->description = 'Actividad para realizar contenido insertar docs html';
        $tipoActividad->save();
    }
}
