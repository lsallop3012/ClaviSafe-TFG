<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\SavedImages;
use \App\Models\User;
use \App\Models\Image;

/**
 * @extends Factory<SavedImages>
 */
class SavedImagesFactory extends Factory
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
            'user_id' => User::inRandomOrder()->first()->id,
            'image_id' => Image::inRandomOrder()->first()->id,
        ];
    }
}
