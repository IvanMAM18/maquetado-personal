<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ForoEmprendedoresParticipantes extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'nombre_empresa',
        'giro',
        'telefono',
        'correo',
        'municipio',
        'colonia',
        'sexo',
        'edad',
        'año'
    ];
    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];
}
