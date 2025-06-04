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
            $table->string('numero_embarcacion', 50)->unique()->comment('Número único de identificación de la embarcación');
            $table->string('nombre_embarcacion', 100)->comment('Nombre descriptivo de la embarcación');
            $table->string('numero_permiso_nautico', 50)->unique()->comment('Número de permiso náutico');
            $table->string('nombre_permisionario', 100)->comment('Nombre completo del permisionario');
            $table->string('nombre_representante', 100)->nullable()->comment('Nombre del representante legal si aplica');
            $table->integer('capacidad_pasajeros')->comment('Capacidad máxima de pasajeros');
            $table->string('turno_salida', 20)->comment('Turno de salida: Matutino/Vespertino/Nocturno');
            $table->time('hora_salida')->comment('Hora programada de salida');
            $table->string('telefono_contacto', 20)->comment('Teléfono de contacto principal');
            $table->string('email_contacto', 100)->comment('Email de contacto');
            $table->string('servicio_ofrecido', 100)->comment('Tipo de servicio que ofrece');
            $table->date('vigencia_certificado_seguridad')->comment('Fecha de vigencia del certificado de seguridad marítima');
            $table->string('numero_poliza_seguro', 50)->comment('Número de póliza de seguro contra daños a terceros');
            $table->string('telefono_siniestros', 20)->comment('Teléfono para reportar siniestros');
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