<ul>
    @foreach ($tableros as $tablero)
        <li>
            {{ htmlspecialchars($tablero->codigo) }} -
            {{ htmlspecialchars($tablero->descripcion ?? '') }} -
            {{ htmlspecialchars($tablero->fecha_creacion->format('Y-m-d H:i:s')) }} -
            {{ htmlspecialchars($tablero->usuario->name ?? '') }}
        </li>
    @endforeach
</ul>