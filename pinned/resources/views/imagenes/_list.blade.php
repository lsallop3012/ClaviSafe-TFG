<ul>
    @foreach ($imagenes as $imagen)
        <li>
            {{ htmlspecialchars($imagen->url) }} - 
            {{ htmlspecialchars($imagen->nombre ?? '') }} -
            {{ htmlspecialchars($imagen->descripcion ?? '') }} -
            {{ htmlspecialchars($imagen->fecha_subida->format('Y-m-d H:i:s')) }} -
            {{ htmlspecialchars($imagen->usuario->user_id ?? '') }}
        </li>
    @endforeach
</ul>