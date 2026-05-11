<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    /** @use HasFactory<\Database\Factories\ImageFactory> */
    use HasFactory;

    protected $table = 'images';

    protected $fillable = [
            'name',
            'url',
            'description',
            'uploaded_at',
            'user_id',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function boards()
    {
        return $this->belongsToMany(Board::class, 'boards_images', 'image_id', 'board_id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function savedByUsers()
    {
        return $this->belongsToMany(User::class, 'saved_images', 'image_id', 'user_id');
    }
}
