<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Materia extends Model
{
    public function cursos() {
        return $this
            ->belongsToMany('App\Curso')
            ->withTimestamps();
    }
    public function actividades() {
        return $this
            ->belongsToMany('App\Activity')
            ->withTimestamps();
    }
}
