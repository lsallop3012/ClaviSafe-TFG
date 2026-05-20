<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Image;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /** GET /api/images/{image}/comments */
    public function listForImage(Image $image)
    {
        $comments = $image->comments()
            ->with(['user:id,name,avatar'])
            ->orderByDesc('created_at')
            ->get()
            ->map(function ($c) {
                return [
                    'id'         => $c->id,
                    'user_id'    => $c->user_id,
                    'image_id'   => $c->image_id,
                    'content'    => $c->content,
                    'created_at' => $c->created_at,
                    'user'       => $c->user ? [
                        'id'     => $c->user->id,
                        'name'   => $c->user->name,
                        'avatar' => $c->user->avatar,
                    ] : null,
                ];
            });

        return response()->json([
            'data' => $comments,
            'meta' => ['total' => $comments->count()],
        ]);
    }

    /** POST /api/images/{image}/comments */
    public function storeForImage(Request $request, Image $image)
    {
        $data = $request->validate([
            'content' => ['required', 'string', 'max:300'],
        ]);

        $comment = Comment::create([
            'user_id'  => $request->user()->id,
            'image_id' => $image->id,
            'content'  => $data['content'],
        ]);

        $user = $request->user();
        return response()->json([
            'id'         => $comment->id,
            'user_id'    => $comment->user_id,
            'image_id'   => $comment->image_id,
            'content'    => $comment->content,
            'created_at' => $comment->created_at,
            'user'       => ['id' => $user->id, 'name' => $user->name, 'avatar' => $user->avatar],
        ], 201);
    }

    /** DELETE /api/comments/{comment} */
    public function destroy(Request $request, Comment $comment)
    {
        if ($comment->user_id !== $request->user()->id && !$request->user()->isAdmin()) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }
        $comment->delete();
        return response()->json(['ok' => true]);
    }
}
