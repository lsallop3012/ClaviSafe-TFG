<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Board;
use App\Models\Image;
use Illuminate\Support\Facades\Auth;
use App\Services\ImageService;
use App\Services\BoardService;

class DashboardController extends Controller
{
    protected $boardService;
    protected $imageService;

    public function __construct(
        BoardService $boardService,
        ImageService $imageService
    ) {
        $this->boardService = $boardService;
        $this->imageService = $imageService;
    }

    public function index()
    {
        $user = Auth::user();

        $boards = Board::where('user_id', $user->id)->get();

        $images = Image::where('user_id', $user->id)->get();

        return view('dashboard.index', compact('boards', 'images'));
    }
}
