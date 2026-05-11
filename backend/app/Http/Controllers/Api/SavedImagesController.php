<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SavedImages;
use Illuminate\Http\Request;

class SavedImagesController extends Controller
{
    public function index()
    {
        return SavedImages::with(['user', 'image'])->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
            'image_id' => ['required', 'exists:images,id'],
        ]);

        $savedImage = SavedImages::firstOrCreate($data);

        return response($savedImage->load(['user', 'image']), 201);
    }

    public function show(SavedImages $savedImage)
    {
        return $savedImage->load(['user', 'image']);
    }

    public function destroy(SavedImages $savedImage)
    {
        $savedImage->delete();

        return response()->noContent();
    }
}
