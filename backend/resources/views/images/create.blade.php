@extends('layouts.main')
<form action="{{ route('images.store') }}" method="POST">
    @csrf

    <label>Name</label>
    <input type="text" name="name" value="{{ old('name') }}">
    @error('name')
    <div class="error">{{ $message }}</div>
    @enderror

    <label>Path</label>
    <input type="text" name="path" value="{{ old('path') }}">
    @error('path')
    <div class="error">{{ $message }}</div>
    @enderror

    <label>Description</label>
    <textarea name="description">{{ old('description') }}</textarea>
    @error('description')
    <div class="error">{{ $message }}</div>
    @enderror

    <label>Created At</label>
    <input type="date" name="created_at" value="{{ old('created_at') }}">
    @error('created_at')
    <div class="error">{{ $message }}</div>
    @enderror

    <select name="user_id">
        <option value="">-- Select a user --</option>
        @foreach($users as $user)
        <option value="{{ $user->id }}" {{ old('user_id') == $user->id ? 'selected' : '' }}>
            {{ $user->name }}
        </option>
        @endforeach
    </select>
    @error('user_id')
    <div class="error">{{ $message }}</div>
    @enderror

    <button type="submit">Create</button>
</form>