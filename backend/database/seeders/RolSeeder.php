<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Rol;
use App\Enums\RolSlug;

class RolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {     
        Rol::firstOrCreate(['slug' => 'admin', 'name' => 'administrator']);
        Rol::firstOrCreate(['slug' => 'user', 'name' => 'user']);
    }
}
