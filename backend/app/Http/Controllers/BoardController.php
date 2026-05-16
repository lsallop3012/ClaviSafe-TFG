<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\BoardService;

class BoardController extends Controller
{
    public function index()
    {
        return view('boards.index');
    }

    public function store(Request $request, BoardService $boardService)
    {
        $name = $request->input("name");
        $description = $request->input("description");
        $created_at = $request->input("created_at");
        $user_id = $request->input("user_id");

        $boardService->create(['name' => $name, 'description' => $description, 'created_at' => $created_at, 'user_id' => $user_id]);

        return response()->json(['message' => 'Board created correctly'], 201);
    }
}
