<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Rol;
use App\Enums\RolSlug;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */ 
    public function run(): void
    {
        $administratorRole = Rol::where('slug', RolSlug::ADMIN)->first();
        $userRole = Rol::where('slug', RolSlug::USER)->first();
        User::firstOrCreate(['name' => 'admin', 'email' => 'admin@example.com', 'password' => bcrypt('password'), 'rol_id' => $administratorRole]);
        User::firstOrCreate(['name' => 'Lucia', 'email' => 'lucia@example.com', 'password' => bcrypt('password'), 'rol_id' => $userRole]);
        User::factory()->count(10)->create();
    }
}
