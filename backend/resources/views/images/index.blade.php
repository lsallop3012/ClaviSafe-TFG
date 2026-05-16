@extends('layouts.main')
<h1>Images List</h1>
<p><a href="{{ route('images.create') }}">Create new image</a></p>
@include('images._list')
<p></p>
<p><a href="{{ route('boards.index') }}">Back to board list</a></p>