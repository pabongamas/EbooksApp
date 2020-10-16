<?php

use Illuminate\Database\Seeder;
use App\Materia;

class MateriaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $materia = new Materia();
        $materia->name = 'Español';
        $materia->description = 'Contenido de la materia de español';
        $materia->save();
        $materia = new Materia();
        $materia->name = 'Matematicas';
        $materia->description = 'Contenido de la materia de Matematicas';
        $materia->save();
        $materia = new Materia();
        $materia->name = 'Religion';
        $materia->description = 'Contenido de la materia de Religion';
        $materia->save();
        $materia = new Materia();
        $materia->name = 'Sociales';
        $materia->description = 'Contenido de la materia de Sociales';
        $materia->save();
        $materia = new Materia();
        $materia->name = 'Biologia';
        $materia->description = 'Contenido de la materia de Biologia';
        $materia->save();
    }
}
