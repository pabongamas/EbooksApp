<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    public function materias() {
        return $this
            ->belongsToMany('App\Materia')
            ->withTimestamps();
    }
}
