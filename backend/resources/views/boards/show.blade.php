@extends('layouts.main')

<h1>View Board</h1>

<label>Name</label>
<input type="text" name="name" value="{{ $board->name }}" disabled />

<br /><br />

<label>Description</label>
<input type="text" name="description" value="{{ $board->description }}" disabled />

<br /><br />

<a href="{{ route('boards.index') }}">Back</a>