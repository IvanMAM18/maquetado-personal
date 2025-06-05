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
        Schema::create('documentacion_embarcaciones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('embarcacion_id')->constrained('embarcaciones')->onDelete('cascade');
            
            // Documentos principales
            $table->string('permiso_turismo_nautico')->nullable();
            $table->string('permiso_pesca_deportiva')->nullable();
            $table->string('permiso_balandra_conanp')->nullable();
            $table->string('permiso_espiritu_santo_conanp')->nullable();
            $table->string('permiso_tiburon_ballena_dgvs')->nullable();
            
            // Registros
            $table->string('registro_nacional_turismo')->nullable();
            $table->string('registro_nacional_embarcaciones')->nullable();
            
            // Documentación legal
            $table->string('constancia_residencia_acta_nacimiento')->nullable();
            $table->string('carta_verdad_propia_oficina')->nullable();
            $table->string('carta_verdad_trabajado_zona_malecon')->nullable();
            $table->string('carta_no_concesion_playa_zofemat')->nullable();
            $table->string('permiso_uso_muelle_fiscal_api')->nullable();
            
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('documentacion_embarcaciones');
    }
};