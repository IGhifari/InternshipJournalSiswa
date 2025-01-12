<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
class DudiData extends Model
{
    use HasFactory, softDeletes;

    protected $fillable = [
        'company',
        'addres',
        'supervisor_name',
        'phone',
        'email',
        'logo',
    ];
        public function students()
        {
            return $this->hasMany(User::class, 'company_id', 'id');
        }
        public function supervisor()
        {
            return $this->belongsTo(SupervisorData::class, 'supervisor_id', 'id');
        }
        public function supervisors()
        {
            return $this->hasMany(SupervisorData::class, 'company_id', 'id');
        }

}
