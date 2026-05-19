@extends('layouts.main')
<h1>Board List</h1>
<p><a href="{{ route('boards.create') }}">Create new board</a></p>
@include('boards._list')