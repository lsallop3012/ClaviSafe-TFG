<?php

namespace App\Services;

use App\Models\Board;

class BoardService
{
    public function list()
    {
        return Board::all();
    }

    public function create(array $data): Board
    {
        $board = Board::create($data);
        return $board;
    }

    public function update(Board $board, array $data): Board
    {
        $board->update($data);
        return $board;
    }

    public function delete(Board $board): void
    {
        $board->delete();
    }
}
