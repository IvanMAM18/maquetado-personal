<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Embarcacion extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'embarcaciones';

    protected $fillable = [
        'numero_embarcacion',
        'nombre_embarcacion',
        'numero_permiso_nautico',
        'nombre_permisionario',
        'nombre_representante',
        'capacidad_pasajeros',
        'turno_salida',
        'hora_salida',
        'telefono_contacto',
        'email_contacto',
        'servicio_ofrecido',
        'vigencia_certificado_seguridad',
        'numero_poliza_seguro',
        'telefono_siniestros',
        'carrusel',
        'foto_embarcacion'
    ];

    protected $casts = [
        'vigencia_certificado_seguridad' => 'date',
        'hora_salida' => 'datetime:H:i',
        'deleted_at' => 'datetime'
    ];

    /**
     * Relación con la documentación de la embarcación
     */
    public function documentacion()
    {
        return $this->hasOne(DocumentacionEmbarcacion::class, 'embarcacion_id');
    }
}