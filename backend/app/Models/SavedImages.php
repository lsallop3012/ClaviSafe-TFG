<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SavedImages extends Model
{
    /** @use HasFactory<\Database\Factories\SavedImagesFactory> */
    use HasFactory;

    protected $table = 'saved_images';

    protected $fillable = [
        'user_id',
        'image_id',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function image()
    {
        return $this->belongsTo(Image::class);
    }
}
