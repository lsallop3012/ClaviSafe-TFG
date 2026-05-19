@extends('layouts.main')
<h1>Edit Board</h1>
<form action="{{ route('boards.update', $board->id) }}" method="POST">
    @csrf
    @method('PUT')

    <label>Name</label>
    <input type="text" name="name" value="{{ old('name', $board->name) }}">
    @error('name')
    <div class="error">{{ $message }}</div>
    @enderror

    <br /><br />
    
    <label>Description:</label>
    <textarea name="description">{{ old('description', $board->description) }}</textarea>
    @error('description')
    <div class="error">{{ $message }}</div>
    @enderror

    <br /><br />

    <label>Created At</label>
    <input type="date" name="created_at" value="{{ old('created_at', $board->created_at) }}">
    @error('created_at')
    <div class="error">{{ $message }}</div>
    @enderror

    <br /><br />

    <select name="user_id">
        <option value="">-- Select an user --</option>
        @foreach($users as $user)
        <option value="{{ $user->id }}" {{ old('user_id') == $user->id ? 'selected' : '' }}>
            {{ $user->name }}
        </option>
        @endforeach
    </select>
    @error('user_id')
    <div class="error">{{ $message }}</div>
    @enderror

    <br /><br />

    <button type="submit">Update</button>
</form>

<p><a href="{{ route('boards.index') }}">Back to Boards List</a></p>