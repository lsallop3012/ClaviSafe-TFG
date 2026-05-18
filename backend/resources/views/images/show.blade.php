@extends('layouts.main')
<h1>View Image</h1>

<div>
    <label><strong>Name:</strong></label>
    <p>{{ $image->name }}</p>
</div>

<br>

<div>
    <label><strong>Description:</strong></label>
    <p>{{ $image->description }}</p>
</div>

<br>

<a href="{{ route('images.index') }}">Back</a>