<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Board;

class BoardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Board::factory()->create([
            'name' => 'Favoritos',
            'description' => 'Tablero de imágenes favoritas',
        ]);

        Board::factory()->create([
            'name' => 'Inspiración',
            'description' => 'Tablero de imágenes inspiradoras',
        ]);

        Board::factory()->create([
            'name' => 'Viajes',
            'description' => 'Tablero de imágenes de viajes',
        ]);
    }
}
