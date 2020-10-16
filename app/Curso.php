<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    protected $table='cursos';
    protected $primaryKey ='id';
    public function users()
    {
        return $this
            ->belongsToMany('App\User')
            ->withTimestamps();
    }
    public function materias() {
        return $this
            ->belongsToMany('App\Materia')
            ->withTimestamps();
    }
}
