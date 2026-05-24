<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Filesystem\FilesystemAdapter;
use Illuminate\Support\Facades\Storage;
use App\Models\User;

/**
 * @extends Factory<\App\Models\Image>
 */
class ImageFactory extends Factory
{
    public function definition(): array
    {
        // Coge una imagen aleatoria de storage/app/public/images o usa picsum como fallback
        /** @var FilesystemAdapter $disk */
        $disk = Storage::disk('public');
        $files = $disk->files('images');

        // Filtra solo los archivos de imagen válidos
        $images = array_values(array_filter($files, function ($f) {
            return preg_match('/\.(jpe?g|png|webp|gif|avif)$/i', $f);
        }));

        if (count($images) > 0) {
            $file = $images[array_rand($images)];
            $url  = $disk->url($file);
        } else {
            // Llama a picsum con un seed aleatorio para obtener una imagen diferente cada vez
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
