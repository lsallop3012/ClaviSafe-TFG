@extends('layouts.main')

@section('content')
<h1>Users</h1>
<a href="{{ route('users.create') }}">Create user</a>

@include('users._list')
@endsection