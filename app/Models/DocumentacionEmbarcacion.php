<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DocumentacionEmbarcacion extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'documentacion_embarcaciones';

    protected $fillable = [
        'embarcacion_id',
        'permiso_turismo_nautico',
        'permiso_pesca_deportiva',
        'permiso_balandra_conanp',
        'permiso_espiritu_santo_conanp',
        'permiso_tiburon_ballena_dgvs',
        'registro_nacional_turismo',
        'registro_nacional_embarcaciones',
        'constancia_residencia_acta_nacimiento',
        'carta_verdad_propia_oficina',
        'carta_verdad_trabajado_zona_malecon',
        'carta_no_concesion_playa_zofemat',
        'permiso_uso_muelle_fiscal_api'
    ];

    protected $casts = [
        'deleted_at' => 'datetime'
    ];

    /**
     * Relación con la embarcación
     */
    public function embarcacion()
    {
        return $this->belongsTo(Embarcacion::class, 'embarcacion_id');
    }
}