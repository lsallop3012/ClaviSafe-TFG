<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index()
    {
        return Comment::with(['user', 'image'])->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
            'image_id' => ['required', 'exists:images,id'],
            'content' => ['required', 'string'],
        ]);

        $comment = Comment::create($data);

        return response($comment->load(['user', 'image']), 201);
    }

    public function show(Comment $comment)
    {
        return $comment->load(['user', 'image']);
    }

    public function update(Request $request, Comment $comment)
    {
        $data = $request->validate([
            'user_id' => ['sometimes', 'exists:users,id'],
            'image_id' => ['sometimes', 'exists:images,id'],
            'content' => ['sometimes', 'string'],
        ]);

        $comment->update($data);

        return $comment->load(['user', 'image']);
    }

    public function destroy(Comment $comment)
    {
        $comment->delete();

        return response()->noContent();
    }
}
