<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActivityMateriaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('activity_materia', function (Blueprint $table) {
            $table->unsignedBigInteger('materia_id');
            $table->unsignedBigInteger('activity_id');
            $table->foreign('materia_id')->references('id')->on('materias');
            $table->foreign('activity_id')->references('id')->on('activities');
            $table->boolean('estado')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('activity_materia');
    }
}
