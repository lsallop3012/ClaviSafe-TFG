@extends('layouts.main')

@section('title', 'Dashboard')

@section('content')
<h1>DASHBOARD - MOODLY</h1>
<h2>Board List</h2>
@include('boards._list')
<p><a href="{{ route('boards.index') }}">Full Board List</a></p>
<h2>Images list</h2>
@include('images._list')
<p><a href="{{ route('images.index') }}">Full Image List</a></p>
@endsection