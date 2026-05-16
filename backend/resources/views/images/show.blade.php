@extends('layouts.main')
<h1>Ver Imagen</h1>

<div>
    <label><strong>Nombre:</strong></label>
    <p>{{ $imagen->nombre }}</p>
</div>

<br>

<div>
    <label><strong>Descripción:</strong></label>
    <p>{{ $imagen->descripcion }}</p>
</div>

<br>

<a href="{{ route('imagenes.index') }}">Volver</a>