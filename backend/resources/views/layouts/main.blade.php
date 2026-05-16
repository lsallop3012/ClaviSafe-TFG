<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MOODLY</title>
    <link rel="stylesheet" href="./css/styles.css">
</head>

<body>
    <header style="display: flex; gap: 30px;">
        <nav style="display: flex; gap: 10px;">
            <a href="{{ route('dashboard.index') }}">Dashboard</a>
            <a href="{{ route('images.index') }}">IMAGES</a>
            <a href="{{ route('boards.index') }}">BOARDS</a>
            <a href="{{ route('users.index') }}">USERS</a>
        </nav>
        <a href="{{ route('logout') }}">Logout</a>
    </header>
    <main>
        @hasSection('content')
        @yield('content')
        @endif
    </main>
    <footer></footer>
</body>

</html>