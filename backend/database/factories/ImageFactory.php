<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;
use App\Models\User;

/**
 * @extends Factory<\App\Models\Image>
 */
class ImageFactory extends Factory
{
    public function definition(): array
    {
        // Pick a random file from storage/app/public/images/
        $files = Storage::disk('public')->files('images');

        // Filter to real image extensions just in case
        $images = array_values(array_filter($files, function ($f) {
            return preg_match('/\.(jpe?g|png|webp|gif|avif)$/i', $f);
        }));

        if (count($images) > 0) {
            $file = $images[array_rand($images)];
            $url  = Storage::disk('public')->url($file); // → /storage/images/filename.jpg
        } else {
            // Fallback to picsum if folder is empty
            $seed = fake()->numberBetween(1, 1000);
            $url  = "https://picsum.photos/seed/{$seed}/800/600";
        }

        return [
            'name'        => fake()->words(fake()->numberBetween(2, 5), true),
            'url'         => $url,
            'description' => fake()->optional(0.7)->sentence(),
            'uploaded_at' => fake()->dateTimeBetween('-6 months', 'now'),
            'user_id'     => User::inRandomOrder()->first()->id,
        ];
    }
}
