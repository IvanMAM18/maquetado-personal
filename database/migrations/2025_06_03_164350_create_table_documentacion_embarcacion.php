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
            $table->string('permiso_turismo_nautico', 100)->nullable()->comment('Número de permiso de turismo náutico');
            $table->string('permiso_pesca_deportiva', 100)->nullable()->comment('Número de permiso de pesca deportiva');
            $table->string('permiso_balandra_conanp', 100)->nullable()->comment('Permiso de balandra CONANP');
            $table->string('permiso_espiritu_santo_conanp', 100)->nullable()->comment('Permiso para Espíritu Santo CONANP');
            $table->string('permiso_tiburon_ballena_dgvs', 100)->nullable()->comment('Permiso para tiburón ballena DGVS');
            
            // Registros
            $table->string('registro_nacional_turismo', 100)->nullable()->comment('Número de registro nacional de turismo');
            $table->string('registro_nacional_embarcaciones', 100)->nullable()->comment('Número de registro nacional de embarcaciones');
            
            // Documentación legal
            $table->string('constancia_residencia_acta_nacimiento', 100)->nullable()->comment('Constancia de residencia o acta de nacimiento');
            $table->string('carta_verdad_propia_oficina', 100)->nullable()->comment('Carta de verdad de propiedad de oficina');
            $table->string('carta_verdad_trabajado_zona_malecon', 100)->nullable()->comment('Carta de verdad de trabajo en zona malecón');
            $table->string('carta_no_concesion_playa_zofemat', 100)->nullable()->comment('Carta de no concesión de playa ZOFEMAT');
            $table->string('permiso_uso_muelle_fiscal_api', 100)->nullable()->comment('Permiso de uso de muelle fiscal API');
            
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