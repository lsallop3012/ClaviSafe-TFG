@extends('layouts.main')
<h1>Edit Image</h1>

<form method="POST" action="{{ route('images.update', $image->id) }}">
    @csrf
    @method('PUT')
    <input type="hidden" name="id" value="<?= htmlspecialchars($image->id) ?>">

    <label>Nombre:</label><br>
    <input type="text" name="titulo" value="<?= htmlspecialchars($image->nombre) ?>" required><br><br>

    <br /><br />

    <label>Url:</label><br>
    <input type="text" name="url" value="<?= htmlspecialchars($image->url) ?>" required><br><br>

    <br /><br />

    <label>Descripción:</label><br>
    <input type="text" name="descripcion" value="<?= htmlspecialchars($image->descripcion) ?>" required><br><br>

    <br /><br />

    <label>Created At</label>
    <input type="date" name="created_at" value="{{ old('created_at', $image->created_at) }}">
    @error('created_at')
    <div class="error">{{ $message }}</div>
    @enderror

    <br /><br />

    <label>Board:</label><br>
    <select name="board_id">
        <option value=""></option>
        <?php foreach ($boards as $board): ?>
            <option value="<?= $board['id'] ?>" <?= $board['id'] == $image['board_id'] ? 'selected' : '' ?>><?= htmlspecialchars($board['nombre']) ?></option>
        <?php endforeach; ?>
    </select><br><br>

    <br /><br />

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

    <br /><br />

    <button type="submit">Modify</button>
</form>

<p><a href="{{ route('images.index') }}">Back to Images List</a></p>