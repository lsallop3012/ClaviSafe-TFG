<?php

return [
    // Apply CORS only to API and Sanctum endpoints
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    // In production replace * with your frontend URL.
    // For dev with React on :3000 and Laravel on :8000:
    'allowed_origins' => [
        env('FRONTEND_URL', 'http://localhost:5173'),
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    // false because we use Bearer tokens, not cookies
    'supports_credentials' => false,
];
