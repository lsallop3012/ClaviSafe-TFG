@if(!empty($users))
<ul>
    @foreach($users as $user)
    <li>
        {{ htmlspecialchars($user->name) }} -
        {{ htmlspecialchars($user->email) }} -
        {{ htmlspecialchars($user->rol->name ?? '') }} -
        <a href="{{ route('users.show', $user) }}">View</a> -
        <a href="{{ route('users.edit', $user) }}">Edit</a> -
        <form action="{{ route('users.destroy', $user) }}" method="POST" style="display: inline;">
            @csrf
            @method('DELETE')
            <button>Delete</button>
        </form>
    </li>
    @endforeach
</ul>
@else
<p>No users found.</p>
@endif