<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    use SoftDeletes;
    protected $fillable = ['name','description'];
    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    public function user(){
        return $this->hasOne(User::class,'rol_id','id');
    }
    
}
