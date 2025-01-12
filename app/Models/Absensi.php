<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Absensi extends Model
{
    use HasFactory, softDeletes;

    protected $fillable = [
        'name',
        'class',
        'date',
        'information',
    ];

        public function student()
        {
            return $this->belongsTo(StudentData::class, 'name', 'name');
        }

}
