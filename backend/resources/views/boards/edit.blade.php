@extends('layouts.main')
<h1>Editar Tablero</h1>
<form action="{{ route('tableros.update', $tablero->id) }}" method="POST">
    @csrf
    @method('PUT')

    <label>Nombre</label>
    <input type="text" name="nombre" value="{{ old('nombre', $tablero->nombre) }}">
    @error('nombre')
    <div class="error">{{ $message }}</div>
    @enderror

    <br /><br />
    
    <label>Descripción:</label>
    <textarea name="descripcion">{{ old('descripcion', $tablero->descripcion) }}</textarea>
    @error('descripcion')
    <div class="error">{{ $message }}</div>
    @enderror

    <br /><br />

    <label>Fecha_creacion</label>
    <input type="date" name="fecha_creacion" value="{{ old('fecha_creacion', $tablero->fecha_creacion) }}">
    @error('fecha_creacion')
    <div class="error">{{ $message }}</div>
    @enderror

    <br /><br />

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

    <br /><br />

    <button type="submit">Modificar</button>
</form>

<p><a href="{{ route('tableros.index') }}">Volver a la lista de tableros</a></p>