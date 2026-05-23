<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Image;
use App\Models\User;

/**
 * @extends Factory<Image>
 */
class ImageFactory extends Factory
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
            'name' =>  fake()->name(),
            'url' => fake()->imageUrl(),
            'description' => fake()->paragraph(),
            'uploaded_at' => fake()->dateTime(),
            'user_id' => User::inRandomOrder()->first()->id,
        ];
    }
}
