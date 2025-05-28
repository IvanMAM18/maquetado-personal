<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as FoundationAuthenticatable;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Notifications\MyResetPassword;
use App\Models\TUUsuario;

class User extends FoundationAuthenticatable implements JWTSubject, Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */

    protected $fillable = [
        'name',
        'username',
        'persona_id',
        'phone',
        'email',
        'rol_id',
        'password',
        'department_id',
        'entidad_revisora_id',
        'remember_token', 
        'curp',
    ];
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        //'password',
        //'remember_token',
        'created_at', 'updated_at', 'deleted_at'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    
    public function getJWTCustomClaims()
    {
        return [];
    }
    
    public function rol(){
        return $this->belongsTo(Rol::class,'rol_id');
    }

    public function domicilio(){
        return $this->belongsTo(MascotaDomicilio::class,'id', 'user_id');
    }

    // public function comercio_user(){
    //     return $this->belongsTo(ComercioUser::class, 'id', 'user_id');
    // }

    public function domicilios()
    {
        return $this->hasMany(MascotaDomicilio::class, 'user_id', 'id');
    }

    public function mascotas() {
        return $this->belongsTo(MascotaRegistro::class, 'id', 'user_id');
    }

    public function mascotasMany() {
        return $this->hasMany(MascotaRegistro::class, 'user_id', 'id');
    }

    public function tu_usuarios()
    {
        return $this->hasMany(TUUsuario::class, 'user_id', 'id');
    }
    
    public function departamento(){
        return $this->belongsTo(Departamento::class,'department_id');
    }

    public function entidad_revisora(){
        return $this->belongsTo(EntidadRevisora::class,'entidad_revisora_id');

    }

    public function logs(){
        return $this->hasMany(DashboardLog::class,'user_id','id');
    }

    /**
     * Send the password reset notification.
     *
     * @param  string  $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new MyResetPassword($token));
    }

    public function supervisor(){
        return $this->hasOne(SupervisorReporte::class,'user_id','id');
    }
}
