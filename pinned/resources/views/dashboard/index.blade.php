@extends('layouts.app')

@section('title', 'Dashboard')

@section('content')
    <h1>Dashboard</h1>

    <h2>Tableros</h2>
    @include('tableros._list')

    <p><a href="{{ route ('tableros.index')}}">Lista completa de tableros</p>

    <h2>Imágenes</h2>
    @include('imagenes._list')

    <p><a href="{{ route ('imagenes.index')}}">Lista completa de imagenes</p>
@endsection