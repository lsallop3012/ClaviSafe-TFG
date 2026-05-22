<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Rol::firstOrCreate(['slug' => 'admin', 'name' => 'Administrador']);
        Rol::firstOrCreate(['slug' => 'user', 'name' => 'Usuario']);
    }
}