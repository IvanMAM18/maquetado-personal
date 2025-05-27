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
        Schema::table('expo_emprendedores_participantes', function(Blueprint $table) {
            $table->string('municipio')->nullable();
            $table->string('colonia')->nullable();
            $table->string('sexo')->nullable();
            $table->string('edad')->nullable();
            $table->integer('año')->default(0)->nullable();            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //Schema::dropIfExists('expo_emprendedores_participantes');
    }
};
