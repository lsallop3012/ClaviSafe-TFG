@extends('layouts.main')
<h1>Crear Tablero</h1>
<form action="{{ route('tableros.store') }}" method="POST">
    @csrf

    <label>Nombre</label>
    <input type="text" name="nombre" value="{{ old('nombre') }}">
    @error('nombre')
    <div class="error">{{ $message }}</div>
    @enderror

    <label>Descripción</label>
    <textarea name="descripcion">{{ old('descripcion') }}</textarea>
    @error('descripcion')
    <div class="error">{{ $message }}</div>
    @enderror

    <label>Fecha_creacion</label>
    <input type="date" name="fecha_creacion" value="{{ old('fecha_creacion') }}">
    @error('fecha_creacion')
    <div class="error">{{ $message }}</div>
    @enderror

    <select name="user_id">
        <option value="">-- Selecciona un usuario --</option>
        @foreach($users as $user)
        <option value="{{ $user->id }}" {{ old('user_id') == $user->id ? 'selected' : '' }}>
            {{ $user->name }}
        </option>
        @endforeach
    </select>
    @error('user_id')
    <div class="error">{{ $message }}</div>
    @enderror

    <button type="submit">Crear</button>
</form>