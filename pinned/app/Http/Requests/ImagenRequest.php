<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ImagenRequest extends FormRequest
{
    public function validaciones()
    {
        return [
            'url' => 'required|url',
        ];
    }
}