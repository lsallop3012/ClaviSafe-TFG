<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Image;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (User::count() === 0 || Image::count() === 0) {
            return;
        }

        Comment::factory()->count(100)->create();
    }
}
