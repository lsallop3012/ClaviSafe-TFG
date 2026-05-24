<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Image;
use App\Models\User;

class ProductionImageSeeder extends Seeder
{
    public function run(): void
    {
        $baseUrl = rtrim(config('app.url'), '/');
        $user    = User::first();

        if (!$user) {
            $this->command->warn('No users found — run UserSeeder first.');
            return;
        }

        $images = [
            ['name' => 'Figma Example',    'file' => 'FigmaExample.webp'],
            ['name' => 'Figma Silent Hill', 'file' => 'FigmaSilentHill.webp'],
            ['name' => 'Im Not Human',      'file' => 'ImNotHuman.jpg'],
            ['name' => 'Imagen 1',          'file' => 'imagen1.avif'],
            ['name' => 'Imagen 4',          'file' => 'imagen4.avif'],
            ['name' => 'Nir Himi',          'file' => 'nir-himi-66R4n9AftzA-unsplash.jpg'],
            ['name' => 'Photo 1',           'file' => 'photo-1658479360901-a7254891af84.avif'],
            ['name' => 'Photo 2',           'file' => 'photo-1777653224543-eb1f8a586865.avif'],
            ['name' => 'Abstract 1',        'file' => '0d87a53be75a68f7b9e34028cd159d06.jpg'],
            ['name' => 'Abstract 2',        'file' => '79b57331483aeeb3bce6596441bc697c.jpg'],
            ['name' => 'Abstract 3',        'file' => 'a7906f393b87d9faac7dc71975828285.webp'],
            ['name' => 'Abstract 4',        'file' => 'ce97eee5a58b1a2544838846bfab69ea.jpg'],
            ['name' => 'Abstract 5',        'file' => 'wkZiMBGKh3xZcFOmlRBKcBi4K3K5nXQ9vbWMrdDm.avif'],
        ];

        foreach ($images as $img) {
            Image::firstOrCreate(
                ['url' => "{$baseUrl}/images/{$img['file']}"],
                [
                    'name'    => $img['name'],
                    'user_id' => $user->id,
                ]
            );
        }
    }
}
