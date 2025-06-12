<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ejemplo_embarcaciones', function (Blueprint $table) {
            $table->id();
            $table->string('numero_embarcacion');
            $table->string('nombre_embarcacion');
            $table->string('numero_permiso_nautico');
            $table->string('nombre_permisionario');
            $table->string('nombre_representante');
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
            $table->string('foto_embarcacion')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ejemplo_embarcaciones');
    }
};