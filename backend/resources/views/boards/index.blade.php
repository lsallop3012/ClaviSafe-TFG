@extends('layouts.main')
<h1>Board List</h1>
<p><a href="{{ route('boards.create') }}">Crear nuevo tablero</a></p>
@include('boards._list')