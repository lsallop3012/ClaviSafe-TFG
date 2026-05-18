@extends('layouts.main')
<h1>Create Board</h1>
<form action="{{ route('boards.store') }}" method="POST">
    @csrf

    <label>Name</label>
    <input type="text" name="name" value="{{ old('name') }}">
    @error('name')
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

    <label>User</label>
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

    <button type="submit">Create</button>
</form>