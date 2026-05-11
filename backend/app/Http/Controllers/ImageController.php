<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreImageRequest;
use App\Http\Requests\UpdateBoardRequest;
use App\Models\Image;

use App\Services\UserService;
use App\Services\ImageService;
use App\Services\BoardService;
use Illuminate\Http\Request;

class ImageController extends Controller
{

    protected $imageService;
    protected $userService;
    protected $boardService;

    public function __construct(
        ImageService $imageService,
        UserService $userService,
        BoardService $boardService,
    ) {

        $this->imageService = $imageService;
        $this->userService = $userService;
        $this->boardService = $boardService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $images = $this->imageService->list();
        return view('images.index', compact('images'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = $this->userService->list();
        return view('images.create', compact('users'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreImageRequest $request)
    {
        $validatedData = $request->validated();
        $this->imageService->create($validatedData);
        return redirect()->route('images.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Image $image)
    {
        return view('images.show', compact('image'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Image $image)
    {
        $users = $this->userService->list();
        $boards = $this->boardService->list();
        return view('images.edit', compact('image', 'users', 'boards'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Image $image, UpdateBoardRequest $request)
    {
        $validatedData = $request->validated();
        $this->imageService->update($image, $validatedData);
        return redirect()->route('images.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Image $image)
    {
        $this->imageService->delete($image);
        return redirect()->route('images.index');
    }
}
