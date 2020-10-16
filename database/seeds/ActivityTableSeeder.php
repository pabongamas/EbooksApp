<?php

use Illuminate\Database\Seeder;
use App\Activity;

class ActivityTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $curso = new Activity();
        $curso->name = 'Actividad 1 ';
        $curso->description = 'desc actividad';
        $curso->estado =1;
        $curso->save();

        $curso = new Activity();
        $curso->name = 'Actividad 2 ';
        $curso->description = 'desc actividad 2';
        $curso->estado =1;
        $curso->save();
    }
}
