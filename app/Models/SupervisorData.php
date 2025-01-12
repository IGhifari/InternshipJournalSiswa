<?php

namespace App\Models;

use Faker\Provider\ar_EG\Company;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
class SupervisorData extends Model
{
    use HasFactory, softDeletes;

    protected $fillable = [
        'supervisor_name',
        'company',
        'phone',
    ];
        public function students()
        {
            return $this->hasMany(DudiData::class, 'supervisor_id', 'id');
        }
        public function company()
        {
        return $this->belongsTo(DudiData::class, 'company_id', 'id');
        }

}
