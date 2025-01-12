<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
class StudentData extends Model
{
    use HasFactory, softDeletes;

    protected $fillable = [
        'nis',
        'name',
        'class',
        'mulai_pkl',
        'status_pkl',
        'phone',
        'email',
    ];


        public function company()
        {
            return $this->belongsTo(DudiData::class, 'company', 'company');
        }
        public function user()
        {
            return $this->hasMany(User::class, 'students_id', 'id');
        }


}
