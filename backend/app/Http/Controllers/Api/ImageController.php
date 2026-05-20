<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Image;
use App\Models\Like;
use App\Models\SavedImage;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    /**
     * Add liked_by_me / like_count / saved_by_me to an image (or collection).
     */
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

    /**
     * GET /api/images?q=&page=&perPage=&user_id=&saved_by=&sort=recent
     */
    public function index(Request $request)
    {
        $q       = $request->query('q');
        $userId  = $request->query('user_id');
        $savedBy = $request->query('saved_by');
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
        if ($sort === 'recent') $query->orderByDesc('created_at');

        $paginator = $query->paginate($perPage);
        $items     = $this->annotate($paginator->items(), optional($request->user())->id);

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

    /** POST /api/images */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'        => ['required', 'string', 'max:255'],
            'url'         => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'board_id'    => ['nullable', 'integer', 'exists:boards,id'],
        ]);

        $image = Image::create([
            'name'        => $data['name'],
            'url'         => $data['url'],
            'description' => $data['description'] ?? null,
            'user_id'     => $request->user()->id,
        ]);

        if (!empty($data['board_id'])) {
            $image->boards()->attach($data['board_id']);
        }

        return response()->json($this->annotate($image, $request->user()->id), 201);
    }

    /** GET /api/images/{image} */
    public function show(Request $request, Image $image)
    {
        $annotated = $this->annotate($image, optional($request->user())->id);

        $author = $image->user;
        $annotated->author = $author
            ? ['id' => $author->id, 'name' => $author->name, 'avatar' => $author->avatar]
            : null;

        $annotated->boards_containing = $image->boards()
            ->select('boards.id', 'boards.name', 'boards.user_id')
            ->get();

        return response()->json($annotated);
    }

    /** PUT /api/images/{image} */
    public function update(Request $request, Image $image)
    {
        if ($image->user_id !== $request->user()->id && !$request->user()->isAdmin()) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        $data = $request->validate([
            'name'        => ['sometimes', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string'],
        ]);

        $image->update($data);

        return response()->json($this->annotate($image->fresh(), $request->user()->id));
    }

    /** DELETE /api/images/{image} */
    public function destroy(Request $request, Image $image)
    {
        if ($image->user_id !== $request->user()->id && !$request->user()->isAdmin()) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }
        $image->delete();
        return response()->json(['ok' => true]);
    }

    /** POST /api/images/{image}/like — toggle */
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
        $count = Like::where('image_id', $image->id)->count();
        return response()->json(['liked' => $liked, 'count' => $count]);
    }

    /** POST /api/images/{image}/save — toggle */
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
}
