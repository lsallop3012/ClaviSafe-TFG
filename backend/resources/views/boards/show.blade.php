@extends('layouts.main')

<h1>Ver Tablero</h1>

<label>Nombre</label>
<input type="text" name="name" value="{{ $tablero->nombre }}" disabled />

<br /><br />

<label>Descripcion</label>
<input type="text" name="description" value="{{ $tablero->descripcion }}" disabled />

<br /><br />

<a href="{{ route('tableros.index') }}">Volver</a>