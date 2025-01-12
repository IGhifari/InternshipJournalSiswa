<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class JournalStudent extends Model
{
    use HasFactory, softDeletes;

    protected $fillable = [
        'name',
        'class',
        'company',
        'supervisor_name',
        'date',
        'activity',
    ];
        public function student()
        {
            return $this->belongsTo(StudentData::class, 'name', 'name');
        }

        public function company()
        {
            return $this->belongsTo(DudiData::class, 'company', 'company');
        }
        


}
