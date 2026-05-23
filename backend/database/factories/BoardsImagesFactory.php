<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\BoardsImages;
use \App\Models\Board;
use \App\Models\Image;

/**
 * @extends Factory<BoardsImages>
 */
class BoardsImagesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'board_id' => Board::inRandomOrder()->first()->id,
            'image_id' => Image::inRandomOrder()->first()->id,
        ];
    }
}
