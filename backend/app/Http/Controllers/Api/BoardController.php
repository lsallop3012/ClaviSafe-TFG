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

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string'],
            'user_id' => ['required', 'exists:users,id'],
            'image_ids' => ['sometimes', 'array'],
            'image_ids.*' => ['integer', 'exists:images,id'],
        ]);

        $board = Board::create($data);

        if (isset($data['image_ids'])) {
            $board->images()->sync($data['image_ids']);
        }

        return response($board->load(['user', 'images']), 201);
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
