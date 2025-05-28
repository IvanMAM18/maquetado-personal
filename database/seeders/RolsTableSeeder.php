<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class RolsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('rols')->insert([
            'name' => 'Super Admin',
            'description' => 'Control total del sistema',
        ]);

        DB::table('rols')->insert([
            'name' => 'Presidente',
            'description' => 'Descripción presidente',
        ]);
        DB::table('rols')->insert([
            'name' => 'Director',
            'description' => 'Descripción director',
        ]);
        DB::table('rols')->insert([
            'name' => 'Capturista',
            'description' => 'Descripción capturista',
        ]);
        DB::table('rols')->insert([
            'name' => 'Ciudadano',
            'description' => 'Descripción ciudadano',
        ]);
    }
}
