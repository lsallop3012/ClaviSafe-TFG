<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Like;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function index()
    {
        return Like::with(['user', 'image'])->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
            'image_id' => ['required', 'exists:images,id'],
        ]);

        $like = Like::firstOrCreate($data);

        return response($like->load(['user', 'image']), 201);
    }

    public function show(Like $like)
    {
        return $like->load(['user', 'image']);
    }

    public function destroy(Like $like)
    {
        $like->delete();

        return response()->noContent();
    }
}
