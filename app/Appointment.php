<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    protected $casts = [
        'active' => 'boolean',
    ];

    public function specialist()
    {
        return $this->belongsTo(User::class, 'specialist_id');
    }
}
