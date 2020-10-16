<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRespuestasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('respuestas', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('respuesta_selec');
            $table->unsignedBigInteger('id_pregunta');
            $table->unsignedBigInteger('id_tipo_actividad');
            $table->unsignedBigInteger('id_actividad');
            $table->unsignedBigInteger('id_user');
            $table->foreign('id_pregunta')->references('id')->on('preguntas');
            $table->foreign('id_tipo_actividad')->references('id')->on('tipo_actividad');
            $table->foreign('id_actividad')->references('id')->on('activities');
            $table->foreign('id_user')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('respuestas');
    }
}
