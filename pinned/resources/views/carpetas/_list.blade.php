<ul>
    @foreach ($carpetas as $carpeta)
        <li>
            {{ htmlspecialchars($carpeta->tablero->tablero_id ?? '') }}
            {{ htmlspecialchars($carpeta->imagen->imagen_id ?? '') }}
        </li>
    @endforeach
</ul>