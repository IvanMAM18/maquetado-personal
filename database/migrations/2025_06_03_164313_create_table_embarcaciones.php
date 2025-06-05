<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('embarcaciones', function (Blueprint $table) {
            $table->id();
            $table->string('numero_embarcacion')->unique();
            $table->string('nombre_embarcacion');
            $table->string('numero_permiso_nautico')->unique();
            $table->string('nombre_permisionario');
            $table->string('nombre_representante')->nullable();
            $table->integer('capacidad_pasajeros');
            $table->string('turno_salida');
            $table->time('hora_salida');
            $table->string('telefono_contacto');
            $table->string('email_contacto');
            $table->string('servicio_ofrecido');
            $table->date('vigencia_certificado_seguridad');
            $table->string('numero_poliza_seguro');
            $table->string('telefono_siniestros');
            $table->string('carrusel');
            $table->string('foto_embarcacion');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('embarcaciones');
    }
};