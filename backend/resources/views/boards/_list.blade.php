@extends('layouts.main')
@if($boards->isEmpty())
<ul>
    @foreach ($boards as $board)
    <li>
        {{ $board->name }} - {{ $board->description }} - {{ $board->created_at }} - {{ $board->user->name }}

        <a href="{{ route('boards.show', $board) }}">View</a> -
        <a href="{{ route('boards.edit', $board) }}">Edit</a>

        <form action="{{ route('boards.destroy', $board) }}"
            method="POST"
            style="display:inline;">
            @csrf
            @method('DELETE')
            <button type="submit">Delete</button>
        </form>
    </li>
    @endforeach
</ul>
@else
<p>No images found.</p>
@endif