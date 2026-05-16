@extends('layouts.main')
<h1>Editar Imagen</h1>

<form method="POST" action="{{ route('imagenes.update', $imagen->id) }}">
    @csrf
    @method('PUT')
    <input type="hidden" name="id" value="<?= htmlspecialchars($imagen->id) ?>">

    <label>Nombre:</label><br>
    <input type="text" name="titulo" value="<?= htmlspecialchars($imagen->nombre) ?>" required><br><br>

    <br /><br />

    <label>Url:</label><br>
    <input type="text" name="url" value="<?= htmlspecialchars($imagen->url) ?>" required><br><br>

    <br /><br />

    <label>Descripción:</label><br>
    <input type="text" name="descripcion" value="<?= htmlspecialchars($imagen->descripcion) ?>" required><br><br>

    <br /><br />

    <label>Fecha_creacion</label>
    <input type="date" name="fecha_creacion" value="{{ old('fecha_creacion', $imagen->fecha_creacion) }}">
    @error('fecha_creacion')
    <div class="error">{{ $message }}</div>
    @enderror

    <br /><br />

    <label>Tablero:</label><br>
    <select name="tablero_id">
        <option value=""></option>
        <?php foreach ($tableros as $tablero): ?>
            <option value="<?= $tablero['id'] ?>" <?= $tablero['id'] == $imagen['tablero_id'] ? 'selected' : '' ?>><?= htmlspecialchars($tablero['nombre']) ?></option>
        <?php endforeach; ?>
    </select><br><br>

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

<p><a href="{{ route('imagenes.index') }}">Volver a la lista de imágenes</a></p>