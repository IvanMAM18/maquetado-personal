<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        DB::table('users')->insert([
            'name' => 'Super Admin',
            'email' => 'admin@ayuntamiento.com',
            'rol_id' => '1',
            'department_id' => '0',
            'password' => Hash::make('SAlpz.'),
        ]);
/*Super admin
Presidente
director
Capturista
        DB::table('users')->insert([
            '_id' =>'1001',
            'name' => 'Ususario Presidente',
            'email' => 'presidente@ayuntamiento.com',
            'rol_id' => '1000',
            'password' => Hash::make('000Plpz.'),
        ]);
        DB::table('users')->insert([
            '_id' =>'1002',
            'name' => 'Ususario Director',
            'email' => 'director@ayuntamiento.com',
            'rol_id' => '1000',
            'password' => Hash::make('000Dlpz.'),
        ]);
        DB::table('users')->insert([
            '_id' =>'1003',
            'name' => 'Ususario Capturista',
            'email' => 'capturista@ayuntamiento.com',
            'rol_id' => '1003',
            'password' => Hash::make('000Clpz.'),
        ]);*/
    }
}
