<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BoardsImages extends Model
{
    /** @use HasFactory<\Database\Factories\BoardsImagesFactory> */
    use HasFactory;

    public $timestamps = false;

    protected $table = 'boards_images';

    protected $fillable = [
        'board_id',
        'image_id',
    ];

    // Relationships
    public function board()
    {
        return $this->belongsTo(Board::class);
    }

    public function image()
    {
        return $this->belongsTo(Image::class);
    }
}
