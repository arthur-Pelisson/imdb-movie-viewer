<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class favoris extends Model {
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'movieId', 'user_id'
    ];

    //Remove updtae at and cearte at from query
    public $timestamps = false;

    public function user() {
        return $this->belongsTo(User::class);
    }
}
