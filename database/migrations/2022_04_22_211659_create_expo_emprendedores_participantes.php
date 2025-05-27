<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('expo_emprendedores_participantes', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_empresa');
            $table->string('giro');
            //$table->string('nombre_representante');
            $table->string('telefono');
            $table->string('correo');
            $table->timestamps();
            $table->timestamp('deleted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('expo_emprendedores_participantes');
    }
};
