<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Board;
use App\Models\Image;
use Illuminate\Http\Request;

class BoardController extends Controller
{
    private function enrich($boards)
    {
        $isCollection = is_iterable($boards) && !($boards instanceof Board);
        $list = $isCollection ? collect($boards) : collect([$boards]);

        $list->each(function ($b) {
            $b->load(['images' => function ($q) { $q->oldest('images.created_at')->limit(1); }]);
            $first = $b->images->first();
            $b->image_count = $b->images()->count('images.id');
            $b->cover = $first?->url;
        });

        return $isCollection ? $list : $list->first();
    }

    public function index(Request $request)
    {
        $perPage = max(1, min(100, (int) $request->query('perPage', 20)));
        $query = Board::query();

        if ($request->filled('user_id')) $query->where('user_id', (int) $request->query('user_id'));
        if ($request->filled('q')) {
            $q = $request->query('q');
            $query->where('name', 'like', "%{$q}%");
        }

        $paginator = $query->paginate($perPage);
        $items     = $this->enrich($paginator->items());

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
        $data = $request->validate([
            'name'        => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
        ]);

        $board = Board::create([
            'name'        => $data['name'],
            'description' => $data['description'] ?? null,
            'user_id'     => $request->user()->id,
        ]);

        return response()->json($this->enrich($board), 201);
    }

    public function show(Board $board)
    {
        return response()->json($this->enrich($board));
    }

    public function update(Request $request, Board $board)
    {
    $data = $request->validate([
        'name'        => ['sometimes', 'string', 'max:255'],
        'description' => ['sometimes', 'nullable', 'string'],
    ]);

    $board->update($data);
    return response()->json($this->enrich($board->fresh()));
    }

    public function destroy(Request $request, Board $board)
    {
        if ($board->user_id !== $request->user()->id && !$request->user()->isAdmin()) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }
        $board->delete();
        return response()->json(['ok' => true]);
    }

    public function listImages(Request $request, Board $board)
    {
        $perPage   = max(1, min(100, (int) $request->query('perPage', 24)));
        $paginator = $board->images()->orderBy('images.id')->paginate($perPage);

        $controller = app(ImageController::class);
        $items      = $controller->annotate($paginator->items(), auth('sanctum')->id());

        return response()->json([
            'data' => collect($items)->values(),
            'meta' => [
                'page'       => $paginator->currentPage(),
                'perPage'    => $paginator->perPage(),
                'total'      => $paginator->total(),
                'totalPages' => $paginator->lastPage(),
            ],
        ]);
    }

    public function addImage(Request $request, Board $board)
    {
        if ($board->user_id !== $request->user()->id && !$request->user()->isAdmin()) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }
        $data = $request->validate(['image_id' => ['required', 'integer', 'exists:images,id']]);
        $board->images()->syncWithoutDetaching([$data['image_id']]);
        return response()->json(['ok' => true]);
    }

    public function removeImage(Request $request, Board $board, Image $image)
    {
        if ($board->user_id !== $request->user()->id && !$request->user()->isAdmin()) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }
        $board->images()->detach($image->id);

        \App\Models\SavedImage::where('user_id', $request->user()->id)
            ->where('image_id', $image->id)
            ->delete();

        return response()->json(['ok' => true, 'saved' => false]);
    }

    public function saveImage(Request $request, Board $board)
    {
        if ($board->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        $data = $request->validate([
            'image_id' => ['required', 'integer', 'exists:images,id'],
        ]);

        $board->images()->syncWithoutDetaching([$data['image_id']]);

        \App\Models\SavedImage::firstOrCreate([
            'user_id'  => $request->user()->id,
            'image_id' => $data['image_id'],
        ]);

        return response()->json(['saved' => true], 201);
    }
}
