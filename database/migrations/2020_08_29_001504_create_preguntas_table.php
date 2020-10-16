<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePreguntasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('preguntas', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('nombre')->nullable();
            $table->longText('contenido')->nullable();
            $table->integer('rta_correcta')->nullable();
            $table->unsignedBigInteger('tipo_actividad_id');
            $table->unsignedBigInteger('id_actividad');
            $table->foreign('tipo_actividad_id')->references('id')->on('tipo_actividad');
            $table->foreign('id_actividad')->references('id')->on('activities');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('preguntas');
    }
}
