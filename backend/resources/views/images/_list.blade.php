@extends('layouts.main')
@if($images->isEmpty())
<ul>
    @foreach ($images as $image)
    <li>
        {{ $image->name }} - {{ $image->path }} - {{ $image->description }} - {{ $image->uploaded_at }} - {{ $image->user->name }}

        <a href="{{ route('images.show', $image) }}">View</a> -
        <a href="{{ route('images.edit', $image) }}">Edit</a>

        <form action="{{ route('images.destroy', $image) }}"
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
