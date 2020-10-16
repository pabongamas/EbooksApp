<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Role;
use App\Curso;

class CursoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $curso = new Curso();
        $curso->name = 'curso1';
        $curso->description = 'curso1';
        $curso->estado =1;
        $curso->save();

        $curso = new Curso();
        $curso->name = 'curso2';
        $curso->description = 'curso2';
        $curso->estado =1;
        $curso->save();

        $curso = new Curso();
        $curso->name = 'curso3';
        $curso->description = 'curso3';
        $curso->estado =1;
        $curso->save();

        $curso = new Curso();
        $curso->name = 'curso4';
        $curso->description = 'curso4';
        $curso->estado =1;
        $curso->save();

        $curso = new Curso();
        $curso->name = 'curso5';
        $curso->description = 'curso5';
        $curso->estado =1;
        $curso->save();
        
        $curso = new Curso();
        $curso->name = 'curso6';
        $curso->description = 'curso6';
        $curso->estado =1;
        $curso->save();

        $curso = new Curso();
        $curso->name = 'curso7';
        $curso->description = 'curso7';
        $curso->estado =1;
        $curso->save();

        $curso = new Curso();
        $curso->name = 'curso8';
        $curso->description = 'curso8';
        $curso->estado =1;
        $curso->save();

        $curso = new Curso();
        $curso->name = 'curso9';
        $curso->description = 'curso9';
        $curso->estado =1;
        $curso->save();

        $curso = new Curso();
        $curso->name = 'curso10';
        $curso->description = 'Curso de los niños chever';
        $curso->estado =1;
        $curso->save();

        $curso = new Curso();
        $curso->name = 'curso11';
        $curso->description = 'Curso de los niños chever XD';
        $curso->estado =1;
        $curso->save();
    }
}
