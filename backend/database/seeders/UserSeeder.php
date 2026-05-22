<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use App\Enums\RoleSlug;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $administratorRole = Role::where('slug', RoleSlug::ADMIN)->first();
        $userRole = Role::where('slug', RoleSlug::USER)->first();
        User::firstOrCreate(
            ['email' => 'admin@example.com'],
            ['name' => 'admin', 'password' => bcrypt('password'), 'role_id' => $administratorRole->id]
        );
        User::firstOrCreate(
            ['email' => 'lucia@example.com'],
            ['name' => 'Lucia', 'password' => bcrypt('password'), 'role_id' => $userRole->id]
        );
        User::factory()->count(10)->create();
    }
}
