<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Hash;

class Siswa extends Authenticatable
{
    use HasFactory;
    protected $table = 'tsiswa';
    protected $primaryKey = 'nis';
    protected $keyType = 'string';
    public $incrementing = false;
    public $timestamps = true;
    const CREATED_AT = 'createdat';
    const UPDATED_AT = 'updatedat';
    
    protected $fillable = [
        'nis',
        'nisn',
        'namlen',
        'nampan',
        'namman',
        'temlah',
        'tgllah',
        'jenkel',
        'tel',
        'ket',
        'sta',
        'staqd',
        'rev',
        'createdby',
        'updatedby',
        'kel',
        'ala',
        'pin',
    ];

    protected $hidden = [
        'pin',
    ];
    protected $casts = [
        'tgllah' => 'date',
        'sta' => 'integer',
        'staqd' => 'integer',
        'rev' => 'integer',
        'createdby' => 'integer',
        'updatedby' => 'integer',
    ];

    public function indentitas()
    {
        return $this->hasMany(Indentitas::class, 'idok', 'id');
    }
    
    public function getAuthPassword()
    {
        return $this->password; // asumsikan kolom password untuk hash
    }

    public function setPinAttribute($value)
    {
        $this->attributes['pin'] = Hash::make($value);
    }

    // Method untuk verifikasi PIN
    public function verifyPin($pin)
    {
        return Hash::check($pin, $this->pin);
    }

}
