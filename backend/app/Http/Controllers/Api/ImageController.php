<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Image;
use App\Models\Like;
use App\Models\SavedImage;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    private function annotate($images, ?int $meId)
    {
        $isCollection = is_iterable($images) && !($images instanceof Image);
        $list = $isCollection ? collect($images) : collect([$images]);

        $imageIds = $list->pluck('id')->all();

        $likeCounts = Like::whereIn('image_id', $imageIds)
            ->selectRaw('image_id, COUNT(*) as c')
            ->groupBy('image_id')
            ->pluck('c', 'image_id');

        $likedByMe = $meId
            ? Like::where('user_id', $meId)->whereIn('image_id', $imageIds)->pluck('image_id')->all()
            : [];
        $savedByMe = $meId
            ? SavedImage::where('user_id', $meId)->whereIn('image_id', $imageIds)->pluck('image_id')->all()
            : [];

        $list->each(function ($img) use ($likeCounts, $likedByMe, $savedByMe) {
            $img->like_count   = (int) ($likeCounts[$img->id] ?? 0);
            $img->liked_by_me  = in_array($img->id, $likedByMe);
            $img->saved_by_me  = in_array($img->id, $savedByMe);
        });

        return $isCollection ? $list : $list->first();
    }

    public function index(Request $request)
    {
        $q       = $request->query('q');
        $userId  = $request->query('user_id');
        $savedBy = $request->query('saved_by');
        $likedBy = $request->query('liked_by');
        $sort    = $request->query('sort');
        $perPage = (int) ($request->query('perPage', 24));
        $perPage = max(1, min(100, $perPage));

        $query = Image::query();

        if ($q) {
            $query->where(function ($w) use ($q) {
                $w->where('name', 'like', "%{$q}%")
                  ->orWhere('description', 'like', "%{$q}%");
            });
        }
        if ($userId)  $query->where('user_id', (int) $userId);
        if ($savedBy) $query->whereIn('id', SavedImage::where('user_id', (int) $savedBy)->pluck('image_id'));
        if ($likedBy) $query->whereIn('id', Like::where('user_id', (int) $likedBy)->pluck('image_id'));
        if ($sort === 'recent') $query->orderByDesc('created_at');

        $paginator = $query->paginate($perPage);
        $items     = $this->annotate($paginator->items(), auth('sanctum')->id());

        return response()->json([
            'data' => $items->values(),
            'meta' => [
                'page'       => $paginator->currentPage(),
                'perPage'    => $paginator->perPage(),
                'total'      => $paginator->total(),
                'totalPages' => $paginator->lastPage(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'image'       => 'nullable|image|max:5120',
            'url'         => 'nullable|url|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $url = asset('storage/' . $request->file('image')->store('images', 'public'));
        } elseif ($request->filled('url')) {
            $url = $request->url;
        } else {
            return response()->json(['message' => 'Se requiere una imagen o una URL.'], 422);
        }

        $image = Image::create([
            'name'        => $request->name,
            'url'         => $url,
            'description' => $request->description,
            'user_id'     => $request->user()->id,
        ]);

        return response()->json($this->annotate($image->fresh(), $request->user()->id), 201);
    }

    public function show(Request $request, Image $image)
    {
        $annotated = $this->annotate($image, auth('sanctum')->id());

        $author = $image->user;
        $annotated->author = $author
            ? ['id' => $author->id, 'name' => $author->name, 'avatar' => $author->avatar]
            : null;

        $annotated->boards_containing = $image->boards()
            ->select('boards.id', 'boards.name', 'boards.user_id')
            ->get();

        return response()->json($annotated);
    }

    public function update(Request $request, Image $image)
    {
        $data = $request->validate([
        'name'        => ['sometimes', 'string', 'max:255'],
        'description' => ['sometimes', 'nullable', 'string'],
        ]);

        $image->update($data);
        return response()->json($this->annotate($image->fresh(), $request->user()->id));
    }

    public function destroy(Request $request, Image $image)
    {
        $image->delete();
        return response()->json(['ok' => true]);
    }

    public function toggleLike(Request $request, Image $image)
    {
        $userId = $request->user()->id;
        $like = Like::where('user_id', $userId)->where('image_id', $image->id)->first();

        if ($like) {
            $like->delete();
            $liked = false;
        } else {
            Like::create(['user_id' => $userId, 'image_id' => $image->id]);
            $liked = true;
        }

        return response()->json([
            'liked' => $liked,
            'count' => Like::where('image_id', $image->id)->count(),
        ]);
    }

    public function toggleSave(Request $request, Image $image)
    {
        $userId = $request->user()->id;
        $row = SavedImage::where('user_id', $userId)->where('image_id', $image->id)->first();
        if ($row) {
            $row->delete();
            return response()->json(['saved' => false]);
        }
        SavedImage::create(['user_id' => $userId, 'image_id' => $image->id]);
        return response()->json(['saved' => true]);
    }

    public function uploadImage(Request $request) 
    {
    if ($request->hasFile('imagen')) {
        $path = $request->file('imagen')->store('imagenes', 'public');
        
        // Genera la URL completa: http://localhost:8000/storage/imagenes/nombre.jpg
        $url = asset('storage/' . $path);

        return response()->json([
            'message' => 'Imagen subida con éxito',
            'url' => $url
        ], 200);
    }
    }
}
