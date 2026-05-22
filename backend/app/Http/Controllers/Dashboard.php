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
        ImageService $imageService,
        BoardService $boardService
    ) {
        // Inyección de dependencias en el constructor (para no tener que hacerlo en cada método)
        $this->imageService = $imageService;
        $this->boardService = $boardService;
    }

    public function index()
    {
        // usuario logado
        $user = Auth::user(); 

        // Tableros solo del usuario
        $boards = Board::where('user_id', $user->id)->get();

        // Imágenes del usuario
        $images = Image::where('user_id', $user->id)->get();

        return view('dashboard.index', compact('boards', 'images'));
    }
}