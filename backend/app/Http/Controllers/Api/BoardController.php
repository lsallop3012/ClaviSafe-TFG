<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Board;
use Illuminate\Http\Request;
use App\Services\BoardService;

class BoardController extends Controller
{

    public function index(BoardService $boardService)
    {
        $boards = $boardService->list();
        return response()->json($boards);
    }

    public function store(Request $request, BoardService $boardService)
    {

        $name = $request->input("name");
        $description = $request->input("description");
        $user_id = $request->input("user_id");
        $image_ids = $request->input("image_ids", []);

        $boardService->create(['name' => $name, 'description' => $description, 'user_id' => $user_id]);

        return response()->json(['message' => 'Board created successfully'], 201);
    }

    public function show(Board $board)
    {
        return $board->load(['user', 'images']);
    }

    public function update(Request $request, Board $board)
    {
        $data = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string'],
            'user_id' => ['sometimes', 'exists:users,id'],
            'image_id' => ['sometimes', 'array'],
            'image_id.*' => ['integer', 'exists:images,id'],
        ]);

        $board->update($data);

        if (array_key_exists('image_id', $data)) {
            $board->images()->sync($data['image_id']);
        }

        return $board->load(['user', 'images']);
    }

    public function destroy(Board $board)
    {
        $board->delete();

        return response()->noContent();
    }
}
