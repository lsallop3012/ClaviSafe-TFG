@extends('layouts.main')

@section('title', 'Home')

@section('content')
    <h1>HOME</h1>
    <p><a href="{{ route('login') }}">Login</a></p>
@endsection